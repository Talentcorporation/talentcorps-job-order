import type { JobOrder } from "./types";
import { buildJobOrderExportPayload } from "./exportPayload";

const JOB_ORDER_EMAIL_RECIPIENT = "bhunt@talentcorps.com";

function orderTypeSubjectLabel(orderType: JobOrder["orderType"]) {
  if (orderType === "append") return "Add to Existing Job Order";
  if (orderType === "new_for_existing_site") return "New Job Order for Existing Site";
  return "New Job Order";
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result || "");
      const parts = raw.split(",");
      resolve(parts.length > 1 ? parts[1] : raw);
    };
    reader.onerror = () => reject(new Error("Could not read generated PDF for submission."));
    reader.readAsDataURL(file);
  });
}

export type GeocodeResult = {
  formattedAddress: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  zip?: string;
  placeId?: string;
};

function parseAddress(place: any) {
  const next = { city: "", state: "", zip: "" };
  for (const comp of place.address_components || []) {
    const types = comp.types || [];
    if (types.includes("locality")) next.city = comp.long_name;
    if (types.includes("administrative_area_level_1")) next.state = comp.short_name;
    if (types.includes("postal_code")) next.zip = comp.long_name;
  }
  return next;
}

// Standalone extraction: no backend endpoint calls.
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const input = String(address || "").trim();
  if (!input) return null;

  const g = (window as any).google;
  if (!g?.maps?.Geocoder) return null;

  return new Promise((resolve) => {
    const geocoder = new g.maps.Geocoder();
    geocoder.geocode({ address: input }, (results: any[] | null, status: string) => {
      if (status !== "OK" || !results?.length) {
        resolve(null);
        return;
      }
      const first = results[0];
      const parsed = parseAddress(first);
      resolve({
        formattedAddress: String(first.formatted_address || input),
        lat: first.geometry?.location?.lat?.() ?? 0,
        lng: first.geometry?.location?.lng?.() ?? 0,
        city: parsed.city,
        state: parsed.state,
        zip: parsed.zip,
        placeId: String(first.place_id || ""),
      });
    });
  });
}

// Standalone email draft submit for developer handoff package.
export async function submitJobOrder(order: JobOrder, files: Record<string, File | null | undefined>) {
  const submitUrl = String(import.meta.env.VITE_JOB_ORDER_SUBMIT_URL || "").trim();
  if (!submitUrl) {
    throw new Error("Missing submit endpoint. Set VITE_JOB_ORDER_SUBMIT_URL in your environment to enable automated submit.");
  }

  const generatedPdf = files.generatedPdf || null;
  if (!generatedPdf) {
    throw new Error("Generated PDF was not available at submit time. Click Submit again.");
  }

  const submissionId = `local-${Date.now()}`;
  const submittedAt = new Date().toISOString();
  const pdfBase64 = await fileToBase64(generatedPdf);

  const subject = `${orderTypeSubjectLabel(order.orderType)} - ${order.twid || "No TempWorks ID"} - ${order.clientName || "Unknown Client"}`;

  const payload = {
    submissionId,
    submittedAt,
    to: JOB_ORDER_EMAIL_RECIPIENT,
    fromHint: "bhunt@talentcorps.com",
    replyToHint: "orders@talentcorps.com",
    subject,
    pdfFileName: generatedPdf.name || "TalentCorps_JobOrder.pdf",
    pdfMimeType: generatedPdf.type || "application/pdf",
    pdfBase64,
    order,
  };

  const exportPayload = buildJobOrderExportPayload(order, {
    submissionId,
    submittedAt,
    subject,
    pdfFileName: payload.pdfFileName,
    pdfMimeType: payload.pdfMimeType,
    pdfBase64,
    payloadVersion: "v1",
    submitStatus: "Submitted",
    submitError: "",
    pdfStorageUrl: "",
  });

  const submitPayload = {
    ...payload,
    ...exportPayload,
    emailBodyJson: JSON.stringify(exportPayload),
    emailBodyPayload: exportPayload,
  };

  const response = await fetch(submitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submitPayload),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    const suffix = details ? ` (${details.slice(0, 240)})` : "";
    throw new Error(`Submit endpoint returned ${response.status}.${suffix}`);
  }

  const attachedFiles = Object.entries(files)
    .filter(([, file]) => Boolean(file))
    .map(([key, file]) => ({ key, name: file?.name || "" }));

  return {
    ok: true,
    submissionId,
    recipient: JOB_ORDER_EMAIL_RECIPIENT,
    submitUrl,
    received: {
      clientName: order.clientName,
      projectName: order.projectName,
      positionCount: order.laborPositions.length,
      positions: order.laborPositions.map((position, idx) => ({
        index: idx + 1,
        tradeRequested: position.tradeRequested,
        workersNeeded: position.workersNeeded,
      })),
      attachedFiles,
    },
  };
}

// Remote PDF is intentionally disabled in standalone mode.
export async function generateJobOrderPdf(_order: JobOrder): Promise<{ ok: boolean; pdfUrl: string }> {
  throw new Error("Remote PDF generation is disabled in standalone extraction mode.");
}

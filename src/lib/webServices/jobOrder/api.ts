import type { JobOrder } from "./types";

const JOB_ORDER_EMAIL_RECIPIENT = "orders@talentcorp.com";

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
  const attachedFiles = Object.entries(files)
    .filter(([, file]) => Boolean(file))
    .map(([key, file]) => ({ key, name: file?.name || "" }));

  const laborSummary = order.laborPositions
    .map((position, idx) => `${idx + 1}) ${position.tradeRequested || "Unspecified trade"} - ${position.workersNeeded || 0} worker(s)`)
    .join("\n");

  const subject = `[Job Order] ${order.clientName || "Unknown Client"} - ${order.projectName || "Unknown Project"}`;
  const bodyLines = [
    "Job Order Submission",
    "",
    `Submission ID: local-${Date.now()}`,
    `Created: ${new Date().toLocaleString()}`,
    `Order Type: ${order.orderType}`,
    `Client: ${order.clientName || "-"}`,
    `Project: ${order.projectName || "-"}`,
    `TWID: ${order.twid || "-"}`,
    `Site: ${order.jobSite.formattedAddress || order.jobSite.address || "-"}`,
    `Start Date: ${order.startDate || "-"}`,
    `End Date: ${order.endDate || "-"}`,
    `Shift: ${order.shiftStart || "-"} to ${order.shiftEnd || "-"}`,
    `Schedule Days: ${order.scheduleDays.join(", ") || "-"}`,
    "",
    "Labor Positions:",
    laborSummary || "-",
    "",
    `Primary Contact: ${order.contacts.primary.name || "-"} | ${order.contacts.primary.email || "-"} | ${order.contacts.primary.phone || "-"}`,
    `Supervisor: ${order.contacts.supervisor.name || "-"} | ${order.contacts.supervisor.email || "-"} | ${order.contacts.supervisor.phone || "-"}`,
    "",
    "File Attachments (attach manually before sending):",
    ...attachedFiles.map((f) => `- ${f.key}: ${f.name}`),
    ...(attachedFiles.length === 0 ? ["- None"] : []),
  ];

  const mailtoUrl = `mailto:${JOB_ORDER_EMAIL_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailtoUrl;

  return {
    ok: true,
    submissionId: `local-${Date.now()}`,
    recipient: JOB_ORDER_EMAIL_RECIPIENT,
    mailtoUrl,
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

import type { JobOrder } from "./types";

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
    payloadVersion: "v1",
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

  const emailBodyPayload = {
    submissionId,
    submittedAt,
    subject,
    orderId: order.id,
    createdAt: order.createdAt,
    orderType: order.orderType,
    clientName: order.clientName,
    twid: order.twid || "",
    projectName: order.projectName,
    startDate: order.startDate || "",
    endDate: order.endDate || "",
    jobSiteAddress: order.jobSite.address,
    jobSiteCity: order.jobSite.city,
    jobSiteState: order.jobSite.state,
    jobSiteZip: order.jobSite.zip,
    primaryContactName: order.contacts.primary.name,
    primaryContactPhone: order.contacts.primary.phone,
    primaryContactEmail: order.contacts.primary.email,
    supervisorName: order.contacts.supervisor.name,
    supervisorPhone: order.contacts.supervisor.phone,
    supervisorEmail: order.contacts.supervisor.email,
    salesTeamMember: order.internal.salesTeamMember,
    branch: order.internal.branch,
    payStructure: order.financial.payStructure,
    inputMode: order.financial.inputMode,
    payRate: order.financial.payRate ?? null,
    billRate: order.financial.billRate ?? null,
    markupMultiplier: order.financial.markupMultiplier ?? null,
    minPayRate: order.financial.minPayRate ?? null,
    maxPayRate: order.financial.maxPayRate ?? null,
    minBillRate: order.financial.minBillRate ?? null,
    maxBillRate: order.financial.maxBillRate ?? null,
    poNumber: order.financial.poNumber || "",
    otherCompEnabled: Boolean(order.otherCompensation.enabled),
    otherCompDetails: order.otherCompensation.details || "",
    perDiemEnabled: Boolean(order.perDiem.enabled),
    perDiemAmount: order.perDiem.amount ?? null,
    perDiemDays: order.perDiem.days ?? null,
    travelPayEnabled: Boolean(order.travelPay.enabled),
    travelPayAmount: order.travelPay.amount ?? null,
    drugScreenRequired: Boolean(order.onboarding.drugScreenRequired),
    drugScreenType: order.onboarding.drugScreenType || "",
    backgroundRequired: Boolean(order.onboarding.backgroundRequired),
    badgingRequired: Boolean(order.onboarding.badgingRequired),
    cipWrapEnabled: Boolean(order.compliance.cipWrap.enabled),
    wrapTypeOcIp: Boolean(order.compliance.cipWrap.wrapTypes?.ocip),
    wrapTypeCcIp: Boolean(order.compliance.cipWrap.wrapTypes?.ccip),
    wrapTypeRoCip: Boolean(order.compliance.cipWrap.wrapTypes?.rocip),
    prevailingWageEnabled: Boolean(order.compliance.prevailingWage.enabled),
    certifiedPayrollRequired: Boolean(order.compliance.prevailingWage.certifiedPayrollRequired),
    wageDeterminationAttached: Boolean(order.compliance.prevailingWage.wageDeterminationAttached),
    fringeEnabled: Boolean(order.compliance.fringe.enabled),
    pdfFileName: payload.pdfFileName,
    pdfMimeType: payload.pdfMimeType,
    payloadVersion: "v1",
    laborPositionsJson: JSON.stringify(order.laborPositions || []),
    variableRatesJson: JSON.stringify(order.financial.variableRates || []),
    scheduleDaysJson: JSON.stringify(order.scheduleDays || []),
    shiftTypesJson: JSON.stringify(order.shiftTypes || []),
    pdfStorageUrl: "",
    submitStatus: "Submitted",
    submitError: "",
    pdfBase64,
  };

  const submitPayload = {
    ...payload,
    ...emailBodyPayload,
    emailBodyJson: JSON.stringify(emailBodyPayload),
    emailBodyPayload,
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

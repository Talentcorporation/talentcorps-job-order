import type { JobOrder } from "./types";

const JOB_ORDER_EMAIL_RECIPIENT = "bhunt@talentcorps.com";

function orderTypeSubjectLabel(orderType: JobOrder["orderType"]) {
  if (orderType === "append") return "Add to Existing Job Order";
  if (orderType === "new_for_existing_site") return "New Job Order for Existing Site";
  return "New Job Order";
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
  const attachedFiles = Object.entries(files)
    .filter(([, file]) => Boolean(file))
    .map(([key, file]) => ({ key, name: file?.name || "" }));

  const laborSummary = order.laborPositions
    .map((position, idx) => `${idx + 1}) ${position.tradeRequested || "Unspecified trade"} - ${position.workersNeeded || 0} worker(s)`)
    .join("\n");

  const subject = `${orderTypeSubjectLabel(order.orderType)} - ${order.twid || "No TempWorks ID"} - ${order.clientName || "Unknown Client"}`;
  const payLines = [
    `Pay Structure: ${order.financial.payStructure || "single"}`,
    `Input Mode: ${order.financial.inputMode || "bill"}`,
  ];
  if (order.financial.payStructure === "single") {
    payLines.push(
      `Pay Rate: ${order.financial.payRate ? `$${order.financial.payRate.toFixed(2)}` : "-"}`,
      `Bill Rate: ${order.financial.billRate ? `$${order.financial.billRate.toFixed(2)}` : "-"}`,
      `Markup: ${order.financial.markupMultiplier || "-"}`
    );
  }
  if (order.financial.payStructure === "range") {
    payLines.push(
      `Pay Range: ${order.financial.minPayRate ? `$${order.financial.minPayRate.toFixed(2)}` : "-"} to ${order.financial.maxPayRate ? `$${order.financial.maxPayRate.toFixed(2)}` : "-"}`,
      `Bill Range: ${order.financial.minBillRate ? `$${order.financial.minBillRate.toFixed(2)}` : "-"} to ${order.financial.maxBillRate ? `$${order.financial.maxBillRate.toFixed(2)}` : "-"}`
    );
  }
  if (order.financial.payStructure === "multiple") {
    payLines.push(`Variable Pay Notes: ${order.financial.variablePayDescription || "-"}`);
    (order.financial.variableRates || []).forEach((rate, idx) => {
      payLines.push(`Rate Option ${idx + 1}: ${rate.label || "(no label)"} | Pay ${rate.payRate ? `$${rate.payRate.toFixed(2)}` : "-"} | Bill ${rate.billRate ? `$${rate.billRate.toFixed(2)}` : "-"} | Markup ${rate.markupMultiplier || "-"}`);
    });
  }
  payLines.push(`PO Number: ${order.financial.poNumber || "-"}`);
  payLines.push(`Other Compensation: ${order.otherCompensation.enabled ? (order.otherCompensation.details || "Yes") : "No"}`);

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
    "Pay Details:",
    ...payLines,
    "",
    "Copy/Paste Fields:",
    `Order Type Choice: ${orderTypeSubjectLabel(order.orderType)}`,
    `TempWorks ID: ${order.twid || "-"}`,
    `Client Name: ${order.clientName || "-"}`,
    `Project Name: ${order.projectName || "-"}`,
    `Job Site: ${order.jobSite.formattedAddress || order.jobSite.address || "-"}`,
    `Primary Contact: ${order.contacts.primary.name || "-"}`,
    `Primary Email: ${order.contacts.primary.email || "-"}`,
    `Primary Phone: ${order.contacts.primary.phone || "-"}`,
    "",
    "Labor Positions:",
    laborSummary || "-",
    "",
    `Primary Contact: ${order.contacts.primary.name || "-"} | ${order.contacts.primary.email || "-"} | ${order.contacts.primary.phone || "-"}`,
    `Supervisor: ${order.contacts.supervisor.name || "-"} | ${order.contacts.supervisor.email || "-"} | ${order.contacts.supervisor.phone || "-"}`,
    `Timesheet Contact: ${order.contacts.timesheet.name || "-"} (${order.contacts.timesheet.title || "-"}) | ${order.contacts.timesheet.email || "-"} | ${order.contacts.timesheet.phone || "-"}`,
    `General Contractor: ${order.contacts.generalContractor.name || "-"} (${order.contacts.generalContractor.title || "-"}) | ${order.contacts.generalContractor.email || "-"} | ${order.contacts.generalContractor.phone || "-"}`,
    `Accounting Contact: ${order.contacts.accounting.name || "-"} (${order.contacts.accounting.title || "-"}) | ${order.contacts.accounting.email || "-"} | ${order.contacts.accounting.phone || "-"}`,
    `Safety Contact: ${order.contacts.safety.name || "-"} (${order.contacts.safety.title || "-"}) | ${order.contacts.safety.email || "-"} | ${order.contacts.safety.phone || "-"}`,
    `Other Contact: ${order.contacts.otherContact.name || "-"} (${order.contacts.otherContact.title || "-"}) | ${order.contacts.otherContact.email || "-"} | ${order.contacts.otherContact.phone || "-"}`,
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

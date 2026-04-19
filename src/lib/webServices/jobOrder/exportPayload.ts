import type { JobOrder } from "./types";

export type ExportFieldType = "string" | "number" | "boolean";

export type JobOrderExportPayload = {
  submissionId: string;
  submittedAt: string;
  subject: string;
  orderId: string;
  createdAt: string;
  orderType: string;
  clientName: string;
  twid: string;
  projectName: string;
  startDate: string;
  endDate: string;
  jobSiteAddress: string;
  jobSiteCity: string;
  jobSiteState: string;
  jobSiteZip: string;
  primaryContactName: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  supervisorName: string;
  supervisorPhone: string;
  supervisorEmail: string;
  salesTeamMember: string;
  branch: string;
  payStructure: string;
  inputMode: string;
  payRate: number | null;
  billRate: number | null;
  markupMultiplier: number | null;
  minPayRate: number | null;
  maxPayRate: number | null;
  minBillRate: number | null;
  maxBillRate: number | null;
  poNumber: string;
  otherCompEnabled: boolean;
  otherCompDetails: string;
  perDiemEnabled: boolean;
  perDiemAmount: number | null;
  perDiemDays: number | null;
  travelPayEnabled: boolean;
  travelPayAmount: number | null;
  drugScreenRequired: boolean;
  drugScreenType: string;
  backgroundRequired: boolean;
  badgingRequired: boolean;
  cipWrapEnabled: boolean;
  wrapTypeOcIp: boolean;
  wrapTypeCcIp: boolean;
  wrapTypeRoCip: boolean;
  prevailingWageEnabled: boolean;
  certifiedPayrollRequired: boolean;
  wageDeterminationAttached: boolean;
  fringeEnabled: boolean;
  pdfFileName: string;
  pdfMimeType: string;
  pdfStorageUrl: string;
  submitStatus: string;
  submitError: string;
  payloadVersion: string;
  laborPositionsJson: string;
  variableRatesJson: string;
  scheduleDaysJson: string;
  shiftTypesJson: string;
  pdfBase64: string;
};

export const JOB_ORDER_EXPORT_SCHEMA: Record<keyof JobOrderExportPayload, ExportFieldType> = {
  submissionId: "string",
  submittedAt: "string",
  subject: "string",
  orderId: "string",
  createdAt: "string",
  orderType: "string",
  clientName: "string",
  twid: "string",
  projectName: "string",
  startDate: "string",
  endDate: "string",
  jobSiteAddress: "string",
  jobSiteCity: "string",
  jobSiteState: "string",
  jobSiteZip: "string",
  primaryContactName: "string",
  primaryContactPhone: "string",
  primaryContactEmail: "string",
  supervisorName: "string",
  supervisorPhone: "string",
  supervisorEmail: "string",
  salesTeamMember: "string",
  branch: "string",
  payStructure: "string",
  inputMode: "string",
  payRate: "number",
  billRate: "number",
  markupMultiplier: "number",
  minPayRate: "number",
  maxPayRate: "number",
  minBillRate: "number",
  maxBillRate: "number",
  poNumber: "string",
  otherCompEnabled: "boolean",
  otherCompDetails: "string",
  perDiemEnabled: "boolean",
  perDiemAmount: "number",
  perDiemDays: "number",
  travelPayEnabled: "boolean",
  travelPayAmount: "number",
  drugScreenRequired: "boolean",
  drugScreenType: "string",
  backgroundRequired: "boolean",
  badgingRequired: "boolean",
  cipWrapEnabled: "boolean",
  wrapTypeOcIp: "boolean",
  wrapTypeCcIp: "boolean",
  wrapTypeRoCip: "boolean",
  prevailingWageEnabled: "boolean",
  certifiedPayrollRequired: "boolean",
  wageDeterminationAttached: "boolean",
  fringeEnabled: "boolean",
  pdfFileName: "string",
  pdfMimeType: "string",
  pdfStorageUrl: "string",
  submitStatus: "string",
  submitError: "string",
  payloadVersion: "string",
  laborPositionsJson: "string",
  variableRatesJson: "string",
  scheduleDaysJson: "string",
  shiftTypesJson: "string",
  pdfBase64: "string",
};

export function buildJobOrderExportPayload(
  order: JobOrder,
  params: {
    submissionId: string;
    submittedAt: string;
    subject: string;
    pdfFileName: string;
    pdfMimeType: string;
    pdfBase64: string;
    pdfStorageUrl?: string;
    submitStatus?: string;
    submitError?: string;
    payloadVersion?: string;
  }
): JobOrderExportPayload {
  return {
    submissionId: params.submissionId,
    submittedAt: params.submittedAt,
    subject: params.subject,
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
    pdfFileName: params.pdfFileName,
    pdfMimeType: params.pdfMimeType,
    pdfStorageUrl: params.pdfStorageUrl || "",
    submitStatus: params.submitStatus || "Submitted",
    submitError: params.submitError || "",
    payloadVersion: params.payloadVersion || "v1",
    laborPositionsJson: JSON.stringify(order.laborPositions || []),
    variableRatesJson: JSON.stringify(order.financial.variableRates || []),
    scheduleDaysJson: JSON.stringify(order.scheduleDays || []),
    shiftTypesJson: JSON.stringify(order.shiftTypes || []),
    pdfBase64: params.pdfBase64,
  };
}
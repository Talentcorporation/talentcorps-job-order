import type { JobOrder } from "./types";

export type ExportFieldType = "string" | "number" | "boolean";

export type JobOrderExportPayload = {
  submissionId: string;
  submittedAt: string;
  subject: string;
  recipientEmail: string;
  recipient: string;
  toEmail: string;
  orderId: string;
  createdAt: string;
  orderType: string;
  parentJobOrderId: string;
  existingSiteReference: string;
  changeReason: string;
  isLongTermProject: boolean;
  reviewDateType: string;
  clientName: string;
  twid: string;
  projectName: string;
  startDate: string;
  startDateDescription: string;
  endDate: string;
  endDateDescription: string;
  shiftStart: string;
  shiftEnd: string;
  shiftNotes: string;
  jobSiteAddress: string;
  jobSiteCity: string;
  jobSiteState: string;
  jobSiteZip: string;
  primaryContactName: string;
  primaryContactTitle: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  supervisorName: string;
  supervisorTitle: string;
  supervisorPhone: string;
  supervisorEmail: string;
  timesheetContactName: string;
  timesheetContactTitle: string;
  timesheetContactPhone: string;
  timesheetContactEmail: string;
  generalContractorName: string;
  generalContractorTitle: string;
  generalContractorPhone: string;
  generalContractorEmail: string;
  generalContractorAddress: string;
  accountingContactName: string;
  accountingContactTitle: string;
  accountingContactPhone: string;
  accountingContactEmail: string;
  safetyContactName: string;
  safetyContactTitle: string;
  safetyContactPhone: string;
  safetyContactEmail: string;
  otherContactName: string;
  otherContactTitle: string;
  otherContactPhone: string;
  otherContactEmail: string;
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
  variablePayDescription: string;
  otherCompEnabled: boolean;
  otherCompDetails: string;
  perDiemEnabled: boolean;
  perDiemAmount: number | null;
  perDiemDays: number | null;
  perDiemDetails: string;
  travelPayEnabled: boolean;
  travelPayAmount: number | null;
  travelPayDetails: string;
  drugScreenRequired: boolean;
  drugScreenType: string;
  drugScreenDetails: string;
  backgroundRequired: boolean;
  backgroundYears: string;
  backgroundDetails: string;
  badgingRequired: boolean;
  badgingDetails: string;
  cipWrapEnabled: boolean;
  cipEnrollmentRequired: boolean;
  cipDetails: string;
  cipContactName: string;
  cipContactPhone: string;
  cipContactEmail: string;
  cipPortalInformation: string;
  cipNote: string;
  cipInsuranceCertificateAttached: boolean;
  wrapTypeOcIp: boolean;
  wrapTypeCcIp: boolean;
  wrapTypeRoCip: boolean;
  prevailingWageEnabled: boolean;
  certifiedPayrollRequired: boolean;
  wageDeterminationAttached: boolean;
  prevailingWagePortalInformation: string;
  prevailingWageNote: string;
  prevailingWageContactName: string;
  prevailingWageContactPhone: string;
  prevailingWageContactEmail: string;
  fringeEnabled: boolean;
  fringeDetails: string;
  pdfFileName: string;
  pdfMimeType: string;
  pdfStorageUrl: string;
  submitStatus: string;
  submitError: string;
  payloadVersion: string;
  rawPayloadJson: string;
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
  recipientEmail: "string",
  recipient: "string",
  toEmail: "string",
  orderId: "string",
  createdAt: "string",
  orderType: "string",
  parentJobOrderId: "string",
  existingSiteReference: "string",
  changeReason: "string",
  isLongTermProject: "boolean",
  reviewDateType: "string",
  clientName: "string",
  twid: "string",
  projectName: "string",
  startDate: "string",
  startDateDescription: "string",
  endDate: "string",
  endDateDescription: "string",
  shiftStart: "string",
  shiftEnd: "string",
  shiftNotes: "string",
  jobSiteAddress: "string",
  jobSiteCity: "string",
  jobSiteState: "string",
  jobSiteZip: "string",
  primaryContactName: "string",
  primaryContactTitle: "string",
  primaryContactPhone: "string",
  primaryContactEmail: "string",
  supervisorName: "string",
  supervisorTitle: "string",
  supervisorPhone: "string",
  supervisorEmail: "string",
  timesheetContactName: "string",
  timesheetContactTitle: "string",
  timesheetContactPhone: "string",
  timesheetContactEmail: "string",
  generalContractorName: "string",
  generalContractorTitle: "string",
  generalContractorPhone: "string",
  generalContractorEmail: "string",
  generalContractorAddress: "string",
  accountingContactName: "string",
  accountingContactTitle: "string",
  accountingContactPhone: "string",
  accountingContactEmail: "string",
  safetyContactName: "string",
  safetyContactTitle: "string",
  safetyContactPhone: "string",
  safetyContactEmail: "string",
  otherContactName: "string",
  otherContactTitle: "string",
  otherContactPhone: "string",
  otherContactEmail: "string",
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
  variablePayDescription: "string",
  otherCompEnabled: "boolean",
  otherCompDetails: "string",
  perDiemEnabled: "boolean",
  perDiemAmount: "number",
  perDiemDays: "number",
  perDiemDetails: "string",
  travelPayEnabled: "boolean",
  travelPayAmount: "number",
  travelPayDetails: "string",
  drugScreenRequired: "boolean",
  drugScreenType: "string",
  drugScreenDetails: "string",
  backgroundRequired: "boolean",
  backgroundYears: "string",
  backgroundDetails: "string",
  badgingRequired: "boolean",
  badgingDetails: "string",
  cipWrapEnabled: "boolean",
  cipEnrollmentRequired: "boolean",
  cipDetails: "string",
  cipContactName: "string",
  cipContactPhone: "string",
  cipContactEmail: "string",
  cipPortalInformation: "string",
  cipNote: "string",
  cipInsuranceCertificateAttached: "boolean",
  wrapTypeOcIp: "boolean",
  wrapTypeCcIp: "boolean",
  wrapTypeRoCip: "boolean",
  prevailingWageEnabled: "boolean",
  certifiedPayrollRequired: "boolean",
  wageDeterminationAttached: "boolean",
  prevailingWagePortalInformation: "string",
  prevailingWageNote: "string",
  prevailingWageContactName: "string",
  prevailingWageContactPhone: "string",
  prevailingWageContactEmail: "string",
  fringeEnabled: "boolean",
  fringeDetails: "string",
  pdfFileName: "string",
  pdfMimeType: "string",
  pdfStorageUrl: "string",
  submitStatus: "string",
  submitError: "string",
  payloadVersion: "string",
  rawPayloadJson: "string",
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
    recipientEmail?: string;
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
    recipientEmail: params.recipientEmail || "",
    recipient: params.recipientEmail || "",
    toEmail: params.recipientEmail || "",
    orderId: order.id,
    createdAt: order.createdAt,
    orderType: order.orderType,
    parentJobOrderId: order.parentJobOrderId || "",
    existingSiteReference: order.existingSiteReference || "",
    changeReason: order.changeReason || "",
    isLongTermProject: Boolean(order.isLongTermProject),
    reviewDateType: order.reviewDateType,
    clientName: order.clientName,
    twid: order.twid || "",
    projectName: order.projectName,
    startDate: order.startDate || "",
    startDateDescription: order.startDateDescription || "",
    endDate: order.endDate || "",
    endDateDescription: order.endDateDescription || "",
    shiftStart: order.shiftStart || "",
    shiftEnd: order.shiftEnd || "",
    shiftNotes: order.shiftNotes || "",
    jobSiteAddress: order.jobSite.address,
    jobSiteCity: order.jobSite.city,
    jobSiteState: order.jobSite.state,
    jobSiteZip: order.jobSite.zip,
    primaryContactName: order.contacts.primary.name,
    primaryContactTitle: order.contacts.primary.title || "",
    primaryContactPhone: order.contacts.primary.phone,
    primaryContactEmail: order.contacts.primary.email,
    supervisorName: order.contacts.supervisor.name,
    supervisorTitle: order.contacts.supervisor.title || "",
    supervisorPhone: order.contacts.supervisor.phone,
    supervisorEmail: order.contacts.supervisor.email,
    timesheetContactName: order.contacts.timesheet.name,
    timesheetContactTitle: order.contacts.timesheet.title || "",
    timesheetContactPhone: order.contacts.timesheet.phone,
    timesheetContactEmail: order.contacts.timesheet.email,
    generalContractorName: order.contacts.generalContractor.name,
    generalContractorTitle: order.contacts.generalContractor.title || "",
    generalContractorPhone: order.contacts.generalContractor.phone,
    generalContractorEmail: order.contacts.generalContractor.email,
    generalContractorAddress: order.contacts.gcAddress || "",
    accountingContactName: order.contacts.accounting.name,
    accountingContactTitle: order.contacts.accounting.title || "",
    accountingContactPhone: order.contacts.accounting.phone,
    accountingContactEmail: order.contacts.accounting.email,
    safetyContactName: order.contacts.safety.name,
    safetyContactTitle: order.contacts.safety.title || "",
    safetyContactPhone: order.contacts.safety.phone,
    safetyContactEmail: order.contacts.safety.email,
    otherContactName: order.contacts.otherContact.name,
    otherContactTitle: order.contacts.otherContact.title || "",
    otherContactPhone: order.contacts.otherContact.phone,
    otherContactEmail: order.contacts.otherContact.email,
    salesTeamMember: order.internal.salesTeamMember,
    branch: order.internal.branch,
    payStructure: order.financial.payStructure,
    inputMode: order.financial.inputMode,
    payRate: order.financial.payRate ?? 0,
    billRate: order.financial.billRate ?? 0,
    markupMultiplier: order.financial.markupMultiplier ?? 0,
    minPayRate: order.financial.minPayRate ?? 0,
    maxPayRate: order.financial.maxPayRate ?? 0,
    minBillRate: order.financial.minBillRate ?? 0,
    maxBillRate: order.financial.maxBillRate ?? 0,
    poNumber: order.financial.poNumber || "",
    variablePayDescription: order.financial.variablePayDescription || "",
    otherCompEnabled: Boolean(order.otherCompensation.enabled),
    otherCompDetails: order.otherCompensation.details || "",
    perDiemEnabled: Boolean(order.perDiem.enabled),
    perDiemAmount: order.perDiem.amount ?? 0,
    perDiemDays: order.perDiem.days ?? 0,
    perDiemDetails: order.perDiem.details || "",
    travelPayEnabled: Boolean(order.travelPay.enabled),
    travelPayAmount: order.travelPay.amount ?? 0,
    travelPayDetails: order.travelPay.details || "",
    drugScreenRequired: Boolean(order.onboarding.drugScreenRequired),
    drugScreenType: order.onboarding.drugScreenType || "",
    drugScreenDetails: order.onboarding.drugScreenDetails || "",
    backgroundRequired: Boolean(order.onboarding.backgroundRequired),
    backgroundYears: order.onboarding.backgroundYears || "",
    backgroundDetails: order.onboarding.backgroundDetails || "",
    badgingRequired: Boolean(order.onboarding.badgingRequired),
    badgingDetails: order.onboarding.badgingDetails || "",
    cipWrapEnabled: Boolean(order.compliance.cipWrap.enabled),
    cipEnrollmentRequired: Boolean(order.compliance.cipWrap.enrollmentRequired),
    cipDetails: order.compliance.cipWrap.details || "",
    cipContactName: order.compliance.cipWrap.contact?.name || "",
    cipContactPhone: order.compliance.cipWrap.contact?.phone || "",
    cipContactEmail: order.compliance.cipWrap.contact?.email || "",
    cipPortalInformation: order.compliance.cipWrap.portalInformation || "",
    cipNote: order.compliance.cipWrap.note || "",
    cipInsuranceCertificateAttached: Boolean(order.compliance.cipWrap.insuranceCertificateAttached),
    wrapTypeOcIp: Boolean(order.compliance.cipWrap.wrapTypes?.ocip),
    wrapTypeCcIp: Boolean(order.compliance.cipWrap.wrapTypes?.ccip),
    wrapTypeRoCip: Boolean(order.compliance.cipWrap.wrapTypes?.rocip),
    prevailingWageEnabled: Boolean(order.compliance.prevailingWage.enabled),
    certifiedPayrollRequired: Boolean(order.compliance.prevailingWage.certifiedPayrollRequired),
    wageDeterminationAttached: Boolean(order.compliance.prevailingWage.wageDeterminationAttached),
    prevailingWagePortalInformation: order.compliance.prevailingWage.portalInformation || "",
    prevailingWageNote: order.compliance.prevailingWage.wageDeterminationNotes || "",
    prevailingWageContactName: order.compliance.prevailingWage.reportingContact?.name || "",
    prevailingWageContactPhone: order.compliance.prevailingWage.reportingContact?.phone || "",
    prevailingWageContactEmail: order.compliance.prevailingWage.reportingContact?.email || "",
    fringeEnabled: Boolean(order.compliance.fringe.enabled),
    fringeDetails: order.compliance.fringe.details || "",
    pdfFileName: params.pdfFileName,
    pdfMimeType: params.pdfMimeType,
    pdfStorageUrl: params.pdfStorageUrl || "",
    submitStatus: params.submitStatus || "Submitted",
    submitError: params.submitError || "",
    payloadVersion: params.payloadVersion || "v1",
    rawPayloadJson: JSON.stringify(order),
    laborPositionsJson: JSON.stringify(order.laborPositions || []),
    variableRatesJson: JSON.stringify(order.financial.variableRates || []),
    scheduleDaysJson: JSON.stringify(order.scheduleDays || []),
    shiftTypesJson: JSON.stringify(order.shiftTypes || []),
    pdfBase64: params.pdfBase64,
  };
}
import { JobOrderFormWizard } from "./lib/webServices/JobOrderFormWizard";
import { submitJobOrder } from "./lib/webServices/jobOrder/api";
import type { JobOrder } from "./lib/webServices/jobOrder/types";

type UploadState = {
  wageSheet?: File | null;
  cipDocument?: File | null;
  cipInsuranceCertificate?: File | null;
  supplemental?: File | null;
  generatedPdf?: File | null;
};

export default function App() {
  const handleSubmit = async (order: JobOrder, uploads: UploadState) => {
    try {
      const result = await submitJobOrder(order, uploads);
      console.log("[Job Order Automated Submit]", result);
      window.alert(`Submitted successfully to automated flow. Submission ID: ${result.submissionId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown submit error.";
      console.error("[Job Order Submit Failed]", error);
      window.alert(`Submit failed: ${message}`);
      throw error;
    }
  };

  return (
    <main className="crm-page">
      <div className="crm-wrap">
        <JobOrderFormWizard
          onBack={() => {
            window.alert("Back to Forms is not wired in standalone mode.");
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}

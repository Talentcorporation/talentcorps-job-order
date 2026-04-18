import { JobOrderFormWizard } from "./lib/webServices/JobOrderFormWizard";
import { submitJobOrder } from "./lib/webServices/jobOrder/api";
import type { JobOrder } from "./lib/webServices/jobOrder/types";

type UploadState = {
  wageSheet?: File | null;
  cipDocument?: File | null;
  supplemental?: File | null;
};

export default function App() {
  const handleSubmit = async (order: JobOrder, uploads: UploadState) => {
    const result = await submitJobOrder(order, uploads);
    console.log("[Job Order Email Draft]", result);
    window.alert(`Email draft opened for ${result.recipient}. Submission ID: ${result.submissionId}`);
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

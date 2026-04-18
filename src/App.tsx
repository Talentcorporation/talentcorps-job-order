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
      return result;
    } catch (error) {
      console.error("[Job Order Submit Failed]", error);
      throw error;
    }
  };

  return (
    <main className="crm-page">
      <div className="crm-wrap">
        <JobOrderFormWizard
          onBack={() => {}}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}

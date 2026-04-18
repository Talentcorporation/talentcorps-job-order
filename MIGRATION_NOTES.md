# Migration Notes - TalentCorps Job Order Standalone

## Target Future Integrations

## SharePoint

Planned use:
- Store submission documents (wage sheets, CIP docs, supplemental attachments).
- Store generated PDF outputs for retention and audit.

Recommended approach:
- On submit, upload files to SharePoint document library with folder convention:
  - `JobOrders/<Year>/<SubmissionId>/...`
- Save metadata columns:
  - client name, project, submission id, created date, created by, branch, status.

## Power Automate

Planned use:
- Orchestrate intake workflow after submission.

Recommended flow:
1. Trigger: HTTP request from `submitJobOrder(...)` payload.
2. Validate required fields and attachment references.
3. Persist record to system of record (SharePoint list, Dataverse, or internal API).
4. Send notifications (Sales Ops, Compliance, Field Ops).
5. Return success object with generated `submissionId` and status.

## Company Hosting

Current extraction is Vite static app.

Hosting options:
- Azure Static Web Apps
- SharePoint embedded app page
- Internal reverse-proxy-hosted static site

Requirements for production hosting:
- Configure CORS and HTTPS for API endpoints.
- Configure environment variables per environment.
- Add auth/SSO wrapper if required.
- Add monitoring/logging and error tracing.

## API Wiring Checklist

1. Replace mock submit in `src/lib/webServices/jobOrder/api.ts`.
2. Add authenticated request headers if needed.
3. Define canonical response schema:
   - `{ ok: boolean, submissionId: string, pdfUrl?: string }`
4. Add retry and user-visible failure messages.
5. Add server-side validation parity with front-end validation.

## Data and Compliance Considerations

- Validate retention policy for uploaded compliance files.
- Confirm PII handling and encryption-at-rest.
- Add audit trail (who submitted, when, from where).
- Define lifecycle states: draft, submitted, in review, approved, rejected.

## Deployment Notes

- Build command: `npm run build`
- Static output folder: `dist/`
- Ensure `/assets/*` paths are preserved by hosting platform.

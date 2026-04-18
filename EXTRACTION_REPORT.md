# Extraction Report - TalentCorps Job Order Standalone

## Extracted Files

- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `README.md`
- `MIGRATION_NOTES.md`
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/App.css`
- `src/vite-env.d.ts`
- `src/lib/webServices/JobOrderFormWizard.tsx`
- `src/lib/webServices/jobOrder/types.ts`
- `src/lib/webServices/jobOrder/validation.ts`
- `src/lib/webServices/jobOrder/api.ts` (mock/stub version)
- `public/assets/tc-logo.png`
- `public/assets/company-logo.svg`

## Removed/Excluded Files

The following were intentionally excluded from this standalone package:

- Entire CRM shell and routing:
  - `src/AnchorApp.tsx`
  - `src/App.tsx` (original CRM app)
  - all non-Job-Order page routes/components
- Non-Job-Order business logic:
  - `src/lib/api.ts`
  - `src/lib/supabase*`
  - coaching, lead management, org/status, reports, ticker, docs modules
- All backend/worker deployment and production scripts:
  - `scripts/*`
  - worker-specific deploy/preflight/verify scripts
- Build artifacts and app bundles from main app:
  - `public/assets/index-*.js`
  - `public/assets/index-*.css`
- Project documentation unrelated to Job Order extraction:
  - root docs, migration handoff docs, architecture notes
- Credentials/config not safe for sharing:
  - all `.env*` files
  - private key files
  - tokens/secrets/service account credentials

## Mocked Integrations

- `submitJobOrder(...)`: mocked response with fake `submissionId`
- `generateJobOrderPdf(...)`: remote/server PDF generation disabled
- `geocodeAddress(...)`: no backend endpoint usage; browser geocoder only if available

## Missing Dependencies / Blockers

- No blockers found.
- Build validated successfully with:
  - `npm run build`

## Final Standalone Folder Structure

```text
standalone/talentcorps-job-order/
  README.md
  MIGRATION_NOTES.md
  EXTRACTION_REPORT.md
  index.html
  package.json
  package-lock.json
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
  public/
    assets/
      company-logo.svg
      tc-logo.png
  src/
    App.tsx
    App.css
    index.css
    main.tsx
    vite-env.d.ts
    lib/
      webServices/
        JobOrderFormWizard.tsx
        jobOrder/
          api.ts
          types.ts
          validation.ts
```

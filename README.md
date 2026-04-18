# TalentCorps Job Order Standalone Extraction

This package is a standalone extraction of the TalentCorps Job Order page from the main CRM repository.

## Purpose

- Share the Job Order UI and flow with external developers.
- Run locally without the full CRM app.
- Avoid exposing production integrations and credentials.

## Install and Run

1. Open a terminal in this folder.
2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

For phone/device testing on your network + Cloudflare tunnel, use:

```bash
npm run dev:host
```

4. Build production bundle:

```bash
npm run build
```

## Entry File

- Main entry: `src/main.tsx`
- App shell: `src/App.tsx`
- Job Order page: `src/lib/webServices/JobOrderFormWizard.tsx`

## Included Dependencies

Runtime dependencies:
- `react`
- `react-dom`
- `pdf-lib`

Dev dependencies:
- `vite`
- `@vitejs/plugin-react`
- `typescript`
- `@types/react`
- `@types/react-dom`

## What Is Mocked

In `src/lib/webServices/jobOrder/api.ts`:

- `submitJobOrder(...)` opens a prefilled email draft to `orders@talentcorp.com` using `mailto:`.
  - Attachments cannot be auto-attached through `mailto:` and must be attached manually before sending.
- `generateJobOrderPdf(...)` is intentionally disabled for remote mode.
  - The page still generates a local PDF in-browser using `pdf-lib`.
- `geocodeAddress(...)` does not call backend APIs.
  - It uses Google Maps Geocoder only if loaded in browser.

## What IT Needs to Rewire (TalentCorps Environment)

1. Submission endpoint:
- Replace `mailto:` submission in `submitJobOrder(...)` with a real API/Power Automate trigger for automatic emailing and file handling.

2. Remote PDF endpoint (optional):
- Replace `generateJobOrderPdf(...)` if server-side PDF rendering is required.

3. Address geocoding fallback:
- Optionally add a secure server-side geocode endpoint for reliability and quota control.

4. Branding/assets:
- Confirm final logo and hero assets in `public/assets`.

5. Environment configuration:
- `VITE_GOOGLE_PLACES_API_KEY` is optional in standalone mode.
- Without it, manual address entry still works and autocomplete is skipped.
- If your environment uses `VITE_GOOGLE_MAPS_API_KEY`, that key is also supported.

## Security Notes

- No `.env` files are included.
- No service account keys, tokens, or production credentials are included.
- Do not commit credentials into this package.

## Cloudflare Tunnel For Mobile QA

Use this to test on phones before publishing.

1. Install Cloudflare Tunnel client:

```bash
brew install cloudflared
```

2. Start the app (terminal 1):

```bash
npm run dev:host
```

3. Start tunnel (terminal 2):

```bash
npm run tunnel
```

4. Open the `https://...trycloudflare.com` URL shown by Cloudflare on your phone.

Notes:
- Keep both terminals running while testing.
- If Google Places key restrictions are set to localhost only, autocomplete may not work on the tunnel URL until referrers are updated.

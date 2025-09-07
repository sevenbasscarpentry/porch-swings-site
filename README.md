# Seven Bass — v10 (lighter teal theme + gallery fix + admin diagnostics)

## Deploy steps
1) Copy all files to your repo root and push to Netlify.
2) **Add environment variables** (Netlify → Site settings → Environment variables):
   - `FORMS_SITE_ID` = your Netlify **Site ID** (looks like `77a3947f-32c7-49bc-bd83-c1db65128431`).  
     Find it in **Site settings → Site details → Site information**.
   - `FORMS_ACCESS_TOKEN` = a **Personal Access Token** with `read:forms` scope.
     - Create one: Netlify (top-right avatar) → **User settings** → **Applications** → **Personal access tokens** → **New access token** → check **read:forms** → copy the token.
     - Paste the token string as the value of `FORMS_ACCESS_TOKEN`.
3) Turn on **reCAPTCHA v2**: Site settings → **Forms** → **reCAPTCHA** → Enable.
4) Change admin password: edit `_headers` (`Basic-Auth: sevenbass:change-me`).

## Routes
- `/` — Home (lighter green/blue palette)
- `/gallery` or `/gallery/` — Fixed gallery (no horizontal scroll)
- `/admin/submissions.html` — Internal table + CSV (requires env vars above)

If `/admin/submissions.html` shows an error, the function now returns diagnostic flags `hasToken` and `hasSiteId` to help pinpoint which env var is missing.

— Generated 2025-09-07

# Seven Bass — v9 (gaplumber-inspired + fixes)

### What changed
- New clean theme similar to **gaplumber**.
- **Gallery route fixed** — lives at `/gallery/index.html` so `/gallery` works.
- Contact form keeps **reCAPTCHA** and Netlify Forms.
- Admin submissions page shows clear errors from the function (instead of generic "500").

### Deploy
1) Copy files to repo root and push. Netlify auto-deploys.
2) Set env vars in Netlify → *Site settings → Environment variables*:
   - `FORMS_ACCESS_TOKEN` — Netlify Personal Access Token (scope: `read:forms`).
   - `FORMS_SITE_ID` — your site ID (Site settings → Site details).
3) Enable **reCAPTCHA** in Netlify → *Site settings → Forms → reCAPTCHA* (v2).
4) Update `_headers` to change admin password (default `sevenbass:change-me`).

### Internal submissions
- Visit `/admin/submissions.html`. If you still see a 500, the page now shows the **exact reason** (usually missing env vars).

— Generated: 2025-09-07

# Seven Bass — v8 (Forms email + reCAPTCHA + internal submissions)

## What’s new
- **reCAPTCHA** enabled on your contact form (`index.html`) and test page (`/form-test.html`).
- **Internal submissions page** at `/admin/submissions.html` (password-protected) that lists all Netlify `quote` form submissions in a table and lets you download CSV.
- **Netlify Function** `/.netlify/functions/list-submissions` fetches submissions securely using a server-side token.

## Deploy
1) Copy everything into your repo root (`porch-swings-site`) and push. Netlify will deploy and detect the function.
2) In Netlify → **Site settings → Environment variables**, add:
   - `FORMS_ACCESS_TOKEN` = your Netlify **personal access token** (scopes: `read:forms`).
   - `FORMS_SITE_ID` = your site ID (find it in **Site settings → Site details**).
3) In Netlify → **Site settings → Forms → reCAPTCHA**, enable reCAPTCHA (v2). Your pages include `<div data-netlify-recaptcha="true">` already.
4) In **Forms → quote → Notifications**, add an **Email** notification to `sevenbasscarpentry@gmail.com` (if you haven’t already).

## Accessing the submissions list
- Visit: `https://YOURDOMAIN/admin/submissions.html`
- You’ll be prompted for Basic Auth credentials (from `_headers`). Default (CHANGE THESE):
  - **Username:** `sevenbass`
  - **Password:** `change-me`
- To change the password, edit the `_headers` file in the repo:
```
/admin/*
  Basic-Auth: youruser:yourpass
```
(You can also manage passwords in Netlify UI → Site configuration → Access control.)

## Notes
- The function calls the Netlify API:
  - `GET /api/v1/sites/{FORMS_SITE_ID}/forms` → finds the **quote** form
  - `GET /api/v1/forms/{form_id}/submissions?per_page=500` → fetches submissions
- Data returned: `created_at, name, email, phone, city, message` (based on your form fields).

## Testing
- Go to `/form-test.html`, submit a test entry (reCAPTCHA enabled).
- Check **Netlify → Forms → Submissions** and your email notifications.
- Visit `/admin/submissions.html` to see the table and **Download CSV**.

— Last updated: 2025-09-07

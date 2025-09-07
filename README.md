# Seven Bass — v12 (Gallery auto-loads from GitHub)

**What changed**
- Gallery now pulls every image from your GitHub repo’s **assets/** folder via the GitHub API and shows them automatically.
- Keeps lighter teal theme, reviews slider, dynamic year footer, external links open in new tab.
- Forms + reCAPTCHA and admin submissions function unchanged.

**How to add photos**
- Commit any .jpg/.jpeg/.png/.webp to `assets/` (avoid names starting with logo/hero). Refresh `/gallery` — images will appear.

**Admin env vars (unchanged)**
- `FORMS_SITE_ID` (Site ID / UUID)
- `FORMS_ACCESS_TOKEN` (Personal Access Token with `read:forms`)

Generated 2025-09-07

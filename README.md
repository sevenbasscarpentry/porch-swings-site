# Seven Bass Carpentry — Porch Swings Site

Static site ready for Netlify (no build step).

## File structure
```
/ (root)
├─ index.html
└─ assets/
   ├─ logo.svg
   ├─ hero.webp            # optional — your hero image
   ├─ gallery-01.webp      # upload your 10 images as webp
   ├─ gallery-02.webp
   ├─ ...
   └─ gallery-10.webp
```

## Deploy on Netlify (no commands)
1. Netlify → **Sites** → **Add new** → **Deploy manually** (Drag & Drop).
2. Drag this folder (or the provided zip) into the drop zone.

## Connect your GitHub
- Upload these files to: https://github.com/sevenbasscarpentry/porch-swings-site
- In Netlify: **Add new site → Import from Git** → choose your repo.
- Build command: _(leave blank)_. Publish directory: `/`.

## Add your images
- Convert to `.webp` at ~1600px wide (use squoosh.app).
- Upload as: `assets/hero.webp` and `assets/gallery-01.webp` … `assets/gallery-10.webp`.
- The HTML uses `<picture>` so your local images override the placeholder Unsplash URLs automatically.

## Make form submissions go to Gmail
This site uses **Netlify Forms** (no backend). To forward to **sevenbasscarpentry@gmail.com**:
1. Netlify → your site → **Forms** → **Form notifications**.
2. Add **Email notification** for form **`quote`**, recipient `sevenbasscarpentry@gmail.com`.

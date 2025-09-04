# Seven Bass Carpentry — Minimal Portfolio v6 (Crate-inspired)

Files
- `index.html` — Homepage with clean header (Gallery link), hero, story, process, and Netlify form. Footer remains **© 2024**.
- `gallery.html` — **Vertical** gallery (no horizontal overflow) using a tidy grid. Each card uses a fixed **3:2 aspect ratio** to prevent tall images. Click a card to update the Details panel.
- `success.html` — Thank-you page for Netlify Forms.
- `assets/styles.css` — Shared stylesheet that gives the whole site a minimalist portfolio look.

Image paths expected
- `/assets/logo5_stamp.png` (or `.svg` fallback)
- `/assets/hero.webp`
- `/assets/OurStory.webp`
- `/assets/gallery-01.webp` … `/assets/gallery-14.webp`

Deploy
- Drop these files into your GitHub repo root (`porch-swings-site`) and push. Netlify will auto-deploy.
- Or drag-and-drop the zip into Netlify → **Deploys** → **Upload deploy**.

Customize
- Edit the gallery data inside `<script id="gallery-data">` in `gallery.html` if you want per-image metadata.

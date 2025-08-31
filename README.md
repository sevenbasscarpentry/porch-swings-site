# Seven Bass Carpentry — Fixed Site (Full Content)

This build restores the full homepage sections and wires the logo + images to your `/assets` folder.

## Expected assets (place in /assets)
- logo5_stamp.png                  # your chosen logo
- hero.webp                         # hero image
- gallery-01.webp ... gallery-14.webp  # 14 gallery images

> If an asset is missing at deploy time, the page falls back to an Unsplash placeholder so nothing breaks.
> Once your files exist in /assets (Git or zip), they are preferred automatically.

## Netlify Forms
- Form posts to `/success.html` to avoid 404 after submit.
- In Netlify → Forms → Notifications, add Email → `sevenbasscarpentry@gmail.com`.

## Deploy
- Netlify → Sites → Add new → Deploy manually → drag this zip.
- Or push the contents to your GitHub repo and use Import from Git (no build step needed).

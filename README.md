# Seven Bass Carpentry — Site v3 (mobile nav + reviews + story image)

What changed
- Mobile navigation added (hamburger on small screens).
- Logo now tries PNG → SVG → WEBP and falls back to text if not found.
- Story image points to `/assets/OurStory.webp` (with a placeholder fallback).
- New Reviews section with horizontal slider and buttons; link to Facebook reviews.
- Netlify Forms posts to `/success.html` (avoids 404).

Assets expected in /assets
- logo5_stamp.png (preferred) or logo5_stamp.svg or logo5_stamp.webp
- OurStory.webp
- hero.webp
- gallery-01.webp ... gallery-14.webp

Deploy
- Drag the zip into Netlify (manual deploy), or commit files to GitHub and let Netlify auto-deploy.

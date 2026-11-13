# ToolMaan

A responsive browser-first online tools platform built with React, Vite and JavaScript.

## Requirements
- Node.js 20.19+ or 22.12+
- npm 10+

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The production site is generated in `dist/`.

## Deployment
Deploy the contents of `dist/` to any static host. Configure SPA fallback so unknown file paths are served through `/index.html` (Netlify `_redirects` and Vercel `vercel.json` are included). Set `VITE_SITE_URL` to the canonical production origin before building.

## Implemented
- Responsive homepage, category directory, global tool search, light/dark theme, favorites-ready browser architecture, breadcrumbs and custom 404.
- Image compression/resizing and JPG/PNG/WebP conversion using the browser canvas API (20 MB input limit).
- PDF merge, split, page extraction and images-to-PDF using pdf-lib. PDF-to-Images is listed but explicitly unavailable in this release.
- Word/character counts, case conversion, whitespace cleanup, text reversal and simple line-position diff.
- JSON format/validation, HTML formatting, CSS minification, JS minification, Base64 and URL encoding/decoding, UUID.
- QR generation, password generation using `crypto.getRandomValues`, random numbers, Lorem Ipsum, color picker and CSS gradient preview.
- Legal information pages, contact form validation, metadata baseline, environment example.

## Known limitations / production tasks
- PDF-to-images is listed in the directory but the current PDF action does not render page previews; implement PDF.js rendering before advertising this feature as available. The UI currently creates PDFs only for merge, split, page extraction and images-to-PDF.
- PDF files are subject to browser memory and pdf-lib compatibility limits; encrypted or malformed PDFs may fail.
- Image animated GIFs are flattened to a still frame. Transparency is not preserved when converting to JPEG.
- HTML formatter uses Prettier's HTML parser. CSS minification is a compacting pass, not an advanced optimizer. JS minification uses Terser.
- Text diff currently reports line differences by position; it is not a full visual diff algorithm.
- The contact form deliberately does not fake delivery. Configure a server-side endpoint and connect it before accepting messages. No backend or database is included because core tools run client-side.
- Favorites and recently used history are not included in this starter release. Theme preference is stored locally. No sensitive file or generated password data is stored.
- Add a real cookie-consent platform only if analytics/advertising are enabled and applicable consent is required.
- Add canonical URLs, Open Graph tags, sitemap.xml and robots.txt for the production domain before launch. Update the legal pages to match any analytics, ads, hosting logs or server-side processing that you actually enable.
- Google Fonts are loaded remotely; replace with self-hosted fonts if strict offline behavior is required.
- Run cross-browser, screen-reader, security and device testing before production launch. No Google AdSense approval or search ranking is guaranteed.

## Environment variables
See `.env.example`. `VITE_CONTACT_ENDPOINT` is a client-visible URL only; never put secrets in `VITE_*` variables. A real contact handler must validate and rate-limit requests on the server.

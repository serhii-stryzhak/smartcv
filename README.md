# SmartCV

A minimalist resume website that looks exactly like its PDF export.

## Why?

I needed a resume. But I didn't want to maintain two versions — one for the web, one for PDF. So I built this: a single-page resume site where clicking "Download PDF" gives you an identical copy.

The twist? It uses **Islands Architecture**: React builds the HTML at compile time, but the browser only loads ~1KB of JavaScript (just enough for the download button). No React runtime, no hydration, no bloat.

## Quick Start

```bash
npm install
cp src/data/resume-data.example.json src/data/resume-data.json
# Edit resume-data.json with your info
npm run build
```

Your resume is now in `dist/`.

## Tech Choices

- **React** — but only at build time
- **Tailwind CSS** — dark theme, mobile-first
- **Puppeteer** — renders the page to PDF server-side
- **~29KB total** — HTML + CSS + tiny JS

## Docker

```bash
docker compose up --build
```

Frontend at `:3000/smartcv`, API generates PDFs at `:3001`.

## Why Islands Architecture?

Because shipping 150KB of React to display static text felt wrong. The page is literally just text and a button. React is great for building it — not for running it.

---

_Built as a portfolio piece to demonstrate that sometimes the best code is the code you don't ship._

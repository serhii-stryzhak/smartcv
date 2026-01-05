import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { App } from './App';
import { loadResumeData } from './utils/validate';

const DIST_DIR = resolve(process.cwd(), 'dist');

interface PersonalData {
  name: string;
  title: string;
  location: string;
}

const generateHTML = (
  content: string,
  title: string,
  personal: PersonalData
): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${personal.name} - ${personal.title}. Professional resume.">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${personal.name} - ${personal.title}. Professional resume.">
  <meta property="og:type" content="profile">
  <title>${title}</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <script>
    (function() {
      var saved = localStorage.getItem('smartcv-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    })();
  </script>
  <script id="resume-meta" type="application/json">${JSON.stringify(personal)}</script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "${personal.name}",
    "jobTitle": "${personal.title}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${personal.location}"
    }
  }
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  ${content}
  <script src="/theme.js"></script>
  <script src="/download.js"></script>
</body>
</html>`;

const build = async (): Promise<void> => {
  console.warn('Building SmartCV...');

  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true });
  }

  let data;

  try {
    data = await loadResumeData();
  } catch (error) {
    console.error('Failed to load resume data:', error);
    console.warn('Using example data for build...');
    const examplePath = resolve(process.cwd(), 'src/data/resume-data.example.json');
    const exampleData = await import(examplePath);

    data = exampleData.default;
  }

  const appElement = createElement(App, { data });
  const html = renderToString(appElement);
  const title = `${data.personal.name} - ${data.personal.title}`;
  const fullHTML = generateHTML(html, title, {
    name: data.personal.name,
    title: data.personal.title,
    location: data.personal.location,
  });

  const outputPath = resolve(DIST_DIR, 'index.html');

  writeFileSync(outputPath, fullHTML, 'utf-8');

  console.warn(`Generated: ${outputPath}`);
  console.warn('Build complete!');
};

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});

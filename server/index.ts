import express from 'express';
import { resolve } from 'path';
import puppeteer from 'puppeteer';
import type { Browser } from 'puppeteer';

const app = express();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = resolve(process.cwd(), 'dist');

app.use(express.static(STATIC_DIR));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/generate-pdf', async (_req, res) => {
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 800 });

    const url = `http://localhost:${PORT}/`;

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.evaluate(() => {
      const downloadButton = document.getElementById('download-pdf');
      if (downloadButton) {
        downloadButton.style.display = 'none';
      }
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.setHeader('Content-Length', pdf.length);
    res.end(pdf);
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(PORT, () => {
  console.warn(`Server running on http://localhost:${PORT}`);
});

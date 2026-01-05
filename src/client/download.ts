const API_URL = '/api/generate-pdf';
const MAX_RETRIES = 3;
const RETRY_MESSAGES = ['Generating...', 'Hmm, retrying...', 'Almost there...'];
const RETRY_DELAYS = [0, 1000, 2000];

const getFileName = (): string => {
  const metaEl = document.getElementById('resume-meta');

  if (metaEl?.textContent) {
    const { name, title } = JSON.parse(metaEl.textContent);
    const sanitized = `${name}_${title}`.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

    return `${sanitized}_CV.pdf`;
  }

  return 'resume.pdf';
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const fetchPdfWithRetry = async (
  onStatusChange: (message: string) => void,
  attempt = 0
): Promise<Blob | null> => {
  onStatusChange(RETRY_MESSAGES[attempt] || 'Retrying...');

  if (RETRY_DELAYS[attempt]) {
    await delay(RETRY_DELAYS[attempt]);
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error(`PDF generation attempt ${attempt + 1} failed:`, error);

    if (attempt < MAX_RETRIES - 1) {
      return fetchPdfWithRetry(onStatusChange, attempt + 1);
    }

    return null;
  }
};

const showFallbackMessage = (button: HTMLElement): void => {
  const container = button.parentElement;

  if (!container) return;

  button.remove();

  const fallback = document.createElement('div');

  fallback.className = 'text-center text-secondary text-sm leading-relaxed';
  fallback.innerHTML = `
    <p class="mb-2">
      <span class="text-lg">🙈</span> 
      <strong class="text-primary">Oops, PDF generation hit a snag!</strong>
    </p>
    <p>
      No worries — this page works great as a web CV too.<br>
      Share the link directly, or use <strong>Print → Save as PDF</strong> in your browser.
    </p>
  `;

  container.appendChild(fallback);
};

const downloadBlob = (blob: Blob): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = getFileName();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

const initDownload = (): void => {
  const button = document.getElementById('download-pdf');

  if (!button) return;

  button.addEventListener('click', async () => {
    const originalText = button.textContent;

    button.setAttribute('disabled', 'true');

    const updateStatus = (msg: string) => {
      button.textContent = msg;
    };

    const blob = await fetchPdfWithRetry(updateStatus);

    if (blob) {
      downloadBlob(blob);
      button.textContent = originalText;
      button.removeAttribute('disabled');
    } else {
      showFallbackMessage(button);
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDownload);
} else {
  initDownload();
}

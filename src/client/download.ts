const getApiUrl = (): string => '/api/generate-pdf';

const getFileName = (): string => {
  const metaEl = document.getElementById('resume-meta');
  if (metaEl?.textContent) {
    const { name, title } = JSON.parse(metaEl.textContent);
    const sanitized = `${name}_${title}`.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    return `${sanitized}_CV.pdf`;
  }
  return 'resume.pdf';
};

const initDownload = (): void => {
  const button = document.getElementById('download-pdf');
  if (!button) return;

  button.addEventListener('click', async () => {
    const originalText = button.textContent;
    button.textContent = 'Generating...';
    button.setAttribute('disabled', 'true');

    try {
      const response = await fetch(getApiUrl());

      if (!response.ok) {
        throw new Error(`Failed to generate PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = getFileName();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      button.textContent = originalText;
      button.removeAttribute('disabled');
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDownload);
} else {
  initDownload();
}


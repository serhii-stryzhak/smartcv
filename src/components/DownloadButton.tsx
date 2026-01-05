import { Download } from 'lucide-react';

export const DownloadButton = () => (
  <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 no-print">
    <button
      id="download-pdf"
      type="button"
      title="Download CV as PDF"
      aria-label="Download CV as PDF"
      className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
    >
      <Download size={20} aria-hidden="true" />
      <span>Download PDF</span>
    </button>
  </div>
);

import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => (
  <button
    id="theme-toggle"
    type="button"
    title="Toggle theme"
    className="absolute right-0 top-0 p-2 rounded-lg hover:bg-surface hover:rotate-12 transition-all duration-200 no-print"
    aria-label="Toggle theme"
  >
    <Sun id="theme-icon-sun" size={20} className="text-secondary hidden" />
    <Moon id="theme-icon-moon" size={20} className="text-secondary" />
  </button>
);

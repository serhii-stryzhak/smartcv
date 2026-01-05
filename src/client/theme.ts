const STORAGE_KEY = 'smartcv-theme';

type Theme = 'light' | 'dark';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getSavedTheme = (): Theme | null => {
  const saved = localStorage.getItem(STORAGE_KEY);

  return saved === 'light' || saved === 'dark' ? saved : null;
};

const updateIcon = (theme: Theme): void => {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  if (!sunIcon || !moonIcon) return;

  if (theme === 'dark') {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
};

const applyTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  updateIcon(theme);
};

const toggleTheme = (): void => {
  const isDark = document.documentElement.classList.contains('dark');
  const newTheme: Theme = isDark ? 'light' : 'dark';

  localStorage.setItem(STORAGE_KEY, newTheme);
  applyTheme(newTheme);
};

const initTheme = (): void => {
  const savedTheme = getSavedTheme();
  const theme = savedTheme ?? getSystemTheme();

  applyTheme(theme);

  const button = document.getElementById('theme-toggle');

  if (button) {
    button.addEventListener('click', toggleTheme);
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getSavedTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

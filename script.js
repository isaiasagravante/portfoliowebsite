function updateManilaClock() {
  const el = document.getElementById('manila-clock');
  if (!el) return;

  const now = new Date();
  const formatted = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila'
  }).format(now);

  el.textContent = formatted;
}

function applyTheme(theme) {
  const resolved = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = resolved;

  const button = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-toggle-icon');
  if (button) {
    button.setAttribute('aria-pressed', String(resolved === 'dark'));
    button.setAttribute('aria-label', resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (icon) {
    icon.textContent = resolved === 'dark' ? '☼' : '☾';
  }
  localStorage.setItem('theme', resolved);
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  const button = document.getElementById('theme-toggle');
  if (!button) return;

  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

updateManilaClock();
setInterval(updateManilaClock, 1000);
initThemeToggle();

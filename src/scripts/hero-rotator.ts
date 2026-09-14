export function initHeroRotator(root: Document | HTMLElement = document): () => void {
  const rotator = root.querySelector<HTMLElement>('.hero-rotator');
  if (!rotator) return () => {};

  const linesRaw = rotator.dataset.lines;
  if (!linesRaw) return () => {};

  let lines: string[] = [];
  try {
    lines = JSON.parse(linesRaw);
  } catch (err) {
    console.error('Failed to parse hero rotator lines:', err);
    return () => {};
  }

  const lineEl = rotator.querySelector<HTMLElement>('.hero-rotator-line');
  if (!lineEl || lines.length <= 1) return () => {};

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return () => {};
  }

  let currentIndex = 0;
  let enterTimeout: ReturnType<typeof setTimeout> | null = null;
  let cleanupTimeout: ReturnType<typeof setTimeout> | null = null;

  const intervalId = window.setInterval(() => {
    lineEl.classList.add('is-leaving');

    enterTimeout = window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % lines.length;
      lineEl.innerHTML = lines[currentIndex];
      lineEl.classList.remove('is-leaving');
      lineEl.classList.add('is-entering');

      cleanupTimeout = window.setTimeout(() => {
        lineEl.classList.remove('is-entering');
      }, 840);
    }, 760);
  }, 6000);

  return () => {
    window.clearInterval(intervalId);
    if (enterTimeout) window.clearTimeout(enterTimeout);
    if (cleanupTimeout) window.clearTimeout(cleanupTimeout);
  };
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initHeroRotator());
  } else {
    initHeroRotator();
  }
}

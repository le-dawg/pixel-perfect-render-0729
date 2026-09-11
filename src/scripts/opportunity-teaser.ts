const OPEN_CLASS = 'opportunity-teaser-open';
let teaserController: AbortController | null = null;

export function initOpportunityTeaser(root: ParentNode = document): void {
  const teaser = root.querySelector<HTMLElement>('[data-opportunity-teaser]');
  const trigger = root.querySelector<HTMLElement>('[data-opportunity-trigger]');
  const orb = root.querySelector<HTMLElement>('[data-opportunity-orb]');

  if (!teaser || !trigger || !orb || teaser.dataset.bound === 'true') {
    return;
  }

  teaserController?.abort();
  teaserController = new AbortController();
  const { signal } = teaserController;

  teaser.dataset.bound = 'true';

  const setRestingPosition = () => {
    teaser.style.setProperty('--opportunity-shift-x', '0px');
    teaser.style.setProperty('--opportunity-shift-y', '0px');
  };

  const setOpenPosition = () => {
    const rect = orb.getBoundingClientRect();
    const currentCenterX = rect.left + rect.width / 2;
    const currentCenterY = rect.top + rect.height / 2;
    const targetCenterX = window.innerWidth * 0.5;
    const targetCenterY = window.innerHeight * 0.4;
    const shiftX = targetCenterX - currentCenterX;
    const shiftY = targetCenterY - currentCenterY;

    teaser.style.setProperty('--opportunity-shift-x', `${Math.round(shiftX)}px`);
    teaser.style.setProperty('--opportunity-shift-y', `${Math.round(shiftY)}px`);
  };

  const open = () => {
    setOpenPosition();
    teaser.dataset.state = 'open';
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add(OPEN_CLASS);
  };

  const close = () => {
    setRestingPosition();
    teaser.dataset.state = 'idle';
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove(OPEN_CLASS);
  };

  const syncOpenPosition = () => {
    if (document.body.classList.contains(OPEN_CLASS)) {
      setOpenPosition();
    }
  };

  setRestingPosition();

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();

    if (document.body.classList.contains(OPEN_CLASS)) {
      close();
      return;
    }

    open();
  }, { signal });

  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (document.body.classList.contains(OPEN_CLASS)) {
      close();
      return;
    }

    open();
  }, { signal });

  document.addEventListener('click', (event) => {
    if (!document.body.classList.contains(OPEN_CLASS)) {
      return;
    }

    close();
  }, { signal });

  window.addEventListener('resize', syncOpenPosition, { signal });
}

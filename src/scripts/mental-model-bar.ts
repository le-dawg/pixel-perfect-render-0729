const VISITED_COOKIE = 'ppr_visited=1';
const VISITED_COOKIE_WRITE = 'ppr_visited=1; max-age=31536000; path=/; samesite=lax';
const MODAL_OPEN_CLASS = 'mental-model-modal-open';
const REVEAL_DELAY_MS = 10000;
const TOP_THRESHOLD_PX = 64;

let mentalModelController: AbortController | null = null;

export function initMentalModelBar(root: ParentNode = document): void {
  const container = root.querySelector<HTMLElement>('[data-mental-model-root]');
  const trigger = root.querySelector<HTMLButtonElement>('[data-mental-model-trigger]');
  const panelShell = root.querySelector<HTMLElement>('[data-mental-model-panel-shell]');
  const panel = root.querySelector<HTMLElement>('[data-mental-model-panel]');
  const thumbnail = root.querySelector<HTMLButtonElement>('[data-mental-model-thumbnail]');
  const modal = root.querySelector<HTMLElement>('[data-mental-model-modal]');
  const backdrop = root.querySelector<HTMLElement>('[data-mental-model-backdrop]');
  const dialog = root.querySelector<HTMLElement>('[data-mental-model-dialog]');
  const closeButton = root.querySelector<HTMLButtonElement>('[data-mental-model-close]');

  if (
    !container ||
    !trigger ||
    !panelShell ||
    !panel ||
    !thumbnail ||
    !modal ||
    !backdrop ||
    !dialog ||
    !closeButton ||
    container.dataset.bound === 'true'
  ) {
    return;
  }

  mentalModelController?.abort();
  mentalModelController = new AbortController();
  const { signal } = mentalModelController;

  container.dataset.bound = 'true';

  let revealTimeout: number | null = null;
  let revealed = false;
  let lastFocusedTrigger: HTMLButtonElement | null = null;

  const clearRevealTimeout = () => {
    if (revealTimeout !== null) {
      window.clearTimeout(revealTimeout);
      revealTimeout = null;
    }
  };

  const reveal = () => {
    if (revealed) {
      return;
    }

    revealed = true;
    clearRevealTimeout();
    trigger.hidden = false;
    trigger.setAttribute('aria-hidden', 'false');
    trigger.dataset.visible = 'true';
  };

  const syncPanelState = (isOpen: boolean) => {
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    panelShell.dataset.open = isOpen ? 'true' : 'false';
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  };

  const closeModal = () => {
    if (modal.hidden) {
      return;
    }

    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove(MODAL_OPEN_CLASS);
    lastFocusedTrigger?.focus();
  };

  const openModal = () => {
    lastFocusedTrigger = thumbnail;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add(MODAL_OPEN_CLASS);
    closeButton.focus();
  };

  const startRevealTimer = () => {
    if (revealed || revealTimeout !== null) {
      return;
    }

    revealTimeout = window.setTimeout(reveal, REVEAL_DELAY_MS);
  };

  const syncDwellTimer = () => {
    if (revealed) {
      clearRevealTimeout();
      return;
    }

    if (window.scrollY > TOP_THRESHOLD_PX) {
      clearRevealTimeout();
      return;
    }

    startRevealTimer();
  };

  syncPanelState(false);

  if (document.cookie.includes(VISITED_COOKIE)) {
    reveal();
  } else {
    document.cookie = VISITED_COOKIE_WRITE;
    startRevealTimer();
  }

  trigger.addEventListener('click', () => {
    const nextState = trigger.getAttribute('aria-expanded') !== 'true';
    syncPanelState(nextState);
  }, { signal });

  thumbnail.addEventListener('click', openModal, { signal });
  closeButton.addEventListener('click', closeModal, { signal });

  backdrop.addEventListener('click', (event) => {
    if (event.target !== backdrop) {
      return;
    }

    closeModal();
  }, { signal });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    closeModal();
  }, { signal });

  window.addEventListener('scroll', syncDwellTimer, { signal, passive: true });
}

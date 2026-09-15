// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { initMentalModelBar } from '../src/scripts/mental-model-bar';

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
    writable: true,
  });
}

describe('mental model bar behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.cookie = 'ppr_visited=; max-age=0; path=/';
    document.body.className = '';
    document.body.innerHTML = `
      <section data-mental-model-root>
        <button
          type="button"
          data-mental-model-trigger
          data-visible="false"
          aria-controls="mental-model-panel"
          aria-expanded="false"
          aria-hidden="true"
          hidden
        >If you read nothing else: read this</button>
        <div data-mental-model-panel-shell data-open="false">
          <div id="mental-model-panel" data-mental-model-panel aria-hidden="true">
            <button type="button" data-mental-model-thumbnail aria-haspopup="dialog" aria-controls="mental-model-visuals">Thumb</button>
          </div>
        </div>
        <div
          id="mental-model-visuals"
          data-mental-model-modal
          role="dialog"
          aria-modal="true"
          aria-hidden="true"
          hidden
        >
          <div data-mental-model-backdrop>
            <div data-mental-model-dialog>
              <button type="button" data-mental-model-close>Close</button>
            </div>
          </div>
        </div>
      </section>
    `;
    setScrollY(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
    document.body.className = '';
    document.cookie = 'ppr_visited=; max-age=0; path=/';
  });

  test('reveals immediately for returning visitors with the cookie set', () => {
    document.cookie = 'ppr_visited=1; path=/';

    initMentalModelBar(document);

    const trigger = document.querySelector<HTMLButtonElement>('[data-mental-model-trigger]');
    expect(trigger?.hidden).toBe(false);
    expect(trigger?.dataset.visible).toBe('true');
    expect(trigger?.getAttribute('aria-hidden')).toBe('false');
  });

  test('waits ten seconds near the top, and restarts if the visitor scrolls away', () => {
    initMentalModelBar(document);

    const trigger = document.querySelector<HTMLButtonElement>('[data-mental-model-trigger]');
    expect(document.cookie).toContain('ppr_visited=1');

    vi.advanceTimersByTime(6000);
    expect(trigger?.hidden).toBe(true);

    setScrollY(120);
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(5000);
    expect(trigger?.hidden).toBe(true);

    setScrollY(0);
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(9999);
    expect(trigger?.hidden).toBe(true);

    vi.advanceTimersByTime(1);
    expect(trigger?.hidden).toBe(false);
    expect(trigger?.dataset.visible).toBe('true');
  });

  test('toggles the panel and modal, restores focus, and closes the modal on escape', () => {
    initMentalModelBar(document);

    const trigger = document.querySelector<HTMLButtonElement>('[data-mental-model-trigger]');
    const panelShell = document.querySelector<HTMLElement>('[data-mental-model-panel-shell]');
    const panel = document.querySelector<HTMLElement>('[data-mental-model-panel]');
    const thumbnail = document.querySelector<HTMLButtonElement>('[data-mental-model-thumbnail]');
    const modal = document.querySelector<HTMLElement>('[data-mental-model-modal]');
    const closeButton = document.querySelector<HTMLButtonElement>('[data-mental-model-close]');

    vi.advanceTimersByTime(10000);
    trigger?.click();
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    expect(panelShell?.dataset.open).toBe('true');
    expect(panel?.getAttribute('aria-hidden')).toBe('false');

    thumbnail?.click();
    expect(modal?.hidden).toBe(false);
    expect(document.body.classList.contains('mental-model-modal-open')).toBe(true);
    expect(document.activeElement).toBe(closeButton);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(modal?.hidden).toBe(true);
    expect(document.body.classList.contains('mental-model-modal-open')).toBe(false);
    expect(document.activeElement).toBe(thumbnail);

    trigger?.click();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(panelShell?.dataset.open).toBe('false');
    expect(panel?.getAttribute('aria-hidden')).toBe('true');
  });
});

// @vitest-environment jsdom

import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { initHeroRotator } from '../src/scripts/hero-rotator';

describe('hero rotator', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    vi.useFakeTimers();
    container = document.createElement('div');
    container.innerHTML = `
      <h1 id="hero-title">
        <span class="hero-rotator" data-lines='["Line 1","Line 2","Line 3"]'>
          <span class="hero-rotator-line">Line 1</span>
        </span>
      </h1>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  test('rotates to next line after interval when motion is allowed', () => {
    const cleanup = initHeroRotator(container);
    const lineEl = container.querySelector('.hero-rotator-line') as HTMLElement;

    expect(lineEl.textContent).toBe('Line 1');

    // Advance to trigger leaving transition (6000ms)
    vi.advanceTimersByTime(6000);
    expect(lineEl.classList.contains('is-leaving')).toBe(true);

    // Advance past leaving animation (760ms) to swap text and enter
    vi.advanceTimersByTime(760);
    expect(lineEl.textContent).toBe('Line 2');
    expect(lineEl.classList.contains('is-leaving')).toBe(false);
    expect(lineEl.classList.contains('is-entering')).toBe(true);

    // Advance past enter animation (840ms)
    vi.advanceTimersByTime(840);
    expect(lineEl.classList.contains('is-entering')).toBe(false);

    cleanup();
  });

  test('does not rotate if prefers-reduced-motion is true', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));

    const cleanup = initHeroRotator(container);
    const lineEl = container.querySelector('.hero-rotator-line') as HTMLElement;

    vi.advanceTimersByTime(15000);
    expect(lineEl.textContent).toBe('Line 1');
    expect(lineEl.classList.contains('is-leaving')).toBe(false);

    cleanup();
  });
});

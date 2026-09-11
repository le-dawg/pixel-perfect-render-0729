// @vitest-environment jsdom

import { beforeEach, expect, test } from 'vitest';

type TeaserModule = {
  initOpportunityTeaser?: (root?: ParentNode) => void;
};

let initOpportunityTeaser: TeaserModule['initOpportunityTeaser'];

beforeEach(async () => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: 1200,
  });
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: 900,
  });

  document.documentElement.className = '';
  document.body.className = '';
  document.documentElement.removeAttribute('style');
  document.body.removeAttribute('style');

  document.body.innerHTML = `
    <main id="main-content">
      <section>
        <a href="#contact">Primary CTA</a>
      </section>
    </main>
    <div class="opportunity-teaser" data-opportunity-teaser data-state="idle">
      <button
        type="button"
        class="opportunity-teaser-trigger"
        data-opportunity-trigger
        aria-expanded="false"
      >
        <span class="opportunity-teaser-orb" data-opportunity-orb>
          <span data-opportunity-persona></span>
          <span data-opportunity-persona></span>
          <span data-opportunity-persona></span>
          <span data-opportunity-south-gap></span>
        </span>
        <span class="opportunity-teaser-pill">Available soon</span>
      </button>
    </div>
  `;

  const orb = document.querySelector<HTMLElement>('[data-opportunity-orb]');
  if (orb) {
    orb.getBoundingClientRect = () =>
      ({
        x: 1020,
        y: 650,
        width: 120,
        height: 120,
        top: 650,
        right: 1140,
        bottom: 770,
        left: 1020,
        toJSON() {
          return {};
        },
      }) as DOMRect;
  }

  const modulePath = '../src/scripts/opportunity-teaser.ts';
  const module = (await import(/* @vite-ignore */ modulePath).catch(() => null)) as TeaserModule | null;
  initOpportunityTeaser = module?.initOpportunityTeaser;
});

test('clicking the teaser trigger opens the teaser state without disabling scroll', () => {
  expect(typeof initOpportunityTeaser).toBe('function');

  initOpportunityTeaser?.(document);

  const teaser = document.querySelector<HTMLElement>('[data-opportunity-teaser]');
  const trigger = document.querySelector('[data-opportunity-trigger]');
  expect(trigger).not.toBeNull();

  trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(teaser?.dataset.state).toBe('open');
  expect(document.body.classList.contains('opportunity-teaser-open')).toBe(true);
  expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  expect(Number.parseFloat(teaser?.style.getPropertyValue('--opportunity-shift-x') ?? '0')).toBeLessThan(0);
  expect(Number.parseFloat(teaser?.style.getPropertyValue('--opportunity-shift-y') ?? '0')).toBeLessThan(0);
  expect(document.documentElement.style.overflow).toBe('');
  expect(document.body.style.overflow).toBe('');
});

test('clicking away closes the teaser state again and clears its travel hook', () => {
  expect(typeof initOpportunityTeaser).toBe('function');

  initOpportunityTeaser?.(document);

  const teaser = document.querySelector<HTMLElement>('[data-opportunity-teaser]');
  const trigger = document.querySelector('[data-opportunity-trigger]');
  const main = document.querySelector('#main-content');

  trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  main?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(teaser?.dataset.state).toBe('idle');
  expect(document.body.classList.contains('opportunity-teaser-open')).toBe(false);
  expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  expect(teaser?.style.getPropertyValue('--opportunity-shift-x')).toBe('0px');
  expect(teaser?.style.getPropertyValue('--opportunity-shift-y')).toBe('0px');
});

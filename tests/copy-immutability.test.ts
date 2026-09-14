import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), 'utf8');
}

describe('copy immutability', () => {
  it('keeps the hero, proof, method, fit, and contact copy byte-identical', () => {
    const hero = read('../src/components/Hero.astro');
    const links = read('../src/components/ContactLinks.astro');
    const proof = read('../src/components/ProofStrip.astro');
    const method = read('../src/components/HowIWork.astro');
    const fit = read('../src/components/WhoIWorkBestWith.astro');
    const contact = read('../src/components/ContactBand.astro');

    expect(hero).toContain("AI is an amplifier of your processes: better process leads to much better and faster AI ROI.");
    expect(hero).toContain("But you don't have the time to:");
    expect(hero).toContain("You don't have to feel like drowning in an ocean of opportunity.");
    expect(links).toContain("Book a Call");
    expect(links).toContain("Email your challenges ✉️");
    expect(proof).toContain('The six failure points that stall AI integrations in corporates');
    expect(proof).toContain('AI access rarely fails on tooling alone.');
    expect(method).toContain('Diagnosis, scope, delivery.');
    expect(method).toContain('I’ve worked in environments where delivery had to survive real operating constraints');
    expect(fit).toContain('A real initiative, a real owner, and room to execute.');
    expect(contact).toContain('Bring one stuck initiative.');
    expect(contact).toContain('A rough problem statement is enough.');
  });
});

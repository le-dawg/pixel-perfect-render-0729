import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const outDir = '/tmp/0xdawg-diagonal-review';
mkdirSync(outDir, { recursive: true });

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const captures = [
  ['desktop-1440.png', '1440,3200'],
  ['desktop-1600.png', '1600,3200'],
  ['tablet-portrait.png', '820,3200'],
  ['tablet-landscape.png', '1180,3200'],
  ['mobile-390.png', '390,3200'],
  ['mobile-430.png', '430,3200'],
];

for (const [file, size] of captures) {
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--window-size=${size}`,
      `--screenshot=${outDir}/${file}`,
      'http://127.0.0.1:4321/',
    ],
    { stdio: 'inherit' },
  );
}

console.log(`screenshots written to ${outDir}`);

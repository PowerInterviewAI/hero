/**
 * Regenerates every placeholder image referenced by the site.
 *
 * Placeholders exist so the layout is real and nothing shifts on load - each
 * one is rendered at the exact pixel size the markup declares, so swapping in
 * the real asset is a straight file overwrite with no markup change.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * sharp comes in transitively via next; it isn't a direct dependency, so this
 * resolves it from the pnpm store rather than assuming a hoisted node_modules.
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadSharp() {
  try {
    return require('sharp');
  } catch {
    const store = path.join(ROOT, 'node_modules/.pnpm');
    const match = fs.readdirSync(store).find((entry) => entry.startsWith('sharp@'));
    if (!match) throw new Error('sharp not found - run `pnpm install` first.');
    return require(path.join(store, match, 'node_modules/sharp'));
  }
}

const sharp = loadSharp();

// Matches the site's dark palette so a placeholder reads as deliberate
// scaffolding rather than a broken image.
const BG = '#1c1a18';
const GRID = '#262320';
const ACCENT = '#f0851f';
const TEXT = '#f5f0ea';
const MUTED = '#8c837a';

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function placeholderSvg({ width, height, title, subtitle }) {
  // Type scales with the shortest edge so a 96px avatar and a 1920px poster
  // both come out legible.
  const unit = Math.min(width, height);
  const eyebrowSize = Math.max(9, Math.round(unit * 0.035));
  const titleSize = Math.max(12, Math.round(unit * 0.075));
  const subtitleSize = Math.max(9, Math.round(unit * 0.032));
  const dimsSize = Math.max(9, Math.round(unit * 0.03));
  const grid = Math.max(16, Math.round(unit / 12));
  const inset = Math.max(4, Math.round(unit * 0.02));

  const lines = [];
  const showText = unit >= 160;
  if (showText) {
    const gap = titleSize * 1.35;
    let y = height / 2 - (subtitle ? gap * 0.9 : gap * 0.55);

    lines.push(
      `<text x="50%" y="${y}" fill="${ACCENT}" font-size="${eyebrowSize}" font-weight="700" letter-spacing="${eyebrowSize * 0.12}">PLACEHOLDER</text>`
    );
    y += titleSize * 1.25;
    lines.push(
      `<text x="50%" y="${y}" fill="${TEXT}" font-size="${titleSize}" font-weight="700">${escapeXml(title)}</text>`
    );
    if (subtitle) {
      y += subtitleSize * 1.9;
      lines.push(
        `<text x="50%" y="${y}" fill="${MUTED}" font-size="${subtitleSize}" font-weight="600">${escapeXml(subtitle)}</text>`
      );
    }
    y += dimsSize * 1.9;
    lines.push(
      `<text x="50%" y="${y}" fill="${ACCENT}" font-size="${dimsSize}" font-family="Consolas, ui-monospace, monospace">${width} x ${height}</text>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="g" width="${grid}" height="${grid}" patternUnits="userSpaceOnUse">
      <path d="M ${grid} 0 L 0 0 0 ${grid}" fill="none" stroke="${GRID}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="${BG}"/>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}"
        fill="none" stroke="${ACCENT}" stroke-width="${Math.max(1, Math.round(unit * 0.004))}"/>
  <path d="M ${inset} ${inset} L ${width - inset} ${height - inset} M ${width - inset} ${inset} L ${inset} ${height - inset}"
        stroke="${ACCENT}" stroke-width="1" opacity="0.18"/>
  <g text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif">
    ${lines.join('\n    ')}
  </g>
</svg>`;
}

// Every placeholder on the site, with the size the markup declares for it.
// Keep this list and public/media/*/README.md in step.
const PLACEHOLDERS = [
  // --- Hero carousel posters (16:9, first paint of the hero) ---
  [
    'media/marketing/poster-live-interview.png',
    1920,
    1080,
    'Live Interview',
    'Assistant + smart export',
  ],
  ['media/marketing/poster-coding-1.png', 1920, 1080, 'Coding Challenge 1', 'Graph traversal'],
  ['media/marketing/poster-coding-2.png', 1920, 1080, 'Coding Challenge 2', 'Connected components'],
  [
    'media/marketing/poster-coding-3.png',
    1920,
    1080,
    'Coding Challenge 3',
    'Binary tree recursion',
  ],

  // --- Features bento tiles (16:9) ---
  [
    'media/marketing/feature-stealth.png',
    1600,
    900,
    'Stealth Mode',
    'Overlay during a screen share',
  ],
  [
    'media/marketing/feature-suggestions.png',
    1600,
    900,
    'Reply Suggestions',
    'Streamed answer in the panel',
  ],
  ['media/marketing/feature-export.png', 1600, 900, 'Smart Export', 'Generated DOCX report'],

  // --- How it works steps (16:9) ---
  ['media/marketing/step-install.png', 800, 450, 'Step 1', 'Install and start the trial'],
  ['media/marketing/step-context.png', 800, 450, 'Step 2', 'Add your CV and the job'],
  ['media/marketing/step-live.png', 800, 450, 'Step 3', 'Join the call'],

  // --- Testimonial avatar ---
  ['media/marketing/avatar-placeholder.png', 96, 96, '', ''],

  // --- Docs screenshots, at the app's own capture size ---
  [
    'media/docs/first-run-setup.png',
    1482,
    1083,
    'First-Run Setup',
    'Sign in and set up your profile',
  ],
  ['media/docs/install-windows.png', 1482, 1083, 'Windows Installer', 'PowerInterviewAI-Setup.exe'],
  ['media/docs/install-macos.png', 1482, 1083, 'macOS Installer', 'Drag the app to Applications'],
  ['media/docs/configuration-dialog.png', 1482, 1083, 'Configuration', 'Name, CV, and job context'],
  [
    'media/docs/language-menu.png',
    1482,
    1083,
    'Interview Language',
    'Language menu on the control bar',
  ],
  ['media/docs/llm-options.png', 1482, 1083, 'LLM Options', 'Bring your own provider key'],
];

const only = process.argv.slice(2);

for (const [relativePath, width, height, title, subtitle] of PLACEHOLDERS) {
  if (only.length && !only.some((needle) => relativePath.includes(needle))) continue;

  const outPath = path.join(ROOT, 'public', relativePath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const svg = placeholderSvg({ width, height, title, subtitle });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);

  console.log(`${relativePath}  ${width}x${height}`);
}

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'assets');

// Colors from constants/colors.ts
const SAGE = '#7A8F70';
const TERRACOTTA = '#C96B55';
const CREAM = '#F5F1EA';

/**
 * Generate the full icon SVG — faithful to IconLogo.tsx
 * Original viewBox is 0 0 100 100, we scale to target size.
 */
function fullIconSVG(size) {
  const s = size / 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="${CREAM}" />

  <!-- Outer halo circle: r=42, strokeWidth=2.5, opacity=0.3 -->
  <circle cx="${50*s}" cy="${50*s}" r="${42*s}" stroke="${SAGE}" stroke-width="${2.5*s}" fill="none" opacity="0.3" />

  <!-- Inner circle: r=36, strokeWidth=2 -->
  <circle cx="${50*s}" cy="${50*s}" r="${36*s}" stroke="${SAGE}" stroke-width="${2*s}" fill="none" />

  <!-- Central cross - vertical: M50,28 V72 -->
  <line x1="${50*s}" y1="${28*s}" x2="${50*s}" y2="${72*s}" stroke="${TERRACOTTA}" stroke-width="${3*s}" stroke-linecap="round" />

  <!-- Central cross - horizontal: M28,50 H72 -->
  <line x1="${28*s}" y1="${50*s}" x2="${72*s}" y2="${50*s}" stroke="${TERRACOTTA}" stroke-width="${3*s}" stroke-linecap="round" />

  <!-- Decorative rays: strokeWidth=2, opacity=0.5 -->
  <line x1="${50*s}" y1="${14*s}" x2="${50*s}" y2="${20*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />
  <line x1="${50*s}" y1="${80*s}" x2="${50*s}" y2="${86*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />
  <line x1="${14*s}" y1="${50*s}" x2="${20*s}" y2="${50*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />
  <line x1="${80*s}" y1="${50*s}" x2="${86*s}" y2="${50*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />

  <!-- Corner accents: strokeWidth=1.5, opacity=0.4 -->
  <line x1="${26*s}" y1="${26*s}" x2="${30*s}" y2="${30*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
  <line x1="${74*s}" y1="${26*s}" x2="${70*s}" y2="${30*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
  <line x1="${26*s}" y1="${74*s}" x2="${30*s}" y2="${70*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
  <line x1="${74*s}" y1="${74*s}" x2="${70*s}" y2="${70*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
</svg>`;
}

/**
 * Android adaptive icon — same design but scaled to ~62% centered (safe zone)
 */
function adaptiveIconSVG(size) {
  const padding = size * 0.19;
  const inner = size - padding * 2;
  const s = inner / 100;
  const ox = padding; // offset x
  const oy = padding; // offset y

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="${CREAM}" />

  <!-- Outer halo circle -->
  <circle cx="${ox + 50*s}" cy="${oy + 50*s}" r="${42*s}" stroke="${SAGE}" stroke-width="${2.5*s}" fill="none" opacity="0.3" />

  <!-- Inner circle -->
  <circle cx="${ox + 50*s}" cy="${oy + 50*s}" r="${36*s}" stroke="${SAGE}" stroke-width="${2*s}" fill="none" />

  <!-- Cross - vertical -->
  <line x1="${ox + 50*s}" y1="${oy + 28*s}" x2="${ox + 50*s}" y2="${oy + 72*s}" stroke="${TERRACOTTA}" stroke-width="${3*s}" stroke-linecap="round" />

  <!-- Cross - horizontal -->
  <line x1="${ox + 28*s}" y1="${oy + 50*s}" x2="${ox + 72*s}" y2="${oy + 50*s}" stroke="${TERRACOTTA}" stroke-width="${3*s}" stroke-linecap="round" />

  <!-- Decorative rays -->
  <line x1="${ox + 50*s}" y1="${oy + 14*s}" x2="${ox + 50*s}" y2="${oy + 20*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />
  <line x1="${ox + 50*s}" y1="${oy + 80*s}" x2="${ox + 50*s}" y2="${oy + 86*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />
  <line x1="${ox + 14*s}" y1="${oy + 50*s}" x2="${ox + 20*s}" y2="${oy + 50*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />
  <line x1="${ox + 80*s}" y1="${oy + 50*s}" x2="${ox + 86*s}" y2="${oy + 50*s}" stroke="${SAGE}" stroke-width="${2*s}" stroke-linecap="round" opacity="0.5" />

  <!-- Corner accents -->
  <line x1="${ox + 26*s}" y1="${oy + 26*s}" x2="${ox + 30*s}" y2="${oy + 30*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
  <line x1="${ox + 74*s}" y1="${oy + 26*s}" x2="${ox + 70*s}" y2="${oy + 30*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
  <line x1="${ox + 26*s}" y1="${oy + 74*s}" x2="${ox + 30*s}" y2="${oy + 70*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
  <line x1="${ox + 74*s}" y1="${oy + 74*s}" x2="${ox + 70*s}" y2="${oy + 70*s}" stroke="${SAGE}" stroke-width="${1.5*s}" stroke-linecap="round" opacity="0.4" />
</svg>`;
}

/**
 * Simplified favicon — just circle + bold cross, no halo/rays/corners
 */
function faviconSVG(size) {
  const s = size / 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${CREAM}" />
  <circle cx="${50*s}" cy="${50*s}" r="${36*s}" stroke="${SAGE}" stroke-width="${3.5*s}" fill="none" />
  <line x1="${50*s}" y1="${28*s}" x2="${50*s}" y2="${72*s}" stroke="${TERRACOTTA}" stroke-width="${5*s}" stroke-linecap="round" />
  <line x1="${28*s}" y1="${50*s}" x2="${72*s}" y2="${50*s}" stroke="${TERRACOTTA}" stroke-width="${5*s}" stroke-linecap="round" />
</svg>`;
}

async function generate() {
  console.log('Generating Saint Match app icons...\n');

  const icons = [
    { name: 'icon.png',          svg: fullIconSVG(1024),      size: 1024 },
    { name: 'adaptive-icon.png', svg: adaptiveIconSVG(1024),  size: 1024 },
    { name: 'splash-icon.png',   svg: fullIconSVG(1024),      size: 1024 },
    { name: 'favicon.png',       svg: faviconSVG(48),         size: 48   },
  ];

  for (const icon of icons) {
    const outPath = join(assetsDir, icon.name);
    await sharp(Buffer.from(icon.svg))
      .png()
      .toFile(outPath);
    console.log(`  ✓ ${icon.name} (${icon.size}×${icon.size})`);
  }

  console.log(`\nDone! All icons saved to assets/`);
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

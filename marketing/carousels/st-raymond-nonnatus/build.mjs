#!/usr/bin/env node
/**
 * Render the five St Raymond Nonnatus .dc.html artboards to PNG.
 *
 * The artboards are static (no {{holes}}, no data-dc-script logic), so they can
 * be rendered without the Design Components runtime. For each artboard we:
 *   1. pull the <helmet><style> block out of <x-dc> and put it in <head>
 *   2. unwrap the rest of <x-dc> into <body>
 *   3. drop <script src="./support.js"> and the trailing data-dc-script block
 *   4. keep the embedded @font-face data: URIs untouched so the real
 *      Cormorant Garamond subset renders instead of a fallback serif
 *
 * Usage:
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *   PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
 *   node build.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// Playwright lives in the global node_modules on this machine.
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright'
);

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, 'slides');
const VERT_DIR = join(HERE, 'slides-vertical');
const TMP_DIR = join(HERE, '.render-tmp');

const WIDTH = 1080;
const HEIGHT = 1351;

// 9:16 for TikTok Photo Mode and Instagram/Facebook Stories. The 4:5 slide is
// placed uncropped and centred; the bands are a blurred, darkened blow-up of
// the same slide so the sharp artboard stays the focal element.
const V_WIDTH = 1080;
const V_HEIGHT = 1920;
const V_TOP = Math.round((V_HEIGHT - HEIGHT) / 2); // 284

const FONT_FAMILY = 'Cormorant Garamond Sub';
// Deliberately excludes the real family: the fallback tail of the artboard stack.
const FALLBACK_STACK = `'EB Garamond', Garamond, 'Times New Roman', serif`;

const SLIDES = [
  { src: 'Main.dc.html', out: '01-hook.png' },
  { src: 'Maxim.dc.html', out: '02-maxim.png' },
  { src: 'Challenge.dc.html', out: '03-challenge.png' },
  { src: 'Prayer.dc.html', out: '04-prayer.png' },
  { src: 'Invocation.dc.html', out: '05-invocation.png' },
];

/** Turn a .dc.html artboard into a plain standalone HTML document. */
function flatten(dcHtml) {
  const xdc = dcHtml.match(/<x-dc>([\s\S]*)<\/x-dc>/);
  if (!xdc) throw new Error('no <x-dc> element found');
  let inner = xdc[1];

  const helmet = inner.match(/<helmet>([\s\S]*?)<\/helmet>/);
  const head = helmet ? helmet[1].trim() : '';
  inner = inner.replace(/<helmet>[\s\S]*?<\/helmet>/, '').trim();

  // support.js and the data-dc-script block are runtime-only; they never load
  // here and the artboards carry no component logic.
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
${head}
<style>html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }</style>
</head>
<body>
${inner}
</body>
</html>
`;
}

/**
 * 1080x1920 wrapper: blurred/darkened blow-up of the slide behind, the sharp
 * 4:5 slide centred and untouched on top. No crop, no text near the seam.
 */
function verticalWrapper(pngPath) {
  const src = pathToFileURL(pngPath).href;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body { margin: 0; width: ${V_WIDTH}px; height: ${V_HEIGHT}px; overflow: hidden; background: #14100d; }
  .frame { position: relative; width: ${V_WIDTH}px; height: ${V_HEIGHT}px; overflow: hidden; }
  /* Blown up well past the frame so the blur never samples a hard edge. */
  .fill {
    position: absolute; left: 50%; top: 50%;
    width: ${Math.round(V_WIDTH * 1.6)}px; height: ${Math.round(V_HEIGHT * 1.6)}px;
    transform: translate(-50%, -50%);
    object-fit: cover;
    filter: blur(64px) saturate(0.80) brightness(0.58);
  }
  /* Flat wash to guarantee the bands sit well below the artboard in value.
     Tuned so the band lands near 45% of the plate's mean luminance: dark
     enough to stay subordinate, light enough to read as tone and not as a
     black letterbox bar. */
  .wash { position: absolute; inset: 0; background: #14100d; opacity: 0.20; }
  .plate {
    position: absolute; left: 0; top: ${V_TOP}px;
    width: ${WIDTH}px; height: ${HEIGHT}px; display: block;
  }
</style>
</head>
<body>
<div class="frame">
  <img class="fill" src="${src}" alt="">
  <div class="wash"></div>
  <img class="plate" src="${src}" alt="">
</div>
</body>
</html>
`;
}

async function renderVertical(page) {
  mkdirSync(VERT_DIR, { recursive: true });
  const results = [];
  for (const slide of SLIDES) {
    const flat = join(OUT_DIR, slide.out);
    const tmp = join(HERE, `.render-v-${slide.out}.html`);
    writeFileSync(tmp, verticalWrapper(flat));
    try {
      await page.setViewportSize({ width: V_WIDTH, height: V_HEIGHT });
      await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
      await page.evaluate(() =>
        Promise.all(
          [...document.images].map((i) =>
            i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))
          )
        )
      );
      const dest = join(VERT_DIR, slide.out);
      await page.screenshot({
        path: dest,
        type: 'png',
        clip: { x: 0, y: 0, width: V_WIDTH, height: V_HEIGHT },
      });
      results.push(dest);
    } finally {
      rmSync(tmp, { force: true });
    }
  }
  return results;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  const report = [];

  for (const slide of SLIDES) {
    const flat = flatten(readFileSync(join(HERE, slide.src), 'utf8'));
    // Written into the artboard directory so bare image filenames
    // (carducho-1.jpg, ...) resolve to the real sibling JPEGs over file://.
    const tmp = join(HERE, `.render-${slide.src}`);
    writeFileSync(tmp, flat);

    try {
      await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);

      // --- font verification -------------------------------------------------
      const fontCheck = await page.evaluate(
        async ({ family, fallback }) => {
          const q = `'${family}'`;
          // font-display:block + lazy loading means a face is only decoded if a
          // node on this artboard actually uses it. Force all three so we prove
          // every embedded data: URI decodes, not just the ones this slide needs.
          await Promise.all([
            document.fonts.load(`400 42px ${q}`),
            document.fonts.load(`700 42px ${q}`),
            document.fonts.load(`italic 400 42px ${q}`),
          ]);

          const loaded = [...document.fonts]
            .filter((f) => f.status === 'loaded')
            .map((f) => `${f.family} ${f.style} ${f.weight}`);

          const measure = (stack, weight, style) => {
            const el = document.createElement('span');
            el.textContent = 'Handgloves MMMiiilll 1234';
            el.style.cssText =
              `position:absolute;left:-9999px;top:0;white-space:nowrap;` +
              `font-size:200px;font-weight:${weight};font-style:${style};font-family:${stack}`;
            document.body.appendChild(el);
            const w = el.getBoundingClientRect().width;
            el.remove();
            return w;
          };

          return {
            loaded,
            check400: document.fonts.check(`400 42px ${q}`),
            check700: document.fonts.check(`700 42px ${q}`),
            checkItalic: document.fonts.check(`italic 400 42px ${q}`),
            realWidth: measure(q, 400, 'normal'),
            fallbackWidth: measure(fallback, 400, 'normal'),
            realItalicWidth: measure(q, 400, 'italic'),
            fallbackItalicWidth: measure(fallback, 400, 'italic'),
            realBoldWidth: measure(q, 700, 'normal'),
            fallbackBoldWidth: measure(fallback, 700, 'normal'),
            // Actual computed face of a real body-copy node on the artboard.
            bodyStack: getComputedStyle(document.body).fontFamily,
          };
        },
        { family: FONT_FAMILY, fallback: FALLBACK_STACK }
      );

      // Every face must report loaded AND measure differently from the
      // fallback stack — check() alone can pass on a synthesised face.
      const embedded =
        fontCheck.check400 &&
        fontCheck.check700 &&
        fontCheck.checkItalic &&
        Math.abs(fontCheck.realWidth - fontCheck.fallbackWidth) > 1 &&
        Math.abs(fontCheck.realBoldWidth - fontCheck.fallbackBoldWidth) > 1 &&
        Math.abs(fontCheck.realItalicWidth - fontCheck.fallbackItalicWidth) > 1;

      // --- overflow / clipping audit ----------------------------------------
      const overflow = await page.evaluate(({ w, h }) => {
        const bad = [];
        for (const el of document.querySelectorAll('div, span, strong')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) continue;
          if (r.left < -0.5 || r.top < -0.5 || r.right > w + 0.5 || r.bottom > h + 0.5) {
            bad.push({
              text: (el.textContent || '').trim().slice(0, 48),
              rect: [+r.left.toFixed(1), +r.top.toFixed(1), +r.right.toFixed(1), +r.bottom.toFixed(1)],
            });
          }
          if (el.scrollWidth > Math.ceil(r.width) + 1) {
            bad.push({
              text: (el.textContent || '').trim().slice(0, 48),
              horizOverflow: el.scrollWidth - Math.round(r.width),
            });
          }
        }
        return bad;
      }, { w: WIDTH, h: HEIGHT });

      const dest = join(OUT_DIR, slide.out);
      await page.screenshot({
        path: dest,
        type: 'png',
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      });

      report.push({ slide: slide.out, embedded, fontCheck, overflow, dest });
    } finally {
      rmSync(tmp, { force: true });
    }
  }

  const verticals = await renderVertical(page);

  await browser.close();
  rmSync(TMP_DIR, { recursive: true, force: true });

  for (const r of report) {
    console.log(`\n=== ${r.slide}`);
    console.log(`  font embedded & active : ${r.embedded ? 'YES' : 'NO'}`);
    console.log(`  document.fonts.check   : 400=${r.fontCheck.check400} 700=${r.fontCheck.check700} italic=${r.fontCheck.checkItalic}`);
    console.log(`  loaded faces           : ${r.fontCheck.loaded.join(' | ') || '(none)'}`);
    console.log(`  width @200px roman     : real ${r.fontCheck.realWidth.toFixed(2)} vs fallback ${r.fontCheck.fallbackWidth.toFixed(2)}`);
    console.log(`  width @200px bold      : real ${r.fontCheck.realBoldWidth.toFixed(2)} vs fallback ${r.fontCheck.fallbackBoldWidth.toFixed(2)}`);
    console.log(`  width @200px italic    : real ${r.fontCheck.realItalicWidth.toFixed(2)} vs fallback ${r.fontCheck.fallbackItalicWidth.toFixed(2)}`);
    console.log(`  out-of-frame / clipped : ${r.overflow.length ? JSON.stringify(r.overflow) : 'none'}`);
  }

  const allFonts = report.every((r) => r.embedded);
  console.log(`\nRendered ${report.length} slides (1080x1351) to ${OUT_DIR}`);
  console.log(`Rendered ${verticals.length} slides (1080x1920) to ${VERT_DIR}`);
  console.log(`Real Cormorant Garamond on every slide: ${allFonts ? 'YES' : 'NO'}`);
  if (!allFonts) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

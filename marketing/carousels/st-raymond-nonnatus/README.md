# St Raymond Nonnatus — carousel

A five-slide carousel for the feast of St Raymond Nonnatus, 31 August. White
Cormorant Garamond set over cropped details of three seventeenth-century Spanish
paintings of the saint.

## Deliverables

| Set | Size | Where it goes |
| --- | --- | --- |
| `slides/` | 1080 × 1351 (4:5) | Instagram feed and X. **The primary set.** |
| `slides-vertical/` | 1080 × 1920 (9:16) | TikTok Photo Mode and Instagram / Facebook Stories, both of which accept image carousels natively and frame at 9:16. |
| `st-raymond-nonnatus-vertical.mp4` | 1080 × 1920, 17.6 s | YouTube Shorts. Silent, H.264, faststart. |

The 9:16 stills are the 4:5 slides placed uncropped and centred on a blurred,
darkened blow-up of their own artwork — no slide is re-cropped and no type falls
outside the 4:5 plate. The MP4 is those same 9:16 stills in order, about 3.4 s
each with a 0.6 s cross-dissolve between them.

## Files

| File | What it is |
| --- | --- |
| `st-raymond-nonnatus-carousel.html` | The seeded design canvas — open in a browser to view all five artboards and export PNG/PDF. |
| `Main.dc.html` | Slide 1 — hook (Mercedarian Constitutions) |
| `Maxim.dc.html` | Slide 2 — maxim (1 Corinthians 7:23) |
| `Challenge.dc.html` | Slide 3 — challenge (Guéranger) |
| `Prayer.dc.html` | Slide 4 — prayer (the Collect) |
| `Invocation.dc.html` | Slide 5 — invocation |
| `canvas.json` | Canvas layout: the five artboards in a row, launching on the canvas view |
| `*.jpg` | The five cropped artwork plates, one per slide |
| `build.mjs` | Renders the artboards to `slides/` and `slides-vertical/` |
| `build-video.sh` | Builds the vertical MP4 from `slides-vertical/` |

There is no hosting step. An earlier pass built a Netlify asset page to serve
the slides from a CDN, and a site was deployed from it; that approach was
abandoned and the deployed site is unmaintained. Buffer takes uploaded media
directly, so the PNGs and the MP4 in this directory are the deliverables — copy
them straight into the scheduler.

## Building

The `.dc.html` artboards are static — no `{{holes}}`, no `data-dc-script` logic —
so `build.mjs` renders them without the Design Components runtime: it lifts the
`<helmet><style>` into `<head>`, unwraps `<x-dc>` into `<body>`, drops the
`support.js` reference, and screenshots at exactly 1080 × 1351 with
`deviceScaleFactor: 1`.

```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
node build.mjs
```

`build.mjs` also asserts that the embedded Cormorant Garamond actually renders:
it force-loads all three faces, checks `document.fonts.check` for each, and
measures a test string against the fallback serif stack. It exits non-zero if
any face silently fell back.

```bash
FFMPEG=/path/to/ffmpeg ./build-video.sh
```

The MP4 needs an ffmpeg with **libx264**. The ffmpeg bundled with Playwright
only ships `png` and `libvpx` encoders and will not work.

Each `.dc.html` is self-contained: it embeds a subset of Cormorant Garamond
(weights 400/700 roman and 400 italic, with the real `smcp` small-caps feature)
as woff2 data URIs, so PNG/PDF export renders the correct face rather than a
fallback.

Slide typography is uniform: 42px body copy on 56px leading, attributions in
19px small caps tracked at 0.08em. Legibility over the paintings comes entirely
from crop placement — there are no scrims, gradients or overlays anywhere.

Measured against the artwork underneath, every line on every slide now clears
3.5:1 against white, above the 3:1 floor for large text. The weakest are slide 1
"to give up their lives," at 3.6:1 and slide 4's opening line at 3.7:1, both of
which sit on mid-tone passages and read cleanly.

## Slide 5 was relaid out

The first render put "patron saint of childbirth and the falsely accused," on a
single 830px line ending at x = 1014, which ran the tail straight across the lit
putto on the right of the Espinosa — that stretch measured **1.4:1** and was
genuinely unreadable. The source JPEGs are pre-cropped to exactly 1080 × 1351,
so there was no crop slack to pan away from it.

The line is now broken in two and the block sits in the dark column and sky on
the left. All four lines measure 12:1 or better. If you prefer the original
staggered composition, the change is confined to the four `<div>`s in
`Invocation.dc.html` — but the tail will be illegible again.

## The logo slot

Every slide has an empty 81 × 85px dashed box centred at the foot of the frame
(`left: 499.5px; top: 1203px`). **This is intentional** — it reserves the spot
for Saint Match's own mark, which is not yet in this repo. Drop the mark in and
delete the dashed placeholder before publishing.

## Artwork

All three paintings are in the public domain: the artists died in 1638, 1667 and
1626 respectively, so the works are out of copyright worldwide by any term, and
faithful photographic reproductions of two-dimensional public-domain artworks
are not themselves eligible for a new copyright.

**Vicente Carducho (c. 1576–1638), *Martirio de san Ramón Nonato*** — Museo del
Prado, Madrid. Used for slides 1 and 3 (two different crops).
<https://commons.wikimedia.org/wiki/File:Vicente_Carducho,_%22Martirio_de_san_Ram%C3%B3n_Nonato%22,_Museo_del_Prado..jpg>

**Jerónimo Jacinto de Espinosa (1600–1667), *San Ramón Nonato*** — Museo del
Prado, Madrid. Used for slides 2 and 5 (a tight crop and a full-length view).
<https://commons.wikimedia.org/wiki/File:San_Ram%C3%B3n_Nonato,_de_Jer%C3%B3nimo_Jacinto_Espinosa_(Museo_del_Prado).jpg>

**Santiago Morán the Elder (c. 1571–1626), *Última comunión de san Ramón
Nonato***. Used for slide 4.
<https://commons.wikimedia.org/wiki/File:Santiago_mor%C3%A1n_cisneros-%C3%BAltima_comuni%C3%B3n_de_san_ram%C3%B3n_nonato.jpg>

Attribution is not legally required for public-domain works, but crediting the
artist and the collection in the post is good practice and worth doing.

## Caption

```
St Raymond Nonnatus, priest of the Order of the Blessed Virgin Mary of Mercy

The Mercedarians existed for one purpose: to buy back Christians enslaved in North Africa. Alongside poverty, chastity and obedience they took a fourth vow—to remain behind as hostages themselves, in the place of captives in danger of losing their faith, if the ransom money ran out. Raymond was one of their redeemers. In Algiers, the tradition remembers, the money ran out.

He stayed. His captors pierced his lips and closed them with a padlock to stop him preaching. Little of his life can be documented with certainty—the Church has kept its shape rather than its dates—but the shape is unmistakable: a man who made himself the currency, and was then denied even the ability to say why.

His life reminds us that most of us could accept a sacrifice if we were permitted to explain it. The padlock is what remains when the explaining is taken away.

St Raymond Nonnatus, patron saint of expectant mothers and the falsely accused, pray for us.

•
•
•
•
•
•
•
•
•
•
•
•
#catholicyouth #saintoftheday #catholic #holy
```

## Accuracy notes

Raymond's life is thinly documented, and several familiar details are later
tradition rather than record. The caption is written to respect that.

- **He was never a cardinal.** The claim comes from a sixteenth-century
  confusion with Cardinal Robert Somercotes, who died in 1241, the same year as
  Raymond. Some later paintings show him in a cardinal's red — that is the same
  error in paint, not evidence.
- **"Nonnatus" ("not born") is probably not a birth story.** The caesarean-birth
  account — delivered after his mother's death — looks like a legend retrofitted
  to explain a name whose real origin is unknown. It is why he became patron of
  expectant mothers, but it should not be presented as biography.
- **The padlock is uncorroborated tradition.** The account of his lips being
  pierced and padlocked in Algiers is not documented contemporaneously. This is
  why the caption says "the tradition remembers" rather than asserting it flatly.

For the same reason **no quotation on any slide is attributed to Raymond
himself** — he left no writings. Slides 1–3 quote, respectively, the
Constitutions of the Order of Mercy, 1 Corinthians 7:23, and Dom Prosper
Guéranger's *The Liturgical Year*; slide 4 is the Collect for his feast.

# St Raymond Nonnatus — Instagram carousel

A five-slide Instagram carousel (1080 × 1351, 4:5) for the feast of St Raymond
Nonnatus, 31 August. White Cormorant Garamond set over cropped details of three
seventeenth-century Spanish paintings of the saint.

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

Each `.dc.html` is self-contained: it embeds a subset of Cormorant Garamond
(weights 400/700 roman and 400 italic, with the real `smcp` small-caps feature)
as woff2 data URIs, so PNG/PDF export renders the correct face rather than a
fallback.

Slide typography is uniform: 42px body copy on 56px leading, attributions in
19px small caps tracked at 0.08em. Legibility over the paintings comes entirely
from crop placement — there are no scrims, gradients or overlays anywhere.

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

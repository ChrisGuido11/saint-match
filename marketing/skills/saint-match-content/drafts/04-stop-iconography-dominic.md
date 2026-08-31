# 04 — St Dominic — STOP (iconography error in the image prompt)

Copy, sourcing, CTA and bridge are all sound here. The pack fails entirely in
the image prompt, which is exactly where a daily pipeline is most likely to
ship an error unnoticed — nobody proofreads a prompt the way they proofread a
caption, and a generator will render whatever ambiguity you leave it.

```
draft_id       2026-08-08-dominic
skill_version  best_skill.md @ v0-seed
format         carousel-4x5
saint          St Dominic
feast_date     8 August (Memorial, General Roman Calendar)
topic          distraction / knowing a thing well enough to say something true about it
```

---

## Dossier

| # | Claim | Grade | Source |
| --- | --- | --- | --- |
| D1 | Born at Caleruega, Kingdom of Castile, c. 1170. | TRADITIONAL (the precise day given in some sources is a later reconstruction) | Wikipedia, *Saint Dominic* |
| D2 | Canon of the cathedral chapter of Osma before the Languedoc mission. | DOCUMENTED | ibid. |
| D3 | From 1203–06 in Languedoc, preaching against Cathar teaching; adopted itinerant poverty as a preaching method. | DOCUMENTED | ibid. |
| D4 | Late 1206: founded the monastery of Our Lady of Prouille as a base. | DOCUMENTED | ibid. |
| D5 | The Order of Preachers was confirmed by Honorius III in December 1216. | DOCUMENTED | ibid. |
| D6 | Died 6 August 1221 at Bologna, aged about fifty. | DOCUMENTED | ibid. |
| D7 | Canonised 3 July 1234 by Gregory IX at Rieti. | DOCUMENTED | ibid. |
| D8 | Memorial kept on 8 August. 6 August, the day of his death, is the Feast of the Transfiguration. | DOCUMENTED | General Roman Calendar |
| D9 | The habit of the Order: a **white** wool tunic, scapular and capuce, with a **black** cappa and capuce worn over it, and a leather belt. The black cappa is the origin of the English name Blackfriars. **The rosary now worn at the belt is a later addition to the habit.** | DOCUMENTED | english.op.org, *FAQs about the Dominican habit* |
| D10 | Dominic was a preacher, not a writer. Only a handful of compositions survive: the primitive Constitutions and a small number of letters, including one to the nuns of Madrid, 1220. | DOCUMENTED | domcentral.org, *Letters of St Dominic* |
| D11 | **The story that the Virgin Mary gave Dominic the rosary first appears in the fifteenth century**, through the Dominican Alanus de Rupe (c. 1428–1475), more than two hundred years after Dominic's death. No thirteenth-century chronicle records it and nothing in the testimony collected for his canonisation mentions it. Prayer beads existed in his lifetime; the Order did much to spread the devotion later. | **LEGEND** | Wikipedia, *Alanus de Rupe*; Rosary Center; Wikipedia, *Saint Dominic* |
| D12 | Primitive Constitutions of the Order of Preachers, prologue: the Order "is known to have been instituted from the beginning especially for preaching and the salvation of souls" (translations vary). | DOCUMENTED | Primitive Constitutions, prologue |
| D13 | Romans 10:14 (RSV-CE): "And how are they to hear without a preacher?" Context: Romans 10:13–15, Paul on the necessity of a sent preacher, closing with "How beautiful are the feet of those who preach good news!" | DOCUMENTED | RSV-CE |
| D14 | Collect (Roman Missal, 2011 English translation): "May Saint Dominic come to the help of your Church by his merits and teaching, O Lord, and may he, who was an outstanding preacher of your truth, be a devoted intercessor on our behalf." | DOCUMENTED | Catholic Culture, liturgical calendar, 8 August |

**Excluded, and why**

- **The rosary given by the Virgin (D11).** LEGEND. Not asserted in copy and, per
  §8.2, not to be depicted as an event either.
- **The star on his forehead at baptism and the black-and-white dog with a torch.**
  Both are traditional Dominican emblems of long standing, but neither has a
  dossier line here, so neither may appear in the prompt under I1.
- **Any spiritual maxim attributed to Dominic.** D10 gives him almost no corpus,
  and this dossier carries no quotable line from what survives beyond D12, which
  is the Order's constitution and is attributed to the Order.

---

## The draft as submitted

### Caption overlay — five slides

**Slide 1 — hook**

> "Instituted from the beginning
> especially for preaching
> and the salvation of souls."

*Primitive Constitutions of the Order of Preachers*

**Slide 2 — maxim**

> "And how are they to hear
> without a preacher?"

*Romans 10:14*

**Slide 3 — challenge**

> "May he, who was an outstanding preacher
> of your truth,
> be a devoted intercessor on our behalf."

*Collect for the Memorial of St Dominic*

**Slide 4 — prayer**

> May Saint Dominic come to the help of your Church
> by his merits and teaching, O Lord,
> and may he, who was an outstanding preacher of your truth,
> be a devoted intercessor on our behalf.

*Collect for the Memorial of St Dominic*

**Slide 5 — invocation**

> St Dominic,
> priest and founder of the Order of Preachers,
> pray for us.

### AI image prompt — 9:16 *(as submitted)*

> Saint Dominic in flowing black monastic robes, kneeling in prayer as the Virgin
> Mary descends in golden light to place a five-decade rosary into his hands. A
> bright star shines above his forehead. A black-and-white dog with a burning
> torch in its mouth sits at his feet. Golden halo ring around his head. Interior
> of a Gothic cathedral, soaring vaults, stained glass, dramatic god-rays,
> highly detailed, cinematic lighting.

### Description caption

```
St Dominic, priest and founder of the Order of Preachers

He was a cathedral canon at Osma when he went south into Languedoc and found the Church losing an argument. The papal legates had arrived with retinues and horses. The men they were arguing against had arrived with nothing. Dominic's answer was to travel on foot, own nothing, and stay long enough to learn what the other side actually said.

The order he founded was written down as existing for one purpose: preaching, and the salvation of souls. He left almost nothing else. A few letters, a constitution, and an order of men whose job was to know the material.

Study is usually filed under self-improvement. For Dominic it was a duty owed to somebody else—you learn the thing properly because a person is going to ask you about it, and a wrong answer costs them something.

St Dominic, priest and founder of the Order of Preachers, pray for us.
```

### Soft CTA

```
Saint Match turns a virtue like this into one small action you can do today. Free on iOS and Android.
```

---

## Scorer verdict

```
VERDICT: STOP
draft_id:      2026-08-08-dominic
skill_version: best_skill.md @ v0-seed
graded_by:     seed example (hand-graded)
graded_at:     2026-08-31

CHECKS
  T1 dossier coverage      PASS — canon of Osma D2; Languedoc and the legates D3; itinerant
                           poverty D3; the Order's stated purpose D12; the surviving corpus
                           D10. No unmatched claims in the copy.
  T2 grade-appropriate     PASS — D1 (birth year, TRADITIONAL) kept out of copy. D11 (LEGEND)
                           does not appear in the copy at all.
  T3 quotation             PASS — Slides 1 and 3/4 are attributed to the Constitutions and to
                           the Collect, not to Dominic, which is correct given D10.
  T4 scripture             PASS — Romans 10:14, RSV-CE, context checked at D13.
  T5 feast / rank / bio    PASS — 8 August Memorial (D8); priest and founder of the Order,
                           both in the dossier. No episcopal or prelatial rank is claimed
                           anywhere in the copy.
  T6 exclusions declared   PASS — three exclusions listed, including the rosary legend.
  B1 register              PASS — plain and concrete.
  B2 shape and ending      PASS — one turn; ends on "a wrong answer costs them something".
  B3 promises              PASS.
  C1 approved pattern      PASS — one CTA, §9.1 pattern 2, after the invocation.
  C2 banned register       PASS.
  C3 saint not leverage    PASS.
  G1 bridge                PASS — virtue: study as a duty owed to another person. Micro-action:
                           spend fifteen minutes reading one page of the thing you have been
                           arguing about without having read it. Swap test: substituting
                           Thomas Aquinas changes the sentence, since the bridge rests on D3,
                           Dominic going to learn the opposing case in the field.
  I1 attributes sourced    STOP — four prompt elements have no entry in an iconography list and
                           no dossier support: the star above the forehead, the dog with a
                           torch, the golden halo ring, the Gothic cathedral interior. The pack
                           supplies no iconography list at all, which alone fails I1.
  I2 no contradiction      STOP — three separate contradictions.
                           (a) "flowing black monastic robes" contradicts D9. The Dominican
                           habit is a WHITE tunic, scapular and capuce with a BLACK cappa over
                           it. An all-black rendering reassigns him to another order, and it is
                           precisely what a generator will produce from this phrasing.
                           (b) "a five-decade rosary" is anachronistic. Per D11 the rosary in
                           that form is a later development; prayer beads existed, the modern
                           five-decade rosary in a friar's hands in 1206 does not.
                           (c) "golden halo ring" is banned outright by best_skill.md §8.2;
                           halo is a flat gold disc or nothing.
                           Note for the record: later paintings show the rosary handover
                           constantly. Per §8.2 that is the error in paint, not evidence — the
                           same relationship as Raymond Nonnatus and the cardinal's red.
  I3 legend not depicted   STOP — the prompt stages D11, a LEGEND, as a documentary event: the
                           Virgin descending and placing the rosary in his hands. This is the
                           load-bearing subject of the image. That the caption does not assert
                           it does not rescue the prompt, because the image is the thing most
                           people will actually read.
  I4 layout                STOP — no aspect ratio given; no region reserved for overlay type;
                           "soaring vaults, stained glass, dramatic god-rays" guarantees high
                           local contrast across the whole frame, so no overlay line will
                           clear 3.5:1 anywhere.

REQUIRED REWRITES
  1. I2(a) — Replace "flowing black monastic robes" with the habit named by garment
     and colour per D9: white wool tunic, scapular and capuce, black cappa over it.
  2. I2(b), I3 — Remove the rosary and the Virgin entirely. Depict the person, not
     the story.
  3. I1 — Remove the star, the dog and the Gothic interior, or add dossier lines that
     support them. Supply an iconography list mapping every remaining element to a
     dossier line.
  4. I2(c), I4 — Remove the halo ring. Specify 9:16, reserve the upper third as a flat
     mid-tone area, and drop the god-rays.

NOTES
  The copy on this pack is strong and should be kept as it stands. The failure is
  confined to the prompt, which is the standing risk in this format: the prompt is the
  one artifact where a plausible-sounding phrase silently becomes a picture that
  hundreds of thousands of people read as a claim.
```

---

## The corrected image prompt

> Half-length portrait of a Castilian friar of about fifty, c. 1220, in the habit
> of the Order of Preachers: a white undyed wool tunic with a white scapular and
> capuce, a plain black cappa and hood worn over them, a leather belt, tonsured,
> gaunt, road-worn, a plain unbound quire of parchment held closed in one hand.
> He stands in a bare Romanesque cloister of rough limestone, early morning, flat
> even northern light, no beams. Painted in the manner of Spanish thirteenth- and
> fourteenth-century panel painting — flat modelling, restricted mineral palette,
> gold ground kept plain. No halo, or a flat gold disc only. 9:16 vertical; the
> figure occupies the lower two-thirds; the upper third is unbroken flat stone
> and gold ground for overlay type. No lettering anywhere in the image.

**Iconography list**

| Prompt element | Support |
| --- | --- |
| White tunic, scapular, capuce; black cappa and hood; leather belt | D9 |
| Friar of about fifty, c. 1220, Castilian | D1, D6 |
| Tonsure; a plain quire of parchment | D2 (cathedral canon), D10 (the surviving corpus is a constitution and letters) |
| Romanesque cloister, Iberian, early thirteenth century | D1, D4 |
| Flat gold disc or no halo; no lettering | `best_skill.md` §8.2 |

**Excluded, and why:** the rosary and the Virgin (D11, LEGEND, and anachronistic
in form); the star and the dog (traditional emblems with no dossier line here);
any mitre or crozier, since the dossier records no episcopal rank; the Gothic
interior (wrong region and wrong period for Prouille and Osma); the halo ring
and the god-rays (§8.2).

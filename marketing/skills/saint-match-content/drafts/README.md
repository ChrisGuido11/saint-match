# drafts/ — worked examples

Five post packs, each graded by `SCORER.md` against `best_skill.md`. Two pass,
three stop. They exist to show the gate working on realistic material rather
than on strawmen, and to fix the standard of evidence before the loop starts
producing packs at a rate nobody can read carefully.

| File | Saint | Feast | Verdict | Demonstrates |
| --- | --- | --- | --- | --- |
| `01-pass-maximilian-kolbe.md` | St Maximilian Kolbe | 14 Aug (Memorial) | **PASS** | A clean pack. Also: a TRADITIONAL quotation handled correctly, and an editorial exclusion above the rulebook's floor. |
| `02-pass-monica.md` | St Monica | 27 Aug (Memorial) | **PASS** | A saint who left no writings, quoted safely because a named contemporary recorded her speech. Also blocks the standard Ambrose misattribution. |
| `03-stop-invented-quote-francis-of-assisi.md` | St Francis of Assisi | 4 Oct (Memorial) | **STOP** | Truth — a misattributed quotation. Fails T1 and T3. |
| `04-stop-iconography-dominic.md` | St Dominic | 8 Aug (Memorial) | **STOP** | Iconography — wrong habit, an anachronistic object, and a legend staged as an event. Fails I1–I4. Copy and sourcing pass. |
| `05-stop-cta-brand-ignatius-of-loyola.md` | St Ignatius of Loyola | 31 Jul (Memorial) | **STOP** | CTA and brand — fake scarcity, hard sell, promised outcome, and a bridge that is a slogan. Fails B1, B2, B3, C1, C2, C3, G1. Every truth check passes. |

Each STOP carries the scorer's full verdict and the corrected rewrite that would
pass.

## What the set is meant to establish

**Failures are separable, so the checks are separate.** Draft 05 is the argument
for that. Every factual check on it passes — the dates, the quotations, the
scripture, the exclusions are all correct and sourced — and it is still
unpublishable, because it uses a saint's feast as a conversion funnel. A gate
that only hunted for false claims would ship it. Draft 04 is the same argument
from the other side: the copy is good and the failure is entirely inside an AI
image prompt, which is the artifact nobody proofreads.

**The dossier is the unit of truth, not the model's memory.** Every pack opens
with a numbered dossier with a grade and a source per line, and an explicit
"excluded, and why" list. In draft 03 the fabricated line fails T1 and T3
together, which is the signature of invention rather than of mis-citation: there
was no source to get wrong.

**Exclusions are where the work is.** The things deliberately kept out are more
informative than the things kept in. Across the five packs: Kolbe's two-crowns
story; the belief that the bishop who consoled Monica was Ambrose; the
"seventeen years" of her prayer; the Virgin handing Dominic a rosary; the
consolation/desolation framing of the Ignatian Examen; Francis's "use words if
necessary". Each of these is something a language model asked for a saint post
would very likely produce.

**Two judgement calls are recorded rather than buried.** In draft 01 the image
prompt refuses to depict Auschwitz at all — no striped uniform, no wire, no
bunker — and sets the portrait at Niepokalanów before 1941. In draft 02 the
prompt asks for dry eyes on a saint the liturgy calls a woman of tears, because
a generator given "weeping" produces sentiment. Neither is required by
`best_skill.md`. Both are flagged in the packs' NOTES so they can be applied
consistently or overruled.

## Saints, feast dates and how they were checked

All five are in the General Roman Calendar and all five ranks were checked
against it: Ignatius 31 July, Dominic 8 August, Kolbe 14 August, Monica
27 August, Francis 4 October — Memorials, every one.

Two calendar points worth carrying forward:

- **4 October 2026 falls on a Sunday**, so the Francis memorial is superseded by
  the Twenty-Seventh Sunday in Ordinary Time. The pack may still run on the day;
  it may not describe a superseded memorial as the day's liturgical celebration.
  Draft 03 records this as D10.
- **31 August, the date of the Raymond Nonnatus post already in this repo, has no
  General Roman Calendar entry at all.** Raymond came from the curated fallback,
  not from the calendar. That is the evidence for the fallback assumption in
  `best_skill.md` §0, and it means the fallback list is load-bearing rather than
  occasional.

## Known weaknesses in this set

- **`skill_version` is `v0-seed` on all five**, because they were written in the
  same commit as `best_skill.md` and so predate their own sha. Every subsequent
  pack must carry a real sha.
- **The dossiers were assembled for these examples**, not drawn from an approved
  source pack, because none exists yet. They are sourced and graded, but they
  are the author's compilation and inherit the reliability of the sources cited
  — several are encyclopaedia articles, which are adequate for a working
  document and not adequate for a published claim about a saint.
- **The two PASSes were written to pass.** They are a demonstration of the
  standard, not a sample of what the frozen writer will actually emit. The real
  PASS rate is unknown until the loop runs.
- **Every pack here is `carousel-4x5`.** Neither `photo-9x16` nor `short` has a
  worked example, so their contracts are untested.
- **No pack has been graded by an LLM judge**, only by hand. Whether `SCORER.md`
  reproduces these verdicts when handed to a model is the first thing worth
  measuring, and it has not been measured.

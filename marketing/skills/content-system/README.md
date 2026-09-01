# content-system — a gated content pipeline, split into method and instance

A system for producing brand social content with a **frozen writer model**, a
**fail-closed gate** that decides whether a draft may be published, and an
**optimisation loop** that only keeps rulebook edits the evidence supports.

It is organised in two layers so that adopting it for a second brand is a
**copy**, not a refactor.

```
content-system/
├── method/                     ← PORTABLE. Copy this whole directory.
│   ├── FACT-GRADING.md              the dossier and the DOCUMENTED/TRADITIONAL/LEGEND grades
│   ├── QUOTATION.md                 attribution rules and the sourcing fallback order
│   ├── ATTRIBUTION-CASES.md         three verified misattribution cases
│   ├── GATE.md                      architecture, grading procedure, recording, output contract
│   ├── TRUTH-CHECKS.md              T1–T6 (copy) and I1–I4 (image)
│   ├── CHECK-DESIGN.md              how to write a check that composes with the gate
│   ├── VOICE-SCORE.md               exemplar anchoring, anti-pastiche, judge consistency
│   └── ANALYTICS.md                 the engagement handoff schema
└── instances/
    └── saint-match/            ← NOT portable. One brand's answers.
        ├── best_skill.md            voice, formats, bridge, image spec, CTAs
        ├── SCORER.md                the voice floors and brand checks
        ├── exemplars/               the gold sets, frozen
        ├── drafts/                  worked packs with full verdicts
        ├── analytics/               metrics.jsonl drop point
        └── BRIEF.md                 the original brief + prior-art case study
```

## The boundary

**The method is everything that would be true if the brand were selling
something else entirely.**

| | **METHOD** — portable | **INSTANCE** — per brand |
| --- | --- | --- |
| Facts | *That* every fact carries a grade, and what each grade permits | *Which* sources this brand's dossiers are built from |
| Quotation | The attribution rules and the fallback order when a subject left no writings | Which fallbacks exist in this domain (an order's constitutions, the Missal) |
| The gate | Truth is a **hard filter**, never blended with engagement; the floor and the score are kept apart | Which structural elements this brand's floor requires |
| Checks | The anatomy — Tests / PASSES / STOPS / Evidence — binary, fail-closed, scoped by a declared axis | The checks themselves: V1–V7, W1–W9, B1–B3, C1–C3, G1 |
| Truth checks | T1–T6 and I1–I4, mechanism and wording | What they are run against: this brand's dossiers and image spec |
| Voice score | Comparative ranking against exemplars; the anti-pastiche guard; the judge-consistency bar | The exemplar sets themselves, and how mature they currently are |
| Analytics | The schema, the `null` rule, the join key, the normalisation requirement | Where the file lands and what the subject field is called |
| Voice | — | All of it |

**The test, when something is ambiguous:** *would this sentence still be true for
a brand selling running shoes?* If yes, it is method. If it names a saint, a
format, a caption ending, an app feature or a hashtag, it is instance.

## How a second brand adopts this

1. **Copy `method/` unchanged.** Do not fork it, do not trim it, and do not
   rewrite its examples — the Catholic examples inside it are marked as
   illustrations and cost nothing to read past. A forked method is two methods
   within a month.
2. **Create `instances/<brand>/`** and supply the four things `GATE.md` lists at
   the end: a **voice floor**, the **declaration fields** that scope it, the
   **exemplar sets**, and a **join key plus a version field** on every artifact.
3. **Build the exemplar sets from shipped work, and freeze them.** This is the
   step that cannot be shortcut. A voice floor derived from one specimen is how
   the Saint Match instance ended up with a scorer that would have STOPped every
   correct draft — the whole realignment is recorded in `SCORER.md` §3 as a
   worked warning.
4. **Write the floor to `CHECK-DESIGN.md`.** Binary, evidence-required,
   fail-closed, scoped by a declared axis. If a proposed check needs the word
   "sufficiently", it is a voice-score axis and not a check.
5. **Collect at least one deliberate known-bad specimen** before trusting any
   voice score. Without one the judge-consistency bar cannot be established and
   the score cannot be used for anything.
6. **Do not re-derive the architecture.** §0 and §0.1 of `GATE.md` are the two
   decisions the whole system rests on, and both are the kind that look like
   over-engineering right up until the loop has quietly traded them away.

The Saint Match instance is a worked reference for all six steps, including the
mistakes — several superseded rules are left visible with their corrections
attached, on purpose.

## Portability notes

This folder is designed to be moved into a hub repository serving several brands.
Two couplings were removed to make that a clean copy:

- **The analytics path.** `method/ANALYTICS.md` resolves the metrics file as
  `<instance>/analytics/metrics.jsonl`, relative to the instance folder, never
  from a repository root.
- **The St Raymond Nonnatus carousel.** It was cited as a live relative path to
  assets in the Saint Match app repository. It is now a **described case study**
  in `instances/saint-match/BRIEF.md` — what it demonstrated, what it excluded
  and why — which stands without the files.

One coupling is deliberately kept: `instances/saint-match/` refers to
`../../method/` by relative path. That is a within-folder reference and it
survives any move of the folder as a whole.

## Where the section numbers live

The gate was one numbered document before the split, and **the numbering is
preserved** so that every cross-reference already written still resolves.
`method/README.md` maps each section number to the file that now holds it. Do not
renumber.

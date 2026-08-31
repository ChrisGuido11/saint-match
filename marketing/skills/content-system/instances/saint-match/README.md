# instances/saint-match/ — the Saint Match instance

> **Layer: INSTANCE.** Everything here is Saint Match's: its voice, its two post
> formats, its exemplars, its CTAs, its app bridge, the provenance of its style
> guidance. **None of it is portable** and none of it should be copied to another
> brand as though it were method. What *is* portable is in `../../method/`.

Saint Match is a Catholic virtue app — saint matching, daily micro-challenges,
novenas; "Duolingo for virtue". This folder is the content pipeline for its
organic social posts: a rulebook a frozen writer model reads, a scorer that gates
what it produces, worked drafts, and the voice exemplars both are measured
against.

## The files

| File / folder | Layer | What it is |
| --- | --- | --- |
| **`best_skill.md`** | instance | The rulebook. Voice, the two post formats, the theme bridge, the image prompt spec, the CTA blocks, the self-check. §2 and §7 point out to the method layer |
| **`SCORER.md`** | instance | The voice floors (V1–V7, W1–W9), the brand checks (B1–B3), the CTA checks (C1–C3), the bridge check (G1), and §9.5 on set maturity. The architecture, truth checks and output contract point out to the method layer |
| **`exemplars/`** | instance | The **Format A** gold set — six shipped captions from Notion, frozen |
| **`exemplars/format-b-saint-of-the-day/`** | instance | The **Format B** specimen set — seven items, six third-party, held for style study only |
| **`drafts/`** | instance | Worked post packs with full verdicts, showing the gate running on realistic material |
| **`analytics/`** | instance | The drop point for `metrics.jsonl`. Schema in `../../method/ANALYTICS.md` |
| **`BRIEF.md`** | instance | The original brief, plus the St Raymond Nonnatus prior-art case study |

## What is Saint Match's and could not be inherited

Named explicitly, because the boundary is easier to hold when the brand-specific
decisions are listed rather than implied:

- **The register**, on both formats — direct warm second person for Format A;
  plain unhurried third person for Format B.
- **The two formats themselves**, and the two Format B variants. Another brand
  will have different formats; what it inherits is that formats must be
  *declared* and scoped, not the specific ones.
- **The hinge.** Saint Match's hinge is the app's actual function — *the saint
  carried a specific thing, and the app matches a person to the saint who carried
  theirs.* The general move (perform the bridge, never state it) is closer to
  portable; the hinge as defined here is not.
- **The audience line as a struggle topic, not a demographic** (W7) — a
  deliberate divergence from the specimen it was learned from, because Saint
  Match matches on struggle and the specimen's account matches on demographic.
- **The CTA furniture** — the five attested engagement lines, the four
  app-mention pairs, the hashtag tiering. Verbatim strings from shipped posts.
- **The image style** — the two locked palettes, the named painters, the
  9:16 frame, the baked-in overlay type.
- **The Notion provenance.** §0.1 of `best_skill.md` records exactly which Notion
  pages the voice was read off, and `exemplars/README.md` records the fidelity of
  the extraction. That provenance is the reason the voice rules are evidence
  rather than taste, and it belongs to this brand alone.

## What this instance takes from the method layer

`../../method/`, unmodified: the fact grade (`FACT-GRADING.md`), quotation
discipline (`QUOTATION.md`), the attribution cases (`ATTRIBUTION-CASES.md`), the
gate architecture and output contract (`GATE.md`), the truth and image checks
(`TRUTH-CHECKS.md`), check design (`CHECK-DESIGN.md`), the voice score
(`VOICE-SCORE.md`) and the analytics interface (`ANALYTICS.md`).

Two of the three attribution cases were collected *here*, from specimens in
`exemplars/format-b-saint-of-the-day/`, and were promoted to the method layer
because the mechanisms they expose — a citation frame carried only by italics, a
misattribution containing no quotation marks — are not about saints.

## Current state, in one paragraph

Format A's voice is grounded in six shipped captions and is stable. Format B is
specified and its floor is confident about *shape*, but its specimen set is too
thin to rank on: seven items, only one of them Saint Match's own and that one
unshipped, so voice scoring runs in `shape-only` mode and variant B-2 cannot be
scored at all (`SCORER.md` §9.5). The `drafts/` set now includes the first live
Format B packs. No pack has been graded by an LLM judge, only by hand — whether
`SCORER.md` reproduces the hand verdicts when handed to a model is the first
thing worth measuring and it has not been measured.

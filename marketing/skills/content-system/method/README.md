# method/ — the portable layer

> **Everything in this directory is brand-agnostic and is meant to be copied
> whole.** Nothing here names a brand's voice, its formats, its CTAs, its
> product, or a path in this repository. If you find something that does, it is
> misfiled — move it to the instance and note the move.

This is the half of the system that a second brand adopts unchanged. The other
half — voice, formats, exemplars, CTAs, the product bridge, the provenance of the
style guidance — is per-brand and lives in `../instances/<brand>/`.

`../README.md` explains the boundary and how a second brand adopts this.

## The files

| File | What it holds | Why it is method |
| --- | --- | --- |
| **`FACT-GRADING.md`** | The dossier as the entire permitted factual universe; the DOCUMENTED / TRADITIONAL / LEGEND grades and the phrasing each permits | The unit the whole gate grades. Adopt this first; nothing else works without it |
| **`QUOTATION.md`** | Attribution rules, the fallback order when a subject left no writings, and the failure mode this exists to prevent | The highest-risk surface in any LLM-assisted pipeline, in any domain |
| **`ATTRIBUTION-CASES.md`** | Three verified misattribution cases, each defeating a different rule | The abstract rule catches none of these. Read with `QUOTATION.md` |
| **`GATE.md`** | The architecture (hard filter, never a blend), voice-floor vs voice-score separation, grading procedure, recording, output contract | The load-bearing structural decisions. Copy without changing a word |
| **`TRUTH-CHECKS.md`** | T1–T6 (copy) and I1–I4 (image), plus the I4 scope note | The checks the architecture protects |
| **`CHECK-DESIGN.md`** | How to write a check so it composes with `GATE.md` | Read before writing a brand's own voice floor |
| **`VOICE-SCORE.md`** | Exemplar-anchored comparative ranking, the anti-pastiche guard, the judge-consistency bar, the thin-set rule | How to measure writing quality without the measurement leaking into the gate or teaching pastiche |
| **`ANALYTICS.md`** | The engagement handoff schema and its rules | An interface, not a pipeline. Path-independent by construction |

## Where the section numbers live

The gate was one numbered document. **The numbering is preserved across the
split** so that every cross-reference already written — inside these files, in
the instance, and in any grade emitted so far — still resolves. Do not renumber.

| Section | File |
| --- | --- |
| §0 architectural rule, §0.1 floor vs score | `GATE.md` |
| §1 how to grade, fail-closed defaults | `GATE.md` |
| §2, T1–T6 | `TRUTH-CHECKS.md` |
| §3, §3A, §3B, §3B-ii, §3C — the voice floor and brand checks | **instance** — `../instances/saint-match/SCORER.md` |
| §4 CTA checks, §5 bridge check | **instance** — same file |
| §6, I1–I4, §6.5 | `TRUTH-CHECKS.md` |
| §7 recording the verdict | `GATE.md` |
| §8 output format | `GATE.md` |
| §9–§9.4 the voice score | `VOICE-SCORE.md` |
| §9.5 current set maturity and counts | **instance** — same file |

`FACT-GRADING.md` and `QUOTATION.md` keep the rulebook's numbering instead
(`best_skill.md` §1, §2 and §7 respectively), for the same reason.

## What an instance must supply

Listed in full at the end of `GATE.md`. In short: a **voice floor**, the
**declaration fields** that scope it, **exemplar sets**, and a **join key plus a
version field** on every artifact.

## Two things to check when adopting

1. **Does your gate have a check that reads unquoted claims?** Attribution Case 2
   is a misattribution containing no quotation marks. A gate that only inspects
   quoted strings passes it.
2. **Do you have at least one deliberate known-bad specimen?** Without one, the
   judge-consistency bar in `VOICE-SCORE.md` §9.4 cannot be established, and the
   voice score cannot be used for anything.

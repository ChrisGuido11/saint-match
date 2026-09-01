# GATE.md — the gate: architecture, procedure, recording, output

> **Layer: METHOD — portable, brand-agnostic.** Copy this file to a new brand
> unchanged. Nothing in it depends on Saint Match, on Catholic content, or on
> this repository's layout.

> **On the section numbers.** The gate is one numbered document split across
> several files; the numbering is **preserved from the original** so that every
> existing cross-reference (`§0.1`, `§1`, `§9.5`, "see §6.5") still resolves. The
> file each number lives in is mapped in `README.md`. Do not renumber.

> **Instance names appearing in the text below.** The prose was written inside
> the Saint Match instance and names its checks and fields. Read them as the
> general thing they are an example of:
>
> | Named in the text | Generally |
> | --- | --- |
> | **V1–V7**, **W1–W9** | the instance's **voice-floor checks**, one set per post format |
> | **B1–B3**, **C1–C3**, **G1** | the instance's brand, CTA and bridge checks |
> | **T1–T6**, **I1–I4** | the **method's own** truth and image checks — these travel unchanged |
> | **Format A / Format B**, **variant B-1 / B-2** | the instance's declared post formats and variants |
> | **`post_format`**, **`format_variant`** | the instance's declaration fields in the pack header |
> | **`best_skill.md`**, **`SCORER.md`**, `exemplars/…` | files in `../instances/saint-match/` |
> | **saint**, **dossier**, **feast**, **the Missal** | the instance's subject domain; the mechanics do not depend on it |

**What this file is.** The load-bearing architectural decisions of the grading
gate, the procedure for running it, and the contract for recording and emitting
a verdict. It is the part of a scorer that a second brand should adopt without
changing a word. What a second brand supplies for itself is its **voice floor** —
the checks that say whether a draft is on *its* brand — and its **exemplar
sets**.

Moved verbatim out of the Saint Match `SCORER.md` (§0, §0.1, §1, §7, §8). The
brand-specific floors stayed behind, in `../instances/saint-match/SCORER.md` §3–§5.

---

## 0. The architectural rule

**The truth gate is a hard filter. It is never traded off against engagement.**

There is no blended score. There is no "strong engagement offsets a weak
source". The order of operations is fixed and one-directional:

```
draft → truth / brand / CTA / bridge / iconography checks → PASS or STOP
                                                              |
                                        engagement selection runs ONLY here
                                        among drafts that already PASSED
```

Engagement data may be used to choose between two drafts that both passed, and
to decide whether a rulebook edit is kept. It may never lift a draft over the
gate, and it may never be averaged with a truth result.

**Why this is stated as architecture rather than as guidance.** A blended score
is trainable. Give the loop a number in which truth and reach are commensurable
and it will, entirely correctly by its own objective, learn the exact amount of
shading that maximises the blend — a slightly bolder claim, a legend asserted
rather than attributed, a quote that sounds like the saint. Each step is small,
each is rewarded, and hard rule #1 is gone within a few generations without any
single decision having broken it. Separating the filter from the objective is
the only structure in which that gradient does not exist. Keeping them separate
costs some reach. That is the intended trade and it is not revisited per post.

The corollary: **a STOP is never overridden by a scorer or a writer.** Only a
human, in writing, on the record, and the override is logged against the
`draft_id`.

### 0.1 Voice is judged by two mechanisms, and they are kept apart

Voice appears twice in this document, doing two different jobs. Conflating them
destroys both.

| | **Voice floor** (§3) | **Voice score** (§9) |
| --- | --- | --- |
| Shape | Binary — PASS / STOP | Continuous — 1 to 5 |
| Question | *Is this off-brand enough to stop?* | *Which rulebook version writes better?* |
| Part of the gate | **Yes.** A STOP here blocks publication. | **Never.** It cannot block anything. |
| Anchored on | Mandatory structural elements, present or absent | Comparison against the format's exemplar set |
| Consumed by | The writer, as a required rewrite | The SkillOpt loop, ranking `skill_version`s |

**The floor may never be expressed as a score, and the score may never enter the
verdict.** Both halves of that sentence are load-bearing:

- **A score that can block becomes a censor.** Once a 1–5 voice number can STOP
  a post, every borderline draft turns into an argument about a judge's taste,
  the threshold gets negotiated downward under delivery pressure, and a
  fully-sourced post dies because a model rated its warmth a 2. Worse, the same
  number is now commensurable with the truth result, which is the exact blending
  §0 exists to prevent — voice would have found the back door that engagement
  was locked out of.
- **A floor that is also a score becomes negotiable.** "The scripture block is
  missing, but the voice scored 4.5" is a sentence that must be impossible to
  say. Mandatory elements are mandatory: absent is absent, and absence does not
  average with anything.

So: the voice floor asks only *is the required element there*. It never asks *is
this good*. The voice score asks only *is this good, relative to this format's
exemplars*. It never gets a vote on publication. Neither one is derived from the other, and the
verdict block in §8 prints them in separate sections so they cannot be summed by
accident.

---

## 1. How to grade

1. Read the **source notes first**, before the caption. Grading the copy first
   invites you to go looking for justification for prose you already liked.
2. Build a claim list: every factual assertion in the overlay, the description
   caption and the image prompt.
3. Run every check in §2–§6. Run all of them; do not stop at the first STOP —
   the writer needs the full list.
4. Emit the verdict in the §8 format.
5. **Only if the verdict is PASS**, and only when the loop has asked for it,
   run the voice score in §9. It is a separate pass with a separate output and
   it changes nothing about step 4. A STOPped draft is not voice-scored, because
   ranking the prose of something that will never ship is wasted effort and
   invites the score to be read as a mitigation.

The voice floor checks (V1–V7 for Format A, W1–W9 for Format B — §3) are
**structural presence tests** and are run with the rest of the gate at step 3. Run them mechanically — count the words,
find the ✝️, match the app-mention pair against the table. Do not form an
opinion about the writing while running them; that is §9's job and it happens
later, separately, and only after a PASS.

**Before anything else, read the declared format and, on Format B, the declared
variant** from the header block (`post_format`, `format_variant`). Together they
select which voice floor runs — V1–V7 for Format A, W1–W9 for Format B with the
W-series scoped by variant — and which column of B1 and B2 applies. See §3.0.

- The format is **declared, never inferred**. A pack with no `post_format`, or
  with a value that is not `A-themed` or `B-saint-of-the-day`, is a **STOP**
  here, before any other check runs.
- **The variant is declared too.** A pack declaring `post_format:
  B-saint-of-the-day` with no `format_variant`, or with a value that is not
  `B-1-caption-carried` or `B-2-carousel-carried`, is a **STOP** here, on the
  same footing and for the same reason: the two variants disagree on caption
  length, on where the facts live and on what the hook slide must carry, so
  guessing which one is in front of you produces a confident misgrade rather than
  an error. A **Format A** pack carrying a `format_variant` value is also a STOP —
  one of the two fields is wrong and the grader cannot tell which.
- **Do not "correct" a declared format or variant that seems wrong for the
  draft.** If a pack declares Format B and reads like Format A, grade it as
  Format B and let it fail W1 and B1-B. If it declares B-1 and reads like B-2,
  grade it as B-1 and let it fail W1 and W5. That failure is the accurate one and
  it is the signal the loop needs. Silently regrading against the other format or
  variant hides the error.

> **Two things called B1 and B2.** The Format B **variants** are **B-1** and
> **B-2**, always hyphenated. The shared brand **checks** are **B1** (register)
> and **B2** (shape and ending), never hyphenated, and they run on both formats.
> This document writes "variant B-2" and "check B2" wherever ambiguity is
> possible; a grader should do the same.

**Fail-closed defaults**, applied without discretion:

- Missing dossier line for a claim → **STOP**. Not a judgement call, not "seems
  right", not "widely known". Absent evidence is failure.
- Missing or unreadable source notes → **STOP** for the whole pack.
- Grader cannot determine whether a check passes → **STOP**.
- Check not applicable → mark `N/A` with a reason. `N/A` is not `PASS` and must
  be justified in one line.

**Justifications that are sufficient as they stand**, and do not need rewriting
in fresh words on every pack. A bespoke justification is required where the
grader made a *judgement*; where the check simply cannot bite, boilerplate is the
honest answer and demanding novelty just produces novelty:

- `N/A — <format>` and `N/A — variant <v>`: the check belongs to a format or
  variant this pack is not.
- `N/A — no <surface> in the pack`: the check tests a surface this pack does not
  have. **"N/A — no scripture cited in the pack"** is the standing example: a
  format with no scripture block yields the same `N/A` for the same reason on
  every pack it ever produces, and a grader made to invent a fresh sentence each
  time is being asked to decorate, not to check.
- Anything else → one bespoke line saying why the check cannot bite **on this
  pack specifically**.

---

## 7. Recording the verdict

Every grade is recorded against the pack's `draft_id`, whether it passed or not.

- `draft_id` and `skill_version` are copied from the pack's header block
  unchanged. A pack whose header block is missing or malformed is a **STOP** at
  §1 before any other check runs, because an ungradeable draft cannot be
  attributed to a rulebook version.
- Because both are recorded, **PASS/STOP rate per `skill_version` is trackable**.
  That rate is a first-class signal for the loop: a rulebook edit that raises the
  STOP rate is a worse rulebook, independent of how the surviving posts perform.
  A rulebook that quietly gets looser will show up as *fewer* STOPs and worse
  spot-audits, so the rate is read alongside periodic human re-grading rather
  than on its own.
- STOPped drafts never reach a platform and so never appear in
  `analytics/metrics.jsonl`. The scorer's own records are the only place they are
  counted. Do not discard them.
- **The voice score (§9), where one was taken, is recorded against the same
  `draft_id` but in a separate field, never merged into the verdict and never
  averaged with a check result.** A record whose verdict is STOP carries no voice
  score at all. If a downstream consumer ever needs "the score" for a draft, the
  answer is that there are two numbers of different kinds and it must say which
  one it means.

---

## 8. Output format

```
VERDICT: PASS | STOP
draft_id:       <from header block>
skill_version:  <from header block>
post_format:    A-themed | B-saint-of-the-day
format_variant: B-1-caption-carried | B-2-carousel-carried | — (Format A)
graded_by:      <human name | judge model id>
graded_at:      <ISO 8601>

CHECKS
  T1 dossier coverage      PASS | STOP | N/A — <evidence>
  T2 grade-appropriate     PASS | STOP | N/A — <evidence>
  T3 quotation             PASS | STOP | N/A — <evidence>
  T4 scripture             PASS | STOP | N/A — <evidence>
  T5 feast / rank / bio    PASS | STOP | N/A — <evidence>
  T6 exclusions declared   PASS | STOP | N/A — <evidence>
  V1 scripture block       PASS | STOP | N/A — <evidence>
  V2 cross separator       PASS | STOP | N/A — <evidence>
  V3 engagement line       PASS | STOP | N/A — <evidence>
  V4 app-mention pair      PASS | STOP | N/A — <evidence>
  V5 hashtags              PASS | STOP | N/A — <evidence>
  V6 ending order          PASS | STOP | N/A — <evidence>
  V7 slide structure       PASS | STOP | N/A — <evidence>
  W1 caption 40-70 (B-1)   PASS | STOP | N/A — <evidence>
  W2 hinge                 PASS | STOP | N/A — <evidence>
  W3 invocation ending     PASS | STOP | N/A — <evidence>
  W4 no product pitch      PASS | STOP | N/A — <evidence>
  W5 facts graded          PASS | STOP | N/A — <evidence>
  W6 numbered promise      PASS | STOP | N/A — <evidence>
  W7 audience = struggle   PASS | STOP | N/A — <evidence>
  W8 caption minimal (B-2) PASS | STOP | N/A — <evidence>
  W9 carousel carries it   PASS | STOP | N/A — <evidence>
  B1 register              PASS | STOP | N/A — <evidence>
  B2 shape and ending      PASS | STOP | N/A — <evidence>
  B3 promises              PASS | STOP | N/A — <evidence>
  C1 approved pattern      PASS | STOP | N/A — <evidence>
  C2 banned register       PASS | STOP | N/A — <evidence>
  C3 saint not leverage    PASS | STOP | N/A — <evidence>
  G1 bridge                PASS | STOP | N/A — <evidence>
  I1 attributes sourced    PASS | STOP | N/A — <evidence>
  I2 no contradiction      PASS | STOP | N/A — <evidence>
  I3 legend not depicted   PASS | STOP | N/A — <evidence>
  I4 type zone / frame     PASS | STOP | N/A — <evidence>

REQUIRED REWRITES
  1. <check id> — <what must change, concretely>
  2. ...

NOTES
  <anything the grader wants on the record, including N/A justifications>
```

Rules for the emitted grade:

- **Every check gets a line, both formats' and both variants' lines included.**
  The seven V lines and the nine W lines are always printed; one set carries
  verdicts and the others carry `N/A — Format A` / `N/A — Format B` / `N/A —
  variant B-1` / `N/A — variant B-2`. Do not delete the inapplicable block. A
  grader who prints only the applicable set makes it impossible to tell a check
  that was N/A by format or variant from one that was silently skipped — and on
  Format B, where the W-series is split across two variants, that distinction is
  the only thing standing between a correct grade and a silent misgrade.
- **The `— (Format A)` in the `format_variant:` line is a placeholder, not a
  value.** On Format A the grade prints `format_variant: — (Format A)`; the em
  dash means "this axis does not apply here". **Do not copy an em dash into a
  pack's own header block** — §3.1 of the instance rulebook says a Format A pack
  **omits** the field entirely, and a Format A pack carrying any
  `format_variant` value is a STOP. The verdict block and the pack header are two
  different artifacts with two different rules: the verdict prints every line so
  that a skipped check is distinguishable from an inapplicable one, and the
  header carries only the fields that apply.
- **Any single STOP makes the verdict STOP.** There is no count, no threshold, no
  majority. One is enough. This is identical on both formats.
- Every check gets a line, including passing ones, and every line carries
  evidence. "PASS" with no evidence is treated as ungraded, which is a STOP.
- Required rewrites are concrete and actionable: name the sentence, name the
  replacement or name the dossier line that would be needed. "Improve the tone"
  is not a rewrite note.
- **The verdict block never contains a numeric score.** Introducing one
  recreates the blending this document exists to prevent. The voice score of §9
  is emitted in its own block, below, under its own heading, and only when the
  verdict is PASS. It is not part of the grade and never appears on the
  `VERDICT:` line.

When a voice score has been taken, it is appended as a **separate block** after
the verdict, never inside it:

```
--- NOT PART OF THE VERDICT ---

VOICE SCORE (ranking signal only — cannot block publication)
draft_id:        <same>
skill_version:   <same>
post_format:     A-themed | B-saint-of-the-day
format_variant:  B-1-caption-carried | B-2-carousel-carried | — (Format A)
exemplar_set:    exemplars/ | exemplars/format-b-saint-of-the-day/ (positives of the matching variant only)
judge:           <model id + prompt version>
rank_position:   <n> of <set size + 1>
voice_score:     <1–5>
variety_score:   <1–5>
nearest_exemplar: <filename>  — <the specific move it shares>
weakest_axis:    <which of the §9.2 axes scored lowest, and why>
judge_agreement: <n of m judges within 1 point>
set_maturity:    ranked | shape-only (Format B, set too thin — §9.5)
```

`exemplar_set` must match `post_format` **and `format_variant`**. **A Format B
post scored against the Format A gold set is a void measurement**, not a low one:
it would be marked down for lacking a scripture block it is correct not to have.
The same holds one level down — a B-2 caption ranked against B-1 captions is
void, because it would be marked down for being fourteen words, which is what
its variant requires. The **negative specimens are never referents for ranking**;
their use is as known-bad anchors for the judge-consistency bar in §9.4.

---

## What an instance must supply

The four things this file refers to and does not define:

1. **A voice floor** — binary presence/absence checks for its own mandatory
   structural elements, one set per declared post format. See `CHECK-DESIGN.md`
   for how to write them, and `../instances/saint-match/SCORER.md` §3 for a worked
   set of two (V1–V7 and W1–W9).
2. **Declaration fields in the pack header** — whatever axes select which
   subset of checks runs. They are **declared, never inferred** (§1), and a pack
   that omits one is a STOP before any other check runs.
3. **Exemplar sets**, one per format and per variant, for the voice score
   (`VOICE-SCORE.md`).
4. **A join key and a version field** on every pack — `draft_id` and
   `skill_version` in this instance — without which §7 cannot attribute a metric
   or a verdict to a rulebook version.

Everything else in this file, in `TRUTH-CHECKS.md`, in `FACT-GRADING.md`, in
`QUOTATION.md`, in `CHECK-DESIGN.md`, in `VOICE-SCORE.md` and in `ANALYTICS.md`
transfers as-is.

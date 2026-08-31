# VOICE-SCORE.md — the ranking signal: exemplar anchoring, anti-pastiche, judge consistency

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

**What this file is.** How to measure whether a rulebook edit made the writing
better, without that measurement leaking into the gate and without it teaching
the loop to write pastiche.

**Three ideas here are worth more than the rest, and they are the reason this is
method:**

1. **Anchor on exemplars, never on adjectives** (§9.2). An LLM asked "how
   reverent is this, 1–5?" answers 4 for almost anything. The distribution
   collapses and the number stops discriminating, which was its only job.
   Comparative judgement against fixed referents is stable because the referents
   do not move.
2. **The anti-pastiche guard** (§9.3). Optimising similarity-to-a-fixed-set
   converges on the safest common denominator of that set. This is not a risk to
   watch for; it is the predictable behaviour of the mechanism, so it must be
   designed against with a variety term that is **reported alongside, never
   averaged into**, the voice score.
3. **The judge-consistency bar** (§9.4). Voice judgement is noisy in a way truth
   judgement is not. A noisy signal treated as clean is how a loop learns from
   nothing. The bar — m ≥ 3 runs, ⅔ within a point, and reproduction of a
   **known ordering** against a deliberately off-voice control — must be
   established before the score drives any edit, and re-established whenever the
   judge model or prompt changes.

Moved verbatim out of the Saint Match `SCORER.md` (§9 preamble, §9.1–§9.4). The
instance keeps §9.5, which is the *current state* of its own specimen sets —
counts, which sets are rankable, which are anchors — because that changes as it
collects specimens and is not portable.

---

## 9. The voice score — a ranking signal, never a gate

Everything in this section is **outside the gate**. Nothing here can STOP a
draft, and nothing here may be combined with anything in §2–§6. If you are
reading this section to decide whether a post may be published, you are in the
wrong section: that decision was made in §8 and it is final.

**What it is for.** The SkillOpt loop needs to know whether an edit to
`best_skill.md` made the writing better. PASS/STOP rate (§7) tells you whether a
rulebook version produces *publishable* posts; it says nothing about whether it
produces *good* ones, because the floor is a floor. The voice score is the
ordinal signal that fills that gap, and it exists to rank `skill_version`s
against each other — never to rank a post against a bar.

### 9.1 Score each format — and each Format B variant — against its own set

| Format / variant | Referents usable for ranking | Size |
| --- | --- | --- |
| A — themed long-form | `exemplars/` | 6 |
| B, variant **B-1** | `01-REFERENCE-ewtn-st-clare`, `02-st-raymond-nonnatus` | 2 — see §9.5 |
| B, variant **B-2** | `03-REFERENCE-ewtnparents-st-monica` | **1** — see §9.5 |
| — | `04` Calasanz, `05` Augustine Institute, `06` Queenship, `07` Bernard | **not referents.** Known-bad / known-middling / mixed anchors for the §9.4 consistency bar only |

**Never score a Format B post against the Format A exemplars, or the reverse.**
The two formats disagree on almost every surface feature — length, person,
ending, emoji, hashtags — so a cross-format comparison measures the format
difference and nothing else. It would reliably rate correct Format B posts as
poor, and it would do so with confident, plausible-sounding reasons, which is
the worst kind of bad measurement. The `exemplar_set` field in the output block
exists to make a cross-format score visible after the fact.

**And never score across variants.** A B-2 caption is fourteen words with no
fact in it; ranked against the B-1 captions it is last every time, for being
correct. `format_variant` is recorded in the voice-score block for the same
after-the-fact reason.

**The negatives are not referents.** `04` and `05` are craft counter-examples,
`06` is a middling one, and `07` is mixed — a strong performer that carries a
misattribution and an opener this scorer STOPs. Do not put any of them in a
forced ranking as though they were gold. Their value is in §9.4: a judge that
cannot rank `04` last is a judge whose scores are discarded.

### 9.2 Anchor on exemplars, not on adjectives

**Do not ask a judge to rate a draft against words like "reverent", "warm" or
"urgent".** Absolute rating against adjectives is the failure mode this design
exists to avoid: an LLM asked "how reverent is this, 1–5?" answers 4 for almost
anything, the distribution collapses, and the score stops discriminating between
rulebook versions — which is its only job. The number looks like a measurement
and carries no information.

Ask a **comparative** question instead, with the exemplars in the context window
as the referents:

1. **Odd-one-out.** Present the draft shuffled among the format's exemplars,
   unlabelled. Ask which one was not written by the same hand, and why. A draft
   that is not identified is at the top of the scale. A draft identified
   immediately, with a specific reason, is not.
2. **Forced ranking.** Ask the judge to rank all *n+1* captions best-to-worst as
   examples of this account's voice. Record `rank_position`. Ordinal data from a
   forced ranking is far more stable across sessions than an absolute rating,
   because the referents are fixed and cannot drift.
3. **Nearest neighbour.** Ask which exemplar the draft is closest to and **what
   specific move they share** — a named opening formula, a beat paragraph, a
   hinge of the same kind. "It feels similar" is not an answer; the shared move
   must be nameable. This is what makes the score auditable rather than a vibe
   with a number attached.

`voice_score` (1–5) is derived from `rank_position`, not asked for directly.
Placing last of seven is 1; placing mid-set is 3; being unidentifiable in the
odd-one-out test and ranking in the top third is 5.

**Per-format axes**, used only to explain a score, never summed into one:

- **Format A:** opening formula; beat paragraphs; concreteness and named
  specifics; the turn landing on the reader and resolving; affirming ending.
- **Format B, variant B-1:** economy; the hinge's strength and non-obviousness;
  the fact carrying real weight; the invocation landing cleanly.
- **Format B, variant B-2:** the pull of the numbered promise; how sharply the
  audience line names a struggle; whether the teachings are genuinely distinct
  from each other rather than one idea cut four ways; the caption getting out of
  the way.

**On both Format B variants, do not put weight on "ends on the invocation" as an
axis.** Every correct post does it, and the `06` specimen shows a devout ending
on an inert post. It discriminates nothing.

Report the **weakest axis** with the score. The axis is the actionable part; the
number is only for ordering.

### 9.3 The anti-pastiche guard

**Optimising voice-similarity converges on formulaic output.** This is the
predictable failure of the whole mechanism and it must be designed against
rather than watched for. A loop rewarded purely for resembling six fixed
captions learns the safest common denominator of those six: it will open on a
negated assumption every time because that scores well, use the same beat-
paragraph rhythm, reach for the same three hook formulas, and produce posts that
are individually good and collectively interchangeable. Similarity to a fixed set
is maximised by **repetition**, and an audience reads repetition as a template.
Engagement then decays for a reason the voice score cannot see, because by its
own measure everything is improving.

So the score is **explicitly tempered by a variety term**, and `variety_score`
is reported alongside `voice_score` — never averaged into it, for the same
reason truth is not averaged with reach.

**How variety is measured**, against the last 30 published posts of the same
format, not against the exemplars:

- **Opening-formula distribution.** Which of the attested openers each post used.
  Measure the spread — a run where one formula exceeds ~50% is flagged. This is
  the cheapest and most diagnostic signal.
- **Structural n-gram overlap.** Character 5-gram or token trigram Jaccard
  similarity between each new caption and each of the last 30. A rising *maximum*
  pairwise similarity means the writer is converging on a template; a rising
  *mean* means the whole run is flattening. Both are computed without a model.
- **Opening-line and closing-line uniqueness.** Exact and near-duplicate first
  and last sentences across the run. These are where templating shows first.
- **Hinge-type repetition (Format B).** Classify each hinge — object, word,
  action, place, absence — and track the distribution. Two consecutive posts
  hinging on the same type is a flag; three is a finding.
- **Lexical entropy** over content words per run, as a coarse backstop.

**How it is used:** `variety_score` gates *the loop*, not the post. A rulebook
edit that raises mean `voice_score` while lowering `variety_score` is
**rejected**, because it has learned pastiche rather than voice. A single post's
variety score is not a reason to do anything to that post — it has already
passed or stopped on the gate, and variety is a property of a run, not of a
caption.

**The deeper limitation, recorded rather than solved:** a fixed gold set can only
ever measure similarity to the past. It cannot reward a genuinely better post
that does something none of the six does — that post is *more* likely to be
identified as the odd one out, and the loop will score it down. So the voice
score is a **guard against drift, not a search for improvement.** Real
improvement in this voice comes from the user shipping new posts and the gold
set being deliberately re-baselined (`exemplars/README.md`), not from the loop
climbing this number. Do not let a high voice score be read as evidence that the
writing is getting better; it is evidence that it is not getting worse.

### 9.4 Voice judgement is noisier than truth judgement

T1–T6 are close to deterministic: a claim either maps to a numbered dossier line
or it does not, and two competent graders agree almost always. Voice judgement is
not like that. It varies with prompt phrasing, with exemplar ordering in the
context window, with the model version, and with the same judge run twice.

Treating a noisy signal as if it were a clean one is how a loop learns from
nothing. So:

**The voice score must clear a judge-consistency bar before it is allowed to
drive any rulebook edit.**

- **Establish the bar before using the score at all.** Score a held-out set with
  **m ≥ 3 independent judge runs** — different sessions, shuffled exemplar order,
  ideally more than one model. Record `judge_agreement` as the number of runs
  landing within 1 point.
- **The bar:** at least **⅔ of runs within 1 point**, and — the part that
  actually matters — the judge must reproduce a **known ordering**. Include a
  deliberately off-voice caption (a `drafts/` pack, which is off-voice by
  construction, or a Format A caption submitted as Format B) and confirm the
  judge ranks it last. A judge that cannot separate a known-bad caption from the
  gold set cannot separate two rulebook versions, and its scores are discarded.
- **Below the bar, the score is recorded and ignored.** It is never used to
  accept or reject a rulebook edit. Keep collecting it; a signal too noisy to act
  on today may clear the bar with a better judge prompt.
- **Above the bar, act only on differences larger than the noise.** A 0.2
  difference in mean voice score between two `skill_version`s, measured with
  ±1-point judge spread, is not a result. Require a margin exceeding the observed
  judge disagreement, over a meaningful number of posts, before an edit is kept
  on voice grounds.
- **Re-establish the bar whenever the judge model or prompt changes.** The
  consistency measured is a property of that judge, not of this document, and it
  does not transfer.
- **Never** let a noisy voice score outvote the PASS/STOP rate of §7, which is a
  clean signal from a near-deterministic gate. Where they disagree, the gate is
  right.

---

## The thin-set rule, stated generally

`§9.5` in the instance is a specific application of a general rule, and the
general rule is the part that travels:

> **A forced ranking needs referents. Below roughly four or five per format, a
> voice score has too little resolution to accept or reject a rulebook edit, and
> it must not be used to.** Run in a **`shape-only`** mode instead: record the
> nearest exemplar and the weakest axis, which stay useful as qualitative notes,
> and either omit the number or emit it marked unusable. Against a **single**
> referent, do not emit one at all.

Two corollaries that also travel:

- **Adding referents is a re-baselining event, not an improvement.** Record it,
  and treat scores from before and after as belonging to different scales.
- **Engagement figures are not referents.** They are informative about *what*
  makes a post work and are not a ranking scale, because they carry every
  confound of the accounts and subjects they came from. And **normalise before
  comparing**: if one draft drew an intrinsically more popular subject than
  another, a rulebook version can win on nothing.

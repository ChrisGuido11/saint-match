# SCORER.md — the gate

Grades one post pack produced under `best_skill.md`. Usable by a human reviewer
or by an LLM judge. **It fails closed:** anything not affirmatively established
is a STOP.

The scorer does not improve drafts. It does not rank them. It answers one
question — *may this be published* — and, when the answer is no, says exactly
what would have to change.

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

---

## 2. TRUTH checks

Gated on the dossier. Every one of these is binary.

### T1 — Every claim has a dossier line

- **Tests:** each factual assertion in the pack maps to a numbered dossier line.
- **PASSES:** every claim on the claim list has a line and a grade.
- **STOPS:** one or more claims have no line. **Automatic** — the grader does not
  assess whether the claim is true.
- **Evidence:** claim → dossier line number, for every claim. Unmatched claims
  listed verbatim.

### T2 — Grade-appropriate phrasing

- **Tests:** how each claim is worded against its grade (`best_skill.md` §2).
- **PASSES:** DOCUMENTED asserted plainly; TRADITIONAL attributed to who holds
  it; LEGEND framed so a reader can tell it is a story — "the tradition
  remembers", "legend gives him".
- **STOPS:** a LEGEND asserted as fact; a LEGEND anywhere in a caption overlay; a
  TRADITIONAL claim stated flatly; a LEGEND doing the load-bearing work of the
  post such that removing it collapses the post.
- **Evidence:** the sentence as written, its grade, and the phrasing rule broken.

### T3 — Quotation attribution

- **Tests:** every quoted string.
- **PASSES:** each quotation is either (a) from the saint's own writings, with a
  citation to work and locus; (b) from the order's rule or constitutions, from
  scripture, from a named later author, or from the Missal, and attributed to
  that source and not to the saint; or (c) speech recorded by a named
  contemporary, graded TRADITIONAL and phrased as recorded testimony.
- **STOPS:** any quotation attributed to a saint who left no writings; any
  quotation whose citation is absent, vague ("attributed to"), or unverifiable;
  any paraphrase presented inside quotation marks; any altered liturgical text.
- **Evidence:** each quotation verbatim, its claimed source, its dossier line.
- **Note for the grader:** this is where an LLM writer fails most often and most
  fluently. A quotation that fits the theme perfectly and has no citation is the
  characteristic signature of invention, not a coincidence. Aptness raises
  suspicion; it never substitutes for a source.

### T4 — Scripture integrity

- **Tests:** each scripture citation — wording, reference, and context.
- **PASSES:** reference is book/chapter/verse and correct; wording matches a
  named translation used consistently across the pack; the sense in the post is
  the sense in the passage.
- **STOPS:** wrong reference; conflated verses; a translation swapped mid-pack; a
  verse whose meaning in context differs from its use in the post — including
  when every word is correct.
- **Evidence:** the citation, the translation named, and one line on how the
  surrounding verses were checked.

### T5 — Feast, rank and biography

- **Tests:** feast date, liturgical rank, order, offices held, dates of birth,
  death, beatification and canonisation.
- **PASSES:** each is present in the dossier and reproduced exactly.
- **STOPS:** any date, rank or office that differs from the dossier, or that
  appears in the pack but not in the dossier. Includes ranks the saint never
  held — the Raymond Nonnatus cardinalate is the standing example.
- **Evidence:** each datum as written, next to its dossier line.

### T6 — Exclusions are declared

- **Tests:** the "excluded and why" list in the source notes.
- **PASSES:** the list exists and names at least the known false or contested
  claims attached to this saint.
- **STOPS:** the list is absent; or the grader knows of a well-known false claim
  about this saint that is neither excluded nor addressed.
- **Evidence:** the exclusion list, plus any known false claim it omits.

---

## 3. VOICE FLOOR — brand and structure

Every check in this section is a **presence or absence test**, run mechanically.
None of them rates quality. See §0.1.

**This whole section supersedes the old Raymond-derived brand checks.** Under
the old §5 this scorer failed any emoji, demanded a 120–200 word caption closing
on an invocation with the hardest line last, and banned "comment AMEN". All four
are wrong for Format A: the bible **requires** the ✝️ separator and emoji in the
engagement line, sets 200–500 words, has **no invocation slot at all**, ends
affirming rather than hard, and uses "Type AMEN" as its standing engagement line
on every post. A scorer holding the old rules would STOP every correct draft.

### 3.0 Two formats, and two Format B variants. Read this before running anything in §3.

There are two documented post formats and **they have different voice floors**.
Running one format's floor against the other is the same class of bug this
realignment exists to fix, pointed the other way. Within Format B there are two
**variants**, and running one variant's checks against the other is that same bug
again at one level down.

| | **Format A — themed long-form** | **Format B — saint of the day** |
| --- | --- | --- |
| Source | The Notion style bible; `exemplars/` | The user's stated spec; `exemplars/format-b-saint-of-the-day/` |
| When | Themed and scriptural posts | **The standard for daily saint posts** |
| Body | 200–500 words | **~40–70 words (B-1) / ~8–25 words (B-2)** |
| Person | Sustained second person | **Third person** |
| Ending | Scripture → ✝️ → engagement → app mentions → hashtags | **"St [Name], pray for us."** — both variants |
| Bridge | Stated in the internal block, felt in the caption | **Performed, never stated** — as a hinge (B-1) or as a numbered promise to a named audience (B-2) |
| CTA | Engagement line + app-mention pair | **No pitch at all.** |
| Floor checks | **V1–V7** | **W1–W9**, scoped by variant |

**The two Format B variants** (`best_skill.md` §4.4.1) differ on one axis:
which surface carries the teaching.

| | **B-1 — caption-carried** | **B-2 — carousel-carried** |
| --- | --- | --- |
| `format_variant` | `B-1-caption-carried` | `B-2-carousel-carried` |
| Caption | 40–70 words: fact → hinge → invocation | 8–25 words: framing question → invocation |
| Teaching lives in | The caption | The carousel |
| Hook slide | Not specified | **Numbered promise + named audience** |
| Facts in the caption | **Exactly one** | Effectively none — they are in the slides |
| Opening question | **Banned** (B1-B) | **Required** (W8) |
| Floor checks | W1–W5 | W2–W5 (variant parts) + **W6–W9** |

**The format and the variant are declared, not inferred.** The pack header block
carries both. A pack whose format is missing, malformed, or not one of the two —
or whose Format B variant is missing or malformed — is a **STOP at §1**, before
any voice check runs. Grading a draft against a guessed format or variant is how
a correct post gets rejected for lacking an element it is correct not to have.
Do not infer the format from the draft's length or from whether it happens to
have a scripture block, and do not infer the variant from how long the caption
is; that reasoning is circular, because those are the very things under test.

**Applicability, exhaustively:**

| Checks | Format A | Format B, variant B-1 | Format B, variant B-2 |
| --- | --- | --- | --- |
| T1–T6 truth | **run, unchanged** | **run, unchanged** | **run, unchanged** |
| I1–I3 iconography | **run, unchanged** | **run, unchanged** | **run, unchanged** |
| I4 type zone / frame | run | run | run — on the **hook slide** |
| V1–V7 voice floor | run | **`N/A — Format B`** | **`N/A — Format B`** |
| W1 caption length 40–70 | **`N/A — Format A`** | run | **`N/A — variant B-2`**, superseded by W8 |
| W2 hinge | **`N/A — Format A`** | run, caption form | run, carousel form |
| W3 invocation ending | **`N/A — Format A`** | run | run |
| W4 no product pitch | **`N/A — Format A`** | run | run |
| W5 fact grading | **`N/A — Format A`** | run, one-fact form | run, per-slide form (**no one-fact count**) |
| W6 numbered promise | **`N/A — Format A`** | **`N/A — variant B-1`** | run |
| W7 audience named | **`N/A — Format A`** | **`N/A — variant B-1`** | run |
| W8 caption minimal | **`N/A — Format A`** | **`N/A — variant B-1`** | run |
| W9 carousel carries it | **`N/A — Format A`** | **`N/A — variant B-1`** | run |
| B1 register | run, Format A column | run, Format B column | run, Format B column + the B-2 question carve-out |
| B2 shape and ending | run, Format A column | run, B2-B variant B-1 part | run, B2-B variant B-2 part |
| B3 promises | run | run | run |
| C1 CTA pattern | run | **`N/A — Format B`**, superseded by W4 | **`N/A — Format B`**, superseded by W4 |
| C2 banned register | run | run | run |
| C3 saint not leverage | run | run | run |
| G1 bridge | run, stated form | run, hinge form (W2 is the strict test) | run, hinge form (W2 is the strict test) |

`N/A` normally demands a bespoke one-line justification (§1). **Format and
variant mismatch is the single exception**: writing `N/A — Format B` or `N/A —
variant B-1` is a complete and sufficient justification, because both were
declared in the header and verified at §1. Every other `N/A` still needs its
reason.

**A STOP is a STOP whichever floor produced it.** The floors differ in content,
never in force. None of them is the "lighter" one; Format B is shorter, not
laxer, its hinge test (W2) is the hardest single judgement in this document, and
variant B-2 is not a relaxation of B-1 — it moves the load from the caption to
the carousel and is graded on the surface that carries it.

**The two directions this scoping can fail, both of which STOP a correct post:**

- Running **W1** (40–70 words) or **W5**'s exactly-one-fact count against a
  **B-2** post. A correct B-2 caption is fourteen words and carries no fact; the
  facts are in the slides. Both would fire, both would be wrong.
- Running **W6–W9** against a **B-1** post. A correct B-1 post has no numbered
  promise, no audience line and a caption that is *supposed* to carry the
  teaching. All four would fire, all four would be wrong.

Also note **B1-B's ban on a rhetorical opening question is variant B-1 only** —
in B-2 the framing question is the required caption form. That carve-out is
written into B1-B and must not be dropped when the check is quoted.

---

## 3A. Format A voice floor — V1–V7

**Run only when the declared format is A.** For Format B, record every V check
as `N/A — Format B` and go to §3B.

Against `best_skill.md` §§4, 5 and 9, which are **sourced from the Notion style
bible**, and against the six shipped captions in `exemplars/`. Grade against
those, not against general taste and not against the Raymond caption — which
`best_skill.md` §5.6 itemises as off-voice in seven specific ways.

### V1 — Scripture block present and correctly placed

- **Tests:** the closing scripture block (`best_skill.md` §5.4).
- **PASSES:** the caption body is followed by the verse quoted **in full**, then
  its reference as `Book Chapter:Verse`. A `SCRIPTURE:` label is present *or*
  deliberately dropped with the verse standing alone — both are attested
  (`exemplars/01`, `02` carry the label; `04`, `05`, `06` do not; `03` uses
  `ALWAYS REMEMBER:`). The label is configurable; the block is not.
- **STOPS:** no scripture block; a reference with no verse text; a verse with no
  reference; the block placed anywhere other than immediately after the body and
  immediately before the ✝️.
- **Evidence:** the block quoted verbatim.
- **Note:** V1 is presence and placement only. Whether the verse is *correctly
  quoted and in context* is T4, and T4 is the strict one. A block that exists but
  misquotes passes V1 and STOPS at T4.

### V2 — The ✝️ separator

- **Tests:** the separator between the scripture block and the engagement line.
- **PASSES:** a single ✝️ on its own line, in that position.
- **STOPS:** absent; replaced with a rule, a dash, or another emoji; more than
  one; positioned elsewhere.
- **Evidence:** the three lines around it.

### V3 — Engagement line, verbatim

- **Tests:** the one line immediately after the ✝️, against `best_skill.md` §9.1.
- **PASSES:** exactly one engagement line, and it is one of the five attested
  wordings used **verbatim, emoji included**:
  - "Type AMEN if this hit home ✝️"
  - "Comment AMEN if you needed this today 🙏"
  - "Type AMEN if this spoke to your soul 🙏🔥"
  - "Type AMEN if you believe the saints are praying for you right now 🙏🔥"
  - "Drop a 🙏 if this hit home"
- **STOPS:** absent; more than one; an invented variant, however close; the
  wording right but the emoji dropped or swapped; placed anywhere but directly
  after the ✝️.
- **Evidence:** the line verbatim, and which of the five it matches.
- **Note:** "Type AMEN" and "Comment AMEN" are **explicitly permitted here** and
  are not engagement bait for the purposes of C2. They are the user's own shipped
  convention across all six exemplars, which makes them on-voice by definition.
  Any earlier reading of this document that treated them as a STOP is withdrawn.

### V4 — App-mention pair, verbatim, and nowhere else

- **Tests:** the two lines after the engagement line, against `best_skill.md`
  §9.2, plus every other line of the caption and every on-image overlay string.
- **PASSES:** exactly two app-mention lines, matching one of the four attested
  pairs as a pair, sitting immediately before the hashtags; **and** the app is
  named nowhere else — not in the body, not in any slide overlay, not in the
  image prompt's rendered text.
- **STOPS:** absent; only one line; a mixed pair drawn from two different rows;
  a reworded line; the pair placed above the hashtags but below them in order;
  the app named anywhere above these two lines or in any on-image text.
- **Evidence:** both lines verbatim, the row they match, and the result of
  searching the body and all overlays for the app name.

### V5 — Hashtag block and tiering

- **Tests:** the final block, against `best_skill.md` §9.4.
- **PASSES:** present, last, after the app-mention pair, never inline in the
  body; **15–20 niche-relevant tags** drawn across the three tiers; then **3–5
  buried trending tags** placed last.
- **STOPS:** no hashtags; fewer than 15 or more than 20 niche tags; no buried
  trending tags, or more than 5; hashtags appearing inside the body; the trending
  tags placed anywhere but last.
- **Evidence:** the tag count in each group, and the trending tags listed.
- **Note:** the buried trending tags are **not** expected to match the post's
  topic — that is stated convention, not an error, and `best_skill.md` §9.4 flags
  it as the one rule that trades relevance for reach. Do not STOP a post for an
  off-topic trending tag. Do not let that licence spread to the niche 15–20,
  which must be relevant. Hashtag **casing is not scored** — the gold set is
  inconsistent about it (`exemplars/README.md`).

### V6 — Ending order, exactly

- **Tests:** the order of the closing blocks.
- **PASSES:** body → scripture block → ✝️ → engagement line → app-mention line 1
  → app-mention line 2 → niche hashtags → buried trending hashtags. Nothing
  interleaved, nothing after the hashtags.
- **STOPS:** any two blocks transposed; anything inserted between them; anything
  printed after the hashtags — **including an invocation**. There is no
  invocation slot in a **Format A** caption. A "N., patron saint of X, pray for
  us" line at the end of a Format A *caption* is a STOP; the same line as the
  final *carousel slide* on a feast-day post is permitted by `best_skill.md`
  §4.3 and is not a caption element.
- **Scope warning:** this STOP is Format A only. In **Format B the invocation is
  mandatory and is the required last line** (W3). If you are running V6 against a
  Format B draft, you are running the wrong floor — go back to §3.0.
- **Evidence:** the block order as found, listed.

### V7 — Slide structure

- **Tests:** the slide plan and the caption overlay block, against
  `best_skill.md` §4.
- **PASSES:** 9:16 (1080 × 1920); 5–7 slides; **one idea and 5–15 words per
  slide**; at least one cliffhanger slide whose text ends mid-thought on an em
  dash or ellipsis, positioned at **slide 3 or 4**; a landing slide that carries
  the scripture, the punchline or the call and reads standalone.
- **STOPS:** 4:5 or any aspect ratio other than 9:16; fewer than 5 or more than 7
  slides; any slide over 15 words or carrying two ideas; no cliffhanger; the
  cliffhanger present but not at slide 3 or 4; a landing slide that does not
  stand alone. Also STOPS: the five fixed liturgical slide roles of the Raymond
  post used as though they were the default — they are a permitted *variant*
  (§4.3), and taking the variant never relaxes 9:16, the 5–7 count, or the 5–15
  word limit.
- **Evidence:** slide count, per-slide word counts, the cliffhanger slide number
  and its final characters, the landing slide quoted.
- **N/A:** for `reel` format, which is a single image — record `N/A` and check
  instead that there is exactly one overlay block with one highlight word.

---

## 3B. Format B voice floor — W1–W9

**Run only when the declared format is B.** For Format A, record every W check as
`N/A — Format A`.

Format B is the **saint-of-the-day post, and it is the standard for daily
posts**. It is a different register from Format A, not a compressed version of
it. It has **two variants** — B-1 caption-carried and B-2 carousel-carried
(§3.0) — and the W-series is scoped between them. **W1 is B-1 only. W6–W9 are
B-2 only. W2–W5 run on both** — W3 and W4 identically, W2 and W5 with a
per-variant part.

**What the evidence actually separates.** The set holds engagement figures for
five third-party posts. The four below are all from the EWTN organisation and so
share a follower base; `05` is a much smaller account and is deliberately kept
out of the table (see the README). The split in them is **not** the invocation:

| Specimen | Likes | Saves | Hook or hinge? |
| --- | --- | --- | --- |
| `03` EWTN Parents, St Monica (B-2) | 7,194 | 1,306 | numbered promise + named audience |
| `01` EWTN, St Clare (B-1) | 7,131 | 882 | hinge word — *broadcast* — into the brand |
| `06` EWTN, Queenship of Mary | 2,871 | 148 | **neither** (ends devotionally) |
| `04` EWTN, St Joseph Calasanz | 996 | 69 | **neither**, and no invocation |

**Ending on the invocation is necessary but not sufficient — it is table
stakes.** The Queenship post closes devotionally, on a Salve Regina acclamation,
and still lands ~2.5× below Clare and Monica on likes and ~6× below on saves. So
W3 stays mandatory and stays a STOP, but passing it is not what makes a post
work. **What separates a strong Format B post is that it gives the reader a
reason to stop**: a **numbered promise with a named audience** (B-2, W6+W7), or a
**hinge carrying the saint's life into what the app does** (B-1, W2). A post with
neither is inert even when every structural box is ticked — and the floor cannot
catch that on its own, which is why W2, W6 and W7 are written as hard as they
are.

Read those four rows with §9.5's caveats attached: they are **not** four
comparable data points. See `exemplars/format-b-saint-of-the-day/README.md`.

Its exemplar set is `exemplars/format-b-saint-of-the-day/`. **That set holds six
items: three positive, two negative, one middling, and only one of them is Saint
Match's own.** It is enough to fix both variants' shapes. It is not enough to
rank on — see §9.5.

**Format B does not carry Format A's furniture.** No scripture block, no ✝️, no
🙏🔥, no "Type AMEN", no hashtag wall, no app-mention pair. Their **absence is
correct and is never a STOP**. Do not reach for V1–V6 here, and do not let their
wording leak into a W judgement.

### 3B.0 Frame and slides for Format B

`best_skill.md` §4 opens "Everything is 9:16, 1080 × 1920", which is a frame
rule and is format-agnostic, so **9:16 still applies** and I4 still tests it. The
5–7 slide count and the mandatory cliffhanger of §4.1 are Format A structure and
**do not apply on either variant** — a 40–70 word caption cannot carry seven
distinct emotional beats, and demanding it would force padding, which is the
failure this format exists to avoid. The 5–15 words per slide legibility limit
still applies to any slide that exists.

- **Variant B-1's slide structure is unspecified by the user.** Do not invent one
  and do not STOP on slide count. Record the count in NOTES so the shape can be
  settled from evidence once more specimens exist.
- **Variant B-2's slide count is constrained only by its own promise**, and only
  through W6: the number on the hook slide must equal the number of slides
  delivering a distinct teaching. **No total slide count is prescribed** — the one
  specimen runs seven slides behind a promise of four and the remaining slides
  are not recorded, so there is nothing to prescribe from. Record the total in
  NOTES.

### W1 — Caption length, 40–70 words

**Variant B-1 only.** On variant B-2 record `N/A — variant B-2`; W8 is the
caption-length check there, and running this band against a correct fourteen-word
B-2 caption would STOP it for being what it is supposed to be.

- **Tests:** the caption body word count.
- **PASSES:** **40–70 words**, invocation included.
- **STOPS:** under 40 or over 70. Over 70 is the characteristic failure — it
  means the writer reverted to Format A's expansiveness and the hinge is buried.
- **Evidence:** the exact word count.
- **Note:** the band is tight on purpose. A B-1 post that "needs" 90 words is
  usually carrying two facts; cut to one (W5) rather than widening the band. If
  it genuinely has several separately sourceable teachings, that is a signal it
  should have been written as **B-2** — but the fix is to rewrite and re-declare,
  never to regrade the pack in front of you against the other variant (§1).

### W2 — Exactly one identifiable hinge

**Runs on both variants.** What changes is only **which surface the two sides sit
on**, and that is set out at the end of this check. The test itself does not
change, and the B-2 form is not the easier one.

This is the defining check of Format B and the hardest judgement in this
document. Read it twice.

- **Tests:** whether a single word or concept from the saint's life is **carried
  over** into what Saint Match does, so that the bridge is *performed rather than
  stated*.
- **PASSES:** the grader can **name the hinge word or concept in one word or one
  short phrase**, point at the sentence where it belongs to the saint, and point
  at the sentence where the same word or concept does the brand's work. Exactly
  one such hinge.
- **STOPS — all of these:**
  - **The grader cannot name the hinge.** If naming it takes a paragraph, or
    takes the word "basically", there is no hinge. **Inability to name it is
    itself the STOP** — not a reason to look harder, and not something to resolve
    in the draft's favour. This is the §1 fail-closed default applied to the one
    place it is most tempting to be generous.
  - **The bridge is stated instead of performed** — "just like Saint Match helps
    you…", "this is what our app does". Explanation is the absence of a hinge.
  - **More than one hinge.** Two carried-over concepts halve each other; pick the
    stronger and cut the other.
  - **The hinge is generic.** Apply the swap test of G1: substitute a different
    saint. If the hinge still works, it was never anchored to *this* life —
    "faith", "courage" and "perseverance" survive the swap and are therefore not
    hinges.
  - **The hinge is decorative** — a word repeated for chime with no real link
    between what the saint carried and what the app does.
- **Evidence, required in this exact form, three lines:**
  1. `hinge: <the word or concept>`
  2. `saint side: "<the sentence where it is the saint's>"`
  3. `app side: "<the sentence where it does the brand's work>"`
  Plus the swap test with a named substitute saint. A W2 PASS without all four is
  ungraded, which is a STOP.
- **The reference specimen**, third-party, for shape only — the EWTN St Clare
  caption in the exemplar folder. Hinge: **broadcast**. Saint side: the Lord let
  Clare see Mass "broadcast" on the wall of her room. App side: EWTN broadcasts
  Daily Mass to those who cannot attend. One word, load-bearing on both sides,
  never explained.
- **Saint Match's own hinge is the app's actual function:** the saint carried a
  specific thing, and the app matches a person to the saint who carried theirs.
  Worked specimen: *"Raymond stayed behind so someone else could go free. He
  never got to explain why — they padlocked his mouth shut. Some people are
  carrying something they can't put words to. St Raymond, pray for us."* Hinge:
  **what can't be put into words**. Saint side: the padlock. App side: the reader
  carrying something wordless. The app is never named.

**Where the two sides sit, by variant:**

| | **B-1** | **B-2** |
| --- | --- | --- |
| Saint side | a sentence in the caption | one of the numbered teaching slides |
| App side | a sentence in the caption | the **audience line on the hook slide** (W7) |

On **B-2 the audience line is the app side**, which is why W7 requires it to be a
**struggle topic**: Saint Match matches a person to the saint who carried their
thing, and the audience line is where that match is *performed*. A demographic
there ("every Catholic parent") is a segment label, not a hinge — correct for an
account whose identity is a demographic, wrong for a product that matches on
struggle. A B-2 pack whose audience line is a demographic STOPs at **W7**, and
usually at W2 as well because there is then no app side at all; report both.

**Do not accept a looser hinge on B-2 because it is spread across two surfaces.**
It must still be nameable in one word or one short phrase, still be exactly one,
still be performed and never explained, and still survive the swap test. The
three-line evidence form above is required identically, with the surface named:
`saint side: slide 3 — "…"`, `app side: hook slide — "…"`.

### W3 — Ends on the invocation

**Runs on both variants, identically.** This is the one Format B rule that does
not vary at all.

- **Tests:** the final line of the caption.
- **PASSES:** the caption's last line is the invocation, in the form **"St
  [Name], pray for us."** Nothing after it.
- **STOPS:** absent; not last; reworded past recognition; followed by anything at
  all — a hashtag block, an app mention, an emoji, a sign-off.
- **Evidence:** the final line quoted, and confirmation that nothing follows.
- **Note:** minor honorific and punctuation variation is tolerated ("St." /
  "St", "Saint Raymond"). A **patronage clause** — "St Rita, patron of impossible
  causes, pray for us" — is permitted only if that patronage is a dossier line;
  an unsourced patronage in the invocation is a T1 STOP, not a W3 one.
- **Note — W3 is table stakes, not the differentiator, and this correction
  matters.** It is tempting to read W3 as the check that makes Format B work,
  because the two strong specimens both end there and the worst specimen does
  not. The `06` Queenship specimen refutes that: it closes devotionally, on a
  Salve Regina acclamation in the invocation's slot, and still lands ~2.5× below
  Clare and Monica on likes and ~6× below on saves. **Ending correctly is
  necessary and never sufficient.** Do not treat a W3 PASS as evidence that a
  post has a reason for the reader to stop — that is W2 for B-1, and W6 with W7
  for B-2. A pack that passes its whole W-series structurally and still reads
  inert is a real outcome of this floor; record it in NOTES rather than inventing
  a STOP for it, because the floor is a floor (§0.1).
- **A devotional acclamation is not an invocation.** "Mother of Mercy, our life,
  our sweetness, and our hope!" is liturgically fine and is **not** the form W3
  requires. If the form is not "St [Name], pray for us", W3 STOPs regardless of
  how devout the substitute is.

### W4 — No product pitch. The hinge is the CTA.

**Runs on both variants, identically.** On B-2 "every line" includes every slide
overlay, not just the caption — the pitch a B-2 post is most likely to grow is a
final slide saying where to get the app.

- **Tests:** every line, for a selling register.
- **PASSES:** there is **no separate CTA at all** — no app-mention line, no "link
  in bio", no "download", no "free on the App Store", no engagement line, no
  hashtag block. The brand's presence in the post is the hinge and nothing else.
- **STOPS:** the app named in a **pitching register** — any imperative to install,
  visit, tap or download; any feature list; any line whose job is conversion
  rather than the hinge. An app-mention pair lifted from §9.2 into a Format B
  post is a STOP: those are Format A furniture.
- **Evidence:** the offending line verbatim, or an explicit statement that the
  caption contains no pitch line.
- **Note on naming vs pitching:** W4 bans the **pitch**, not the noun. A hinge
  may make the app's function visible without naming it, and the specimens
  above do exactly that — neither names Saint Match. **When in doubt, not naming
  it is always safe and always available**, so a draft that puts the name in and
  leaves the grader uncertain whether it is pitching resolves as a STOP under the
  §1 fail-closed default. C3 still runs alongside: the saint is not leverage.

### W5 — Facts, correctly graded

**Runs on both variants. The grading requirement is shared; the count
requirement is variant B-1 only.**

#### W5 — shared, both variants

- **PASSES:** every concrete fact the post rests on traces to a dossier line and
  is either **DOCUMENTED and asserted plainly**, or **TRADITIONAL and attributed**
  in the phrasing §2 requires ("the Church has long held…", "his order
  remembers…").
- **STOPS:** no concrete fact anywhere — the post is atmosphere; a **LEGEND used
  as an anchoring fact**, an automatic STOP even when attributed, because in this
  format an attributed legend is still load-bearing (`best_skill.md` §2); a
  TRADITIONAL fact asserted flatly.

#### W5 — variant B-1: exactly one fact

- **PASSES:** **one** such fact, in the caption, doing all the anchoring work.
- **STOPS:** more than one fact, so the hinge has to compete for the word budget.
- **Evidence:** the fact quoted, its dossier line, and its grade.

#### W5 — variant B-2: one per numbered slide, and no count limit

- **PASSES:** each numbered teaching slide rests on its own graded fact; the
  hook slide's promise is not itself a factual claim about the saint and needs no
  dossier line beyond the teachings it counts.
- **STOPS:** a numbered slide with no fact under it — a slide of pure
  exhortation padding the promised count; any slide whose fact is ungraded or
  mis-phrased for its grade.
- **The one-fact count above does NOT apply here, and applying it would STOP
  every correct B-2 post.** A B-2 post promising four teachings has at least four
  facts by construction; that is the format, not a failure. If you find yourself
  writing "more than one fact" as a STOP reason on a B-2 pack, you are running
  the B-1 part and should go back to §3.0.
- **Evidence:** a table — slide number, the fact quoted, its dossier line, its
  grade.

#### W5 — note, both variants

W5 is a **voice-floor framing test** and does not replace T1 or T2, which run
unchanged, apply to every claim on every surface, and are the strict ones. What
W5 adds on **B-1** is a **count** requirement T1 and T2 do not make; on **B-2** it
adds a per-slide *placement* requirement — every promised teaching must actually
rest on something. A Format B post whose fact is ungraded fails T1 *and* W5.

---

## 3B-ii. Variant B-2 floor — W6–W9

**Run only when the declared format is B *and* the declared variant is
`B-2-carousel-carried`.** On variant B-1 record all four as `N/A — variant B-1`;
on Format A, `N/A — Format A`. These four checks exist because in B-2 the load
moved off the caption, and a floor that only reads the caption would find a
fourteen-word post with nothing in it and have no way to tell whether that is
correct.

**Evidence base, stated up front so it is not over-read.** B-2 rests on **one**
third-party specimen — `03-REFERENCE-ewtnparents-st-monica.md`, whose hook slide
is *"4 things St. Monica can teach every Catholic parent."* and whose caption in
full is fourteen words. Everything below that is not a direct reading of that
specimen is marked. The word band in W8 in particular is **n = 1** and is
provisional; widen it from evidence, not from a draft that missed it.

### W6 — Numbered promise on the hook slide

- **Tests:** the hook slide's overlay text.
- **PASSES:** the hook slide states an **explicit number** — a numeral or a
  number word — and **what that number is of**: a countable teaching, lesson,
  thing or reason drawn from this saint's life. And the carousel **delivers that
  count**: the number of slides carrying a distinct numbered teaching equals the
  number promised.
- **STOPS:** no number on the hook slide; a number with no countable noun after
  it; a promise of a mood or a feeling rather than a countable teaching
  ("Everything St Monica can show us"); a mismatch between the number promised
  and the number of teaching slides delivered, in either direction. Over-delivery
  is a STOP too — it means the hook slide is wrong, and a reader who counts is
  the reader this format is for.
- **Evidence:** the hook slide verbatim; the number; the count of slides
  delivering a distinct teaching, listed by slide number.
- **Note:** the number is a **contract**, and it is half of the reason a B-2 post
  earns a stop-scroll. The `03` specimen's 1,306 saves against `06`'s 148 is the
  clearest signal in the set that a countable promise is what gets a post saved —
  read with §9.5's caveats, and see the README on why those two rows are not a
  controlled comparison.
- **No total slide count is prescribed** (§3B.0). W6 constrains only the count of
  *teaching* slides against the promise. A hook slide, a prayer slide and an
  invocation slide are not teachings and are not counted.

### W7 — An explicit audience is named, and it is a struggle topic

- **Tests:** the hook slide's overlay text, second required part.
- **PASSES:** the hook slide **names an audience explicitly** — not "us", not
  "everyone", not implied — **and**, for a Saint Match post, that audience is a
  **struggle topic**: one of the twelve in `best_skill.md` §1 (anxiety, waiting,
  grief, purity, patience, vocation, anger, loneliness, shame, fear, distraction,
  money) or a plain paraphrase of one. "…anyone waiting on someone they love."
  "…anyone carrying a shame they have not said out loud."
- **STOPS:** no audience named; the audience is a **demographic** — a role, an
  age, a state of life, a country: "every Catholic parent", "young men",
  "students", "priests", "converts". Also STOPS: an audience so wide it names
  nobody ("every Catholic", "all of us").
- **The line the two run closest on is `vocation`.** It is a struggle topic in
  `best_skill.md` §1, and it is also one word away from a state of life. The test
  is whether the phrase names **what someone is carrying** or **what someone
  is**: "…anyone who cannot tell what they are supposed to do with their life" is
  the struggle and passes; "…seminarians" or "…young men discerning the
  priesthood" is a category of person and STOPs. Apply the same reading to
  `grief` ("…anyone who has just buried someone" ✓ / "…widows" ✗).
- **Evidence:** the audience clause quoted, and which struggle topic it is or
  which demographic category it fell into.
- **This is a deliberate divergence from the specimen, and it is recorded rather
  than inherited.** EWTN Parents names a demographic — "every Catholic parent" —
  and is right to: a demographic **is** that account's identity, and its audience
  self-selects on it. Saint Match matches on **struggle**, so the same slot has to
  carry a struggle for the post to perform its own product. Do not cite the
  specimen in defence of a demographic here; the specimen is evidence for the
  *slot*, not for what fills it.
- **W7 and W2 overlap on purpose.** The audience line is the hinge's app side on
  B-2. A demographic there usually fails both. Report both — the writer needs to
  know the line is wrong *and* that the post consequently has no bridge.

### W8 — The caption is minimal

- **Tests:** the caption body, in full.
- **PASSES:** exactly two elements and nothing else — **one line of framing,
  phrased as a question**, then **the invocation** (W3). **8–25 words total.**
- **STOPS:** the caption carries the teaching, the fact, or the hinge — that is a
  **B-1** post and it should have been declared as one; under 8 or over 25 words;
  no framing question; any third element — a second framing line, a summary, a
  hashtag, an emoji, a sign-off.
- **Evidence:** the caption verbatim, the word count, and the two elements named.
- **A framing question is REQUIRED here and is not the banned opening question.**
  `best_skill.md` §5.5 bans opening on a rhetorical question; that is a **Format
  A** rule which variant **B-1** inherits (B1-B). It does **not** apply to a B-2
  caption, whose whole job is to frame and hand off to the carousel. Firing B1-B's
  question ban here would STOP every correct B-2 post. The carve-out is written
  into B1-B; do not drop it.
- **The 8–25 band is n = 1 and is provisional.** The single specimen's caption is
  fourteen words. The band is set wide around it deliberately. Record the count in
  NOTES on every B-2 pack so the band can be re-set from evidence rather than from
  the first draft that overshot it.

### W9 — The carousel carries the teaching

- **Tests:** the division of labour between caption and slides.
- **PASSES:** the numbered teachings live in the slides, and **deleting the
  caption entirely would leave the post intact and comprehensible.** The caption
  frames; it does not teach.
- **STOPS:** the teaching is in the caption and the slides restate or decorate it
  — that is a B-1 post misdeclared as B-2, and the STOP is the accurate outcome
  (§1: grade as declared); slides that carry no teaching at all and exist only to
  reach the promised number.
- **Evidence:** one line per slide naming what it teaches, plus an explicit
  statement of whether the post survives deletion of the caption.
- **Note:** W8 and W9 are complements, not duplicates. W8 tests that the caption
  is small; W9 tests that the slides are load-bearing. A post can pass W8 with a
  minimal caption and still fail W9 because the slides are wallpaper — a
  fourteen-word caption over four decorative slides is an empty post, not a
  correct one.

---

## 3C. Shared brand checks — B1–B3

**Run on both formats.** B1 and B2 have a shared part and a per-format part;
run the shared part, then the `-A` or `-B` part matching the declared format,
and report one verdict per check. B3 is identical on both.

### B1 — Register

**Runs on both formats. The banned register below is shared; the person and
address requirements differ and are split explicitly.**

#### B1 — shared bans, both formats

- **STOPS on either format:** hype or superlatives; therapy-adjacent filler
  ("hold space", "show up for yourself"); devotional inflation; opening with
  "Imagine"; claims about what the saint "would say" today; modern political
  framing; **punishment or guilt framing** of the reader's hardship; **scolding
  imperatives** ("Stop scrolling", "You need to do better").
- **Shared craft requirements:** concrete nouns and named specifics — the year,
  the place, the number — before abstractions; **em dashes are spaced**;
  contractions are normal.

#### B1-A — Format A address

- **PASSES:** direct, warm, urgent, addressed to one struggling reader.
  **Sustained second person** — "you", "your" — from the opening line onward, not
  a single distanced "most of us". Short paragraphs of one to three sentences.
  Imperatives to the reader are permitted as invitation. Hardship is framed as
  formation, training or preparation.
- **STOPS:** a rhetorical question as the **opening line**; second person absent
  or used only once in passing; plus every shared ban above.
- **Emoji rule — this is the check that was inverted.** Emoji are **permitted and
  in two places required**: the ✝️ separator (V2), and the engagement line (V3).
  One further emoji is attested at the end of an opening line — `exemplars/03`
  opens "Every saint was once exactly where you are. 🤍" — and is allowed.
  **STOPS:** emoji anywhere else — scattered through body paragraphs, in slide
  overlay text, in the app-mention lines, in the image prompt. Presence of emoji
  is no longer a STOP in itself; presence *outside those slots* is.
- **Evidence:** quote each offending phrase; for the second-person test, quote the
  first two "you" occurrences or state that there are none.

#### B1-B — Format B address

- **PASSES:** **third person.** The saint is the grammatical subject and the post
  reports rather than exhorts. Plain, unhurried, declarative. Where there is a
  turn toward the reader it is made through the hinge (W2) and may use a
  generalised third person — "Some people are carrying something they can't put
  words to" — rather than direct address.
- **STOPS:** sustained second-person address, which is Format A's register and at
  this length reads as a pitch; Format A's urgent exhorting tone; **encyclopedia
  register** and the **calendar-announcement opening**, both below; a rhetorical
  question as the opening line — **variant B-1 only**; plus every shared ban
  above.

- **The opening-question ban is variant B-1 only.** In variant **B-2** the
  caption's opening line **must** be a framing question (W8). Firing this clause
  against a B-2 pack STOPs every correct B-2 post, which is precisely the
  scoping bug §3.0 exists to prevent. On B-2, record this clause as not
  applicable in the B1 evidence line and grade the rest of B1-B normally.

- **Encyclopedia register — the primary Format B anti-pattern, and it is a
  STOP.** A caption that reads as a reference-work entry: neutral biographical
  appositives strung together ("He was a Spanish priest and educator who provided
  free education to poor schoolboys and founded a religious order to grow his
  efforts"), a patronage stated as a label, a bland closing pleasantry, no reader
  anywhere in it. It is fluent and it is often perfectly accurate, which is why
  it survives the truth gate untouched and has to be stopped here.
  **This is the default an LLM drifts to** — it is what the training data holds
  most of about saints — so it will be produced confidently and will not look
  wrong. Worked negative: `exemplars/format-b-saint-of-the-day/04-REFERENCE-ewtnmedia-st-joseph-calasanz.md`.

- **The calendar-announcement opening — a diagnostic marker.** "August 25 is the
  feast day of St Joseph Calasanz…", "August 22 is the feast day of the Queenship
  of Mary…". Opening by announcing the date or the feast is a STOP on both
  variants: it opens on the calendar rather than on the reader or the fact, and
  the reader has been given no reason to keep reading. **It co-occurs with
  encyclopedia register** — both specimens that open this way are also
  encyclopedic, and both are the two underperformers in the set — so treat it as
  the cheapest available tell: if the first six words name a date, read the rest
  for encyclopedia register before anything else. A **timeliness peg** is not a
  hinge; it is a reason to post today, which is a different thing, and it does not
  substitute for W2, W6 or W7.

- **A stated bridge — the saint as mascot.** "As the patron saint of the X
  Institute, St N. holds a special place in our mission." Third person, right
  length, ends on the invocation, and no hinge: the connection is announced
  instead of performed, so the saint is a mascot rather than a bridge. This is a
  W2 STOP primarily; note it here because it reads as good register and will
  otherwise pass B1 unremarked. Worked negative:
  `exemplars/format-b-saint-of-the-day/05-REFERENCE-augustine-institute-st-augustine.md`.
- **Emoji rule for Format B: none at all.** Format B has neither slot that
  licenses an emoji — there is no ✝️ separator and no engagement line — so **any**
  emoji is out-of-slot and is a STOP. This is the old blanket emoji ban surviving
  in the one place it is actually correct. It must **not** be carried back into
  Format A, where two emoji are mandatory.
- **Evidence:** the grammatical subject of each sentence, or any second-person
  pronoun found, quoted.
- **Note — the incidental "you".** One generalising second person inside the
  hinge is a judgement call rather than an automatic STOP; *sustained* address is
  the STOP. Both worked specimens avoid direct address entirely, so the safe form
  is available and the writer should take it. Record the call in NOTES either way.

### B2 — Shape and ending

#### B2-A — Format A shape

- **Tests:** structure of the description caption body, against `best_skill.md`
  §5.2 and §5.3.
- **PASSES:** body is **200–500 words** (all six exemplars land 225–330);
  roughly 8–12 short paragraphs; opens on a flat corrective, a negated
  assumption, a bare surprising fact, or a direct naming of the reader's
  situation; single-sentence paragraphs used as beats; the turn lands the story
  on the reader's current week **and resolves**; and the caption **ends
  affirming and commissioning**.
- **STOPS:** under 200 or over 500 words; opens on a question or on "Imagine";
  the turn is raised and left unresolved; the body ends bleak, hard, or
  unresolved; the body closes on an invocation (there is no invocation slot —
  see V6); the body ends on a takeaway summarising itself rather than
  commissioning the reader.
- **Evidence:** the word count, the opening line quoted with its formula named,
  and the final line of the body quoted.
- **Note — the ending polarity is reversed from the old rule.** This scorer
  previously required the closing line to be the *hardest-edged* line in the
  post. That was read off Raymond ("The padlock is what remains when the
  explaining is taken away.") and it is off-voice. The gold set ends
  affirming every time: "You are being prepared in it." / "God only sends His
  strongest there." / "He's real, he's biblical, and he's still on the
  battlefield." / "Pick it up." Affirming is not the same as soft — it is
  commissioning, and it still carries a demand.

#### B2-B — Format B shape

**Run the part matching the declared variant. Running the other one STOPs a
correct post for having the shape its variant requires.**

**Shared, both variants:**

- **STOPS:** opening on a **calendar announcement** — "August 25 is the feast day
  of…" — which opens on the calendar rather than on the reader or the fact
  (B1-B); anything printed after the invocation; Format A's
  eight-to-twelve-paragraph build compressed into the word budget.

**B2-B, variant B-1 — caption-carried:**

- **Tests:** structure of the caption.
- **PASSES:** a fact, a hinge, an invocation, in that order and nothing else.
  Typically three to five sentences. Opens on the **fact**, plainly stated. The
  hinge follows and is not explained. The invocation closes it (W3).
- **STOPS:** opens on the hinge or on a mood rather than the fact; a summarising
  or moralising sentence between the hinge and the invocation, which flattens the
  hinge by explaining it.
- **Evidence:** the sentences listed in order with their roles named.
- **Note:** this part tests the **order and economy**; W1 tests the length and W2
  the hinge itself. It is where "correct parts, wrong sequence" is caught — most
  often a post that explains its own hinge in a closing line before the
  invocation.

**B2-B, variant B-2 — carousel-carried:**

- **Tests:** structure of the caption *and* the slide order.
- **PASSES:** caption is framing question → invocation, in that order and nothing
  else (W8). The carousel opens on the **hook slide** carrying the numbered
  promise and the audience (W6, W7), then delivers the promised teachings one per
  slide, and lands on the invocation.
- **STOPS:** the caption states the fact or the hinge, i.e. the B-1 shape wearing
  a B-2 declaration; the framing question placed after the invocation; the
  numbered promise buried on a later slide instead of the hook slide; teaching
  slides carrying two teachings each so the count reads short.
- **Evidence:** the caption's two elements named in order, then a one-line-per-
  slide list with each slide's role.
- **Note — do not import B-1's "opens on the fact" test.** A correct B-2 caption
  opens on a question and contains no fact at all. That is W8's shape, and it is
  right.

- **Note — the ending polarity question does not arise on either variant.**
  Format B does not end affirming *or* hard; it ends on the invocation, which is
  a liturgical form and not a rhetorical one. Do not import B2-A's ending test.
  And note the converse, from `06`: ending devoutly is **not** by itself evidence
  the post works (W3).

### B3 — Promises

- **Tests:** any implied causation.
- **PASSES:** no devotion, novena, prayer or app feature is presented as
  producing an outcome. What happened is asserted; what will happen is not
  promised. A bridge promises nothing the app does not actually do
  (`best_skill.md` §6.1), and never implies that an in-app novena is a received
  traditional text when it is AI-generated.
- **STOPS:** "pray this and…", "this novena will…", any suggestion the app
  delivers a spiritual result; any invented saint or invented patronage used to
  make the bridge work.
- **Evidence:** the sentence.
- **Note — the gold set runs close to this line and does not license crossing
  it.** `exemplars/04` contains "This prayer has made empires kneel. What makes
  you think it can't change your life?", and `best_skill.md` §5.5 records this as
  the one place the style bible pushes against the brief's hard rules and
  restrains it. Do not cite exemplar 04 in defence of a promise. B3 is unchanged
  in strictness by this realignment.

---

## 4. CTA checks

### C1 — Approved pattern and placement

**Format A only.** For Format B record `N/A — Format B`: Format B has no CTA
block by design, and W4 is the check that enforces its absence.

- **Tests:** the soft-CTA block — engagement line plus app-mention pair —
  against `best_skill.md` §9.1, §9.2 and §9.3.
- **PASSES:** exactly one engagement line and exactly one app-mention pair, both
  verbatim from the attested sets, in the §5.4 order, and **downstream of the
  bridge** — a virtue is named in the body above them.
- **STOPS:** more than one engagement line or more than one app-mention pair; an
  app mention with no virtue named above it (the brief's "missing virtue ↔ app
  bridge" failure, which is a STOP even when the wording is gentle); no CTA at
  all when the format requires one; a wording not in §9.1/§9.2.
- **Evidence:** the block verbatim, and which attested wording and pair it maps
  to.
- **Note:** C1 is the *semantic* CTA check — one of each, in the right place,
  earned by a bridge. The verbatim string matching is V3 and V4. Both run; they
  fail for different reasons and the writer needs to know which.
- **Note — placement is no longer "after the invocation."** There is no
  invocation. The anchor is the ✝️ separator (V2).

### C2 — Banned register

- **Tests:** the CTA block and the last paragraph of the caption, against
  `best_skill.md` §9.5.
- **PASSES:** no fake urgency, no scarcity, no imperative hard sell, no
  manufactured obligation, no gatekeeping, no guilt. The free-tier limit is not
  used as pressure.
- **STOPS:** any of "only today", "before it's gone", "limited spots", "ends at
  midnight", "don't miss out", a countdown; "Download NOW", "Tap the link!!",
  "You NEED this app"; "Share if you love St N.", "Only real Catholics will…";
  "most people scroll past this"; any use of the three-matches-a-week limit as a
  reason to hurry.
- **Evidence:** the offending phrase verbatim.
- **Note — "comment AMEN" is no longer banned and this is the correction that
  matters most.** The old wording listed "comment AMEN" and "double tap if"
  alongside fake scarcity as engagement bait. "Type AMEN if this hit home ✝️" is
  the user's own shipped engagement line on every post in the gold set. It is
  permitted, it is in fact **required** by V3, and it must not be flagged here.
  The distinction the bible draws is between a plain **invitation** to respond,
  which is on-voice, and manufactured **obligation or gatekeeping** ("Share if
  you love St N.", "Only real Catholics will…"), which is not. An engagement line
  outside the five attested wordings fails V3 for being unattested — not C2 for
  being bait.

### C3 — The saint is not leverage

- **Tests:** the relationship between saint and product.
- **PASSES:** the saint's life is the subject; the app is offered afterwards as a
  way to practise.
- **STOPS:** the saint is used as endorsement or as a hook for the product; the
  post reads as an ad with hagiography attached.
- **Evidence:** the sentence where the pivot happens.

---

## 5. BRIDGE check

### G1 — Specific virtue-to-action bridge

- **Tests:** the internal topic + theme bridge block.
- **PASSES:** it names one virtue, ties it to a specific pressure in this saint's
  life, and yields a **one-sentence micro-action doable today in 5–15 minutes**.
  It survives the swap test: substitute another saint and the sentence stops
  working.
- **STOPS:** the bridge is absent; it is generic enough to survive the swap test;
  no micro-action can be written from it; or a soft CTA is present with no
  virtue named above it — the brief's "missing virtue ↔ app bridge" failure.
- **Evidence:** the bridge sentence, the micro-action written out, and the result
  of the swap test with a named substitute saint.

**Format B:** G1 still runs, on the internal bridge block, unchanged — the swap
test and the one-sentence micro-action are both still required in the pack. What
changes is only how the bridge **surfaces in the caption**: in Format A it is
felt in the body and paid off by the CTA; in Format B it is performed as the
hinge and there is no CTA. **W2 is the strict test of that surfacing**, and the
last STOP clause above ("a soft CTA with no virtue named above it") is Format A
only, because Format B has no soft CTA. A Format B pack can pass G1 on its
internal block and still STOP at W2 for failing to perform it — and that is the
intended, informative failure, so report both.

---

## 6. ICONOGRAPHY check

Applies to the AI image prompt.

### I1 — Attributes are sourced

- **Tests:** every habit, garment, emblem, object, setting and rank in the prompt
  against the iconography list in the source notes.
- **PASSES:** each element appears in the list with a supporting dossier line.
- **STOPS:** any element in the prompt that is absent from the list, or listed
  with no dossier support. Vague habit description ("monk's robes") is a STOP,
  because it delegates the choice to the generator.
- **Evidence:** prompt element → dossier line, for every element.

### I2 — Nothing the dossier contradicts

- **Tests:** rank, order, era, object.
- **PASSES:** no insignia of an office the saint did not hold; correct habit for
  the correct order, described by garment and colour; nothing anachronistic to
  the century and place.
- **STOPS:** cardinal's red or galero for a non-cardinal; mitre or crozier for a
  non-bishop; wrong habit colour or wrong order's habit; an object that did not
  exist in that form in that place in that century. Later paintings repeating the
  error are not evidence and may not be cited in defence.
- **Evidence:** the offending phrase from the prompt, the contradicting dossier
  line, and the correct alternative.

### I3 — Legend not depicted as event

- **Tests:** the scene described.
- **PASSES:** the prompt depicts the person, or a recognised iconographic type
  that the caption does not assert and the source notes flag.
- **STOPS:** a LEGEND rendered as a documentary scene, or a legendary scene
  depicted while the caption asserts it as fact.
- **Evidence:** the scene as described, and the grade of the underlying claim.

### I4 — Type zone, contrast and frame

Tests the *layout* of a baked-in-text image. Runs on both formats and both
Format B variants. On a **B-2** pack the image under test is the **hook slide**,
and its numbered promise (W6) is the type this check is about.

- **Tests:** the framing, composition and type-treatment instructions in the
  image prompt, against `best_skill.md` §8.1 and §8.2.
- **PASSES — all five:**
  1. **Aspect ratio declared.** 9:16, 1080 × 1920, stated in the prompt rather
     than left to the generator.
  2. **A type zone is specified**, as a vertical percentage range chosen for
     *this* composition — "figure in the upper 55%, lower 35–40% dark for type",
     "figure in the left 40%, right 60% bright and empty" — **and the
     composition is described so as to create it**. Per-composition is the whole
     requirement: a zone that happens to be at the top or the bottom is fine; a
     zone that is at the top or the bottom *because that is the default* is not,
     and neither is a zone asserted in one clause that the rest of the prompt
     does not build.
  3. **Contrast where the type lands.** A mid-tone or otherwise clean region is
     specified behind the type, sufficient for the type to clear **3.5:1**
     against it, plus the drop shadow §8.1 specifies (2–3px, dark, 50–60%
     opacity) wherever type sits on painted areas.
  4. **No collision with the subject.** The type zone does not overlap the
     subject's **face or hands**, nor any of the **iconographic attributes I1
     sourced** — the identifying garment of the habit, the emblem, the object the
     post rests on. Burying the attribute that makes the saint identifiable is a
     layout failure even when the prompt names that attribute perfectly.
  5. **The baked type is fully specified.** Where text is rendered inside the
     image — which is the normal case — the prompt carries the exact overlay
     string, the font, the colour, the highlight word, the position range and the
     effects, and requires correct spelling.
- **STOPS:** no aspect ratio declared, or any ratio other than 9:16; no type zone
  named, or a zone named as a percentage but not created by the composition; no
  contrast provision where the type lands; the type zone overlapping the face,
  the hands, or an attribute I1 sourced; baked-in type whose string, position,
  colour or treatment is left for the generator to choose; rendered text that
  came back garbled or misspelled and was shipped rather than regenerated.
- **Evidence:** the framing clause quoted; the type zone as a vertical
  percentage range; the contrast provision quoted; and one line confirming the
  zone clears the face and the attributes listed under I1.
- **Text inside the image is required, not banned.** The style bible bakes the
  overlay into the generated image and treats a generated image without its
  caption text as a failure (`best_skill.md` §8.2). A prompt that asks the
  generator to render lettering is **correct** and must not be STOPped for it.
- **There is no fixed clear band.** Do not require the upper third — or any
  other fixed region — to be empty. §8.1 is explicit that the zone is measured
  per composition and that defaulting it (to the bottom, or to anywhere else) is
  the error. The only band rule is that the zone be *stated* and *built*.
- **I4 is a legibility and composition check, not a truth check.** Whether the
  attributes are sourced and correct is I1 and I2. A prompt can pass I4 with a
  cardinal's galero in it and STOP at I2; a prompt can name every attribute
  correctly and STOP at I4 for printing the headline across the saint's face.

### 6.5 Iconography scope — and the resolved I4 conflict

**I1, I2 and I3 are truth checks and are unmodified.** Iconography accuracy is a
truth surface, not a voice one; nothing in the style bible touches it, and no
realignment of this document has weakened it or may weaken it. They stay exactly
as strict.

**I4 is different in kind, and it has been rewritten. The conflict this section
used to record is closed.** I4 formerly required "no text rendered inside the
image" and "upper third kept clear for overlay type". Both clauses were
**withdrawn** by `best_skill.md` §8.2: the style bible bakes the overlay text
into the generated image and treats a generated image without its caption text
as a failure, and §8.1 requires the text zone to be declared as a
per-composition vertical percentage range that must **not** default to a fixed
band. As written, the old I4 would have STOPped every correctly produced post —
the same class of bug as the old Raymond-derived voice checks in §3, pointed at
the image pipeline.

**The style bible is authoritative on the image pipeline**, so I4 was rewritten
to it rather than the bible being bent back to I4. What I4 now tests is what
actually matters for a baked-in-text image: a legible type zone exists and is
specified per composition, the contrast is provided where the type lands, the
type does not collide with the face or with a sourced attribute, and the aspect
ratio is declared.

Consequences for graders:

- **Do not record a "scorer/rulebook conflict" note against I4 any more.** An I4
  STOP is now attributable to the draft, and the required rewrite is concrete.
- The **contrast requirement survives unchanged** — it was never in conflict.
  §8.1 states the same 3.5:1 mid-tone requirement and adds the 2–3px, 50–60%
  opacity drop shadow.
- **Nothing here licenses relaxing I1–I3.** The resolution was to the layout
  clause of I4 only. If a rewrite of a layout constraint is ever read as
  precedent for softening a sourcing constraint, that reading is wrong on its
  face: §0 forbids trading the truth gate against anything.

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
| — | `04` Calasanz, `05` Augustine Institute, `06` Queenship | **not referents.** Known-bad / known-middling anchors for the §9.4 consistency bar only |

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

**The negatives are not referents.** `04` and `05` are craft counter-examples and
`06` is a middling one. Do not put them in a forced ranking as though they were
gold. Their value is in §9.4: a judge that cannot rank `04` last is a judge whose
scores are discarded.

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

### 9.5 Format B's exemplar set is too thin to rank on yet

`exemplars/format-b-saint-of-the-day/` holds **six specimens**, of which **five
are third-party** references for *shape* only — not Saint Match content and not
to be imitated line-by-line — and **two are negatives** plus one middling, which
are not referents at all (§9.1). That leaves **two rankable referents for variant
B-1 and one for variant B-2**, and exactly **one Saint Match specimen in the whole
folder**.

That is enough to fix both variants' structure, which is why W1–W9 are binary and
confident. **It is nowhere near enough to rank on.** A forced ranking against two
referents produces an ordinal with almost no resolution; against **one** it
produces none at all, so **variant B-2 cannot be voice-scored under any
circumstances yet** — record `set_maturity: shape-only` and omit the number.

**Engagement figures are not a substitute for referents.** The set now carries
real like and save counts, and they are genuinely informative about *what*
separates a strong post (§3B). They are **not** a ranking scale: they are five
posts across three accounts of very different sizes, uncontrolled for subject
salience, and using them to order drafts would import every confound the README
lists straight into the loop. See
`exemplars/format-b-saint-of-the-day/README.md` before citing any of them.

**Normalise before comparing, and this is now evidenced rather than assumed.**
The `06` Queenship post outscores the `04` Calasanz post roughly 3:1 on likes with
no more craft in it — Mary is vastly better known than Joseph Calasanz. So the
SkillOpt loop must **normalise engagement against a saint-popularity baseline
before comparing posts**: a Marian feast and an obscure Mercedarian are not
comparable on raw numbers, and a rulebook version that happened to draw the
better-known saints would otherwise win on nothing.

Until the set reaches **at least four or five Saint Match specimens per
variant**:

- Run the voice score on Format B in **`set_maturity: shape-only`** mode: record
  `nearest_exemplar` and `weakest_axis`, which remain useful as qualitative
  notes, and **do not emit a `voice_score`, or emit it and mark it unusable.**
- **Do not use Format B voice scores to accept or reject any rulebook edit.**
- The user has been asked for more specimens. When they arrive, this is a
  deliberate baselining event: record it, and treat scores from before and after
  as belonging to different scales.

Format A is unaffected — its set of six is the working baseline, subject to the
consistency bar in §9.4 like everything else.

# SCORER.md — the gate (Saint Match instance)

> **Layer: INSTANCE — Saint Match.** What remains in this file is the part of the
> gate that is about *this brand*: the voice floors (§3, §3A, §3B, §3B-ii, §3C),
> the CTA checks (§4), the bridge check (§5), and the current maturity of this
> instance's specimen sets (§9.5).
>
> **The architecture, the grading procedure, the truth and image checks, the
> recording and output contracts, and the voice-score design are in
> `../../method/`** — they are brand-agnostic and are meant to be copied whole.
> Each section below that moved carries a pointer saying where it went and why.
> **The section numbering is unchanged across the split**, so every existing
> cross-reference still resolves. `../../method/README.md` maps number to file.
>
> A grader runs this file and the method files together. Neither is complete
> alone, and that is the intended shape: the method is what a second brand
> inherits, this file is what Saint Match had to decide for itself.

Grades one post pack produced under `best_skill.md`. Usable by a human reviewer
or by an LLM judge. **It fails closed:** anything not affirmatively established
is a STOP.

The scorer does not improve drafts. It does not rank them. It answers one
question — *may this be published* — and, when the answer is no, says exactly
what would have to change.

---

## 0. The architectural rule

**§0 and §0.1 now live in `../../method/GATE.md`, verbatim and complete.** They are the
two decisions everything else in this document depends on:

- **The truth gate is a hard filter and is never traded against engagement.**
  There is no blended score, because a blended score is trainable: give the loop
  a number in which truth and reach are commensurable and it will learn the exact
  amount of shading that maximises it.
- **Voice is judged by two mechanisms and they are kept apart** — a binary floor
  that is part of the gate, and a 1–5 score that can never block anything. A
  score that can block becomes a censor; a floor that is also a score becomes
  negotiable.

Neither is Saint Match's, and a second brand that adopts the checks below without
adopting those two decisions has not adopted this system.

---

## 1. How to grade

**Moved to `../../method/GATE.md` §1, verbatim and complete** — read the source notes
before the caption; build a claim list; run every check rather than stopping at
the first STOP; emit the verdict; and voice-score only after a PASS and only when
asked.

It also holds the **fail-closed defaults** and the rule that the post format and
variant are **declared, never inferred** — including the instruction not to
"correct" a declared format that seems wrong for the draft, because grading it as
declared produces the accurate failure and the signal the loop needs.

That text names this instance's fields (`post_format`, `format_variant`) and its
floors (V1–V7, W1–W9) as its worked example; §3.0 below is where those are
actually defined.

---

## 2. TRUTH checks

**T1–T6 now live in `../../method/TRUTH-CHECKS.md`, verbatim and complete.** Gated on the
dossier, every one of them binary, and unchanged by any realignment of this
document — the note in §3 that the voice floor was rewritten has never applied to
them.

Two of them carry notes added from verified cases in
`../../method/ATTRIBUTION-CASES.md`: **T3** on citation frames that a transcription
destroys, and **T5** on "known for" claims, which contain no quotation marks and
are therefore invisible to T3.

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
  the app named anywhere above these two lines or in any on-image **copy**.
- **Carve-out: the `@saintmatchapp` handle in §8.0's brand-background slide
  template is furniture, not an app mention, and does not fire V4.** V4 governs
  the two app-mention **lines** and the app being *named in copy* — a handle set
  at 8% from top in the slide template is a watermark, it says nothing, and it is
  part of an attested shipped design. This carve-out is **Format A only**; on
  Format B the handle is omitted entirely (§8.0, W4), so the question does not
  arise there.
- **Evidence:** both lines verbatim, the row they match, and the result of
  searching the body and all overlays for the app name **in copy**, noting the
  handle separately if the slide template carries one.

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
  (§4.3), and taking the variant never relaxes 9:16 or the 5–7 count.
- **The word limit has two exclusions, and V7 must honour both** (`best_skill.md`
  §4.1): an **attribution line does not count**, and **verbatim liturgical text is
  exempt** (§4.3). So a quotation slide is measured on its quoted text and
  lead-in, not on its citation; and **a Collect slide does not STOP on word
  count** — the Collect runs 40–70 words, may not be paraphrased
  (`../../method/QUOTATION.md` §7.5), and was previously an element this check
  made impossible to render. Do not count a citation into the limit and then STOP
  the slide: the limit is a legibility rule and it does not edit sourcing.
- **Evidence:** slide count, per-slide word counts **with any attribution or
  liturgical text noted as excluded**, the cliffhanger slide number and its final
  characters, the landing slide quoted.
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
six third-party posts, and the split in them is **not** the invocation.

> **The figures themselves are held in exactly one place:**
> **`exemplars/format-b-saint-of-the-day/README.md`**, together with the caveats
> that govern how they may be read — within-account validity, the uncontrolled
> subject-salience confound, and the one row that carries no comparative weight
> at all. **They are not restated here.** They used to be, in this file and in
> `best_skill.md` §4.4.0 and in that README, and the three copies had already
> drifted into three differently-worded sets of caveats. A grader who needs the
> numbers reads the README; a grader who only needs the conclusion reads the next
> paragraph.

**Ending on the invocation is necessary but not sufficient — it is table
stakes.** The Queenship post closes devotionally, on a Salve Regina acclamation,
and still lands ~2.5× below Clare and Monica on likes and ~6× below on saves. So
W3 stays mandatory and stays a STOP, but passing it is not what makes a post
work. **What separates a strong Format B post is that it gives the reader a
reason to stop — an engine**, and three are attested: **(a)** a hinge carrying
the saint's life into what the app does (B-1, W2); **(b)** a numbered promise
with a named audience (B-2, W6+W7); **(c)** a genuinely quotable quote, carried
on the image (`07`). A post with none is inert even when every structural box is
ticked — and the floor cannot catch that on its own, which is why W2, W6 and W7
are written as hard as they are.

**Engine (c) is deliberately not a check.** "Genuinely quotable" is a taste
judgement, and a taste judgement inside the gate is what §0.1 forbids — it would
be the voice score wearing a floor's clothes. It is recorded as an observed
engine type and reported qualitatively under §9.2. Note also that engine (c) is
the one that pulls hardest against T3: the quote that would perform best is the
quote most likely to be misattributed, and `07` carries a genuine image quote
next to a misattributed caption clause. See `ATTRIBUTION-CASES.md`.

Read the figures with §9.5's caveats attached: they are **not** a set of
comparable data points. `exemplars/format-b-saint-of-the-day/README.md` is the
**authoritative** copy of both the numbers and the caveats; cite it rather than
reproducing either.

Its exemplar set is `exemplars/format-b-saint-of-the-day/`. **That set holds
seven items: three positive, two negative, one middling, one mixed, and only one
of them is Saint Match's own.** It is enough to fix both variants' shapes. It is
not enough to rank on — see §9.5.

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
still applies to any slide that exists, **with the two exclusions `best_skill.md`
§4.1 states**: an attribution line does not count toward it, and verbatim
liturgical text is exempt (§4.3). **Do not STOP a slide for a word count that
only exceeds the limit once a citation is counted into it** — the limit is a
legibility rule and it is not entitled to edit the sourcing
(`../../method/TRUTH-CHECKS.md` T3).

- **Variant B-1's slide structure is unspecified by the user.** Do not invent one
  and do not STOP on slide count. Record the count in NOTES so the shape can be
  settled from evidence once more specimens exist.
- **Variant B-2's slide count is constrained by its own promise**, through W6:
  the number on the hook slide must equal the number of slides delivering a
  distinct teaching. **No total slide count is prescribed** — the one specimen
  runs seven slides behind a promise of four and the remaining slides are not
  recorded, so there is nothing to prescribe from. Record the total in NOTES.
  **There is, however, a floor of three teaching slides** (W6), which is a
  stipulation rather than a reading of the specimen and is marked as one.

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

On **B-2 the audience line is the app side**, which is why W7 requires it to name
a **struggle**: Saint Match matches a person to the saint who carried their
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

> **W2 and W7 used to be close to mutually unsatisfiable on B-2. Read this before
> grading either.** W2 defines the app side of a B-2 hinge to be the audience
> line; W7 formerly required that line to be one of twelve struggle categories
> "or a plain paraphrase of one"; and a generic category **survives a saint swap
> by construction**, because genericity is what makes a category one. So the app
> side of every B-2 hinge was under pressure to be exactly the kind of phrase W2
> calls not-a-hinge, and a real pack — draft `07` — could not be written to pass
> both.
>
> **What changed is W7, not W2.** The twelve-topic list governs the `topic`
> **header field**; the audience line may name the struggle in **the saint's own
> vocabulary**, taken from a DOCUMENTED dossier line (`best_skill.md` §1, §4.4.1;
> W7 below). That is what makes the swap test bite: "…anyone who cannot get back
> to **the quiet**" is Gregory's own word out of his own letter, and once Gregory
> is removed the word has no source.
>
> **W2 was deliberately not weakened, and the way it was not is worth stating.**
> The alternative fix was to scope W2's swap test on B-2 to the **saint side**
> only. That closes the contradiction and destroys the check: the saint side is a
> sourced fact about this saint, so it fails a swap *by construction*, and W2 —
> the defining check of this format — would pass automatically whenever T1
> passed. **A check that cannot fail is not a check.** W2 still runs on both
> sides, on both variants, unchanged.

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
- **The `@saintmatchapp` handle on a Format B slide is a STOP; its absence is
  correct and is never one.** `best_skill.md` §8.0's brand-background slide
  template puts the handle at 8% from top, and §5.4 says the app is never named
  in any on-image text — a direct contradiction that, under §1's fail-closed
  default, a grader had to STOP either way it was read. **Resolved in §8.0: the
  handle is Format A furniture and is omitted on Format B**, where the hinge is
  the brand's only presence. Do not STOP a Format B pack for having no handle,
  and do not read the template as requiring one here.
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

#### W5 — variant B-1: exactly one fact, and a fact is one dossier line

- **The unit is one dossier line.** Detail internal to that line — a count, a
  list, the named contents of the thing the line records — is **not** a second
  fact. Count dossier lines, not sentences, not clauses, not independently
  falsifiable propositions.
- **PASSES:** **one** such fact, in the caption, doing all the anchoring work.
- **STOPS:** the caption rests on **two or more dossier lines**, so the hinge has
  to compete for the word budget.
- **Evidence:** the fact quoted, **its dossier line number**, and its grade.
- **Why the unit is defined, and why it had to be.** This check formerly said
  "exactly one fact" and never said what a fact was. That is not a harmless gap
  in a **fail-closed** gate: §1 turns "grader cannot determine whether a check
  passes" into a STOP, so an undefined unit **STOPs by itself** on any caption
  whose fact has internal structure — which is nearly every fact worth building a
  post on. A caption resting on one line recording that a book "spends thirty-four
  chapters telling one kind of listener from another — the impatient from the
  patient, the too silent from the ones who talk too much" is **one** fact. One
  grader counted one; another would have counted three and STOPped a correct
  pack. Now there is nothing to disagree about: one line, one fact.
- **The gaming route, and where it is caught.** Writing one very broad dossier
  line to make several facts count as one is a **dossier** defect and is a **T1**
  STOP, not a W5 judgement: the dossier is built before the caption
  (`best_skill.md` §3.2), and a line added, widened or merged after the caption
  exists is caught there. **W5 itself stays mechanical** — do not import the
  question into this check, or the ambiguity comes back in a new place.

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
- **Floor: the promise must be at least three, and at least three slides must
  deliver.** A promise of one or two **STOPs**.
  - **This is a stipulation, not a reading of the evidence, and it is labelled as
    one.** The single specimen promises four; there is nothing in the set from
    which to derive a floor. It exists because W6 makes the *number* the
    contract, and nothing else stopped a B-2 post promising **2** — which is a
    B-1 with extra steps, and which **W9 would pass**, because two slides really
    would carry the teaching. The floor is the only thing that catches it.
  - Widen or narrow it from specimens, not from a draft that missed it.

### W7 — An explicit audience is named, and it names a struggle

- **Tests:** the hook slide's overlay text, second required part.
- **PASSES — both clauses:**
  1. The hook slide **names an audience explicitly** — not "us", not "everyone",
     not implied.
  2. That audience is a **struggle**: it names **what someone is carrying**, not
     **what someone is**. It may be phrased either way below.

  | Route | What the line carries | Worked line |
  | --- | --- | --- |
  | **(i) the saint's own vocabulary** — preferred | a struggle named in a word or image drawn from a **DOCUMENTED dossier line of this saint's own**, cited in the evidence | "…anyone who cannot get back to **the quiet**" (Gregory, *Reg.* I.5) |
  | **(ii) topic paraphrase** | a plain paraphrase of one of the twelve in `best_skill.md` §1 | "…anyone waiting on someone they love" |

  **In both cases the `topic` header field carries one of the twelve** (anxiety,
  waiting, grief, purity, patience, vocation, anger, loneliness, shame, fear,
  distraction, money). The twelve govern **that field**; they do not govern the
  wording of this line.

- **Route (ii) is permitted and is usually the one that fails W2.** A plain topic
  paraphrase is generic, and generic phrases survive a saint swap — which is what
  W2 STOPs on. Taking route (ii) does not excuse a W2 failure and does not soften
  W2. **Route (i) is the default** precisely because it satisfies both.
- **Route (i) does not license lifting any noun out of the dossier.** The line
  must still name a struggle, the word must come from a line graded **DOCUMENTED**
  (not TRADITIONAL, not LEGEND), and the evidence must cite that line. If the
  grader cannot tell whether the phrase names a struggle or a category of person,
  §1's fail-closed default applies and it STOPs.
- **Why this clause was rewritten.** It formerly required the audience line
  itself to be one of the twelve topics "or a plain paraphrase of one", while W2
  defines that same line to be the hinge's app side and requires the hinge to
  **fail** a saint swap. Those demands are close to mutually unsatisfiable: a
  category is generic by construction, so satisfying W7 pushed the line toward
  exactly what W2 calls not-a-hinge, and a real pack could not be written to pass
  both. Separating the **index** (the `topic` field) from the **surface wording**
  resolves it without weakening either check. See the note under W2.
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
- **Evidence:** the audience clause quoted; **which route it took**; for route
  (i) the dossier line the word comes from and its grade, for route (ii) which of
  the twelve it paraphrases; the `topic` field's value; or, on a STOP, which
  demographic category it fell into.
- **This is a deliberate divergence from the specimen, and it is recorded rather
  than inherited.** EWTN Parents names a demographic — "every Catholic parent" —
  and is right to: a demographic **is** that account's identity, and its audience
  self-selects on it. Saint Match matches on **struggle**, so the same slot has to
  carry a struggle for the post to perform its own product. Do not cite the
  specimen in defence of a demographic here; the specimen is evidence for the
  *slot*, not for what fills it.
- **The specimen has never satisfied W7 and W2 together, and never could.** Its
  audience line fails W7 as a demographic, and it has **never been swap-tested
  against W2** — it does not survive one: "4 things St Rita can teach every
  Catholic parent" reads perfectly well. So B-2's only worked example is evidence
  that the **slot** exists and gets engagement, and is **not** an example of a
  satisfied B-2 hinge. State this when citing it; it was previously easy to read
  the specimen as though both checks had been demonstrated on it.
- **W7 and W2 overlap on purpose.** The audience line is the hinge's app side on
  B-2. A demographic there usually fails both. Report both — the writer needs to
  know the line is wrong *and* that the post consequently has no bridge.
- **And note the other pairing, which W7 formerly did not contemplate:** the line
  can be a clean W7 pass **and** a W2 failure, when it names a real struggle in
  perfectly generic words. That is not a contradiction in the grade; it is the
  signal to move the line to route (i). Report both verdicts as they fall.

### W8 — The caption is minimal

- **Tests:** the caption body, in full.
- **PASSES:** exactly two elements and nothing else — **one line of framing,
  phrased as a question**, then **the invocation** (W3).
- **STOPS:** the caption carries the teaching, the fact, or the hinge — that is a
  **B-1** post and it should have been declared as one; no framing question; any
  third element — a second framing line, a summary, a hashtag, an emoji, a
  sign-off.
- **The 8–25 word band is RECORDED, not gated — until n ≥ 4.** A count outside it
  is a **NOTE and a flag for review**, never a STOP on its own.
- **Evidence:** the caption verbatim, the word count, and the two elements named.
- **A framing question is REQUIRED here and is not the banned opening question.**
  `best_skill.md` §5.5 bans opening on a rhetorical question; that is a **Format
  A** rule which variant **B-1** inherits (B1-B). It does **not** apply to a B-2
  caption, whose whole job is to frame and hand off to the carousel. Firing B1-B's
  question ban here would STOP every correct B-2 post. The carve-out is written
  into B1-B; do not drop it.
- **Why the band is not a check.** It is **n = 1** — a band set wide around a
  single fourteen-word specimen — and it is not doing any work: on the one real
  pack graded against it, 9 words and 24 words would both have passed just as the
  actual 20 did, so it constrained nothing while presenting itself as a
  measurement. A fail-closed gate should not carry a threshold that is really a
  guess; that is measurement theatre, and it produces arbitrary STOPs on the day a
  correct caption lands at 26.
  **What actually shapes a B-2 caption is the shape rule** — "exactly two
  elements and nothing else" — and that stays a STOP, as does W9. A caption long
  enough to be doing real work will be caught there, by carrying teaching, rather
  than here, by a number nobody has evidence for.
  This is the same treatment §9.5 gives the voice score on a thin set, and for the
  same reason. **Keep recording the count in NOTES on every B-2 pack**; promote
  the band back to a check once there are four or more specimens to set it from.

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

**Scope — read this first. On variant B-2, B1-B runs on every slide overlay as
well as on the caption**, in the same words W4 uses: "every line" includes every
slide overlay, not just the caption.

> **Why this had to be said explicitly.** Every clause below is written about
> "a caption", which is where the register lives on B-1. **On B-2 the caption is
> a framing question and an invocation — twenty words with no register in it —
> and all the teaching, and therefore all the register risk, is on the slides.**
> W4 already extends to slide overlays on B-2; B1 did not say, so as written the
> **primary anti-pattern of the format was unchecked on the only surface a B-2
> post can commit it on**. A run of clipped biographical statements across four
> teaching slides is encyclopedia register whether or not any one of them is a
> caption. Grade the slides **as a set**: the anti-pattern is cumulative and no
> single slide displays it.
>
> This scope note is the check's, not a variant carve-out: on B-1 there is
> usually nothing on the slides to read, and reading it changes nothing.

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
  **On B-2, read the teaching slides as a block for this.** Four slides of the
  form "He was X. He did Y." are a reference-work entry broken across four
  frames, and the fact that each slide is individually clipped and concrete is
  not a defence — that is what an encyclopedia entry is made of. The distinction
  that matters is whether the slides are **beats** that go somewhere or a
  **list** that accumulates: a run of neutral appositives with no turn is the
  anti-pattern, wherever it is printed.

- **The calendar-announcement opening — a register marker.** "August 25 is the
  feast day of St Joseph Calasanz…", "August 22 is the feast day of the Queenship
  of Mary…". Opening by announcing the date or the feast is a STOP on both
  variants: it opens on the calendar rather than on the reader or the fact, and
  the reader has been given no reason to keep reading. Treat it as a prompt: if
  the first six words name a date, read the rest for encyclopedia register before
  anything else. A **timeliness peg** is not a hinge; it is a reason to post
  today, which is a different thing, and it does not substitute for W2, W6 or W7.
  **Correction — do not read it as a performance predictor.** This check
  previously called it "the cheapest available tell" for an inert post, because
  the only two specimens that opened this way were the only two underperformers.
  Specimen `07` (EWTN, St Bernard) opens the same way and places third on likes
  and second on saves in the set. The **STOP stands** — it is a register rule and
  this scorer's floors are not engagement-derived (§0) — but the co-occurrence
  claim is withdrawn. A draft that avoids the opener has **not** thereby earned
  an engine; that is still W2, or W6 with W7.

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

**I1–I4 and the §6.5 scope note now live in `../../method/TRUTH-CHECKS.md`, verbatim and
complete.**

They are truth checks enforced on an image rather than on a sentence — an image
asserts things, and every attribute it asserts must trace to a dossier line
exactly as a sentence must — so they travel with T1–T6 rather than staying with
this instance's voice floor. I4 is the exception in kind (legibility and
composition, not truth) and is kept beside them because §6.5's whole point is
that its rewrite is not precedent for softening I1–I3.

**What stays Saint Match's** is what the checks are run *against*: the habit,
era, palette, art-historical anchor and baked-type rules of `best_skill.md` §8,
which I1, I2 and I4 all cite.

---

## 7. Recording the verdict

**Moved to `../../method/GATE.md` §7, verbatim and complete** — every grade recorded
against the artifact's id whether it passed or not; PASS/STOP rate per rulebook
version as a first-class signal; STOPped drafts counted from the scorer's records
because they never reach a platform; and the voice score recorded in a separate
field that is never merged into the verdict.

---

## 8. Output format

**The output contract now lives in `../../method/GATE.md` §8, verbatim and complete** —
the verdict block, the rules for the emitted grade (every check gets a line;
every line carries evidence; any single STOP makes the verdict STOP; the verdict
block never contains a numeric score), and the separate voice-score block with
its `exemplar_set` field.

The check list printed in that block is **this instance's**: T1–T6, V1–V7,
W1–W9, B1–B3, C1–C3, G1, I1–I4. A second brand prints its own floor checks in
the same skeleton and keeps the T and I lines unchanged.

---

## 9. The voice score — a ranking signal, never a gate

**§9's preamble and §9.1–§9.4 now live in `../../method/VOICE-SCORE.md`, verbatim and
complete:** score each format against its own set; anchor on exemplars rather
than adjectives (odd-one-out, forced ranking, nearest neighbour); the
anti-pastiche guard and the `variety_score` that tempers the loop; and the
judge-consistency bar that must be cleared before any voice score is allowed to
drive a rulebook edit.

They moved because none of it is about Saint Match. The failure they are written
against — an LLM judge rating everything a 4 against an adjective, and a loop
learning pastiche from a fixed gold set — belongs to the mechanism, not to the
brand.

**What stays here is §9.5: the current state of *this* instance's sets** — how
many specimens exist per format and per variant, which are rankable referents,
which are known-bad anchors, and therefore what may and may not be scored today.
That changes every time the user ships a post, which is exactly why it is not
portable.

### 9.5 Format B's exemplar set is too thin to rank on yet

`exemplars/format-b-saint-of-the-day/` holds **seven specimens**, of which **six
are third-party** references for *shape* only — not Saint Match content and not
to be imitated line-by-line — and **two are negatives** plus one middling and one
mixed, which are not referents at all (§9.1). That leaves **two rankable
referents for variant B-1 and one for variant B-2**, and exactly **one Saint
Match specimen in the whole folder**. Adding `07` did not change the referent
count and was not meant to.

That is enough to fix both variants' structure, which is why W1–W9 are binary and
confident. **It is nowhere near enough to rank on.** A forced ranking against two
referents produces an ordinal with almost no resolution; against **one** it
produces none at all, so **variant B-2 cannot be voice-scored under any
circumstances yet** — record `set_maturity: shape-only` and omit the number.

**Engagement figures are not a substitute for referents.** The set now carries
real like and save counts, and they are genuinely informative about *what*
separates a strong post (§3B). They are **not** a ranking scale: they are six
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

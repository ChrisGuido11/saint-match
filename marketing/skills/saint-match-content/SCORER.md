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

The voice floor checks (V1–V7 for Format A, W1–W5 for Format B — §3) are
**structural presence tests** and are run with the rest of the gate at step 3. Run them mechanically — count the words,
find the ✝️, match the app-mention pair against the table. Do not form an
opinion about the writing while running them; that is §9's job and it happens
later, separately, and only after a PASS.

**Before anything else, read the declared format** from the header block
(`post_format`). It selects which voice floor runs — V1–V7 for Format A, W1–W5
for Format B — and which column of B1 and B2 applies. See §3.0.

- The format is **declared, never inferred**. A pack with no `post_format`, or
  with a value that is not `A-themed` or `B-saint-of-the-day`, is a **STOP**
  here, before any other check runs.
- **Do not "correct" a declared format that seems wrong for the draft.** If a
  pack declares Format B and reads like Format A, grade it as Format B and let it
  fail W1 and B1-B. That failure is the accurate one and it is the signal the
  loop needs. Silently regrading against the other format hides the error.

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

### 3.0 Two formats. Read this before running anything in §3.

There are two documented post formats and **they have different voice floors**.
Running one format's floor against the other is the same class of bug this
realignment exists to fix, pointed the other way.

| | **Format A — themed long-form** | **Format B — saint of the day** |
| --- | --- | --- |
| Source | The Notion style bible; `exemplars/` | The user's stated spec; `exemplars/format-b-saint-of-the-day/` |
| When | Themed and scriptural posts | **The standard for daily saint posts** |
| Body | 200–500 words | **~40–70 words** |
| Person | Sustained second person | **Third person** |
| Ending | Scripture → ✝️ → engagement → app mentions → hashtags | **"St [Name], pray for us."** |
| Bridge | Stated in the internal block, felt in the caption | **Performed as a hinge, never stated** |
| CTA | Engagement line + app-mention pair | **The hinge is the CTA. No pitch at all.** |
| Floor checks | **V1–V7** | **W1–W5** |

**The format is declared, not inferred.** The pack header block carries it. A
pack whose format is missing, malformed, or not one of the two is a **STOP at
§1**, before any voice check runs — grading a draft against a guessed format is
how a correct post gets rejected for lacking an element its format does not
have. Do not infer the format from the draft's length or from whether it happens
to have a scripture block; that reasoning is circular, because those are the
very things under test.

**Applicability, exhaustively:**

| Checks | Format A | Format B |
| --- | --- | --- |
| T1–T6 truth | **run, unchanged** | **run, unchanged** |
| I1–I4 iconography | **run, unchanged** | **run, unchanged** |
| V1–V7 voice floor | run | **`N/A — Format B`** |
| W1–W5 voice floor | **`N/A — Format A`** | run |
| B1 register | run, Format A column | run, Format B column |
| B2 shape and ending | run, Format A column | run, Format B column |
| B3 promises | run | run |
| C1 CTA pattern | run | **`N/A — Format B`**, superseded by W4 |
| C2 banned register | run | run |
| C3 saint not leverage | run | run |
| G1 bridge | run, stated form | run, hinge form (W2 is the strict test) |

`N/A` normally demands a bespoke one-line justification (§1). **Format
mismatch is the single exception**: writing `N/A — Format B` is a complete and
sufficient justification, because the format was declared in the header and
verified at §1. Every other `N/A` still needs its reason.

**A STOP is a STOP whichever floor produced it.** The two floors differ in
content, never in force. Neither is the "lighter" one; Format B is shorter, not
laxer, and its hinge test (W2) is the hardest single judgement in this document.

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

## 3B. Format B voice floor — W1–W5

**Run only when the declared format is B.** For Format A, record every W check as
`N/A — Format A`.

Format B is the **saint-of-the-day post, and it is the standard for daily
posts**. It is a different register from Format A, not a compressed version of
it. The defining mechanic is the **hinge** (W2); everything else in this
subsection exists to keep the hinge in clear air.

Its exemplar set is `exemplars/format-b-saint-of-the-day/`. **That set currently
holds two items, one of which is third-party.** It is enough to fix the shape.
It is not yet enough to rank on — see §9.5.

**Format B does not carry Format A's furniture.** No scripture block, no ✝️, no
🙏🔥, no "Type AMEN", no hashtag wall, no app-mention pair. Their **absence is
correct and is never a STOP**. Do not reach for V1–V6 here, and do not let their
wording leak into a W judgement.

### 3B.0 Frame and slides for Format B

`best_skill.md` §4 opens "Everything is 9:16, 1080 × 1920", which is a frame
rule and is format-agnostic, so **9:16 still applies** and I4 still tests it. The
5–7 slide count and the mandatory cliffhanger of §4.1 are Format A structure and
**do not apply** — a 40–70 word caption cannot carry seven distinct emotional
beats, and demanding it would force padding, which is the failure this format
exists to avoid. The 5–15 words per slide legibility limit still applies to any
slide that exists.

**Beyond that, Format B's slide structure is unspecified by the user.** Do not
invent one and do not STOP a Format B pack on slide count. Record the count in
NOTES so the shape can be settled from evidence once more specimens exist.

### W1 — Length

- **Tests:** the caption body word count.
- **PASSES:** **40–70 words**, invocation included.
- **STOPS:** under 40 or over 70. Over 70 is the characteristic failure — it
  means the writer reverted to Format A's expansiveness and the hinge is buried.
- **Evidence:** the exact word count.
- **Note:** the band is tight on purpose. A Format B post that "needs" 90 words
  is usually carrying two facts; cut to one (W5) rather than widening the band.

### W2 — Exactly one identifiable hinge

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

### W3 — Ends on the invocation

- **Tests:** the final line.
- **PASSES:** the caption's last line is the invocation, in the form **"St
  [Name], pray for us."** Nothing after it.
- **STOPS:** absent; not last; reworded past recognition; followed by anything at
  all — a hashtag block, an app mention, an emoji, a sign-off.
- **Evidence:** the final line quoted, and confirmation that nothing follows.
- **Note:** minor honorific and punctuation variation is tolerated ("St." /
  "St", "Saint Raymond"). A **patronage clause** — "St Rita, patron of impossible
  causes, pray for us" — is permitted only if that patronage is a dossier line;
  an unsourced patronage in the invocation is a T1 STOP, not a W3 one.

### W4 — No product pitch. The hinge is the CTA.

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

### W5 — One fact, correctly graded

- **Tests:** the concrete fact the post rests on.
- **PASSES:** **one** concrete, verifiable fact about the saint, traced to a
  dossier line, and either **DOCUMENTED and asserted plainly**, or **TRADITIONAL
  and attributed** in the phrasing §2 requires ("the Church has long held…",
  "his order remembers…").
- **STOPS:** no concrete fact — the post is atmosphere; more than one fact, so
  the hinge has to compete; a **LEGEND used as the anchoring fact**, which is an
  automatic STOP here even when it is attributed, because at 40–70 words a
  legend attributed is still the load-bearing claim (`best_skill.md` §2); a
  TRADITIONAL fact asserted flatly.
- **Evidence:** the fact quoted, its dossier line, and its grade.
- **Note:** W5 is a **voice-floor framing test** and does not replace T1 or T2,
  which run unchanged and are the strict ones. W5 additionally requires that
  there be exactly **one** such fact — a count requirement T1 and T2 do not make.
  A Format B post whose single fact is ungraded fails T1 *and* W5.

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
  this length reads as a pitch; Format A's urgent exhorting tone; a rhetorical
  question as the opening line; plus every shared ban above.
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

- **Tests:** structure of the Format B caption.
- **PASSES:** a fact, a hinge, an invocation, in that order and nothing else.
  Typically three to five sentences. Opens on the **fact**, plainly stated. The
  hinge follows and is not explained. The invocation closes it (W3).
- **STOPS:** opens on the hinge or on a mood rather than the fact; a summarising
  or moralising sentence between the hinge and the invocation, which flattens the
  hinge by explaining it; any block after the invocation; Format A's
  eight-to-twelve-paragraph build compressed into the word budget.
- **Evidence:** the sentences listed in order with their roles named.
- **Note:** B2-B tests the **order and economy**; W1 tests the length and W2 the
  hinge itself. B2-B is where "correct parts, wrong sequence" is caught — most
  often a post that explains its own hinge in a closing line before the
  invocation.
- **Note — the ending polarity question does not arise here.** Format B does not
  end affirming *or* hard; it ends on the invocation, which is a liturgical form
  and not a rhetorical one. Do not import B2-A's ending test.

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

### I4 — Layout constraints

- **Tests:** framing instructions.
- **PASSES:** 9:16; upper third kept clear for overlay type; a mid-tone region
  specified behind the type so it can clear 3.5:1; no text rendered inside the
  image.
- **STOPS:** missing aspect ratio; no clear region for type; the prompt asks the
  generator to render lettering.
- **Evidence:** the framing clause quoted.

### 6.5 Unresolved conflict in I4 — flag it, do not soften it

**I1–I4 above are unmodified by this realignment and stay exactly as strict.**
Iconography is a truth surface, not a voice one, and nothing in the style bible
touches it.

One conflict is nonetheless recorded here so it is not discovered mid-grade.
I4's last clause — "no text rendered inside the image", and "upper third kept
clear" — contradicts `best_skill.md` §8.2, which **withdraws** that rule: the
style bible bakes the overlay text into the generated image and treats a
generated image without its caption text as a failure. §8.1 further says the
text zone is declared as a vertical percentage range per composition and must
**not** default to a fixed band.

Until that is resolved by whoever owns this file:

- **Grade I4 as written.** Do not relax it on your own authority, and do not
  read this note as permission to pass a draft that fails it.
- **Record the conflict in NOTES** on any pack where I4 is the only STOP, naming
  `best_skill.md` §8.2, so the STOP is visibly attributable to a scorer/rulebook
  disagreement rather than to the draft.
- The contrast requirement in I4 — a mid-tone region behind the type clearing
  3.5:1 — is **not** in conflict and survives any resolution. §8.1 states the
  same requirement and adds the 2–3px, 50–60% opacity drop shadow for type
  sitting on painted areas.

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
draft_id:      <from header block>
skill_version: <from header block>
post_format:   A-themed | B-saint-of-the-day
graded_by:     <human name | judge model id>
graded_at:     <ISO 8601>

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
  W1 length 40-70          PASS | STOP | N/A — <evidence>
  W2 hinge                 PASS | STOP | N/A — <evidence>
  W3 invocation ending     PASS | STOP | N/A — <evidence>
  W4 no product pitch      PASS | STOP | N/A — <evidence>
  W5 one graded fact       PASS | STOP | N/A — <evidence>
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
  I4 layout                PASS | STOP | N/A — <evidence>

REQUIRED REWRITES
  1. <check id> — <what must change, concretely>
  2. ...

NOTES
  <anything the grader wants on the record, including N/A justifications>
```

Rules for the emitted grade:

- **Every check gets a line, both formats' lines included.** The seven V lines
  and the five W lines are always printed; one set carries verdicts and the other
  carries `N/A — Format A` / `N/A — Format B`. Do not delete the inapplicable
  block. A grader who prints only the applicable set makes it impossible to tell
  a check that was N/A by format from one that was silently skipped.
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
exemplar_set:    exemplars/ | exemplars/format-b-saint-of-the-day/
judge:           <model id + prompt version>
rank_position:   <n> of <set size + 1>
voice_score:     <1–5>
variety_score:   <1–5>
nearest_exemplar: <filename>  — <the specific move it shares>
weakest_axis:    <which of the §9.2 axes scored lowest, and why>
judge_agreement: <n of m judges within 1 point>
set_maturity:    ranked | shape-only (Format B, set too thin — §9.5)
```

`exemplar_set` must match `post_format`. **A Format B post scored against the
Format A gold set is a void measurement**, not a low one: it would be marked
down for lacking a scripture block it is correct not to have.

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

### 9.1 Score each format against its own exemplar set

| Format | Exemplar set | Size |
| --- | --- | --- |
| A — themed long-form | `exemplars/` | 6 |
| B — saint of the day | `exemplars/format-b-saint-of-the-day/` | 2 — see §9.5 |

**Never score a Format B post against the Format A exemplars, or the reverse.**
The two formats disagree on almost every surface feature — length, person,
ending, emoji, hashtags — so a cross-format comparison measures the format
difference and nothing else. It would reliably rate correct Format B posts as
poor, and it would do so with confident, plausible-sounding reasons, which is
the worst kind of bad measurement. The `exemplar_set` field in the output block
exists to make a cross-format score visible after the fact.

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
- **Format B:** economy; the hinge's strength and non-obviousness; the fact
  carrying real weight; the invocation landing cleanly.

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

`exemplars/format-b-saint-of-the-day/` holds **two specimens**, and one of them
is third-party (EWTN) and is a reference for *shape* only — not Saint Match
content and not to be imitated line-by-line.

Two items are enough to fix the format's structure, which is why W1–W5 are
binary and confident. **They are not enough to rank on.** A forced ranking
against two referents, one of which is off-brand by origin, produces an ordinal
with almost no resolution, and an odd-one-out test against a set of two is close
to meaningless.

Until the set reaches **at least four or five Saint Match specimens**:

- Run the voice score on Format B in **`set_maturity: shape-only`** mode: record
  `nearest_exemplar` and `weakest_axis`, which remain useful as qualitative
  notes, and **do not emit a `voice_score`, or emit it and mark it unusable.**
- **Do not use Format B voice scores to accept or reject any rulebook edit.**
- The user has been asked for more specimens. When they arrive, this is a
  deliberate baselining event: record it, and treat scores from before and after
  as belonging to different scales.

Format A is unaffected — its set of six is the working baseline, subject to the
consistency bar in §9.4 like everything else.

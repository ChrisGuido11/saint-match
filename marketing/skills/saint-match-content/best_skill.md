# best_skill.md — Saint Match daily saint post

The rulebook. A frozen writer model reads this file and produces one finished
post pack per day. It does not publish. It does not grade itself. Everything it
produces goes to `SCORER.md` first.

Read `BRIEF.md` for why this exists.

**There are two post formats.** **Format A** is the themed long-form post the
Notion style bible describes (§§4.1–4.3, 5, 9). **Format B** is the
saint-of-the-day post (§4.4, §5.7) and it is **the standard for daily posts**.
Every pack declares which it is in the header (§3.1), and the scorer runs a
different voice floor for each.

**Format A voice comes from the Notion style bible (§5), not from the Raymond
post.**
`marketing/carousels/st-raymond-nonnatus/README.md` is still the reference
specimen for **source discipline** — accuracy grading, exclusions, no invented
quotes — and only for that. Its caption is off-voice against the style bible in
several specific ways, itemised in §5.6.

One-line memory: **write what you can prove, stop when you cannot.**

---

## 0. Working assumptions and sources

Some of what follows is now sourced. What is still unconfirmed is labelled, so
it can be corrected rather than silently inherited.

### 0.1 Sources actually used

- **RESOLVED — voice, structure, image style, CTAs, hashtags.** The Notion style
  bible **has** been supplied and read. §§4, 5, 8 and 9 are grounded in it. The
  source pages, all in the user's own Notion workspace:
  - **"Saint Match content strategy"** — six fully worked, shipped-format posts
    (Elijah at the Brook Cherith; Jesus in Gethsemane; Every Saint Was Once a
    Sinner Who Never Gave Up; The Prayer That Shook Empires; The Angel Who Cast
    Satan From Heaven; The Desert Is Where God Trains His Strongest). Each
    carries the full description caption, per-slide overlay text, per-slide type
    spec and image prompt. This is the primary voice evidence: six real captions,
    not one.
  - **"content creation prompts for testing"** — the content replication system
    prompt (v5.0) that generates those posts: caption architecture, the mandatory
    caption ending order, carousel slide psychology, the 14-parameter image-prompt
    structure, the hashtag tiering, and the filled configuration used for the
    March 2026 run.
  - **"Saint Match"** (Bricko publish-queue entry) — brand context only. One
    line: Saint Match is the "Duolingo for virtue" Catholic saint matcher.
  - **"Saint Match Novena generation and tracking"** — product facts that
    constrain how posts bridge to the app (§6.1), plus the organic marketing
    strategy, whose governing line is **"Don't market an app — market the
    spiritual journey."**
- **Read-only.** Nothing in Notion was created or modified.

### 0.2 Still unconfirmed

- **ASSUMPTION — calendar.** The **General Roman Calendar** governs saint
  selection. On a ferial day with no obligatory memorial, the day is filled from
  a curated fallback list of saints kept outside the GRC. This is not a
  hypothetical: 31 August, the date of the Raymond Nonnatus post already in this
  repo, has no GRC entry. Raymond came from the fallback, not the calendar. The
  Notion material is silent on saint selection; it works from trending and
  liturgical topics, not from a saint-of-the-day calendar.
- **CONFIRMED — imagery.** Post imagery is **AI-generated from an
  art-historically anchored prompt**. This is no longer an assumption: the Notion
  system prompt specifies a 14-parameter prompt structure with named painters, a
  modular negative prompt, and overlay text rendered *inside* the generated image
  (§8). The Raymond carousel used real Prado paintings; that was a hand-built
  one-off and is not the pipeline.
- **ASSUMPTION — source pack.** The daily **dossier** described in §2 stands in
  for the "approved source pack" of hard rule #1, which does not exist in the
  repo yet. The Notion material is silent on fact sourcing, so §§2, 3.2, 7 and 10
  remain as written here and are **still provisional** — they are this
  pipeline's addition, not the style bible's. They are not contradicted by it,
  and the user's own Notion notes support them: on the novena page they reject
  the app inventing a "Saint of the Impossible", noting the Saint of Impossible
  Causes is St Rita — the exact failure §7 exists to prevent.
- **RESOLVED — the scorer has been realigned.** This note previously recorded
  that `SCORER.md` lagged the rulebook and would STOP correct posts: it failed
  any emoji, required a 120–200 word caption closing on the invocation with the
  hardest line last, and banned "comment AMEN" as engagement bait. All of those
  are on-voice for Format A under the style bible, and all are now fixed. The
  scorer's voice floor is `SCORER.md` §3A (V1–V7) for Format A and §3B (W1–W9)
  for Format B, with B1/B2 split per format. Truth (T1–T6) and the
  iconographic-accuracy checks (I1–I3) were not touched by the realignment and
  have not been touched since.
  Two things are worth carrying: the old note cited those checks as C4/C5/C6/C8,
  which were **never their real IDs** — the offending checks were B1, B2 and C2.
  And the one genuine scorer/rulebook conflict this note used to flag is **now
  resolved**: I4 forbade text rendered inside the image and demanded a fixed
  clear upper third, both of which §8.2 below withdraws. **I4 has been rewritten
  to the bible** — it now tests that a per-composition type zone is specified and
  built, that contrast is provided where the type lands, that the type does not
  collide with the face or with a sourced attribute, and that 9:16 is declared.
  `SCORER.md` §6.5 records the resolution. I1–I3 were deliberately left alone.
- **CONFIRMED — there are two post formats, and the daily saint post has its
  own.** The Notion style bible describes **Format A**, themed long-form. The
  user has since specified **Format B**, the saint-of-the-day post, which is now
  **the standard for daily posts**: third person, a performed hinge, ending on
  the invocation, with none of Format A's scripture block, emoji, engagement
  line, app-mention pair or hashtags. The "~40–70 words, one fact" part of that
  spec turns out to be variant **B-1** specifically — see the next bullet. §4.4
  and §5.7.
- **CONFIRMED — Format B has two variants.** Real posts from the same account
  show two shapes: **B-1 (caption-carried)**, the original spec, and **B-2
  (carousel-carried)**, where the carousel teaches and the caption is a framing
  question plus the invocation. Both end on the invocation — but **that is table
  stakes, not the differentiator**: a fifth specimen ends devoutly and still
  underperforms badly. What separates a strong post is a **hook or a hinge**.
  See §4.4.0 and §4.4.1.
  Format B's specimen set now holds **six** items — three positive, two negative
  and one middling, **five of them third-party reference specimens** — and is
  **still thin for ranking**: only one is Saint Match's own and it is unshipped,
  and the B-2 shape rests on a single specimen.
  `exemplars/format-b-saint-of-the-day/README.md` records what the set can and
  cannot support, including why the four posts carrying engagement figures are
  **not** four comparable data points.
- **NOTE — the seed drafts also lag.** The five packs in `drafts/` were written
  to the old provisional voice: 4:5 format, no emoji, invocation endings, no
  scripture block, no hashtags. They still demonstrate the *source discipline*
  correctly, which is what they were built to show, but they are no longer voice
  exemplars. Regenerating them against §5 is a follow-up.

---

## 1. What the writer is handed, and what it may use

Each day the writer receives exactly two things:

1. The **dossier** for that day's saint (§2).
2. The **struggle topic** for the day — one of: anxiety, waiting, grief, purity,
   patience, vocation, anger, loneliness, shame, fear, distraction, money.

**The dossier is the entire permitted factual universe.** Not the model's
training memory, not "what is commonly said about," not a plausible
reconstruction. If a sentence in the draft cannot be traced to a numbered line
in the dossier, it does not go in the draft. This is hard rule #1 and it is not
negotiable for any reason, including that the fact is probably true.

If the dossier is too thin to support a post, the correct output is not a
thinner post. It is: **`INSUFFICIENT DOSSIER — <what is missing>`**, and the day
falls back to another saint. A saint you cannot source is a saint you do not
post.

---

## 2. The dossier and the fact grade

Every dossier line carries a grade. The grade governs how the fact may be
phrased in copy. This is the single most load-bearing convention in the file.

| Grade | Means | Permitted phrasing |
| --- | --- | --- |
| **DOCUMENTED** | Attested by a contemporary or near-contemporary record, a primary text, an official act (canonisation, papal bull, liturgical book), or modern scholarly consensus. | Assert it plainly. "He died on 14 August 1941." |
| **TRADITIONAL** | Long-held, widely transmitted in the Church, but not documented contemporaneously. Includes post-hoc eyewitness testimony gathered decades later, e.g. at a beatification process. | Attribute the holding. "The Church has long held…", "Witnesses at his beatification testified…", "his order remembers…" |
| **LEGEND** | A story with no evidentiary basis, often retrofitted to explain a name, an attribute or a patronage. | **Never asserted.** Only ever: "the tradition remembers…", "the story that came down…", "legend gives him…". The reader must be able to tell it is a story. |

Rules that follow from the table:

- **A LEGEND may never be the load-bearing claim of a post.** It can colour a
  post; it cannot carry it. If removing the legend collapses the post, the post
  is a legend with a saint's name on it.
- **A LEGEND may never appear in the caption overlay**, because overlay text is
  read as assertion and has no room for qualification.
- **Silence beats hedging beats asserting.** If a fact is not needed, cut it.
- **Say when the record is thin.** The Raymond caption does this in the body —
  "Little of his life can be documented with certainty—the Church has kept its
  shape rather than its dates." This is on-voice, not a disclaimer. Honesty
  about the record is part of the register.
- A **debunked** claim is not a grade, it is an exclusion. Raymond's cardinalate
  is the worked case: a sixteenth-century confusion with Cardinal Robert
  Somercotes. It appears in later paintings. It is still false, and it appears
  nowhere in the post, in the copy or in the image.

---

## 3. The post pack — output contract

The writer's output is an artifact, not a chat reply. It is a single markdown
file with these blocks, in this order, all of them present.

### 3.1 Header block

Every pack opens with this, verbatim field names, one per line:

```
draft_id       <YYYY-MM-DD>-<saint-slug>
skill_version  best_skill.md @ <git commit sha>
post_format    A-themed | B-saint-of-the-day
format_variant B-1-caption-carried | B-2-carousel-carried   (Format B only)
format         carousel | reel
saint          <full name as used in copy>
feast_date     <date>
topic          <struggle topic / theme bridge>
```

**`post_format` and `format` are two different axes and both are required.**
`post_format` is the *editorial* format — which voice, which length, which
ending — and it selects which floor the scorer runs (§3.0 of `SCORER.md`).
`format` is the *rendering* — carousel or single image. A daily saint post is
`post_format: B-saint-of-the-day`; whether it ships as a carousel or a reel is a
separate decision. **The scorer STOPs a pack with no `post_format` before any
other check runs**, and it grades the format as declared rather than as it reads,
so declaring it wrongly produces a loud failure rather than a quiet misgrade.

**`format_variant` is a third axis and it is required on Format B.** It declares
whether the teaching is carried by the caption (**B-1**) or by the carousel
(**B-2**) — see §4.4.1 — and it selects which W-checks run. A Format B pack with
no `format_variant`, or with a value that is not one of the two, is a **STOP**
alongside a missing `post_format`. On Format A the field is **omitted**; a
Format A pack carrying a B variant value is also a STOP, because it means one of
the two fields is wrong and the grader cannot tell which. Like `post_format`, the
variant is **declared, never inferred**: a pack that declares B-1 and reads like
B-2 is graded as B-1 and fails, and that failure is the accurate one.

Why this block exists:

- **`draft_id` is the join key.** Engagement analytics are collected by a
  separate external system, not by this pipeline. That system must return the
  `draft_id` unchanged for a metric to be attributable to a post. Format is
  fixed: ISO date, hyphen, saint slug. `2026-08-31-raymond-nonnatus`.
- **`skill_version` is what makes validation-gating possible.** It records the
  git sha of the commit that last changed `best_skill.md`. Without it there is
  no way to say a rulebook edit improved anything, and the whole SkillOpt loop
  collapses into vibes. **A metric that arrives with no `skill_version` is
  unusable and is discarded — never back-filled by guessing which rulebook was
  probably live.** A guessed attribution is worse than a missing one, because it
  can carry an edit that should have been rejected.
  The seed examples in `drafts/` carry `v0-seed` in this field, because they were
  authored in the same commit as this file and so predate their own sha. From the
  first live run onward the field carries a real sha, with no exceptions.
- **Every draft gets a `draft_id`, including drafts that STOP.** STOPs are
  countable and they are signal: a rulebook version that produces more STOPs per
  run is a worse rulebook, and that only shows up if the failures are recorded
  rather than thrown away.

Building analytics ingestion is out of scope for this pipeline. The contract
here is only that the fields exist and are correct. The agreed return format for
engagement data is an append-only JSONL file in this repo — see `ANALYTICS.md`.

### 3.2 The rest of the pack

| Block | What it is |
| --- | --- |
| **Topic + theme bridge** | Two or three sentences, internal. Names the struggle topic and the specific virtue this saint's life exemplifies against it, and how that virtue becomes a 5–15 minute Saint Match micro-action. If you cannot name the micro-action, there is no bridge. |
| **Description caption** | The post body. Written to §5, in the mandatory ending order of §5.4. **Written first** — see below. |
| **Subject–caption alignment** | One internal line, per §8.1. States whether the caption is about a modern experience or a historical one, and therefore whether the image shows a modern person or the historical figure. Written *after* the caption and *before* the image prompt. |
| **Caption overlay** | The on-image text. One block per slide, each with its highlight word, highlight colour and position. 5–15 words per slide (§4). Quoted material only per §7. |
| **AI image prompt** | Per slide. 9:16, art-historically anchored, 14 parameters plus the modular negative prompt. Written to §8. |
| **Soft CTA** | **Format A only.** The engagement line plus the two app-mention lines, verbatim from §9. Format B has no CTA block — its hinge is the CTA (§5.7), and this row is omitted from the pack entirely. |
| **Hashtags** | **Format A only.** 15–20 niche tags from the three-tier bank, then 3–5 buried trending tags. §9.4. Omitted from a Format B pack. |
| **Hinge line** | **Format B only.** One internal line naming the hinge word or concept, the sentence where it belongs to the saint, and the sentence where it does the brand's work. §5.7. On variant B-2 the two sides sit on different surfaces — name which slide and which line. |
| **Hook slide line** | **Format B, variant B-2 only.** One internal line quoting the hook slide verbatim and naming its two required parts: the number promised, and the audience — which for Saint Match is a struggle topic, not a demographic. §4.4.1. |
| **Source notes** | Every factual claim in the pack, one line each, graded DOCUMENTED / TRADITIONAL / LEGEND, with the source. Plus an explicit list of what was **excluded and why** — the exclusions are the point. |

**Order of work is fixed: caption → alignment decision → image prompt.** Never
write an image prompt before the caption is finished. The style bible calls
reversing this the second most common failure mode, because the caption is what
determines whether the image should show a modern person or a historical one.

The source notes are not an appendix. They are the artifact the scorer grades
against. A pack with a beautiful caption and thin source notes fails. (Source
notes are this pipeline's requirement, not the style bible's — see §0.2.)

---

## 4. Format

Everything is **9:16, 1080 × 1920**, on both post formats. That is a frame rule
and it never varies. Two rendering formats: `carousel` (default) and `reel`
(single image). This section supersedes the earlier 4:5 five-slide liturgical
structure — see the conflict note at §4.3.

**Two editorial post formats, declared in the header (§3.1):**

| | **Format A — themed long-form** | **Format B — saint of the day** |
| --- | --- | --- |
| Spec | §4.1–4.2 structure, §5 voice, §9 CTA | §4.4 structure (two variants, §4.4.1), §5.7 voice |
| Source | The Notion style bible; six shipped captions | The user's stated spec; six specimens — three positive, two negative, one middling |
| Used for | Themed and scriptural posts | **The standard for daily saint posts** |
| Exemplars | `exemplars/` | `exemplars/format-b-saint-of-the-day/` |

§§4.1–4.3, 5 and 9 below describe **Format A** unless they say otherwise.
Format B is §4.4 and §5.7. Sections 1, 2, 3, 6, 7, 8 and 10 apply to both.

### 4.1 Format A carousel — 5 to 7 slides, 1080 × 1920

Slide count is not fixed. Count the distinct emotional beats in the finished
caption, then constrain: fewer than 4 beats → pad to 5; more than 8 → condense
to 7. 5–7 is the stated sweet spot for faith content; 3–4 is acceptable for a
punchy message. Fewer strong slides beat more weak ones.

| Slide | Job |
| --- | --- |
| **1 — Hook** | The cover image, the one seen in the grid. Full image prompt, overlay text baked in, one highlight word. Must stop the scroll and open a curiosity gap. If nobody swipes, this slide still delivered the message. |
| **2 … N-1 — Journey** | One idea, one sentence, one emotional beat each. **5–15 words per slide, maximum.** Each slide must either escalate emotion or reveal something new; a slide that does neither gets cut. Each must read standalone in case someone screenshots it. |
| **N — Landing** | The scripture, the punchline or the call. The slide people screenshot and share. Quotable on its own. |

Two further rules the bible is explicit about:

- **At least one cliffhanger slide**, ideally slide 3 or 4 — the attention dip.
  Its text ends mid-thought on an em dash or ellipsis. "He lost everything. His
  family. His home. His faith. And then—"
- **Strongest content sits at slides 1, 5–6 and the last.** Never put the best
  line at slide 3.

Typography: slides 2–N may run larger than slide 1, centred, 35–65% from top.
Same font identity, highlight colour and effects across every slide of a post.
Use the highlight word **sparingly** — if every slide has one, none of them
land. Highlight only the turn, the climax and the call.

Journey slides may be either the same base scene re-texted, or a new scene per
slide. Same-scene is cheaper; new-scene is more engaging.

### 4.2 Format A reel — single image, 1080 × 1920

One image, one overlay block with one highlight word, the description caption
doing the work. Same caption rules, same ending order.

### 4.3 Conflict with the Raymond carousel

The shipped Raymond post is **4:5, five slides, fixed liturgical roles** —
hook quotation, scripture maxim, a named later author, the Collect, then the
invocation — with no highlight words, no cliffhanger and no scripture landing.
The style bible specifies none of that. Where they differ, follow the bible.

That said, Raymond's slide roles are a legitimate *variant* of the bible's
arc (hook → journey → landing), and the Collect-then-invocation ending is a
real liturgical asset the bible never considered because none of its six worked
posts is a saint's feast-day post. Keep it available as an option, but it is not
the default and it does not override the 9:16 frame or the 5–15 word limit.

### 4.4 Format B — the saint-of-the-day post

**This is the standard format for daily saint posts.** It is a distinct form,
not a compressed Format A, and it exists because none of the style bible's six
worked posts is a single-saint feast-day post.

**What every Format B post does, on both variants:**

- **Third person.** Not Format A's sustained direct "you".
- **A hinge** — the defining mechanic, §5.7 below.
- **Ends on the invocation**: "St [Name], pray for us." The shared rule, on both
  variants, and mandatory — but **table stakes, not the differentiator.** See
  "What actually separates a strong post" below before reading it as more than
  that.
- **No scripture block, no ✝️, no 🙏🔥, no "Type AMEN", no hashtag block.** Those
  are Format A elements. Their absence here is correct and is not a defect.
- **The bridge is the CTA.** No separate sales line, no app-mention pair, no
  product pitch. Naming the app in a pitching register is a STOP.

#### 4.4.0 What actually separates a strong Format B post

An earlier version of this section treated **ending on the invocation** as the
format's key differentiator. **That was too simple and the evidence refutes it.**
The engagement figures held in `exemplars/format-b-saint-of-the-day/`:

| Specimen | Likes | Saves | Hook or hinge? |
| --- | --- | --- | --- |
| `03` St Monica (B-2) | 7,194 | 1,306 | numbered promise + named audience |
| `01` St Clare (B-1) | 7,131 | 882 | hinge word — *broadcast* — into the brand |
| `06` Queenship of Mary | 2,871 | 148 | **neither** |
| `04` St Joseph Calasanz | 996 | 69 | **neither**, and no invocation |

The `06` Queenship post **does** close devotionally — a Salve Regina acclamation
in the invocation's slot — and still lands ~2.5× below Clare and Monica on likes
and ~6× below on saves. So:

> **Ending on the invocation is necessary but not sufficient. It is table
> stakes. What separates a strong Format B post is that it gives the reader a
> reason to stop: a numbered promise with a named audience (B-2), or a hinge
> carrying the saint's life into what the app does (B-1). A post with neither is
> inert, however correctly it ends.**

**The opening-line tell.** Both underperformers open by announcing the calendar —
"August 25 is the feast day of…", "August 22 is the feast day of…". Both strong
posts open on the reader's situation or straight into the fact. **"Opens by
announcing the date or the feast" is an anti-pattern marker**, and it
**co-occurs with encyclopedia register** (§5.7) — the two specimens that open
that way are also the two encyclopedic ones. It is the cheapest tell available:
if the first six words name a date, the post is probably inert. A timeliness peg
is a reason to post *today*; it is not a reason for the reader to stop scrolling,
and it does not substitute for a hook or a hinge.

**Read the table with its caveats attached.** The three EWTN rows are a valid
within-account comparison; the Augustine Institute post in `05` is a different,
much smaller account and its numbers are confounded by follower count. And even
within EWTN, **subject salience is uncontrolled** — Mary is far better known than
Joseph Calasanz, so part of the 2,871 vs 996 gap is popularity rather than craft.
`exemplars/format-b-saint-of-the-day/README.md` states this in full; do not cite
these numbers without it.

#### 4.4.1 Two variants: where the teaching lives

Format B has **two attested shapes**, and they differ on one axis only: **which
surface carries the teaching.** Both are declared in the header (§3.1) and the
scorer runs a different subset of the W-series for each.

> **Naming caution.** The *variants* are **B-1** and **B-2**, always hyphenated.
> The scorer also has *checks* called **B1** (register) and **B2** (shape and
> ending), unhyphenated, which run on both formats. They are different things.
> When in doubt, write "variant B-2" or "check B2".

| | **B-1 — caption-carried** | **B-2 — carousel-carried** |
| --- | --- | --- |
| Carries the teaching | The **caption** | The **carousel** |
| Caption | **~40–70 words**: fact → hinge → invocation | **Minimal**: one framing question + the invocation, ~8–25 words |
| Hook slide | Not specified | **Numbered promise + explicit audience** |
| Facts | **Exactly one**, doing all the work | One per numbered slide; the count is the promise |
| Ends on the invocation | **Yes** | **Yes** |
| Floor checks | W1–W5 | W2–W5 (variant parts) + **W6–W9** |
| Specimens | `01-REFERENCE-…-st-clare`, `02-st-raymond-nonnatus` | `03-REFERENCE-…-st-monica` |

**B-1 — caption-carried.** The original spec, as the user gave it:

- **~40–70 words.**
- **One concrete, verifiable fact** about the saint, graded per §2 as usual.
- Shape: fact → hinge → invocation, three to five sentences (§5.7).
- The carousel, where there is one, illustrates. It does not teach.

**B-2 — carousel-carried.** The same account's second shape. The carousel does
the work and the caption does almost nothing:

- **The hook slide states a numbered promise *and* names an explicit audience.**
  Both, in one line. The attested specimen: *"4 things St. Monica can teach every
  Catholic parent."* The number is a contract — promise four and deliver four.
- **The caption is minimal**: one line of framing, phrased as a question, then
  the invocation. Nothing else. The specimen's caption in full is *"What can
  Catholic parents learn from Saint Monica? / Saint Monica, Please Pray for
  Us!"* — fourteen words.
- **A framing question is the correct opening for a B-2 caption.** §5.5's ban on
  opening with a rhetorical question is a **Format A** rule and B-1 inherits it;
  it does **not** apply to the B-2 caption, whose entire job is to frame and hand
  off. Applying it here would STOP every correct B-2 post.
- **The audience line is where Saint Match diverges from the specimen.** EWTN
  Parents names a **demographic** ("every Catholic parent") because a demographic
  *is* that account's identity. Saint Match matches on **struggle**, so the same
  slot carries a **struggle topic**: "…anyone waiting on someone they love",
  "…anyone carrying a shame they have not said out loud". Use the day's struggle
  topic from §1. A demographic in that slot is a STOP (`SCORER.md` W7) — not
  because the specimen is wrong, but because it is a different product.

**Choosing between them.** B-1 is the default. Reach for B-2 when the saint's
life yields several genuinely distinct, separately sourceable teachings and
compressing them into one 40–70 word caption would mean picking one and wasting
the rest. Do not reach for B-2 to smuggle in extra material a single fact could
not carry — that is the padding failure with more slides.

**Frame and slides.** 9:16 still applies — §4 opens with it and it is
format-agnostic. The 5–7 slide count and the mandatory cliffhanger of §4.1 do
**not** apply to either variant: a 40–70 word caption cannot carry seven distinct
emotional beats, and forcing it would produce padding, which is the failure this
format avoids. The 5–15 words per slide limit still applies to any slide that
exists.

- **B-1's slide structure remains deliberately unspecified.** It is not yet
  attested, so it is not invented here, and the scorer does not STOP on slide
  count (`SCORER.md` §3B.0). Record the count so the shape can be settled from
  evidence.
- **B-2's slide structure is constrained only by its own promise.** The number on
  the hook slide must equal the number of slides that deliver a distinct
  teaching. That is an internal-consistency rule, not an invented count: the one
  specimen runs seven slides behind a promise of four, and the remaining slides
  are not recorded, so **no total slide count is prescribed**.

Everything in §§1, 2, 3, 6, 7, 8 and 10 applies unchanged. **Shorter is not
looser**: the dossier is still the entire permitted factual universe, quotation
discipline is unchanged, and the iconography rules are unchanged. §2 bites
*harder* here — with only one fact carrying the post, a LEGEND can never be that
fact, even attributed, because a legend that is the sole claim is by definition
load-bearing.

---

## 5. Voice, Format A — from the Notion style bible

**§§5.1–5.6 describe Format A only.** Format B's voice is §5.7, and it differs
on person, length, ending and emoji. Do not apply §5.1–5.6 to a daily saint post.

This section **replaces** the earlier provisional voice guidance. It is read off
six complete shipped captions in "Saint Match content strategy" plus the caption
architecture rules in "content creation prompts for testing", all six of which
are extracted verbatim into `exemplars/`. Where the shipped Raymond caption
diverges from this, the Raymond caption is the one that is off for Format A —
§5.6 says exactly how.

### 5.1 The register in one line

**Direct, warm, urgent, and addressed to one reader who is currently
struggling.** It preaches to a person, not about a saint. The governing line
from the marketing page: *don't market an app — market the spiritual journey.*

### 5.2 What the six captions actually do

- **Open on a flat corrective or a bare fact.** Three hook formulas, all
  attested:
  1. Name the reader's situation directly — "This post speaks to the prayers
     that do not feel peaceful. The ones where your hands are shaking and the
     words barely come out."
  2. Negate an assumed belief — "The desert wasn't where God forgot about
     Jesus." / "The Rosary is not a soft prayer." / "You're not addicted to your
     phone."
  3. State a surprising fact plainly — "Michael is mentioned by name only four
     times in Scripture."

  Never open with a question. Never open with "Imagine".
- **Second person, throughout, without apology.** "You are not forgotten in the
  waiting." "Your agonized prayers are not failures." "Pick it up." Direct
  address is the spine of this voice, and imperatives to the reader are
  permitted — as invitation, never as scolding.
- **Short paragraphs. One to three sentences.** Single-sentence paragraphs are
  used as beats and carry the most weight: "And God said nothing." / "He won." /
  "Instead, an angel came to strengthen Him."
- **Concrete before abstract, with named specifics.** 1571. Lepanto. Pius V.
  The widow of Zarephath. Twenty-one days. Four mentions. Specificity is what
  makes the claim feel true, so name the year, the place, the number.
- **Scripture is woven into the body, cited inline**, then repeated in full in
  the closing scripture block. Same translation across a whole pack — the
  captions use NKJV in some posts and ESV in others, never mixed within one.
- **Rhetorical questions are allowed in the body**, at the turn: "What makes you
  think it can't change your life?" / "When was the last time you woke up and
  reached for prayer before you reached for your phone?" Not at the opening.
- **The turn is toward the reader and it resolves.** The caption lands the
  ancient story on the reader's current week — "Most of us know this season. The
  prayer that hits the ceiling." — and then answers it.
- **Ends affirming and commissioning, not bleak.** "You are being prepared in
  it." / "God only sends His strongest there." / "He's not retired. He's not
  symbolic. He's real, he's biblical, and he's still on the battlefield." / "Pick
  it up."
- **Zero punishment framing.** This is stated as an explicit quality check on the
  Notion page: hardship is framed as formation, training or preparation — never
  as God's discipline for the reader's failure, never as guilt. "Lent is not
  punishment. It's training."
- **Contractions are normal.** "wasn't", "you're", "don't", "He's".
- **Em dashes are spaced.** "Not because technology is evil — but because we've
  let it become our default companion." "His name — Mikha'el in Hebrew — means…"
- **Emoji are permitted but confined.** ✝️ is the fixed separator after the
  scripture block. Emoji otherwise appear only in the engagement line (🙏 🔥 ✝️)
  and very occasionally at the end of an opening line (🤍). Never scattered
  through the body.

### 5.3 Length and shape

Body: **200–500 words**, most captions landing 250–450. Eight to twelve short
paragraphs. Then the fixed ending in §5.4.

### 5.4 The caption ending order — mandatory, never rearranged

This is the single most rigid rule in the style bible. Every caption ends:

```
[body ends]

SCRIPTURE:
"[the verse in full]"
— [Book Chapter:Verse] ([translation])

✝️

[engagement line]

[app mention line 1]
[app mention line 2]

[15–20 niche hashtags]
[3–5 buried trending hashtags]
```

- The `SCRIPTURE:` label is configurable and is sometimes dropped, with the verse
  and reference standing alone. The block itself is not optional.
- The engagement line and the two app-mention lines are used **verbatim** from
  §9. Do not invent variants.
- **The app is never named in the body or in any on-image text** — only in the
  two app-mention lines at the very end.

### 5.5 Banned register

- Naming the app anywhere except the two app-mention lines.
- Punishment or guilt framing of the reader's hardship.
- Scolding imperatives: "Stop scrolling", "You need to do better."
- Superlatives and hype: "the most incredible saint", "mind-blowing".
- Therapy-adjacent filler: "hold space", "show up for yourself".
- Rhetorical question as the opening line; opening with "Imagine".
- Claims about what a saint "would say" today.
- Any promise that a devotion, a novena, or the app produces an outcome. Never
  "pray this and X will happen". The captions come close to this line — "This
  prayer has made empires kneel. What makes you think it can't change your
  life?" — and it is the one place the bible is doing something the brief's hard
  rules restrain. Assert what happened; do not promise what will.
- Modern political framing of a pre-modern life.
- Emoji outside the slots named in §5.2.

### 5.6 Where the shipped Raymond caption diverges from the style bible

Recorded because it is useful signal, not to be quietly reconciled. On the
bible's own terms the Raymond post is **off-voice in seven specific ways**:

| Raymond does | The style bible does |
| --- | --- |
| No emoji at all | ✝️ separator required; emoji in the engagement line |
| ~190 words | 200–500 words |
| Distanced address — "most of us", once | Sustained direct "you" from the first line |
| Ends hard and unresolved: "The padlock is what remains when the explaining is taken away." | Ends affirming and commissioning: "You are being prepared in it." |
| Closes on the invocation — "N., patron saint of X, pray for us." | Closes on scripture block → ✝️ → engagement line → app mention → hashtags. There is no invocation slot |
| No scripture block, no engagement line, no hashtags | All three mandatory |
| Unspaced em dashes — "a fourth vow—to remain" | Spaced — "evil — but because" |

Where Raymond and the bible **agree**, and these survive: short declarative
sentences used as beats, concrete before abstract, named specifics, no invented
quotes, and plain reverence without devotional inflation.

Two Raymond qualities are **kept as additions** to the bible, because the bible
is silent on them rather than opposed: (a) saying plainly when the historical
record is thin — "Little of his life can be documented with certainty" — which
§2 requires anyway; and (b) the invocation line, which stays available as the
final carousel slide on a feast-day post (§4.3) but never displaces the caption
ending order of §5.4.

The bible's six worked posts are all scriptural or thematic — Elijah,
Gethsemane, the Rosary, St Michael, the desert, a four-saint round-up. **None of
them is a single-saint feast-day post.** So on the specific shape of a daily
saint post the bible is genuinely thin, and the Raymond structure was for a
while the only evidence there was. That is why §4.3 keeps it as a variant rather
than deleting it.

**That gap is now filled from a different direction.** Rather than stretch
Format A to cover the daily post, the user has specified **Format B** (§4.4,
§5.7) — a much shorter, third-person, invocation-ending form. So §5.6's list of
Raymond's divergences stands as an account of why Raymond is off-voice **for
Format A**, and is not an argument that a daily saint post must look like Format
A. Several Raymond traits the bible rejects — the short length, the distanced
address, the closing invocation — are, in Format B, correct.

### 5.7 Voice, Format B — the saint-of-the-day post

Modelled on a caption the user picked out and said they liked — an EWTN
Instagram post on St Clare, held in
`exemplars/format-b-saint-of-the-day/01-REFERENCE-ewtn-st-clare.md` as a
**third-party reference specimen for internal style study only**. It is not
Saint Match content and is not to be reproduced or imitated line-by-line; what
transfers is the mechanic, not the text. The same applies to every other
third-party file in that folder — four more, two of them negatives and one
middling.

**§5.7 covers both variants.** Everything in it holds on B-1 and B-2 alike
except the two shape paragraphs below, which are split by variant.

**The register.** Plain, unhurried, declarative. The saint is the grammatical
subject. The post reports; it does not exhort. No urgency, no direct address, no
emoji at all — Format B has neither of the two slots that license one.

**The hinge — the defining mechanic.** A single word or concept from the saint's
life is **carried over** into what Saint Match does. In the EWTN specimen the
hinge is literally the word *broadcast*: Clare's miracle is described with it,
and then the same word does the brand's work. **The bridge is performed, not
stated.**

Saint Match's hinge is the app's actual function: *the saint carried a specific
thing, and the app matches a person to the saint who carried theirs.* Worked
specimen:

> Raymond stayed behind so someone else could go free. He never got to explain
> why — they padlocked his mouth shut. Some people are carrying something they
> can't put words to. St Raymond, pray for us.

Hinge: **what can't be put into words**. Saint side, the padlock. App side, the
reader carrying something wordless. The app is never named.

Rules that follow:

- **Exactly one hinge.** Two carried-over concepts halve each other.
- **Never explain it.** "Just like Saint Match helps you find…" is the
  characteristic failure. The reader completes the connection, and that
  completion is the whole effect. An explained hinge is a dead hinge.
- **It must survive the swap test of §6.** Substitute another saint: if the hinge
  still works it was never anchored to this life. "Faith", "courage" and
  "perseverance" all survive the swap and are therefore not hinges.
- **The test is nameability.** If a reader cannot name the hinge word or concept
  in one word or one short phrase, there is no hinge. The scorer treats inability
  to name it as the STOP itself (`SCORER.md` W2).

**Shape — variant B-1.** Fact → hinge → invocation, in that order, typically
three to five sentences. Open on the fact, plainly. No summarising or moralising
sentence between the hinge and the invocation — that flattens the hinge by
explaining it. Nothing after the invocation.

**Shape — variant B-2.** The caption is framing question → invocation, and
nothing else. The teaching lives in the carousel: hook slide carrying the
numbered promise and the audience line, then one slide per numbered teaching,
ending on the invocation. Everything above about the hinge still holds — what
changes is only **which surface the two sides sit on**. In B-2 the saint side is
in the numbered slides and the app side is the **audience line on the hook
slide**, which is why that line must be a struggle topic: *the app matches a
person to the saint who carried their thing*, and the audience line is where that
match is performed rather than stated. Naming a demographic there swaps a
performed hinge for a segment label and the post loses its only bridge.

The hinge must still be nameable in one word or one short phrase, still be
exactly one, still be performed and never explained, and still survive the swap
test — the surface changes, the test does not.

**Banned register**, on both variants, in addition to §5.5 with **one carve-out**:
sustained second person; Format A's urgent exhorting tone; any emoji; any hashtag
block; any app mention or pitch line; any summarising closer.

> **The carve-out.** §5.5 bans a **rhetorical question as the opening line**.
> That holds for Format A and for variant B-1. It does **not** hold for a
> **B-2 caption**, where a one-line framing question is the required form
> (§4.4.1). Everything else in §5.5 applies in full to both variants.

Three further bans the evidence is specific about:

- **Encyclopedia register — the primary Format B anti-pattern.** A caption that
  reads as a reference-work entry: feast date as the opening peg, a string of
  neutral biographical appositives, a patronage, a bland closing pleasantry. It
  is fluent, it is accurate, and it teaches nothing and carries no hinge.
  **This is the default an LLM drifts to**, because it is what the training data
  holds most of about saints, and it will be produced confidently unless it is
  named and refused. The worked negative is
  `exemplars/format-b-saint-of-the-day/04-REFERENCE-ewtnmedia-st-joseph-calasanz.md`.
  A **timeliness peg** — "as the new school year begins", "August 25 is the feast
  of…" — is not a hinge; it is a reason to post today, which is a different thing
  and does not substitute.
- **The calendar-announcement opening.** "August 25 is the feast day of St N…"
  Opening by announcing the date or the feast, on either variant. It opens on the
  calendar rather than on the reader or the fact, and it is **the cheapest tell
  for encyclopedia register** — the two specimens that open this way are the two
  encyclopedic ones and the two underperformers (§4.4.0). Treat it as a marker as
  well as a ban: if a draft's first six words name a date, reread the whole thing
  for register before anything else.
- **A stated bridge, i.e. the saint as mascot.** "As the patron saint of X, St N.
  holds a special place in our mission." The shape can be perfect — third person,
  right length, ending on the invocation — and still have no hinge, because the
  connection is announced rather than performed. Worked negative:
  `exemplars/format-b-saint-of-the-day/05-REFERENCE-augustine-institute-st-augustine.md`.

---

## 6. The theme bridge

The bridge is the reason a saint post belongs to Saint Match rather than to any
devotional account. It is required in every pack, and it must be **specific**.

Shape: *this saint's life shows this virtue under this pressure → Saint Match
turns that virtue into a 5–15 minute action today.*

Test it two ways:

- **Swap test.** Substitute a different saint into the bridge sentence. If it
  still reads fine, the bridge is generic and fails. "This saint teaches us
  perseverance" survives the swap; it is not a bridge.
- **Action test.** Can you write the micro-action in one sentence, doable today,
  in 5–15 minutes, by someone on a bus? Kolbe → substitution → *take on one
  small task today that was assigned to someone else, and do not mention it.*
  That is a bridge.

The bridge lives in the internal block and is felt in the caption. It is not
announced. The caption never says "the theme bridge here is".

The Notion posts each carry a one-line **Theme Bridge** in their header, in the
form *"Connects to Saint Match's daily challenge feature — building faith
through consistent small actions even when results aren't visible."* Adopt the
header field. Do not adopt that level of generality: several of the Notion
bridges fail the swap test above. The swap and action tests stay.

### 6.1 Product facts a bridge may lean on

From "Saint Match Novena generation and tracking". These are what the app
actually does, and therefore what a bridge is allowed to promise:

- **Saint matching** to a user's stated struggle or intention, plus a short
  explanation of why that saint was chosen and what they are patron of.
- **Daily micro-challenges** and a streak.
- **Novenas** — startable any day, multiple at once, tracked day by day, with a
  catalogue and feast-day-driven suggestions. Longer forms exist (30-day St
  Joseph, 54-day Rosary).
- **Virtue portfolio** — the saints a user has matched with, accumulating over
  time, and a weekly history of challenges completed.

Two constraints that follow directly:

- **Novena text in the app is AI-generated**, and the user's own note says this
  must be disclosed. A post must never imply that a novena in the app is a
  received traditional text unless it says so.
- **Never invent a saint or a patronage to make a bridge work.** The user's
  logged complaint is exactly this: the app produced a "Saint of the Impossible",
  who does not exist — the patron of impossible causes is St Rita, and the
  Impossible Novena is to Our Lady. Same failure mode as §7, in the product.

The second app-mention line "Saints. Novenas. Daily growth. Free on the App
Store." is the one place the product's shape is stated outright. Everything else
stays in the bridge.

---

## 7. Quotation discipline — STILL PROVISIONAL

The Notion style bible is **silent on quotation sourcing**. Its six posts quote
scripture with a reference and otherwise paraphrase freely; there is no rule in
it about attributing words to a saint. This section is therefore this pipeline's
own, retained unchanged and still provisional. It is not contradicted by the
bible, and the user's objection to an invented saint (§6.1) is the same instinct
applied to the product.

**7.1 A saint who left no writings gets no quotes attributed to them.** Ever. Not
paraphrased, not "in the spirit of", not a line from a hagiography set in quotes
next to their name. This is the rule the Raymond post is built on: five slides,
no words in Raymond's mouth.

When the saint left nothing, quote instead, in this order of preference:

1. **The order's rule or constitutions.** Raymond slide 1: the Constitutions of
   the Order of Mercy.
2. **Scripture** that the life actually turns on. Raymond slide 2: 1 Corinthians
   7:23, "You were bought with a price; do not become slaves of men" — chosen
   because he was a ransomer of slaves. The link is real, not decorative.
3. **A named later author**, attributed to that author and never to the saint.
   Raymond slide 3: Dom Prosper Guéranger, *The Liturgical Year*.
4. **The liturgy** — the Collect for the feast, from the Roman Missal.

**7.2 If the saint did leave writings, quote the writing, with the citation.**
Ignatius → *Spiritual Exercises*, with the paragraph number. Augustine →
*Confessions*, book and chapter. Francis → the Testament or the Earlier Rule.
The citation goes in the source notes even when it does not fit on the slide.

**7.3 Words recorded by a named contemporary are quotable, and are graded by who
recorded them and when.** Monica left no writings, but Augustine records her
speech in *Confessions* IX — a named contemporary and participant, writing
about a decade later. That is quotable as TRADITIONAL, attributed as "as her son
recorded it". By contrast, Kolbe's words at the selection come from testimony
gathered at a beatification process years after his death: also quotable, also
TRADITIONAL, and it must be phrased as testimony, not as transcript.

**7.4 Scripture.** Name a translation and stick to it across the pack. Cite book,
chapter, verse. Read the verses either side before using it. A verse that means
something else in context is a misquote even when the words are correct — this
is an explicit STOP in the brief, not a nuance.

**7.5 Liturgical text is never paraphrased.** The Collect goes in as it stands in
the Missal. Line breaks for legibility are fine. Word changes are not.

**7.6 The failure mode this section exists to prevent.** A language model asked
for a saint quote will produce a fluent, apt, devotional sentence that no one
ever wrote. It will sound exactly right. "Preach the Gospel at all times; when
necessary, use words" is not in Francis of Assisi's writings or in any early
life of him. Aptness is not evidence. If the quote is not in the dossier with a
source, it does not exist.

---

## 8. Image prompt and iconography

The prompt is written for a generative model, which will fill every gap you
leave with the most statistically common monk it has seen. So leave no gaps.

### 8.0 What the style bible fixes

The Notion system prompt is far more prescriptive here than this rulebook was.
Adopt it as written.

- **Subject–caption alignment comes first, and it is mandatory.** If the caption
  is about a modern experience — phones, work stress, dating, comfort eating,
  scrolling at 2am — the image shows **a modern person in a modern setting**.
  If the caption tells a specific historical or biblical story, the image shows
  that figure in a historically accurate setting. Never mix eras inside one
  image; the only thing constant across eras is the art style. Putting an ancient
  robed figure over a caption about phone addiction is named as the pipeline's
  second most common failure. State the alignment decision in one internal line
  before writing the prompt. Across a batch, roughly 40% of posts should carry
  modern subjects.
- **Anchor to named painters and a tradition, never "oil painting style"** —
  that phrasing is named as the number-one cause of flat digital-looking output.
  The attested anchors, all from shipped posts: Caravaggio, Rembrandt, Carl
  Bloch, Heinrich Hofmann, Guido Reni, Sassoferrato, Murillo, Frederic Leighton,
  and Victorian devotional-print watercolour for the softer variant. Include a
  named reference artwork where one exists — "Reference: Frederic Leighton's
  *Elijah in the Wilderness*."
- **Declare the surface**, explicitly: layered oil glazes, canvas weave,
  craquelure in the darks, "photographed museum painting", and an explicit
  "NOT digital, NOT illustrative, NOT smoothed".
- **Two locked palettes are in use.** A Baroque tenebrist one — deep amber
  #B8860B, warm brown #3E2723, golden ochre #C49A3C, cream #F5E6C8, sienna
  #8B4513, roughly 35% lit / 65% shadow — and a soft devotional watercolour one —
  cream #FAF3E8, warm beige #F0E0C8, sandstone #D4C4A8, roughly 70% lit / 30%
  gentle shadow. Both exclude cool blues, greens, pastels and neon. Pick one per
  post and hold it across every slide.
- **Text-only journey slides are normal.** Slides 2–N are frequently a solid
  brand background — #14111A deep purple-black or #1A1A1A charcoal — with the
  @saintmatchapp handle at 8% from top, a serif headline at 25–40%, body in warm
  grey #B8B0A0 at 48–68%, a dotted rule at ~82% and a "✳ NEXT" marker at ~90%.
  Highlight words use the brand accent: amber-gold #C17B3A / #E8B83D, or sage
  green #7C9A72.
- **A modular negative prompt is mandatory on every image prompt**: a permanent
  base block (cartoon, anime, CGI, 3D render, plastic skin, artstation,
  hyperrealistic CGI, stock photo, neon, watermark, extra fingers, deformed
  hands, garbled text) plus a per-post style block carrying the correct **era
  exclusions** for that subject.

### 8.1 The prompt must also specify

- **Order and habit, by garment and colour.** Not "monk's robes". Dominican:
  white wool tunic, scapular and capuce, black cappa over it. Conventual
  Franciscan: grey-black habit, white cord with three knots. Mercedarian: white
  habit with the order's shield. If the dossier does not say what the order wore,
  the prompt does not describe a habit.
- **Era and place**, so the architecture, textiles and light are right.
  Thirteenth-century Castile is not seventeenth-century Castile.
- **The art-historical anchor.** Name a school or a named painter's manner —
  "in the manner of Spanish Baroque tenebrism, Zurbarán" — and let that carry
  palette and lighting.
- **Emblems the dossier supports**, and only those.
- **Composition and framing** for 9:16, built so the subject occupies one side or
  band and the overlay text has a clean zone of its own. The style bible measures
  this rather than defaulting: state the text zone as a vertical percentage range
  and make the composition create it — Elijah in the upper 55% with the lower
  35–40% dark for text; the hook figure in the left 40% with the right 60% bright
  and empty. **Do not default text to the bottom.** Whatever the zone, the type
  must stay legible against it — keep a mid-tone or clean region behind it, and
  add the drop shadow the bible specifies (2–3px, dark, 50–60% opacity) when the
  type sits on painted areas.

### 8.2 Prohibited, absolutely

- **Any attribute the dossier does not support.** This is the Raymond case in
  its exact form: he was **never a cardinal**, so the prompt carries **no
  cardinal's red, no galero, no scarlet mozzetta**, no matter how many later
  paintings show them. Later art repeating an error is the error in paint, not
  evidence for it.
- **Rank the saint did not hold.** No mitre for a non-bishop, no papal tiara, no
  crozier for a friar, no doctoral cap for a saint not named a Doctor.
- **Anachronistic objects.** An object must have existed, in that form, in that
  place, in that century. A modern five-decade rosary in the hands of a
  thirteenth-century friar is an anachronism; so is a printed book before
  printing, or a Latin-cross crucifix of a later type.
- **Order-mixing.** Wrong habit colour is not a small error. It reassigns the
  saint to another order.
- **Depicting a LEGEND as an event.** A legendary scene may be depicted only if
  it is a recognised iconographic type *and* the caption does not assert it *and*
  the source notes flag it. If in doubt, paint the person, not the story.
- Glossy skin, HDR, lens flare, halo rendered as a glowing ring of light. Halo as
  a flat gold disc or nothing. (Modern faces are prohibited **only on historical
  subjects** — on a MODERN-aligned post a modern face is the whole point.)

**Superseded:** the earlier rule "any text or lettering rendered inside the
image; all type is added in layout" is **withdrawn**. The style bible bakes the
overlay text into the generated image and treats a generated image without its
caption text as a failure. Carry the exact overlay string, font, colour,
highlight word, position range and effects in the prompt, require perfect
spelling, and regenerate on garbled or misspelled output rather than shipping it.
`SCORER.md` I4 has been rewritten to match — it now *requires* the baked type to
be fully specified, and it no longer demands a fixed clear band. The conflict
recorded in the old `SCORER.md` §6.5 is closed.

### 8.3 The iconography line in the source notes

Every prompt is accompanied by one line per specified attribute, saying which
dossier line supports it, plus an explicit note of what was excluded. If an
attribute is in the prompt and not in that list, the pack fails §8.

---

## 9. Engagement line, app mention and hashtags — Format A only

**This whole section is Format A.** Format B has no engagement line, no
app-mention pair and no hashtag block; its bridge is its CTA (§4.4, §5.7), and
lifting any of the blocks below into a Format B post is a STOP. §9.5's banned
register does apply to both formats.

The CTA is soft because the product is a habit, not a purchase. Someone deciding
whether to try a virtue app on the feast of a martyr is not to be hurried. But
the *shape* of the ask is fixed by the style bible, not chosen per post: an
engagement line, then two app-mention lines, then hashtags, in that order and
nowhere else in the caption (§5.4).

### 9.1 The engagement line

One line, immediately after the ✝️ separator. Attested wordings, used verbatim:

- "Type AMEN if this hit home ✝️"
- "Comment AMEN if you needed this today 🙏"
- "Type AMEN if this spoke to your soul 🙏🔥"
- "Type AMEN if you believe the saints are praying for you right now 🙏🔥"
- "Drop a 🙏 if this hit home"

**This supersedes the earlier ban on "Comment AMEN" as engagement bait.** It is
the user's own shipped convention across every post in the style bible, so it is
on-voice by definition. `SCORER.md` has been realigned to match: V3 now
**requires** one of these five verbatim on Format A, and C2 explicitly no longer
flags them.

### 9.2 The app-mention lines

Exactly two lines, at the very end of the body, immediately before the hashtags.
Never invented, never reworded on the fly, never anywhere else in the caption.
Attested pairs:

| Line 1 | Line 2 |
| --- | --- |
| "Find the saint walking with you through every struggle — Saint Match, link in bio." | "Your patron saint is waiting. Download free today." |
| "Find the saint who's walking with you — Saint Match, link in bio." | "Your saint is waiting. Free on the App Store." |
| "Find your patron saint → Saint Match (link in bio)" | "Saints. Novenas. Daily growth. Free on the App Store." |
| "Comment SAINT and I will send the free app to your DM" | "Your saint is waiting. Download free today." |

The four earlier invented patterns are withdrawn; only the first of them
("Find the saint walking with you…") matched anything real.

### 9.3 Rules

- One engagement line and one app-mention pair per post, in the §5.4 order.
- The app is named **only** here — never in the body, never in on-image text.
- The pair must sit downstream of the bridge (§6). An app mention with no virtue
  named above it is a STOP even if its wording is gentle — the brief's "missing
  virtue ↔ app bridge" failure.
- It never promises a spiritual outcome.
- It never uses the saint as leverage — the saint is not an endorsement.

### 9.4 Hashtags

The last block in the caption, after the app mention. Never inline in the body.

- **15–20 niche-relevant tags**, mixed across three tiers held as a standing
  bank: Tier 1 high volume (#Catholic #CatholicFaith #Jesus #Prayer #Faith),
  Tier 2 medium (#CatholicReels #CatholicLife #CatholicCommunity #DailyPrayer
  #GrowInHoliness #CatholicSaints), Tier 3 niche (#SaintMatch #PatronSaint
  #CatholicVirtue and the post's own specifics).
- Then **3–5 "buried trending" tags** placed last. The style bible is explicit
  that these are a discoverability play and are **not** expected to match the
  post's topic — #MondayMotivation, #FaithOverFear, #DailyInspiration and the
  like — buried at the end so they do not read as out of place. Recorded as the
  user's stated convention. It is the one rule in the bible that trades relevance
  for reach; flag it rather than quietly extending it.

### 9.5 Banned register

- **Fake scarcity or urgency.** "Only today", "before it's gone", "limited
  spots", "ends at midnight", "don't miss out", countdowns.
- **Hard sell.** "Download NOW", "Tap the link!!", "You NEED this app".
- **Manufactured obligation.** "Share if you love St N.", "Only real Catholics
  will…" — obligation and gatekeeping, as distinct from the plain "Type AMEN"
  invitation of §9.1, which is permitted.
- **Naming the free-tier limit as pressure.** The free tier is three matches a
  week. That is a product fact. It is never a reason to hurry.
- **Guilt.** "Most people scroll past this."

---

## 10. Self-check before handing to the scorer

Run this list. It is not a substitute for `SCORER.md` — it is what stops obvious
failures reaching it.

1. Every factual sentence traces to a dossier line, and the source notes list it
   with a grade.
2. No LEGEND is asserted. No LEGEND is in an overlay.
3. No quotation is attributed to a saint who left no writings.
4. Every quotation has a source and, for scripture, a checked context.
5. Every attribute in the image prompt appears in the iconography list, and
   nothing the dossier contradicts is in the prompt.
6. The bridge survives the swap test and yields a one-sentence micro-action, and
   promises nothing the app does not do (§6.1).
7. The caption was written before the image prompt, and the subject–caption
   alignment line is present and honoured by the prompt (§8.0).
8. The header block is complete, `draft_id` matches the filename,
   **`post_format` is declared**, and on Format B **`format_variant` is declared**
   too. Checks 9–11 below apply to Format A; **12–15** apply to both Format B
   variants; **16** is variant B-1 only; **17** is variant B-2 only. Run only the
   sets matching what was declared — running B-2's checks against a B-1 post, or
   B-1's word band against a B-2 post, fails a correct post for lacking something
   its variant does not have.

**Format A only:**

9. The caption ending follows §5.4 exactly: scripture block → ✝️ → engagement
   line → two app-mention lines → niche hashtags → buried trending hashtags. The
   app is not named anywhere above those two lines.
10. Body is 200–500 words, opens on a corrective or a fact rather than a
    question, sustains second person, and lands affirming rather than punishing.
    No banned register, §5.5 or §9.5. Emoji only in the slots of §5.2.
11. Carousel is 5–7 slides at 9:16, one idea and 5–15 words per slide, with at
    least one cliffhanger at slide 3 or 4 and a landing slide that stands alone.

**Format B, both variants:**

12. Third person throughout. No emoji, no hashtags, no scripture block, no ✝️, no
    engagement line, no app-mention pair, and the app is not pitched anywhere.
13. There is exactly one hinge, it is named in the internal hinge line, it is
    performed rather than explained, and it survives the swap test. On B-1 both
    sides are in the caption; on B-2 the saint side is in the numbered slides and
    the app side is the audience line.
14. **The last line is the invocation and nothing follows it.** True on both
    variants — this is the shared Format B rule.
15. No encyclopedia register: no run of neutral biographical appositives, no
    patronage-as-label, no bland closing pleasantry. **The post does not open by
    announcing the date or the feast** — that is the tell the two weakest
    specimens share. No stated bridge; the saint is not the brand's mascot. And
    the post gives the reader a reason to stop — a hinge (B-1) or a numbered
    promise to a named audience (B-2). Ending on the invocation does not by
    itself satisfy this; it is table stakes (§4.4.0).

**Variant B-1 only:**

16. Caption is 40–70 words, resting on exactly one fact — and that fact is
    DOCUMENTED and asserted plainly, or TRADITIONAL and attributed. It is never a
    LEGEND. Shape is fact → hinge → invocation, with no explaining sentence
    before the invocation.

**Variant B-2 only:**

17. The hook slide carries **both** a numbered promise and an explicit audience,
    and that audience is a **struggle topic, not a demographic**. The number
    promised equals the number of slides that deliver a distinct teaching. The
    caption is a one-line framing question plus the invocation, ~8–25 words, and
    nothing else — and the teaching genuinely lives in the slides, such that
    deleting the caption leaves the post intact.

If any of 1–5 fails, the correct output is not a fix attempt dressed as a
draft. Output **`STOP — <check>`** and say what the dossier would need to
contain for the claim to be usable.

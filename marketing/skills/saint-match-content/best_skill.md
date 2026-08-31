# best_skill.md — Saint Match daily saint post

The rulebook. A frozen writer model reads this file and produces one finished
post pack per day. It does not publish. It does not grade itself. Everything it
produces goes to `SCORER.md` first.

Read `BRIEF.md` for why this exists. Read
`marketing/carousels/st-raymond-nonnatus/README.md` for the one completed post
produced under this methodology — it is the reference specimen for voice and for
source discipline, and it is quoted in full below.

One-line memory: **write what you can prove, stop when you cannot.**

---

## 0. Working assumptions

These are unconfirmed. They are recorded here so they can be corrected rather
than silently inherited. Nothing downstream should treat them as settled.

- **ASSUMPTION — calendar.** The **General Roman Calendar** governs saint
  selection. On a ferial day with no obligatory memorial, the day is filled from
  a curated fallback list of saints kept outside the GRC. This is not a
  hypothetical: 31 August, the date of the Raymond Nonnatus post already in this
  repo, has no GRC entry. Raymond came from the fallback, not the calendar.
- **ASSUMPTION — imagery.** Post imagery is **AI-generated from an
  art-historically anchored prompt**, per the brief's "AI image prompt, 9:16".
  It is not a sourced public-domain painting. The Raymond carousel used real
  Prado paintings; that was a hand-built one-off and is not the daily pipeline.
  The iconography rules in §8 exist precisely because a generator will
  confidently invent a habit.
- **ASSUMPTION — source pack.** The daily **dossier** described in §2 stands in
  for the "approved source pack" of hard rule #1, which does not exist in the
  repo yet.
- **PROVISIONAL — voice.** The Notion style bible has **not** been supplied.
  Every voice rule in §5 is derived by reading back from the Raymond caption —
  real, shipped Saint Match work — and nothing else. When the style bible
  arrives, §5 is replaced by it, not merged with it. Do not extend §5 by
  inference; the brief forbids inventing a brand voice.

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
format         carousel-4x5 | photo-9x16 | short
saint          <full name as used in copy>
feast_date     <date>
topic          <struggle topic / theme bridge>
```

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
| **Caption overlay** | The on-image text. For a carousel, one block per slide with its attribution line. Quoted material only per §7. |
| **AI image prompt** | One paragraph, 9:16, art-historically anchored. Written to §8. |
| **Description caption** | The post body. Written to §5. Ends on the invocation line. |
| **Soft CTA** | One or two lines, drawn from §9. |
| **Source notes** | Every factual claim in the pack, one line each, graded DOCUMENTED / TRADITIONAL / LEGEND, with the source. Plus an explicit list of what was **excluded and why** — the exclusions are the point. |

The source notes are not an appendix. They are the artifact the scorer grades
against. A pack with a beautiful caption and thin source notes fails.

---

## 4. Format

Three formats. Default is `carousel-4x5`.

### carousel-4x5 — five slides, 1080 × 1351

The shape the Raymond post used, and the one to copy.

1. **Hook** — a quotation that states the cost, not the comfort. From the
   saint's order, rule, or constitutions; or from the saint's own writings if
   they left any.
2. **Maxim** — scripture. Cited by book, chapter, verse. Read the surrounding
   verses before using it (§7).
3. **Challenge** — the sharpest line, usually from a named later author writing
   about the saint. Guéranger did this job for Raymond.
4. **Prayer** — the Collect for the feast, from the Roman Missal, lightly
   line-broken. Never paraphrased.
5. **Invocation** — "N., patron saint of X, pray for us." Nothing else.

Uniform typography: 42px body on 56px leading, attributions 19px small caps at
0.08em tracking. No scrims, no gradients, no overlays — legibility comes from
where the type sits on the image. Every line must clear **3.5:1** contrast
against the artwork beneath it. Leave the 81 × 85px logo slot at the foot of
each frame.

### photo-9x16 — single image, 1080 × 1920

One image, one overlay block, the description caption doing the work. Stories,
TikTok Photo Mode. Same rules, less room, so the overlay must be shorter than
you want it to be.

### short — silent vertical video

The 9:16 stills in order, ~3.4s each, 0.6s cross-dissolve. No music bed, no
voiceover, no captions burned beyond the slide text. Silence is the register.

---

## 5. Voice — PROVISIONAL, derived from the Raymond caption

### 5.1 The reference specimen

This is real shipped Saint Match copy. It is the only voice evidence available.
Read it before writing anything.

> St Raymond Nonnatus, priest of the Order of the Blessed Virgin Mary of Mercy
>
> The Mercedarians existed for one purpose: to buy back Christians enslaved in
> North Africa. Alongside poverty, chastity and obedience they took a fourth
> vow—to remain behind as hostages themselves, in the place of captives in
> danger of losing their faith, if the ransom money ran out. Raymond was one of
> their redeemers. In Algiers, the tradition remembers, the money ran out.
>
> He stayed. His captors pierced his lips and closed them with a padlock to stop
> him preaching. Little of his life can be documented with certainty—the Church
> has kept its shape rather than its dates—but the shape is unmistakable: a man
> who made himself the currency, and was then denied even the ability to say why.
>
> His life reminds us that most of us could accept a sacrifice if we were
> permitted to explain it. The padlock is what remains when the explaining is
> taken away.
>
> St Raymond Nonnatus, patron saint of expectant mothers and the falsely
> accused, pray for us.

### 5.2 What that specimen actually does

Each rule below is read off the text above. Nothing here is invented.

- **Reverent and plain.** No devotional inflation. "The Mercedarians existed for
  one purpose" is how the post opens — a flat statement of fact, no throat
  clearing.
- **Short declarative sentences, load-bearing.** "He stayed." Two words holding
  the whole paragraph. The rhythm is long sentence, long sentence, very short
  sentence.
- **Concrete before abstract.** Ransom money, Algiers, a padlock. The abstraction
  ("the explaining is taken away") is earned late and only once.
- **Unsentimental.** It does not tell the reader how to feel. It does not use
  "beautiful", "powerful", "incredible", "inspiring", "journey".
- **Willing to sit with difficulty.** It says the money ran out. It says the
  record is thin. It does not resolve either.
- **The turn is one sentence, and it is about the reader, not about the saint.**
  "most of us could accept a sacrifice if we were permitted to explain it." One
  turn per post. Two turns is a sermon.
- **Ends hard, not soft.** "The padlock is what remains when the explaining is
  taken away." No consolation, no promise, no takeaway. The last line before the
  invocation must be the hardest-edged line in the post, not the kindest.
- **The invocation closes it.** Fixed form: name, patronage, "pray for us."
- **Em dashes, unspaced.** As in the specimen.
- Hashtags sit below a run of bullet-point spacers, never inline.

### 5.3 Length and shape

Description caption: three or four paragraphs, roughly 120–200 words, then the
invocation. Opening line names the saint and their state of life. Do not open
with a question. Do not open with "Imagine".

### 5.4 Banned register

Not stylistic preference — these break the voice as evidenced.

- Emoji, anywhere.
- Second-person imperatives at the reader's expense: "You need to…", "Stop
  scrolling."
- Superlatives and hype: "the most incredible saint", "mind-blowing".
- Therapy-adjacent filler: "hold space", "your journey", "show up for yourself".
- Rhetorical question openers.
- Claims about what the saint "would say" today.
- Any suggestion that a devotion, a novena, or the app produces an outcome.
  Never "pray this and X will happen".
- Modern political framing of a pre-modern life.

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

---

## 7. Quotation discipline

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

### 8.1 The prompt must specify

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
- **Composition and framing** for 9:16, with the upper third kept clear for
  overlay type, and a mid-tone region behind the type so it clears 3.5:1.

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
- Modern faces, modern dentistry, glossy skin, HDR, lens flare, halo rendered as
  a glowing ring of light. Halo as a flat gold disc or nothing.
- Any text or lettering rendered inside the image. All type is added in layout.

### 8.3 The iconography line in the source notes

Every prompt is accompanied by one line per specified attribute, saying which
dossier line supports it, plus an explicit note of what was excluded. If an
attribute is in the prompt and not in that list, the pack fails §8.

---

## 9. Soft CTA

The CTA is soft because the product is a habit, not a purchase. Someone deciding
whether to try a virtue app on the feast of a martyr is not to be hurried.

### 9.1 Approved patterns

Use one, unmodified in structure. Wording may vary; register may not.

- "Find the saint walking with you today. Saint Match — free, link in bio."
- "Saint Match turns a virtue like this into one small action you can do today.
  Free on iOS and Android."
- "If you want to practise this rather than only admire it: Saint Match, link in
  bio."
- "One saint, one small challenge, each day. Saint Match — free to start."

### 9.2 Rules

- One CTA per post. It goes after the invocation, never before.
- It names the app plainly and does not argue for it.
- It must sit downstream of the bridge (§6). A CTA with no virtue named above it
  is a STOP even if its wording is gentle — this is the brief's "missing virtue ↔
  app bridge" failure.
- It never promises an outcome, spiritual or otherwise.
- It never uses the saint as leverage — the saint is not an endorsement.

### 9.3 Banned register

- **Fake scarcity or urgency.** "Only today", "before it's gone", "limited
  spots", "ends at midnight", "don't miss out", countdowns.
- **Hard sell.** "Download NOW", "Tap the link!!", "You NEED this app".
- **Manufactured obligation.** "Share if you love St N.", "Only real Catholics
  will…", "Comment AMEN".
- **Engagement bait** in any form, including "double tap if".
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
6. The bridge survives the swap test and yields a one-sentence micro-action.
7. The CTA is one of the approved patterns, sits after the invocation, and
   carries no urgency.
8. The last line before the invocation is the hardest line in the post.
9. No emoji. No banned register, §5.4 or §9.3.
10. The header block is complete and `draft_id` matches the filename.

If any of 1–5 fails, the correct output is not a fix attempt dressed as a
draft. Output **`STOP — <check>`** and say what the dossier would need to
contain for the claim to be usable.

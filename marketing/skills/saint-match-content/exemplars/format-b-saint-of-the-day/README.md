# exemplars/format-b-saint-of-the-day/ — Format B specimens

**Format B is the saint-of-the-day post, and it is the standard for daily
posts.** It is a distinct format from the themed long-form posts in the parent
`exemplars/` directory — not a shortened version of them.

> **Five of the six files here are THIRD-PARTY REFERENCE SPECIMENS, held for
> internal style study only.** They are not Saint Match content, they are not to
> be reproduced or published, and they are **not to be imitated line-by-line**.
> What transfers from them is the **mechanic** — the hinge, the numbered promise,
> the audience line — never the text. Each file repeats this label at the top.
> Only `02` is Saint Match's own, and it is unshipped.

## The set

| File | Account | Kind | Variant | Likes | Saves | Why it is here |
| --- | --- | --- | --- | --- | --- | --- |
| `01-REFERENCE-ewtn-st-clare.md` | `@ewtnmedia` | **positive**, third-party | **B-1** | 7,131 | 882 | The hinge, isolated: *broadcast* |
| `02-st-raymond-nonnatus.md` | Saint Match | **positive**, in-house, **unshipped** | **B-1** | — | — | The hinge in our own register |
| `03-REFERENCE-ewtnparents-st-monica.md` | `@ewtnparents` | **positive**, third-party | **B-2** | 7,194 | **1,306** | The whole B-2 shape; 7-slide carousel |
| `04-REFERENCE-ewtnmedia-st-joseph-calasanz.md` | `@ewtnmedia` | **negative**, third-party | — | 996 | 69 | Encyclopedia register; no hinge; no invocation; an attribution issue |
| `05-REFERENCE-augustine-institute-st-augustine.md` | `@augustine_institute` | **negative**, third-party | B-1 shape | 156 | 11 | Right shape, stated bridge — the saint as mascot |
| `06-REFERENCE-ewtnmedia-queenship-of-mary.md` | `@ewtnmedia` | **middle**, third-party | — | 2,871 | 148 | Ends devoutly and is still inert. Disproves the invocation-as-differentiator reading |

`06` also carries 32 comments and 107 shares; the other rows were supplied as
likes and saves only, so the table compares those two.

## What separates a strong Format B post

**Not the invocation.** An earlier reading of this folder held that ending on
"St [Name], pray for us" was the differentiator — the two strong posts do it, the
worst post does not. **`06` disproves that.** It closes devotionally, on a Salve
Regina acclamation in the invocation's slot, and still lands ~2.5× below Clare
and Monica on likes and ~6× below on saves.

> **Ending on the invocation is necessary but not sufficient — it is table
> stakes.** It stays mandatory (`SCORER.md` W3). What separates a strong Format B
> post is that it **gives the reader a reason to stop**: a **numbered promise
> with a named audience** (variant B-2), or a **hinge carrying the saint's life
> into what the app does** (variant B-1). A post with neither is inert, however
> correctly it ends.

| Post | Likes | Saves | Hook or hinge? |
| --- | --- | --- | --- |
| `03` Monica (B-2) | 7,194 | 1,306 | numbered promise + named audience |
| `01` Clare (B-1) | 7,131 | 882 | hinge word — *broadcast* — into the brand |
| `06` Queenship | 2,871 | 148 | **neither** |
| `04` Calasanz | 996 | 69 | **neither**, and no invocation |

**The opening-line tell.** Both underperformers open by announcing the calendar —
"August 25 is the feast day of…", "August 22 is the feast day of…". Both strong
posts open on the reader's situation or straight into the fact. **"Opens by
announcing the date or the feast" is an anti-pattern marker**, and it **co-occurs
with encyclopedia register**: the two posts that open that way are the two
encyclopedic ones. It is the cheapest diagnostic available — if the first six
words name a date, read the rest for register before anything else. A timeliness
peg is a reason to post today; it is not a reason for a reader to stop scrolling.

## How to read the engagement table — read this before citing any number

**Be careful here. These are not four comparable data points, and the table is
easy to misread as though they were.**

1. **The three EWTN posts are a valid within-account comparison.** `01`, `04` and
   `06` come from the same brand, to the same audience, at the same scale
   (`03` is `@ewtnparents`, a sibling account of the same organisation — close,
   and treated as within-organisation here, but not literally the same follower
   list). The metric separation between them is meaningful and follower count is
   substantially controlled.

2. **Within-account controls for follower count. It does NOT control for subject
   salience.** Mary is far better known than Joseph Calasanz. **Part of the 2,871
   vs 996 gap is subject popularity, not craft.** The same caveat applies, more
   mildly, to Clare and Monica against Calasanz. Every craft judgement in this
   folder is made on the writing and holds without reference to the numbers; the
   numbers corroborate, they do not establish.

3. **The Augustine Institute post (`05`) is a different, much smaller account.**
   Its 156 likes are **confounded by follower count** and are **not comparable**
   to EWTN's four-figure counts. **It must NOT be cited as evidence that stating
   the bridge underperforms performing it.** It is not that evidence. It earns
   its place as a **craft counter-example only** — the cleanest available case of
   a post that gets the whole shape right and still has no hinge.

4. **So: do not read the table as four comparable data points.** It is three
   within-organisation rows with an uncontrolled salience confound, plus one row
   from a different account that carries no comparative weight at all.

**Forward to the loop.** This is why the SkillOpt loop must **normalise
engagement against a saint-popularity baseline before comparing posts**: a Marian
feast and an obscure Mercedarian are not comparable on raw numbers, and a
rulebook version that happened to draw the better-known saints would otherwise
win on nothing. **This is now evidenced in real data rather than assumed as a
design principle** — `06` vs `04` is the observation: same account, same
register, same anti-pattern opener, ~3× apart on likes, subject fame the obvious
available explanation. `SCORER.md` §9.5.

## The two variants

Format B has two attested shapes. They differ on one axis: **which surface
carries the teaching.** Both are declared in the pack header
(`format_variant`) and the scorer runs a different subset of the W-series for
each.

> **Naming caution.** The *variants* are **B-1** and **B-2**, always hyphenated.
> `SCORER.md` also has *checks* called **B1** (register) and **B2** (shape and
> ending), unhyphenated. Different things. Write "variant B-2" or "check B2".

| | **B-1 — caption-carried** | **B-2 — carousel-carried** |
| --- | --- | --- |
| Carries the teaching | The **caption** | The **carousel** |
| Caption | 40–70 words: fact → hinge → invocation | 8–25 words: framing question → invocation |
| Hook slide | Not specified | **Numbered promise + explicit audience** |
| Facts | **Exactly one**, doing all the work | One per numbered slide |
| Opening question in caption | **Banned** | **Required** |
| Ends on the invocation | **Yes** | **Yes** |
| Floor checks | W1–W5 | W2–W5 (variant parts) + **W6–W9** |
| Specimens | `01`, `02` | `03` |

**B-2's audience line is where Saint Match must diverge from its specimen.** EWTN
Parents names a **demographic** — "every Catholic parent" — and is right to: a
demographic *is* that account's identity. **Saint Match matches on struggle**, so
the same slot carries a **struggle topic**: "…anyone waiting on someone they
love." On B-2 the audience line is the hinge's **app side**, which is why
`SCORER.md` **W7** makes a demographic there a STOP. The specimen is evidence for
the *slot*, not for what fills it.

## The format against Format A

| | Format A (`exemplars/`) | **Format B (here)** |
| --- | --- | --- |
| Body | 200–500 words | **40–70 (B-1) / 8–25 (B-2)** |
| Person | Sustained second person | **Third person** |
| Facts | Many, woven | **One (B-1) / one per numbered slide (B-2)** |
| Bridge | Stated internally, felt in the body | **Performed — as a hinge, or as a promise to a named audience** |
| Ending | Scripture → ✝️ → engagement → app mentions → hashtags | **"St [Name], pray for us."** |
| CTA | Engagement line + app-mention pair | **No pitch.** |
| Emoji | ✝️ and 🙏🔥 required | **None** |
| Hashtags | 15–20 niche + 3–5 buried trending | **None** |
| Floor checks | V1–V7 (`SCORER.md` §3A) | **W1–W9 (`SCORER.md` §3B, §3B-2)** |

**The absence of Format A's furniture is correct, not a defect.** A scorer that
STOPs a Format B post for having no scripture block is making exactly the
mistake the realignment was written to fix, pointed the other way — and the same
mistake one level down is running W1's 40–70 word band against a correct
fourteen-word B-2 caption.

## The hinge

A single word or concept from the saint's life is **carried over** into what
Saint Match does. Saint Match's hinge is the app's actual function: *the saint
carried a specific thing, and the app matches a person to the saint who carried
theirs.*

The rule that makes it work: **perform it, never state it.** "Just like Saint
Match helps you find…" is the failure, and `05` is the third-party worked example
of it — right shape, right ending, and the saint is a mascot. If a grader cannot
name the hinge word in one word or one short phrase, there is no hinge — see
`SCORER.md` W2, where inability to name it is itself the STOP.

On **B-2** the hinge is split across surfaces: the saint side is in the numbered
slides, the app side is the audience line on the hook slide. It is not a looser
hinge for being spread out — same nameability test, same swap test.

## The anti-patterns, named

- **Encyclopedia register — the primary Format B anti-pattern** (`04`). A
  reference-work entry: date peg, patronage as a label, neutral biographical
  appositives, bland closing pleasantry, no reader in it. Fluent, accurate, and
  it teaches nothing. **This is the default an LLM drifts to**, because it is
  what the training data holds most of about saints, so it will be produced
  confidently and will not look wrong. It has to be named and refused or it
  arrives by default.
- **The calendar-announcement opening** (`04`, `06`). Co-occurs with the above.
  The cheapest tell.
- **A stated bridge — the saint as mascot** (`05`). Perfect shape, no hinge.
- **A timeliness peg standing in for a hinge** (`04`). A reason to post today is
  not a reason to read.

## Truth discipline is unchanged

T1–T6 and I1–I4 apply to Format B exactly as they do to Format A, and on both
variants. Shorter is not looser. (I1–I3, the iconographic-accuracy checks, are
unweakened and untouched. I4 was rewritten — it is a layout and legibility check,
not a truth check — and it now applies to a B-2 pack's **hook slide** as the
image under test. `SCORER.md` §6.5.) **W5** adds that on B-1 the post rests
on exactly **one** fact, and that fact may not be a LEGEND even when attributed —
at 40–70 words an attributed legend is still the load-bearing claim. On B-2 the
one-fact count does not apply (each numbered slide has its own graded fact) but
the grading requirement does, per slide.

**None of the third-party specimens models our sourcing standard.** EWTN and the
Augustine Institute are under no dossier discipline. `04` carries a live
**attribution issue** — an image line attributed to Joseph Calasanz that closely
tracks **Daniel 12:3** and is associated with the Piarists as a motto, flagged as
requiring verification and asserted neither way — and it is recorded there as
evidence that **even a large, serious Catholic publisher makes this class of
error**. `06` shows the contrasting correct *shape*: a quote attributed to a
specific documented source (Our Lady to St Faustina, i.e. the *Diary*), which is
**properly-formed attribution, not verified attribution** — the text still needs
checking against the *Diary* before Saint Match could use it.

## This set is thin

**Six specimens: five third-party, two of them negatives and one middling, and
exactly one Saint Match item — which is unshipped.** For ranking purposes that
leaves **two referents for variant B-1 and one for variant B-2**.

That is enough to fix the *shape* of both variants, which is why W1–W9 are binary
and confident. It is **not enough to rank on**: a forced ranking against two
referents has almost no resolution, and against one it has none at all.

So per `SCORER.md` §9.5, Format B voice scoring runs in **`shape-only` mode** —
qualitative notes yes, a usable `voice_score` no — **variant B-2 cannot be
voice-scored at all yet**, and **Format B voice scores must not accept or reject
any rulebook edit** until the set reaches **at least four or five Saint Match
specimens per variant**.

**The engagement figures do not fill this gap.** They say something real about
*what* makes a post work (above); they are not a ranking scale, for all the
reasons in "How to read the engagement table".

**The user has been asked for more.** When they arrive, adding them is a
deliberate re-baselining event: record it, and treat scores from before and after
as belonging to different scales. Ideally the additions are *shipped* Saint Match
posts, which would also let the third-party references be demoted to background
reading rather than counted as referents at all.

## Rules for this folder

- **Never score a Format B post against the Format A exemplars, or the reverse** —
  a cross-format comparison measures the format difference and nothing else, and
  it produces confident, plausible, wrong reasons. **And never score across
  variants**: a B-2 caption ranked against B-1 captions places last for being
  correct. `SCORER.md` §9.1.
- **The negatives and the middle specimen are not referents.** `04`, `05` and `06`
  never go into a forced ranking as though they were gold. Their ranking use is
  as **known-bad anchors for the judge-consistency bar** (`SCORER.md` §9.4): a
  judge that cannot rank `04` last is a judge whose scores are discarded.
- **The third-party captions are reference, not gold.** They fix the mechanics.
  They are not Saint Match's voice and they are not under Saint Match's sourcing
  discipline.
- Do not edit the specimens to taste. A referent that moves cannot measure change.

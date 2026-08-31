# exemplars/ — the Format A voice gold set

> **This directory is Format A only — themed long-form posts.**
> The **saint-of-the-day** post has its own format and its own specimens in
> **`format-b-saint-of-the-day/`**, and **Format B is the standard for daily
> posts**. Never score a Format B post against these six: they disagree on
> length, person, ending, emoji and hashtags, so the comparison measures the
> format difference and nothing else. See `SCORER.md` §3.0 and §9.1.

Six shipped captions, verbatim, from the user's own Notion page **"Saint Match
content strategy"** (`https://app.notion.com/p/3102ba2b36a38008aa4efd35fd27e5a4`).
Read read-only; nothing in Notion was created, edited or commented on.

These are the **only** voice authority in this repo. `best_skill.md` §5 is a
description of them; where the description and an exemplar disagree, the
exemplar is the evidence and §5 is the summary that needs correcting.

| File | Post | Body words | Slides | Opening formula |
| --- | --- | --- | --- | --- |
| `01-elijah-brook-cherith.md` | Elijah at the Brook Cherith | ~225 | 6 | Names the reader's situation |
| `02-gethsemane.md` | Jesus in the Garden of Gethsemane | ~250 | 6 | Names the reader's situation |
| `03-every-saint-was-once-a-sinner.md` | Every Saint Was Once a Sinner Who Never Gave Up | ~267 | 6 | Flat corrective + 🤍 |
| `04-prayer-that-shook-empires.md` | The Prayer That Shook Empires (Rosary / Lepanto) | ~306 | 7 | Negates an assumed belief |
| `05-angel-who-cast-satan-from-heaven.md` | The Angel Who Cast Satan From Heaven (St Michael) | ~328 | 7 | States a surprising fact |
| `06-desert-trains-his-strongest.md` | The Desert Is Where God Trains His Strongest | ~244 | 6 | Negates an assumed belief |

## What they are for

Two different jobs, and they must not be run together — see `SCORER.md` §0.1.

1. **The voice floor (§3A of `SCORER.md`).** Binary. The mandatory structural
   elements every one of these six has: a scripture block, the ✝️ separator, an
   engagement line, two app-mention lines, tiered hashtags, sustained second
   person, 200–500 words. A draft missing one is a STOP.
2. **The voice score (§9 of `SCORER.md`).** A 1–5 rank used only to compare
   rulebook versions inside the SkillOpt loop. It never blocks publication.
   **Scoring is comparative against these six files, never absolute against
   adjectives.** "Is this reverent and warm?" gets 4/5 from an LLM for almost
   anything. "Which of these seven captions is the odd one out, and where would
   the new one sit if you ranked all seven?" does not.

## Why exemplars rather than a description of the voice

Absolute rating against a word list is unreliable in exactly the way that
matters here: it is generous, it is uncalibrated across sessions, and it drifts
with the phrasing of the rubric rather than with the writing. Comparative
judgement against fixed, unchanging referents is stable, because the referents
do not move. These six files are frozen for that reason. **Do not add to this
set, edit it, or "improve" a caption in it** — a gold set that changes cannot
measure change. If the user ships new posts and wants them in the set, that is a
deliberate, recorded re-baselining, and every prior voice score becomes
incomparable to every later one.

## What the set is thin on

Recorded so the score is not asked to do more than the evidence supports.

- **None of the six is a single-saint feast-day post.** They are scriptural
  (Elijah, Gethsemane, the desert), thematic (the Rosary), an angel, and a
  four-saint round-up. **This gap is the reason Format B exists.** The user has
  since specified a distinct, much shorter format for the daily saint post
  rather than stretching these six to cover it, so the gap is now closed by a
  separate spec and a separate specimen set — not by extrapolating from here.
  Do not use these six as evidence for what a saint-of-the-day post should look
  like.
- **The observed length band is tighter than the stated one.** All six land
  225–330 words. `best_skill.md` §5.3 says 200–500. The floor uses 200–500,
  because that is what the rulebook states; a draft at 480 words is inside the
  floor but outside anything the gold set demonstrates, and the voice score
  should notice that rather than the floor rejecting it.
- **Translation naming is inconsistent in the source.** Two posts name NKJV;
  four print the verse and reference with no translation. `best_skill.md` §7.4
  requires a named translation, which is stricter than the gold set. That is a
  deliberate pipeline addition (a truth requirement, not a voice one) and T4
  enforces it regardless of what the exemplars do.
- **Hashtag casing is not consistent.** Posts 1–2 and 6 are lower-case, 3–5 are
  TitleCase. Casing is therefore not a voice signal and must not be scored.

## Fidelity note

Posts 1–3 were stored in Notion as code blocks and retain their paragraph
breaks. Posts 4–6 were stored as ordinary paragraph blocks, so the round trip
lost the blank line *between* paragraphs — each paragraph is on its own line
with no blank line after it. **The paragraph divisions are intact; only the
blank lines are missing.** Nothing else was altered: no rewrapping, no
punctuation normalisation, no emoji substitution, no hashtag reordering. The
`<br>` markers Notion emitted inside the app-mention and scripture blocks were
converted to the line breaks they represent.

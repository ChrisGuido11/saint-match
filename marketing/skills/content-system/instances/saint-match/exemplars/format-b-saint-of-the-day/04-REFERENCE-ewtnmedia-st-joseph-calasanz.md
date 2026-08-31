# NEGATIVE SPECIMEN — EWTN, St Joseph Calasanz

**Verdict in the set: NEGATIVE.** **Account:** `@ewtnmedia`.
**Engagement: 996 likes / 69 saves.** The weakest post in this folder on both
counts.

> **THIRD-PARTY CONTENT. NOT SAINT MATCH CONTENT.**
>
> Published by **EWTN** on Instagram, reproduced here for **internal style study
> only**, as a **counter-example**. It is not to be reproduced, published or
> imitated in any way — least of all line-by-line, since the whole point of the
> file is that its lines are the failure.
>
> It is included because it is the clearest available example of the register a
> language model will produce by default when asked for a saint post, and
> because it comes from a large, serious, well-resourced Catholic publisher.
> **This failure is not a competence failure. It is a default.**

---

## Caption, in full

```
August 25 is the feast day of St. Joseph Calasanz, patron of Christian schools.
He was a Spanish priest and educator who provided free education to poor
schoolboys and founded a religious order to grow his efforts. He's a great saint
to invoke as the new school year begins!
```

---

## What it fails, check by check

| Failure | Where it would STOP |
| --- | --- |
| **No hinge.** Nothing from Calasanz's life is carried into what the brand does. | `SCORER.md` **W2** — and W2's own test applies: the grader cannot name a hinge word. |
| **A timeliness peg standing in for a hinge.** "as the new school year begins" is a reason to post *today*. It is not a carried-over concept, and it does no bridging work. | **W2** again. A peg is not a hinge; `best_skill.md` §5.7 names the substitution explicitly. |
| **Does not end on the invocation.** It ends on a recommendation — "He's a great saint to invoke…" — which is a *suggestion that someone might invoke him*, not an invocation. | **W3**. Nothing rescues this; the form is mandatory. |
| **Encyclopedia register throughout.** | **B1-B**. |
| **Opens by announcing the calendar.** "August 25 is the feast day of…" | **B1-B / B2-B**, and it is the diagnostic marker — see below. |

---

## Encyclopedia register — the primary Format B anti-pattern

This is the reason the file exists, and it is worth naming precisely rather than
gesturing at.

**The register:** a reference-work entry. Feast date as the opening peg. A
patronage stated as a label ("patron of Christian schools"). A string of neutral
biographical appositives — "a Spanish priest and educator who provided free
education to poor schoolboys and founded a religious order to grow his efforts".
A bland closing pleasantry. No reader anywhere in it, and nothing carried
anywhere.

**Every sentence is accurate.** That is the trap. It sails through the truth gate
untouched — T1–T6 have no objection to it — and it has to be stopped on the voice
floor or not at all.

**It is the default an LLM drifts to.** Ask a model for a post about a saint and
this is roughly what comes back, because this is what the training data holds
most of about saints: encyclopedia entries, breviary notes, patronage lists,
feast-day announcements. It will be produced fluently and confidently and it will
not look wrong. **A rulebook that does not name and refuse this register will get
it by default**, which is why `best_skill.md` §5.7 bans it by name and
`SCORER.md` B1-B STOPs on it rather than leaving it to a grader's taste.

**The cheapest tell: the opening line.** "August 25 is the feast day of…" This
post and `06` both open by announcing the calendar, and both are encyclopedic,
and both are the two underperformers in the folder. If a draft's first six words
name a date, read the rest for this register before anything else.

---

## Attribution on the image — VERIFIED. Verdict: LOOSE-TO-WRONG

**This was previously flagged here as "requiring verification, asserted neither
way". The verification has been done and the flag is closed.** The full case,
written up as a portable lesson, is **Case 1** in `ATTRIBUTION-CASES.md`.

The post's image renders the line:

> "Those who instruct many in justice will shine as stars for all eternity"

attributed to **St Joseph Calasanz**.

**The line is Daniel 12:3**, near-verbatim Douay-Rheims ("they that instruct many
to justice, as stars for all eternity").

**And Calasanz did write it.** It appears in his *Memoriale al Card. M. A. Tonti*
(1621) — the memorandum defending the free schools — where he prefaces it with
**"As Scripture says."** Both breviary traditions that carry the Memoriale as the
second reading for his memorial, ICEL/US and UK/Ireland, **preserve an explicit
quotation frame**.

So the two statements come apart:

| Statement | Verdict |
| --- | --- |
| "Calasanz quoted Daniel 12:3" | **Correct.** |
| The line on an image over "— St. Joseph Calasanz" | **Wrong.** It is Daniel's line, quoted by him and flagged by him as quoted. |

**Verdict: LOOSE-TO-WRONG.** Not an invention — the words are real, the saint
really wrote them down, and the caption is not fabricating. It is the citation
frame that has been dropped, which converts a quotation into an attribution.

### The mechanism, which is the reusable part

**The Liturgy of the Hours marks scriptural quotation with *italics*, not with
quotation marks.** In the breviary the Daniel line sits inside Calasanz's
paragraph in italic type, and the italics are the *only* marker that it is not
his own sentence. Copy that paragraph into a caption, a slide, a design tool or a
plain-text note and **the italics vanish, and with them the entire attribution
frame.** What survives is a devout sentence sitting under a saint's name.

The confirmation that this is a formatting failure rather than a judgement
failure is in the same reading: **the next clause is Matthew 25:40**, and nobody
attributes *that* to Calasanz — because it is famous enough to be recognised on
sight. The frame was lost for both; only the less recognisable one moved.

**Operationally:** a quotation harvested from a breviary, a lectionary, an Office
of Readings excerpt or any devotional reprint has to be checked **against the
formatted original**, not against the plain text that reached you. Losing italics
is a lossy transcription, and it is lossy in exactly the direction that
manufactures misattributions.

### Correction to the earlier record

An earlier version of this file said the line was "associated with the Piarists,
Calasanz's order, **as a motto**", and offered that as the migration mechanism.
**That was an unconfirmed guess and it is withdrawn.** The **Piarist motto is
"Pietas et Litterae"** — piety and letters. Daniel 12:3 is not the order's motto.
The real mechanism is the lost italics above, not motto-drift. Anywhere this
folder previously said "Piarist motto", read this paragraph instead.

### Why it is recorded here rather than quietly fixed

It is a worked example that **even a large, serious Catholic publisher makes this
class of error** — and the sharpened version of the lesson is better than the
original one. The failure is not carelessness about sources. It is that a
**true** quotation, **correctly** transcribed from a **legitimate** liturgical
source, becomes a misattribution through nothing more than the loss of a typeface
in transit. Aptness is not evidence (`best_skill.md` §7.6); neither is
provenance, if the provenance travelled through a format that could not carry its
own citation frame.

Under `best_skill.md` §7 and `SCORER.md` **T3**, a quotation whose citation is
absent or vague is a STOP regardless of how apt it is — and under **T4**,
scripture used as though it were a saint's own words is a misattribution even
when every word is correct. This image is the T4 case in its exact form.

Compare `06`, whose image quote is attributed to a **specific documented
source** — the correct shape for this, even though its text also still needs
checking.

---

## Engagement, and the honest reading

**996 likes / 69 saves**, against 7,131 / 882 for `01` and 7,194 / 1,306 for
`03` — same organisation, so follower count is controlled.

**But subject salience is not controlled.** Joseph Calasanz is a genuinely
obscure saint; Clare of Assisi and Monica are not. A meaningful part of this gap
is that fewer people recognise the name, not that the caption is worse — even
though the caption *is* worse, on the craft grounds above, which are visible
without reference to any number.

Do not cite this row as clean evidence that encyclopedia register costs 86% of
your likes. Cite it as: the weakest craft in the set is also the weakest
performance in the set, on an account where follower count is held constant, with
subject popularity as an acknowledged confound. The README states the full
caveats and this file should not be read without them.

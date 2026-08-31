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

## Attribution issue on the image — flagged, not adjudicated

The post's image renders the line:

> "Those who instruct many in justice will shine as stars for all eternity"

attributed to **St Joseph Calasanz**.

**This closely tracks Daniel 12:3** — "those who turn many to righteousness [shall
shine] like the stars for ever and ever" — and the line is **associated with the
Piarists**, Calasanz's order, as a motto. That association is exactly the
mechanism by which a scriptural line becomes attributed to the founder who
adopted it.

**Flagged as an attribution issue requiring verification. Not asserted either
way.** It is entirely possible Calasanz wrote or preached the line himself,
quoting Daniel as any preacher would; it is equally possible the motto has simply
migrated onto his name. What is not acceptable is publishing it as his without
establishing which. Under `best_skill.md` §7 and `SCORER.md` **T3**, a quotation
whose citation is absent or vague is a STOP regardless of how apt it is — and
under **T4**, scripture used as though it were a saint's own words is a
misattribution even when every word is correct.

**Why it is recorded here rather than quietly fixed:** it is a worked example
that **even a large, serious Catholic publisher makes this class of error.** The
lesson is not that EWTN is careless. It is that a quotation which is apt,
traditional, widely repeated and attached to a saint's order will pass every
informal smell test and still be misattributed. Aptness is not evidence
(`best_skill.md` §7.6). This is exactly what a dossier and a graded source list
exist to catch.

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

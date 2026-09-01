# SPEC-DEBT.md — known gaps, deferred decisions and unexercised rules

> **What this file is for.** The content system is fixed by rounds of contradiction
> repair, and each round has so far introduced a new problem in the opposite
> direction — a check made satisfiable becomes unfailable, a rule made strict
> becomes unrunnable. This file exists so that the things a round **chose not to
> fix** are written down with the reason, rather than dropped and rediscovered as
> findings next time.
>
> Nothing here is a defect being hidden. Every entry is either (a) a decision
> outside this system's authority, (b) a rule that is correct but has not yet been
> exercised on a real artifact, or (c) a known cost of a fix that was still worth
> making.

Opened after the first live Format B packs (drafts `06` and `07`, St Gregory the
Great, 3 September) surfaced findings SF-1 to SF-18. Fifteen of the eighteen were
fixed; what follows is the remainder, plus new debt the fixes created.

---

## D-1 — The twelve struggle topics are a closed list that fits some saints badly

**From:** SF-3, SF-4. **Status:** deferred — not this system's decision.

The twelve topics (`best_skill.md` §1) are the **app's own matching taxonomy** —
they are the emotions a user selects from on the home screen, and they exist in
the product's type definitions. They are not a content-system invention.

Some documented struggles have no clean entry. Gregory the Great — a man who
wanted a monastic cell and was given the largest administrative office in the
Latin West, and wrote that he had "lost the deep joys of my quiet" — files under
`vocation` because that is the nearest of the twelve, and `vocation` is also the
topic W7 flags as running closest to a demographic. Draft `06` files under
`loneliness` for a post about being addressed only in general, which is a
stretch; the honest topic is something like "generic advice / not being known",
which does not exist in the list.

**Why it is deferred rather than fixed.** Opening or lengthening the list
unilaterally would put the content spec out of sync with the product's own
taxonomy, and the content system is not the right place to redefine what the app
matches on. That is a product decision.

**What was done instead**, so the cost is visible rather than silent:

- `best_skill.md` §1 now states that the twelve govern **the `topic` header
  field** and not the wording of any surface.
- Where the nearest topic is a stretch, the theme-bridge block must **name the
  real struggle in one line** next to the filed topic. A silent stretch reads
  later as evidence the list fits when it did not.
- The B-2 audience line was freed from the list entirely (SF-2's fix), which
  removes most of the pressure the closed list was creating.

**To resolve:** take it to whoever owns the app's emotion set, with the recorded
stretches as evidence. Reopen if the stretch-count keeps rising.

---

## D-2 — P1 (measured contrast) has an owner by role, but no pipeline step runs it

**From:** SF-16's fix. **Status:** new debt, accepted knowingly.

`method/TRUTH-CHECKS.md` §6.6 moves the 3.5:1 contrast measurement out of the
gate — where it could not be run, and was being asserted by graders about images
that did not exist — into **P1**, a post-generation check owned by "whoever
renders and publishes the image", run on the rendered file before publication.

**The gap:** that owner is named by role, and no rendering or publication step in
this repository currently performs or records the measurement. P1 is a correct
rule with nothing yet executing it.

**Why this is still better than what it replaced.** Before, the requirement was
inside I4 and was *documented as passing* on two packs where nothing had been
measured — a rubber-stamped check, which is worse than an unrun one because it
produces evidence of compliance. Now the gate checks what it can actually check
(a contrast **provision**, named hex on both sides of the type), and the part that
needs a file is recorded as pending against a named owner.

**To resolve:** add the measurement to whatever step renders the assets, and have
it record the measured ratio alongside the file. Until then, expect P1 to be
skipped in practice.

---

## D-3 — The corrected W7 has not been exercised on a complete pack

**From:** SF-2's fix. **Status:** unexercised rule.

W7 now permits the B-2 audience line to name a struggle in **the saint's own
vocabulary** (route (i)), which is what makes W2 and W7 simultaneously
satisfiable. The evidence that this works is:

- the **rewrite** proposed in draft `07` §10 — "…anyone who cannot get back to
  **the quiet**", from Gregory's *Registrum Epistolarum* I.5 — which passes both
  checks under the corrected rules; and
- nothing else.

**No complete B-2 pack has yet been written and graded end to end with a route
(i) audience line.** Draft `07` as filed uses the generic line and still STOPs at
W2; its §10 rewrite is a fragment, not a graded pack. And the third-party
specimen cannot help — `03`'s "every Catholic parent" fails W7 as a demographic
and does not survive W2's swap either, so **no artifact of any origin has yet
satisfied both checks together**.

**To resolve:** write the next real B-2 pack with a route (i) line and grade it.
If route (i) turns out to be hard to find for saints who left no writings — and
it will be, since the route depends on a DOCUMENTED line of the saint's own
words — that is the finding, and W7 needs a third route for subjects with no
surviving vocabulary. Watch for it.

---

## D-4 — Both the B-2 slide floor and the W8 word band rest on n = 1

**From:** SF-5's fix and SF-15's fix. **Status:** stipulations, labelled as such.

Two numbers in the B-2 spec are not derived from evidence:

| Rule | Value | Basis |
| --- | --- | --- |
| Teaching-slide floor (W6) | **≥ 3** | Stipulated. Closes the "promise 2" hole, which W9 would otherwise pass |
| Caption word band (W8) | 8–25 | n = 1, a band set wide around a single fourteen-word specimen |

They were handled in **opposite directions** on purpose, and the asymmetry is
deliberate rather than inconsistent:

- The **floor is a STOP**, because without it W6's contract is gameable — a
  promise of two is a B-1 with extra steps and every other check passes it.
- The **band is recorded, not gated**, because it was constraining nothing (on
  the one pack graded against it, 9 and 24 words would both have passed the same
  as the actual 20) while presenting itself as a measurement.

A stipulation that closes a hole earns its place; a threshold that closes nothing
does not. Both are marked in the checks as unevidenced.

**To resolve:** re-derive both once four or more B-2 specimens exist. `SCORER.md`
W8 says to promote the band back to a check at that point.

---

## D-5 — Draft filenames record the original verdict, not the current one

**From:** the re-grade against the corrected rulebook. **Status:** cosmetic, left alone.

`drafts/06-pass-gregory-the-great-b1.md` carries `pass` in its filename and now
**STOPs** on re-grade against the corrected spec (I4 clause 3 — its prompt states
a contrast *outcome* rather than naming the hex behind the type).

The filename was not changed. Renaming would break the `drafts/README.md` index
and every existing reference to the file, to record something that is already
recorded properly — inside the file, where both grades now sit with their
`skill_version`s. **The filename reflects the verdict the draft was first
published under**; the file is authoritative for the current one.

**To resolve:** nothing to do, unless the naming convention is ever formalised —
in which case make it a sequence number and drop the verdict from the name, since
a verdict is a property of a grading run and filenames cannot track it.

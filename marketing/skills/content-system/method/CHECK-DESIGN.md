# CHECK-DESIGN.md — how to write a check

> **Layer: METHOD — portable, brand-agnostic.** Copy this file to a new brand
> unchanged. Nothing in it depends on Saint Match, on Catholic content, or on
> this repository's layout.

**What this file is.** The conventions every check in this system obeys. It is
the file to read before writing a brand's own voice floor, because a floor
written to a different pattern will not compose with `GATE.md`.

Nothing here is new material. It collects rules that are stated inside individual
checks in `GATE.md` and `TRUTH-CHECKS.md`, and in the instance's floor, so that
someone writing a *new* check can find them without reverse-engineering an
existing one.

---

## 1. The anatomy: four fields, always

Every check is written as:

```
### <ID> — <one-line name>

- **Tests:** the surface it looks at, named precisely.
- **PASSES:** the affirmative condition, stated so it can be confirmed.
- **STOPS:** the failure conditions, enumerated.
- **Evidence:** what the grader must write down.
```

Notes and carve-outs go after those four, as `- **Note:** …`.

**The `Evidence` field is not documentation.** It is the mechanism by which the
check resists being waved through. `GATE.md` §8: *"'PASS' with no evidence is
treated as ungraded, which is a STOP."* A check whose evidence field cannot be
filled in mechanically — "quote the line", "count the words", "name the source
line" — is a check that will be answered from impression, and it should be
rewritten or moved to the voice score.

## 2. Binary, or it does not belong in the gate

A check answers PASS or STOP. It never scores, never weights, never averages.
`GATE.md` §0.1 states why at length and it is the architectural core:

- **A score that can block becomes a censor**, and — worse — it is commensurable
  with the truth result, which reintroduces exactly the blending §0 exists to
  prevent.
- **A floor that is also a score becomes negotiable.** *"The scripture block is
  missing, but the voice scored 4.5"* is a sentence that must be impossible to
  say.

So: if a proposed check needs the word "sufficiently", "enough" or "generally",
it is a voice-score axis (`VOICE-SCORE.md` §9.2), not a floor check. The one
place this bites hardest is a genuinely valuable quality that is not testable —
the Saint Match instance has a worked example in "a genuinely quotable quote",
which is an observed driver of performance and is deliberately **not** made into
a check for exactly this reason.

## 3. Fail closed, without discretion

From `GATE.md` §1:

- Missing source line for a claim → **STOP**. Not "seems right", not "widely
  known".
- Missing or unreadable source notes → **STOP** for the whole pack.
- **Grader cannot determine whether a check passes → STOP.**
- Check not applicable → `N/A` **with a one-line reason**. `N/A` is not `PASS`.

**The third one is the one that gets eroded.** It is most tempting to be generous
exactly where judgement is hardest, so the hardest check should say so in its own
text. The instance's hinge check does: *"Inability to name it is itself the STOP
— not a reason to look harder, and not something to resolve in the draft's
favour."* Write that clause into any check where a grader could plausibly say "I
can sort of see it".

## 4. Scope by a declared axis, never an inferred one

Most systems end up with more than one kind of output — formats, variants,
channels, lengths — needing different checks. Two rules make that safe:

1. **The axis is declared in the artifact's header and verified before any check
   runs.** A missing or malformed declaration is a STOP at that point, ahead of
   everything else.
2. **Grade what was declared, even when it looks wrong.** From `GATE.md` §1:
   *"Do not 'correct' a declared format or variant that seems wrong for the
   draft… That failure is the accurate one and it is the signal the loop needs.
   Silently regrading against the other format or variant hides the error."*

**Both directions of a scoping bug STOP a correct artifact**, and both are worth
enumerating explicitly in the instance's own text: running format A's checks
against a format B draft, *and* running format B's against format A. The
instance's scoping table — every check × every declared value, with an explicit
`run` / `N/A — <axis value>` in each cell — is the pattern to copy. It is verbose
on purpose: an exhaustive table makes an omission visible, and a grader who
prints only the applicable checks makes "N/A by scope" indistinguishable from
"silently skipped".

## 5. One STOP is the verdict

No counts, no thresholds, no majorities, no offsetting. `GATE.md` §8. And per
§0, a STOP is never overridden by a scorer or a writer — only by a human, in
writing, on the record, logged against the artifact's id.

## 6. Run every check, every time

Do not stop at the first STOP; the writer needs the whole list. Print a line for
every check including the inapplicable ones. Record the verdict for **every**
artifact, including the ones that STOP — STOP rate per rulebook version is a
first-class signal (`GATE.md` §7) and it only exists if failures are counted
rather than discarded.

## 7. Order the run so that judgement comes last

`GATE.md` §1 puts the source notes before the copy, *"because grading the copy
first invites you to go looking for justification for prose you already liked"*,
and it puts the voice score after a PASS, in a separate pass with a separate
output. Both are the same principle: **arrange the procedure so that the
expensive judgement cannot contaminate the cheap one.**

## 8. Known-bad anchors are not referents

Keep counter-examples, and keep them **out** of the referent set. Their use is in
`VOICE-SCORE.md` §9.4: a judge that cannot rank the known-bad artifact last is a
judge whose scores are discarded. Any set of specimens should carry at least one
deliberate negative for this purpose, labelled as such, and the label should say
explicitly that it is never gold.

## 9. When evidence overturns a rule, correct the rule and say so in place

The instance does this repeatedly and it is worth copying as a habit: a
superseded rule is left visible with its correction attached, rather than being
quietly deleted. Two live examples in this repository — a voice floor that had
been derived from the wrong specimen and would have STOPped every correct draft,
and a diagnostic heuristic that a later specimen disproved. In both cases the
old claim, the evidence against it, and what survives are all recorded together.

This matters more than tidiness. A deleted rule takes its reasoning with it, and
the same rule gets re-proposed six months later by someone who never saw the
counter-example.

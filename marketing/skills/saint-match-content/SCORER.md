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

---

## 1. How to grade

1. Read the **source notes first**, before the caption. Grading the copy first
   invites you to go looking for justification for prose you already liked.
2. Build a claim list: every factual assertion in the overlay, the description
   caption and the image prompt.
3. Run every check in §2–§6. Run all of them; do not stop at the first STOP —
   the writer needs the full list.
4. Emit the verdict in the §8 format.

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

## 3. BRAND checks

Against `best_skill.md` §5, which is PROVISIONAL and derived from the Raymond
caption. Grade against that specimen, not against general taste.

### B1 — Register

- **Tests:** tone across the description caption.
- **PASSES:** reverent, plain, unsentimental. Concrete nouns before abstractions.
  Short declarative sentences carrying weight. The post does not instruct the
  reader how to feel.
- **STOPS:** hype or superlatives; therapy-adjacent filler; devotional inflation;
  rhetorical-question opener; opening with "Imagine"; any emoji; claims about
  what the saint "would say" today; modern political framing.
- **Evidence:** quote each offending phrase.

### B2 — Shape and ending

- **Tests:** structure of the description caption.
- **PASSES:** opens naming saint and state of life; 120–200 words; one turn, in
  one sentence, about the reader; the last line before the invocation is the
  hardest-edged line in the post; closes with the fixed invocation — name,
  patronage, "pray for us".
- **STOPS:** ends on consolation, reassurance or a takeaway; more than one turn;
  invocation missing or reworded; the closing line is the kindest line rather
  than the hardest.
- **Evidence:** the final two lines, quoted.

### B3 — Promises

- **Tests:** any implied causation.
- **PASSES:** no devotion, novena, prayer or app feature is presented as
  producing an outcome.
- **STOPS:** "pray this and…", "this novena will…", any suggestion the app
  delivers a spiritual result.
- **Evidence:** the sentence.

---

## 4. CTA checks

### C1 — Approved pattern

- **Tests:** the CTA block against `best_skill.md` §9.1.
- **PASSES:** exactly one CTA; it follows an approved pattern's structure; it
  names the app plainly; it sits after the invocation.
- **STOPS:** more than one CTA; a CTA before the invocation; a structure not in
  §9.1; no CTA at all when the format requires one.
- **Evidence:** the CTA verbatim, and which pattern it maps to.

### C2 — Banned register

- **Tests:** the CTA and the last paragraph of the caption.
- **PASSES:** no urgency, no scarcity, no imperative sell, no obligation, no
  engagement bait, no guilt. The free-tier limit is not used as pressure.
- **STOPS:** any of "only today", "before it's gone", "don't miss out", "limited",
  a countdown; "download NOW", "tap the link!!"; "share if you love St N.",
  "comment AMEN", "double tap if"; "most people scroll past this"; any use of the
  three-matches-a-week limit as a reason to hurry.
- **Evidence:** the offending phrase verbatim.

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

---

## 8. Output format

```
VERDICT: PASS | STOP
draft_id:      <from header block>
skill_version: <from header block>
graded_by:     <human name | judge model id>
graded_at:     <ISO 8601>

CHECKS
  T1 dossier coverage      PASS | STOP | N/A — <evidence>
  T2 grade-appropriate     PASS | STOP | N/A — <evidence>
  T3 quotation             PASS | STOP | N/A — <evidence>
  T4 scripture             PASS | STOP | N/A — <evidence>
  T5 feast / rank / bio    PASS | STOP | N/A — <evidence>
  T6 exclusions declared   PASS | STOP | N/A — <evidence>
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

- **Any single STOP makes the verdict STOP.** There is no count, no threshold, no
  majority. One is enough.
- Every check gets a line, including passing ones, and every line carries
  evidence. "PASS" with no evidence is treated as ungraded, which is a STOP.
- Required rewrites are concrete and actionable: name the sentence, name the
  replacement or name the dossier line that would be needed. "Improve the tone"
  is not a rewrite note.
- The grade never contains a numeric score. Introducing one recreates the
  blending this document exists to prevent.

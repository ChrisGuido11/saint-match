# TRUTH-CHECKS.md — the truth surface: T1–T6 and I1–I4

> **Layer: METHOD — portable, brand-agnostic.** Copy this file to a new brand
> unchanged. Nothing in it depends on Saint Match, on Catholic content, or on
> this repository's layout.

> **On the section numbers.** The gate is one numbered document split across
> several files; the numbering is **preserved from the original** so that every
> existing cross-reference (`§0.1`, `§1`, `§9.5`, "see §6.5") still resolves. The
> file each number lives in is mapped in `README.md`. Do not renumber.

> **Instance names appearing in the text below.** The prose was written inside
> the Saint Match instance and names its checks and fields. Read them as the
> general thing they are an example of:
>
> | Named in the text | Generally |
> | --- | --- |
> | **V1–V7**, **W1–W9** | the instance's **voice-floor checks**, one set per post format |
> | **B1–B3**, **C1–C3**, **G1** | the instance's brand, CTA and bridge checks |
> | **T1–T6**, **I1–I4** | the **method's own** truth and image checks — these travel unchanged |
> | **Format A / Format B**, **variant B-1 / B-2** | the instance's declared post formats and variants |
> | **`post_format`**, **`format_variant`** | the instance's declaration fields in the pack header |
> | **`best_skill.md`**, **`SCORER.md`**, `exemplars/…` | files in `../instances/saint-match/` |
> | **saint**, **dossier**, **feast**, **the Missal** | the instance's subject domain; the mechanics do not depend on it |

**What this file is.** The checks that decide whether a draft's claims are
true and traceable — in the copy (**T1–T6**) and in the image (**I1–I4**). They
are the part of the gate that `GATE.md` §0 forbids trading against anything.

**Why the image checks are here and not with the layout rules.** I1, I2 and I3
are truth checks that happen to be enforced on a prompt rather than on a
sentence: an image asserts things, and every attribute it asserts must trace to a
source line exactly as a sentence must. **I4 is different in kind** — it is a
legibility and composition check — and it is kept alongside them because that
distinction is itself the lesson (§6.5), and because separating them invites a
reader to treat I4's rewrite as precedent for softening I1–I3. It is not.

**The domain flavour is not the mechanism.** These checks are worded for saints,
scripture, habits, orders and liturgical books because that is where they were
written. The mechanism in each is domain-free: *every claim maps to a numbered
source line; phrasing matches the claim's grade; quotations carry a work and a
locus; a quoted authority is not paraphrased; depicted attributes are sourced;
nothing depicted contradicts the record; a story is not depicted as an event.* A
second brand instantiates the nouns and keeps the checks.

Moved verbatim out of the Saint Match `SCORER.md` (§2, §6, §6.5).

**Companion files:** `FACT-GRADING.md` defines the DOCUMENTED / TRADITIONAL /
LEGEND grades that T2 and I3 test against; `QUOTATION.md` defines the sourcing
order T3 tests against; `ATTRIBUTION-CASES.md` holds three worked cases of
claims that pass a naive reading of T3 and are still wrong.

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
- **Evidence:** each quotation verbatim, its claimed source, its dossier line,
  and **where the citation sits** — on the overlay, or in the source notes.
- **A citation may live in the source notes, and that is a PASS.** `QUOTATION.md`
  §7.2 is explicit: "the citation goes in the source notes even when it does not
  fit on the slide." A grader reading only the slide sees an unattributed
  quotation and will STOP a correct pack; read the source notes, which §1 requires
  be read first anyway. What T3 requires is that the citation **exists, is
  complete, and is findable in the pack** — not that it is printed on the image.
- **Sourcing is never shortened to fit a layout.** A citation is trimmed only for
  an editorial reason recorded in the source notes — never because it did not fit
  a word count, a line length or a type size. Where a layout has a word limit, the
  attribution is **excluded from that count** (the instance states this for its own
  formats; see `best_skill.md` §4.1). If an honest citation still cannot be made to
  fit, the layout changes or the quotation is not used. **The layout never edits
  the sourcing** — that inverts the whole order of this document.
  *(This is a real observed failure, not a hypothetical: an attribution reading
  "St Gregory the Great, Pastoral Rule III" was cut to "Gregory, Pastoral Rule
  III" purely to bring a slide inside a word limit that had no budget for it.)*
- **Note for the grader:** this is where an LLM writer fails most often and most
  fluently. A quotation that fits the theme perfectly and has no citation is the
  characteristic signature of invention, not a coincidence. Aptness raises
  suspicion; it never substitutes for a source.
- **Note — two ways a citation passes T3 and is still wrong.** Both are worked in
  `ATTRIBUTION-CASES.md`. **(1) A lost formatting frame.** The Liturgy of the
  Hours marks scriptural quotation with *italics*, not quote marks, so a line
  copied out of a breviary paragraph can be transcribed perfectly and arrive with
  its attribution deleted (Case 1: Daniel 12:3 under Joseph Calasanz's name).
  Require the dossier to name the **formatted** source, not the plain text the
  writer met. **(2) A well-formed citation that is simply false.** "Points at a
  checkable text" is the *shape* a citation must have, never a substitute for
  having made the check.

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
  death, beatification and canonisation — **and whether the observance is
  actually celebrated on the date the pack pegs to, in the year the pack is for.**
- **PASSES:** each is present in the dossier and reproduced exactly, **and the
  dossier carries an explicit supersession row** (below) resolved for that year.
- **STOPS:** any date, rank or office that differs from the dossier, or that
  appears in the pack but not in the dossier. Includes ranks the saint never
  held — the Raymond Nonnatus cardinalate is the standing example. **Also STOPS:
  no supersession row in the dossier**, or a row that resolves the question for a
  different year than the one the pack is for.
- **Evidence:** each datum as written, next to its dossier line, **plus the
  supersession row quoted with its answer and its source**.
- **Note — the supersession check, and why it is a required row.** A feast's
  *date* is stable and a model recalls it correctly. Whether the observance is
  **kept that year** is not stable: an optional or obligatory memorial is
  displaced by a Sunday, a solemnity or a feast, and which of those falls on a
  given date changes annually. **It is the one calendar fact that moves, and
  therefore the one a model will get wrong most confidently** — it will reproduce
  a correct date and a correct rank and be silently wrong about whether anything
  is celebrated. The dossier must carry, as its own row:
  - the **rank** of the observance, and the calendar it is on;
  - **what day of the week the date falls on in the pack's year**, computed and
    not recalled;
  - **whether anything displaces it** — a Sunday, a solemnity, a feast, a
    privileged season — with the answer stated either way;
  - the **source** for the resolution.

  A pack whose observance *is* superseded is not automatically a STOP — it is a
  scheduling decision, and the pack may still be correct if it does not claim the
  day. What is a STOP is the question going unasked. Recording "checked, not
  superseded" is a pass; recording nothing is not.
- **Note — "known for" claims land here, not in T3.** A sentence like "known for
  his devotion to Mary and promotion of the Memorare" has **no quotation marks in
  it** and so is invisible to T3, and it is still a misattribution: the Memorare
  postdates Bernard of Clairvaux by ~300 years and was popularised by a different
  Bernard (Case 2, `ATTRIBUTION-CASES.md`). Treat any claim about what a figure
  wrote, composed, founded, promoted or is "known for" as a T1/T5 datum requiring
  its own dossier line. **Name collisions drift toward the more famous name**, so
  where one is possible, check the dates first.

### T6 — Exclusions are declared

- **Tests:** the "excluded and why" list in the source notes.
- **PASSES:** the list exists and names at least the known false or contested
  claims attached to this saint.
- **STOPS:** the list is absent; or the grader knows of a well-known false claim
  about this saint that is neither excluded nor addressed.
- **Evidence:** the exclusion list, plus any known false claim it omits.

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

### I4 — Type zone, contrast and frame

Tests the *layout* of a baked-in-text image. Runs on both formats and both
Format B variants. On a **B-2** pack the image under test is the **hook slide**,
and its numbered promise (W6) is the type this check is about.

- **Tests:** the framing, composition and type-treatment instructions in the
  image prompt, against `best_skill.md` §8.1 and §8.2.
- **PASSES — all five:**
  1. **Aspect ratio declared.** 9:16, 1080 × 1920, stated in the prompt rather
     than left to the generator.
  2. **A type zone is specified**, as a percentage range **on the axis that
     defines the zone, with the extent on the other axis given** — chosen for
     *this* composition, and **the composition is described so as to create
     it**. A top or bottom band is defined vertically ("figure in the upper 55%,
     lower 35–40% dark for type, full width inset 8%"); a side band is defined
     horizontally ("figure in the right 42%, type in the left 8–52% of width,
     24–64% of height"). Per-composition is the whole requirement: a zone that
     happens to be at the top or the bottom is fine; a zone that is at the top or
     the bottom *because that is the default* is not, and neither is a zone
     asserted in one clause that the rest of the prompt does not build.
     *(Corrected: this clause formerly demanded "a vertical percentage range",
     which no side-band composition can supply — including the one §8.1 offers as
     its own worked example. Both axes are now required and either may be the
     defining one.)*
  3. **A contrast provision is specified — as a property of the prompt, not of
     the unmade image.** The prompt names a **hex value on both sides of the
     type** — the type colour, and the value the region behind it is held to
     across the whole zone — plus the drop shadow §8.1 specifies (2–3px, dark,
     50–60% opacity) wherever type sits on painted areas. The named pair must be
     one that clears **3.5:1**; that is a fact about two hex values and a grader
     can check it at gate time with no image in front of them.
     - **What this clause deliberately does not do is assert a measured ratio.**
       Contrast is a property of a rendered file, and at gate time there is no
       rendered file — only a prompt. A pack that writes "well above 3.5:1" about
       an image nobody has generated is recording an unfalsifiable claim as
       though it were a measurement. Specify the provision; do not assert the
       outcome. The measurement is **P1** in §6.6 and it runs later, against the
       actual file, with a named owner.
     - A prompt that specifies only an *outcome* ("the wall is held light enough
       to clear 3.5:1") and names no value for the region behind the type **fails
       this clause**, because it delegates the choice to the generator and leaves
       the grader nothing to check.
  4. **No collision with the subject.** The type zone does not overlap the
     subject's **face or hands**, nor any of the **iconographic attributes I1
     sourced** — the identifying garment of the habit, the emblem, the object the
     post rests on. Burying the attribute that makes the saint identifiable is a
     layout failure even when the prompt names that attribute perfectly.
  5. **The baked type is fully specified.** Where text is rendered inside the
     image — which is the normal case — the prompt carries the exact overlay
     string, the font, the colour, the highlight word, the position range and the
     effects, and requires correct spelling.
- **STOPS:** no aspect ratio declared, or any ratio other than 9:16; no type zone
  named, or a zone named as a percentage but not created by the composition, or a
  zone given on one axis with no extent on the other; **no contrast provision
  where the type lands — including a provision stated only as an outcome, with no
  named value for the region behind the type**; the type zone overlapping the
  face, the hands, or an attribute I1 sourced; baked-in type whose string,
  position, colour or treatment is left for the generator to choose; rendered
  text that came back garbled or misspelled and was shipped rather than
  regenerated.
- **Evidence:** the framing clause quoted; the type zone as a percentage range on
  its defining axis, with the extent on the other axis; **the contrast provision
  quoted with the hex value on each side of the type**; and one line confirming
  the zone clears the face and the attributes listed under I1.
- **Text inside the image is required, not banned.** The style bible bakes the
  overlay into the generated image and treats a generated image without its
  caption text as a failure (`best_skill.md` §8.2). A prompt that asks the
  generator to render lettering is **correct** and must not be STOPped for it.
- **There is no fixed clear band.** Do not require the upper third — or any
  other fixed region — to be empty. §8.1 is explicit that the zone is measured
  per composition and that defaulting it (to the bottom, or to anywhere else) is
  the error. The only band rule is that the zone be *stated* and *built*.
- **I4 is a legibility and composition check, not a truth check.** Whether the
  attributes are sourced and correct is I1 and I2. A prompt can pass I4 with a
  cardinal's galero in it and STOP at I2; a prompt can name every attribute
  correctly and STOP at I4 for printing the headline across the saint's face.

### 6.5 Iconography scope — and the resolved I4 conflict

**I1, I2 and I3 are truth checks and are unmodified.** Iconography accuracy is a
truth surface, not a voice one; nothing in the style bible touches it, and no
realignment of this document has weakened it or may weaken it. They stay exactly
as strict.

**I4 is different in kind, and it has been rewritten. The conflict this section
used to record is closed.** I4 formerly required "no text rendered inside the
image" and "upper third kept clear for overlay type". Both clauses were
**withdrawn** by `best_skill.md` §8.2: the style bible bakes the overlay text
into the generated image and treats a generated image without its caption text
as a failure, and §8.1 requires the text zone to be declared as a
per-composition percentage range — on whichever axis defines the zone, with the
extent on the other axis given — that must **not** default to a fixed band. As written, the old I4 would have STOPped every correctly produced post —
the same class of bug as the old Raymond-derived voice checks in §3, pointed at
the image pipeline.

**The style bible is authoritative on the image pipeline**, so I4 was rewritten
to it rather than the bible being bent back to I4. What I4 now tests is what
actually matters for a baked-in-text image: a legible type zone exists and is
specified per composition, the contrast is provided where the type lands, the
type does not collide with the face or with a sourced attribute, and the aspect
ratio is declared.

Consequences for graders:

- **Do not record a "scorer/rulebook conflict" note against I4 any more.** An I4
  STOP is now attributable to the draft, and the required rewrite is concrete.
- The **contrast requirement survives** — it was never in conflict. §8.1 states
  the same 3.5:1 mid-tone requirement and adds the 2–3px, 50–60% opacity drop
  shadow. **What changed is where it is enforced**, not how strict it is: the
  gate checks the *provision* in the prompt (I4 clause 3) and the *measurement*
  happens against the rendered file (§6.6, P1). Splitting it did not weaken it;
  it made the half that was being rubber-stamped into a half that can actually be
  run.
- **Nothing here licenses relaxing I1–I3.** The resolution was to the layout
  clause of I4 only. If a rewrite of a layout constraint is ever read as
  precedent for softening a sourcing constraint, that reading is wrong on its
  face: §0 forbids trading the truth gate against anything.

### 6.6 Post-generation checks — what the gate cannot run

**The gate grades a pack. A pack contains prompts, not images.** Any requirement
that is a property of a *rendered file* is therefore unrunnable at gate time, and
writing one into the gate does not enforce it — it produces a line every grader
asserts and nobody checks. This section holds the requirements that were moved
out of the gate for that reason, each with an owner and a moment.

**A gate PASS is not a publication clearance.** It says the pack is sound. The
checks below run afterwards, on the artifacts the pack produced.

#### P1 — Measured type contrast

- **Owner:** whoever renders and publishes the image. Not the grader — the
  grader has no file to measure.
- **When:** after generation, before publication, on the rendered file.
- **Tests:** the actual contrast ratio between the rendered type and the pixels
  actually behind it, sampled across the type zone rather than at one point.
- **PASSES:** the measured ratio is **≥ 3.5:1** everywhere the type sits.
- **FAILS → do not publish.** Regenerate, or adjust the treatment (darken or
  flatten the region behind the type, raise the drop-shadow opacity within §8.1's
  2–3px / 50–60% range, or move the zone). A failure here is not a pack defect
  and does not retroactively STOP the pack — I4 clause 3 already confirmed the
  prompt asked for the right thing; the generator did not deliver it.
- **Recorded:** the measured ratio is recorded with the rendered asset. If it is
  not recorded, it was not measured.

> **Why this is not in I4.** Contrast was previously asserted inside the pack and
> graded as though asserted meant checked. Two real packs asserted "well above
> 3.5:1" for images that did not exist. That is the failure mode this split
> exists to end: a check nobody can run is worse than no check, because it
> produces a documented PASS.

**Adding to this section.** Any future requirement about a rendered file, a
published post, or anything else the pack does not contain belongs here and not
in the gate. The test is simple: *can a grader run this with only the pack in
front of them?* If no, it is a P-check.

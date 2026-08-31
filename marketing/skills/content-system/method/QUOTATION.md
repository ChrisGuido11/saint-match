# QUOTATION.md — quotation discipline

> **Layer: METHOD — portable, brand-agnostic.** Copy this file to a new brand
> unchanged. Nothing in it depends on Saint Match, on Catholic content, or on
> this repository's layout.

> **Section numbers** are preserved from the rulebook this was split out of
> (`best_skill.md` §7), so existing cross-references still resolve.
>
> **Instance names in the text:** *saint*, *the order's rule*, *the Collect*,
> *the Missal*, *Raymond slide 1–3*, and the named saints are the Saint Match
> instance's domain and its worked examples. The order of preference and every
> rule in it are domain-free — substitute "the subject" for "the saint" and
> "the primary source" for "the writings" and it reads the same.

**What this file is.** The rules for putting words in someone's mouth, and the
fallback order for when the subject left nothing quotable. **It is the single
highest-risk surface in any LLM-assisted content pipeline**, which is why it is
method rather than instance: a model asked for a quotation will produce a
fluent, apt, perfectly-formed sentence that no one ever wrote, and it will do so
for any subject in any domain.

**Companion file:** `ATTRIBUTION-CASES.md` holds three verified cases, each of
which defeats a different rule below. Read them with this file, not after it.

**Note on status.** §7 was written as "still provisional" inside the Saint Match
instance because that instance's style bible was silent on quotation sourcing —
the section was the pipeline's own addition rather than something read off the
brand's existing practice. That provenance note is preserved verbatim below. It
is **not** a statement that the rules are tentative; three verified cases (§7.7)
have since been worked against them and the result was to add rules, not to
relax any.

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

**7.7 Three verified cases, and the three additional rules they produce.** The
worked cases are in `ATTRIBUTION-CASES.md`; each one defeats a check that §7.1–
§7.6 would otherwise be trusted to catch.

- **Re-open the formatted original.** *(Case 1 — Joseph Calasanz.)* The Liturgy
  of the Hours marks scriptural quotation with **italics, not quote marks**, so
  copying a breviary paragraph into a caption deletes the only citation frame it
  had. Any quotation harvested from a breviary, lectionary, Office of Readings
  excerpt, devotional reprint, PDF or slide is checked **against the formatted
  source**, never against the plain text that reached you.
- **Unquoted claims are attributions too.** *(Case 2 — Bernard of Clairvaux.)*
  "Known for his promotion of the Memorare" contains no quotation marks and is
  still a misattribution — the prayer postdates him by ~300 years. It has to be
  caught as an unsourced **fact** (T1, T5), not as an unsourced quote (T3). And
  **name collision drifts one way only**: toward the more famous holder of the
  name. Check the dates.
- **State the limit of a negative result.** *(Case 3 — Augustine.)* "Not found"
  is a claim about the search as well as the text. Name the corpus searched, name
  the corpus skipped, and say which. A finding written as "almost certainly" is
  auditable and upgradable; the same finding written as "definitively" is a
  fabrication of certainty.

A fourth, positive rule runs through all three: **when a spurious quote is
popular, find what it was reaching for.** It is nearly always reaching for
something the author really wrote, and a replacement is a better outcome than a
refusal — a refusal leaves the writer with the hole that invited the invention.

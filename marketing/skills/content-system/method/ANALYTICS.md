# ANALYTICS.md — the engagement handoff interface

> **Layer: METHOD — portable, brand-agnostic.** Copy this file to a new brand
> unchanged. Nothing in it depends on Saint Match, on Catholic content, or on
> this repository's layout.

Engagement data is what lets the optimisation loop decide whether a rulebook edit
was an improvement. It is collected by a **separate external system**. Nothing in
this folder ingests it. This file is only the agreed handoff format, so that
whoever wires up the collector and whoever runs the gate agree in advance.

## Where it goes

**`<instance>/analytics/metrics.jsonl`** — a path *relative to the instance
folder*, resolved wherever that folder happens to live. In this repository that
is currently `instances/saint-match/analytics/metrics.jsonl`; if the folder is
copied into another repository, the file moves with it and nothing else changes.
**No consumer should hard-code a path from a repository root**, because the whole
point of the method/instance split is that the root is not stable.

An **append-only JSONL file, versioned alongside the rulebook** — not a database.
Two reasons:

- **Audit trail.** Version control shows exactly which rows existed when a
  rulebook edit was accepted. A validation-gated edit whose justifying data
  cannot be reconstructed is not validated, it is asserted.
- **Volume is trivial.** One post a day across up to four platforms is roughly
  1,500 rows a year. That does not need a database.

## Schema

One JSON object per line.

```json
{
  "draft_id": "<join key back to the post pack>",
  "skill_version": "<version id of the rulebook at generation time>",
  "post_format": "<the instance's declared post format>",
  "format_variant": "<the instance's declared variant, or null>",
  "platform": "instagram | tiktok | youtube | x",
  "format": "<rendering format>",
  "subject": "<the post's subject — in Saint Match, the saint>",
  "subject_date": "<the date the subject pegs to, if any>",
  "topic": "<theme / struggle topic>",
  "posted_at": "<ISO 8601>",
  "collected_at": "<ISO 8601>",
  "source": "<what system collected this>",
  "metrics": {
    "impressions": null, "reach": null, "likes": null,
    "comments": null, "shares": null, "saves": null,
    "watch_time_s": null, "profile_visits": null, "link_clicks": null
  }
}
```

The Saint Match instance names the last three identity fields `saint`,
`feast_date` and `topic`; a second brand renames them to its own subject axis.
**Everything else in the schema is fixed**, because the rules below depend on it.

## Rules

- **Append only.** Never rewrite, reorder or delete existing lines. The history
  is the point. A correction is a new row with a later `collected_at`, not an
  edit to an old one.
- **`null` means "not reported by this platform". It does not mean zero.** Any
  consumer must treat `null` as missing and exclude that row from that metric's
  comparison. Writing `0` for an unreported metric will silently drag averages
  down and corrupt every comparison the loop makes — it is the most likely way
  this system produces a confidently wrong answer.
- **A row with no `skill_version` is unusable** for validation-gating and is
  discarded, not guessed at. Back-filling a plausible version can carry an edit
  that should have been rejected.
- **`draft_id` is the join key** back to the post pack, and it is never altered
  by the collecting system.
- **The same `draft_id` appears once per platform**, so one post produces up to
  four rows. Do not deduplicate on `draft_id` alone; the key is
  `(draft_id, platform, collected_at)`.
- Drafts that STOPped at the gate never reach a platform and so never appear
  here. Their `draft_id`s are counted from the scorer's records instead — see
  `GATE.md` §7.
- **`post_format` and `format_variant` are copied from the pack header
  unchanged**, and rows are never pooled across them. Formats that disagree on
  length, person or structure are not comparable, and averaging across them
  measures the format mix rather than the rulebook.
- **Raw engagement is not comparable across subjects, and this is observed
  rather than assumed.** Two third-party specimens collected by the Saint Match
  instance — same account, same register, same anti-pattern opener — differ ~3×
  on likes, with subject fame the obvious available explanation (a major feast
  versus an obscure figure). **Any consumer comparing `skill_version`s must
  normalise against a subject-popularity baseline first**, or a rulebook version
  that happened to draw the better-known subjects wins on nothing. Establishing
  that baseline is out of scope for this file; the requirement is not.

## The interface boundary, stated once

**This file defines a handoff, not a pipeline.** The collector is external and
may be anything. The two obligations that cross the boundary are: the collector
returns `draft_id` and `skill_version` **unchanged**, and the consumer honours
the `null` rule. Every other guarantee in this system is downstream of those two,
and both are cheap to get right and expensive to discover you got wrong.

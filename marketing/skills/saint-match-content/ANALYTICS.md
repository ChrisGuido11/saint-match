# Analytics handoff format

Engagement data is what lets the SkillOpt loop decide whether a rulebook edit
was an improvement. It is collected by a **separate external system**. Nothing
in this folder ingests it. This file is only the agreed handoff format, so that
whoever wires up the collector and whoever runs the gate agree in advance.

## Where it goes

```
marketing/skills/saint-match-content/analytics/metrics.jsonl
```

An **append-only JSONL file in the repo** — not a database. Two reasons:

- **Audit trail.** Git shows exactly which rows existed when a rulebook edit was
  accepted. A validation-gated edit whose justifying data cannot be reconstructed
  is not validated, it is asserted.
- **Volume is trivial.** One post a day across up to four platforms is roughly
  1,500 rows a year. That does not need a database.

## Schema

One JSON object per line.

```json
{
  "draft_id": "2026-08-31-raymond-nonnatus",
  "skill_version": "<git sha of best_skill.md at generation time>",
  "platform": "instagram | tiktok | youtube | x",
  "format": "carousel-4x5 | photo-9x16 | short",
  "saint": "St Raymond Nonnatus",
  "feast_date": "2026-08-31",
  "topic": "substitution / bearing what you can't explain",
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
  discarded, not guessed at. Back-filling a plausible sha can carry an edit that
  should have been rejected.
- **`draft_id` is the join key** back to the post pack, and it is never altered
  by the collecting system.
- **The same `draft_id` appears once per platform**, so one post produces up to
  four rows. Do not deduplicate on `draft_id` alone; the key is
  `(draft_id, platform, collected_at)`.
- Drafts that STOPped at the gate never reach a platform and so never appear
  here. Their `draft_id`s are counted from the scorer's records instead — see
  `SCORER.md`.

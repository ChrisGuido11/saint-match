# analytics/

`metrics.jsonl` lands here — **`<instance>/analytics/metrics.jsonl`**, resolved
relative to this instance folder wherever it lives. Append-only, one JSON object
per line, written by an external collection system. Nothing in this folder
ingests it; this directory is the agreed drop point, and it moves with the
instance.

Full rationale and the authoritative schema: `../../../method/ANALYTICS.md`.
That file is **method layer** — path-independent, and it resolves this drop
point as `<instance>/analytics/metrics.jsonl`, relative to the instance folder
rather than to any repository root. The short version:

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

Three rules that matter more than the rest:

1. **Append only.** Never rewrite or reorder existing lines. Corrections are new
   rows with a later `collected_at`.
2. **`null` means "not reported by this platform", never zero.** Consumers must
   exclude nulls from comparisons and must never coerce them to `0`. Coercing to
   zero silently corrupts every average the validation gate computes.
3. **A row with no `skill_version` is discarded, not guessed at.** Without it the
   row cannot be attributed to a rulebook version and is worthless to the loop.

One `draft_id` per platform, so a single post yields up to four rows. Key on
`(draft_id, platform, collected_at)`.

The schema above is the Saint Match naming of it; `saint`, `feast_date` and
`topic` are this instance's subject fields, and a second brand renames them. The
rest is fixed by the method file.

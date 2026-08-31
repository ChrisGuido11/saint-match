# SkillOpt as coach for a Saint Match content creator

## Mission
Build/improve a content creator skill for Saint Match (Catholic virtue app: saint matching, daily micro-challenges, novenas — "Duolingo for virtue"). Use SkillOpt (Microsoft, MIT) as the coach, not the publisher.

**Kid version:** a writer kid uses a rulebook; a teacher grades posts; only rulebook upgrades that score higher get kept.

**Grown-up version:** train a `best_skill.md` with validation-gated edits. A frozen LLM still writes posts. SkillOpt only upgrades instructions when a scorer says the new skill beats the old one.

## Product context
- Soft CTA: "Find the saint walking with you…" / download free / link in bio
- Seed from existing Notion: Saint Match content strategy + content creation prompts for testing (style bible, image prompts, carousel/reel templates)
- Do not invent a new brand voice from scratch

## Architecture
- **Skill file (`best_skill.md`)** — voice, reel/carousel structure, image style anchors, soft CTAs, subject–caption alignment
- **Rollouts** — draft posts from struggle topics (anxiety, waiting, grief, purity, patience, vocation…)
- **Gate / scorer (fail closed)** — reject if:
  - invented saint quotes or wrong feast/bio facts
  - scripture misquoted / ripped from context
  - harsh salesy CTA / fake scarcity
  - off-brand tone (must stay reverent, clear, warm)
  - missing virtue ↔ app bridge when a soft CTA is required
- **Deploy** — paste winning skill into Claude / n8n / the replication prompt
- Human glance early on before auto-publish

## Hard rules (non-negotiable)
1. Doctrine & saint facts only from an approved source pack. Skill may say "only use the pack." SkillOpt must never invent holy facts for engagement.
2. Fail closed: if truth/brand/CTA checks fail → STOP or rewrite. Never publish a pretty lie.
3. SkillOpt evolves: caption voice, hooks, theme bridges to challenges/novenas, soft CTA wording, consistency.
4. SkillOpt is NOT: the IG poster, the theology authority, or a replacement for the Notion style bible.

## Glossary
| Simple | Complex |
|---|---|
| Rulebook | skill document |
| Practice runs | rollouts |
| Teacher grade | validation gate / scorer |
| Keep only better rewrites | validation-gated skill edits |
| Finished post pack | artifact (caption + image prompt + overlay), not a chat reply |

## Good output per post
- Topic + theme bridge to Saint Match
- Caption overlay (on-image)
- AI image prompt (art-historically anchored, 9:16)
- Reels/carousel description caption
- Soft CTA (no fake urgency)
- Source notes: which saint/scripture facts came from the pack

## Build order
1. Propose starter `best_skill.md` seeded from Notion replication system
2. Define scorer checklist (truth / brand / CTA / bridge)
3. Run 3–5 drafts showing PASS vs STOP
4. Only then discuss SkillOpt training loop / nightly sleep

## One-line memory
> Write what you can prove. Stop when you cannot. Evolve the rulebook only when the grade goes up.

## Prior art
`marketing/carousels/st-raymond-nonnatus/` contains a completed worked example produced under this methodology: accuracy-graded research separating documented fact from legend, no quotes attributed to a saint who left no writings, and a factual error — a false cardinalate — caught and excluded. See that folder's `README.md` for the accuracy notes.

## Status
This brief is stored pending two inputs:

- (a) access to the Notion style bible / content strategy pages
- (b) the approved source pack for doctrine and saint facts

Neither exists in the repo yet.

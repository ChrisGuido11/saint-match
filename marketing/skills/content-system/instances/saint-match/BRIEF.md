# SkillOpt as coach for a Saint Match content creator

> **Layer: INSTANCE — Saint Match.** This is the original brief, kept as written.
> Much of what it sketches has since been split into a portable **method** layer
> (`../../method/`) and this brand **instance**; see `../../README.md` for the
> boundary. Where this brief and the current documents disagree, the documents
> are current and the brief is the record of what was asked for.

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

## Prior art — the St Raymond Nonnatus carousel (case study)

A completed five-slide carousel on **St Raymond Nonnatus**, feast 31 August, shipped from the Saint Match app repository before this pipeline existed. It is the origin case for the source discipline in `../../method/FACT-GRADING.md` and `../../method/QUOTATION.md`, and it is described here rather than linked because the assets live in a different repository from the one this folder is designed to be copied into.

What it demonstrated, and why it is still cited:

- **Accuracy-graded research**, separating documented fact from legend before a word of copy was written — the direct ancestor of the DOCUMENTED / TRADITIONAL / LEGEND convention.
- **No quotes attributed to a saint who left no writings.** Raymond left nothing, so the five slides quote, in order: the Constitutions of the Order of Mercy, 1 Corinthians 7:23, Dom Prosper Guéranger's *The Liturgical Year*, and the Collect from the Roman Missal. That fallback order is now `QUOTATION.md` §7.1.
- **A factual error caught and excluded.** Raymond was **never a cardinal** — a sixteenth-century confusion with Cardinal Robert Somercotes, repeated in later paintings. It appears nowhere in the copy and nowhere in the image, and the exclusion was declared rather than silently applied. This is the standing worked example for the exclusion list (`GATE.md` T6) and for "later art repeating an error is the error in paint, not evidence for it" (`TRUTH-CHECKS.md` I2).
- **Saying plainly when the record is thin**: *"Little of his life can be documented with certainty — the Church has kept its shape rather than its dates."*

Two cautions that travel with the citation. Its **caption is off-voice** for Format A against the Notion style bible, itemised in `best_skill.md` §5.6; and its **4:5 five-slide liturgical structure** is a permitted variant, not the default (`best_skill.md` §4.3). Cite it for source discipline, never for voice or format.

## Status
This brief is stored pending two inputs:

- (a) access to the Notion style bible / content strategy pages
- (b) the approved source pack for doctrine and saint facts

Neither exists in the repo yet.

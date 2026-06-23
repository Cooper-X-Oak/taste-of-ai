# AGENTS.md

> Predictive context for AI coding agents working in this repo.
> Agent-focused; supplements — does not replace — the README.

## 1. Project overview

《舌尖上的AI》is a content column that road-tests Claude Code capability units
— skills, group skills (plugins), slash commands, subagents, workflows,
harness/loops, MCP servers — and turns each into experience articles for
公众号 and 小红书.

- **Roles (do not cross):** the human is 导演 / 主播 / 试吃员 and is the only
  one who gives the final taste verdict (锐评). The agent is 策划 / 后厨: it
  sets up tests, runs candidates, captures evidence, and drafts frames.
- **Two review formats:** 横评 (擂台 head-to-head — same standard task, ranked)
  and 竖评 (single flagship deep-dive).
- **Rating ladder (从夯到拉, real internet tier-list slang):** S 夯 · A 顶级 ·
  B 人上人 · C NPC · D 拉(完了). "照骗 / 名不副实" (菜单 vs 实物 gap) is
  editorial commentary, NOT a tier; 避雷红榜 collects D only.
  Ladder defined once in `docs/.vitepress/theme/tiers.ts` (consumed by index
  pages); human explainer in `docs/about/rating.md`. Don't re-list tiers elsewhere.

## 2. Workflow

- **Plan first.** Stay in planning/discussion until the director says
  "开拍 / 落盘". Do not jump to production (running skills, writing code, making
  covers, drafting final copy) on your own.
- **Evidence over priors (贝叶斯实证).** Every assumption is an L3 prior; only
  claims backed by real test evidence (L1) may be written as conclusions.
  Never let a prior masquerade as a result.
- **Stay in lane.** Prepare 选题 / 出题 / 证据 / 初稿. Leave the final
  口味判断、锐评、梯队定调 to the host — keep the 锐评 field blank for them.
- **Voice.** Before drafting any content (站内 / 公众号 / 小红书), follow
  [STYLE.md](STYLE.md) — the language-style baseline. It keeps the
  cooking/competition frame as *labels only* and bans AI-slop (排比钩子,
  双重隐喻叠用, emoji 雪崩). 正文说人话,隐喻只在标签层落锤.
- **Episode pipeline:** 选题 → 出题 (lock the standard task) → 试吃 (run each,
  keep evidence) → 评级初稿 (six-axis card + tier) → 主播定调 → per-platform
  drafts (xhs / gzh).

## 3. Testing instructions

"Testing" here = 试吃 a capability unit. For each subject:

1. **Record the 菜单 first** — copy the unit's official text (SKILL.md /
   plugin.json) verbatim as the L3 prior.
2. **Invoke it for real** (e.g. the Skill tool for skills) — never simulate
   from memory.
3. **Run the standard 考题** — 横评: one shared task for all contestants;
   竖评: 3–5 escalating scenarios.
4. **Capture L1 evidence** — full prompt/invocation, rounds & failures, key
   outputs (screenshots/files), time & token feel.
5. **Log 菜单 vs 实物** (claimed vs observed); the bigger the gap, the harder
   the verdict.

Rendering artifacts: `file://` is blocked in the browser tool — serve via a
local HTTP server (`python -m http.server <port>`), screenshot with Playwright,
then kill the server and close the browser.

## 4. PR guidelines

- One episode per branch/PR; keep its evidence (test-log + assets) together.
- Conventional commits (`feat` / `fix` / `docs` / `chore` …). No attribution lines.
- Content is Chinese (公众号 / 小红书); agent config & docs lean English.
- Do not publish a verdict without its L1 evidence committed.
- No hardcoded secrets; never skip hooks (`--no-verify`); no leftover debug output.

## 5. Architecture & data flow

VitePress 1.6 site, single npm package (only `vitepress` as a devDep, no
vendored third-party source). Everything derives from **one source of truth**:
the frontmatter of each `docs/skills/<name>/index.md`.

```
docs/skills/<name>/index.md  (frontmatter: skill / category / episode /
        │                      format / tier / status)
        ▼
docs/.vitepress/theme/contestants.data.ts   ← createContentLoader aggregates
        │                                      all skill pages into Group[]
   ┌────┼──────────────────────────────┐
   ▼    ▼                               ▼
Roster.vue        indexes/by-skill.md      seasons/s01/epNN-*.md
(roster.md)       by-tier.md / avoid.md    (data.filter(episode === N))
```

- **Add a skill** → run `npm run new-skill -- <name> <category> <episode>`
  (`scripts/new-skill.mjs`). It scaffolds `index.md` + `notes.md` +
  `public/evidence/<name>/`. A card then auto-appears everywhere.
- **Category is single-sourced** in the `EMOJI` map in
  `docs/.vitepress/theme/contestants.data.ts` — that map IS the category set;
  `category` frontmatter must match a key there, and `episode` maps to an EP page
  via `EP_SLUG` (EP08 is the finals summary, no contestants). Don't hardcode the
  category list anywhere else.
- **Taxonomy model (being migrated):** categories are grounded in Anthropic's
  official baseline — the `anthropics/skills` repo (~17 official skills) and the
  `anthropics/claude-plugins-official` marketplace (12 categories). Each category
  is a 横评 bracket: the official skill/plugin is the incumbent, community-popular
  and 新锐 skills are the challengers, grouped by shared function. Build a
  candidate roster per category (official anchor + top 3–5 challengers), not
  exhaustive dumps. (Repo GitHub access: proxy 7897 via curl, or `mcp__github__*`.)
- **Never hand-maintain ranking lists.** `by-skill`, `by-tier`, and `avoid`
  all read from `contestants.data` and rebuild from each skill's `tier`. Set
  `tier` in frontmatter (S/A/B/C/D); the tables and 避雷红榜 update themselves.
  Editorial detail (雷点 / 平替) lives in each skill's article, not in the榜.
- **Roles still apply:** the agent fills evidence and drafts; the host sets
  `tier` and writes the 锐评. Keep `tier: null` until the host rules.

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
- **Rating ladder (从夯到拉):** 🔥S 夯爆 · 😋A 够味 · 😐B 垫吧 · 🥱C 预制菜 · 🤮D 拉胯.

## 2. Workflow

- **Plan first.** Stay in planning/discussion until the director says
  "开拍 / 落盘". Do not jump to production (running skills, writing code, making
  covers, drafting final copy) on your own.
- **Evidence over priors (贝叶斯实证).** Every assumption is an L3 prior; only
  claims backed by real test evidence (L1) may be written as conclusions.
  Never let a prior masquerade as a result.
- **Stay in lane.** Prepare 选题 / 出题 / 证据 / 初稿. Leave the final
  口味判断、锐评、梯队定调 to the host — keep the 锐评 field blank for them.
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

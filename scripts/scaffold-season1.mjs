// Batch-scaffold every Season 1 contestant's skill page.
import { scaffoldSkill } from './new-skill.mjs'

const ROSTER = [
  // EP01 调研搜索
  ['agent-reach', '调研搜索', 1], ['deep-research', '调研搜索', 1],
  ['exa-search', '调研搜索', 1], ['market-research', '调研搜索', 1],
  ['iterative-retrieval', '调研搜索', 1],
  // EP02 内容创作
  ['article-writing', '内容创作', 2], ['copywriting', '内容创作', 2],
  ['content-engine', '内容创作', 2], ['brand-voice', '内容创作', 2],
  ['crosspost', '内容创作', 2],
  // EP03 前端设计
  ['ui-ux-pro-max', '前端设计', 3], ['design-system', '前端设计', 3],
  ['liquid-glass-design', '前端设计', 3], ['web-artifacts-builder', '前端设计', 3],
  // EP04 调试排错
  ['systematic-debugging', '调试排错', 4], ['agent-introspection-debugging', '调试排错', 4],
  ['click-path-audit', '调试排错', 4], ['diagnose', '调试排错', 4],
  // EP05 Skill 元治理
  ['skill-creator', 'Skill 元治理', 5], ['skill-comply', 'Skill 元治理', 5],
  ['skill-stocktake', 'Skill 元治理', 5], ['skills-map', 'Skill 元治理', 5],
  ['context-budget', 'Skill 元治理', 5],
  // EP06 Agent 编排
  ['autonomous-loops', 'Agent 编排', 6], ['dispatching-parallel-agents', 'Agent 编排', 6],
  ['claude-devfleet', 'Agent 编排', 6], ['council', 'Agent 编排', 6],
  // EP07 群组拆包(特赛)
  ['feature-dev', '群组拆包', 7, '特赛'], ['code-review', '群组拆包', 7, '特赛'],
  ['frontend-design', '群组拆包', 7, '特赛'],
]

let total = 0
for (const [name, category, episode, format] of ROSTER) {
  const r = scaffoldSkill({ name, category, episode, format: format || '横评', season: 1 })
  total += r.created
  console.log(`  ${r.created ? '✓' : '·'} ${name} (EP${String(episode).padStart(2, '0')} ${category})`)
}
console.log(`\nDone. ${ROSTER.length} skills, ${total} files created.`)

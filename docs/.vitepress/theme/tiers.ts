// Single source of truth for the 从夯到拉 rating ladder (real internet tier-list slang).
// Consumed by the index pages (by-tier / avoid / by-skill). The human-facing explainer
// lives in docs/about/rating.md. Edit the ladder HERE ONLY — never re-declare tiers elsewhere.

export interface Tier {
  key: 'S' | 'A' | 'B' | 'C' | 'D'
  word: string // 真梗词:夯 / 顶级 / 人上人 / NPC / 拉
  flavor: string // 一句注解
  dot: string // 色点(总榜表头用);行内徽章只用色字母,颜色由 CSS [data-tier] 控
  avoid?: boolean // true → 收进避雷红榜
}

export const TIERS: Tier[] = [
  { key: 'S', word: '夯', flavor: '强到离谱,装了回不去。', dot: '🔴' },
  { key: 'A', word: '顶级', flavor: '优秀,值得常备。', dot: '🟠' },
  { key: 'B', word: '人上人', flavor: '不错,部分能打。', dot: '🟢' },
  { key: 'C', word: 'NPC', flavor: '平庸路人,可有可无。', dot: '⚪' },
  { key: 'D', word: '拉(完了)', flavor: '拉胯,避雷别碰。', dot: '⚫', avoid: true },
]

// key → 真梗词。用于按段位 key 显示词(如避雷榜表格)。
export const TIER_WORD: Record<string, string> = Object.fromEntries(
  TIERS.map((t) => [t.key, t.word]),
)

// 进避雷红榜的段位 key(目前只有 D)。改 avoid 标记即自动联动。
export const AVOID_KEYS: string[] = TIERS.filter((t) => t.avoid).map((t) => t.key)

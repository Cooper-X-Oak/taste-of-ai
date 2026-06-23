import { createContentLoader } from 'vitepress'

// Skill pages (skills/<name>/index.md) are the single source of truth.
// Add a skill page -> a card shows up. Set `tier` in its frontmatter ->
// the badge lights up. Roster / indexes / episode pages all derive from here.
const EMOJI: Record<string, string> = {
  调研搜索: '🔍',
  内容创作: '✍️',
  前端设计: '🎨',
  调试排错: '🛠️',
  'Skill 元治理': '🧰',
  'Agent 编排': '🤖',
  群组拆包: '📦',
}
const EP_SLUG: Record<number, string> = {
  1: '/seasons/s01/ep01-research',
  2: '/seasons/s01/ep02-content',
  3: '/seasons/s01/ep03-frontend',
  4: '/seasons/s01/ep04-debug',
  5: '/seasons/s01/ep05-meta',
  6: '/seasons/s01/ep06-orchestration',
  7: '/seasons/s01/ep07-bundle',
}

export interface Player {
  name: string
  link: string
  tier: string | null
  status: string
}
export interface Group {
  category: string
  emoji: string
  episode: number
  format: string
  episodeLink: string
  players: Player[]
}

declare const data: Group[]
export { data }

export default createContentLoader('skills/*/index.md', {
  transform(raw): Group[] {
    const byCat = new Map<string, Group>()
    for (const p of raw) {
      const fm = p.frontmatter
      if (!fm.skill && !fm.title) continue
      const category = fm.category || '未分类'
      if (!byCat.has(category)) {
        byCat.set(category, {
          category,
          emoji: EMOJI[category] || '🍽️',
          episode: fm.episode ?? 99,
          format: fm.format || '横评',
          episodeLink: EP_SLUG[fm.episode] || '',
          players: [],
        })
      }
      byCat.get(category)!.players.push({
        name: fm.skill || fm.title,
        link: p.url,
        tier: fm.tier ?? null,
        status: fm.status || 'draft',
      })
    }
    const groups = [...byCat.values()]
    groups.forEach((g) => g.players.sort((a, b) => a.name.localeCompare(b.name)))
    return groups.sort((a, b) => a.episode - b.episode)
  },
})

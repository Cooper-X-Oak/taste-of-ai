import { createContentLoader } from 'vitepress'

// Auto-builds the contestant roster from every episode's frontmatter.
// Add a contestant in an episode -> a card shows up here. Set a tier in
// `verdicts` -> the card's badge lights up. No manual roster upkeep.
const EMOJI: Record<string, string> = {
  调研搜索: '🔍',
  内容创作: '✍️',
  前端设计: '🎨',
  调试排错: '🛠️',
  'Skill 元治理': '🧰',
  'Agent 编排': '🤖',
  群组拆包: '📦',
  季终总榜: '🏆',
}

export interface Player {
  name: string
  tier: string | null
}
export interface Group {
  category: string
  emoji: string
  episode: number
  format: string
  link: string
  players: Player[]
}

declare const data: Group[]
export { data }

export default createContentLoader('seasons/s01/*.md', {
  transform(raw): Group[] {
    return raw
      .filter((p) => Array.isArray(p.frontmatter.contestants) && p.frontmatter.contestants.length)
      .map((p) => {
        const fm = p.frontmatter
        const verdicts = fm.verdicts || {}
        return {
          category: fm.category,
          emoji: EMOJI[fm.category] || '🍽️',
          episode: fm.episode,
          format: fm.format,
          link: p.url,
          players: (fm.contestants as string[]).map((name) => ({
            name,
            tier: verdicts[name]?.tier ?? null,
          })),
        }
      })
      .sort((a, b) => a.episode - b.episode)
  },
})

import { defineConfig } from 'vitepress'

// 《舌尖上的AI》handbook config.
// Navigation grows from this file; each episode page carries structured
// frontmatter (season/category/format/tier) that powers the cross-cut indexes.
export default defineConfig({
  lang: 'zh-CN',
  title: '舌尖上的AI',
  description: 'AI 能力单元的硬核试吃 · 从夯到拉锐评',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '关于',
        items: [
          { text: '节目宝典', link: '/about/bible' },
          { text: '评级体系 · 从夯到拉', link: '/about/rating' },
          { text: '评测方法论', link: '/about/method' },
        ],
      },
      { text: '第一季', link: '/seasons/s01/' },
      { text: '选手表', link: '/roster' },
      {
        text: '总榜',
        items: [
          { text: '从夯到拉总榜', link: '/indexes/by-tier' },
          { text: '避雷红榜', link: '/indexes/avoid' },
          { text: '按 skill 索引', link: '/indexes/by-skill' },
        ],
      },
    ],

    sidebar: {
      '/about/': [
        {
          text: '关于本手册',
          items: [
            { text: '节目宝典', link: '/about/bible' },
            { text: '评级体系 · 从夯到拉', link: '/about/rating' },
            { text: '评测方法论', link: '/about/method' },
          ],
        },
      ],
      '/seasons/s01/': [
        {
          text: 'Season 1 · Skill 专场 · 避雷季',
          items: [
            { text: '本季导航', link: '/seasons/s01/' },
            { text: 'EP01 · 调研搜索擂台', link: '/seasons/s01/ep01-research' },
            { text: 'EP02 · 内容创作擂台', link: '/seasons/s01/ep02-content' },
            { text: 'EP03 · 前端设计擂台', link: '/seasons/s01/ep03-frontend' },
            { text: 'EP04 · 调试排错擂台', link: '/seasons/s01/ep04-debug' },
            { text: 'EP05 · Skill 元治理擂台', link: '/seasons/s01/ep05-meta' },
            { text: 'EP06 · Agent 编排擂台', link: '/seasons/s01/ep06-orchestration' },
            { text: 'EP07 · 群组拆包特赛', link: '/seasons/s01/ep07-bundle' },
            { text: 'EP08 · 季终总决赛', link: '/seasons/s01/ep08-finals' },
          ],
        },
      ],
      '/indexes/': [
        {
          text: '横切导航',
          items: [
            { text: '从夯到拉总榜', link: '/indexes/by-tier' },
            { text: '避雷红榜', link: '/indexes/avoid' },
            { text: '按 skill 索引', link: '/indexes/by-skill' },
          ],
        },
      ],
    },

    search: { provider: 'local' },
    outline: { label: '本页导航', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
  },
})

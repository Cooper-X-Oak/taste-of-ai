// Scaffold a skill's article + notes(资料区) + evidence dir.
// Usage: node scripts/new-skill.mjs <name> <category> <episode> [format] [season]
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function article({ name, category, season, episode, format }) {
  return `---
title: ${name}
skill: ${name}
category: ${category}
season: ${season}
episode: ${episode}
format: ${format}
tier: null
status: draft
oneliner: ""
---

# ${name}

::: warning 状态:📋 待测
正式文章骨架。实测后由主播填入;段位 / 锐评是主播的个人体验,后厨只留证。
:::

> 资料区(边测边记):见 [notes 资料区](./notes)

## 官方描述
抄录官方 SKILL.md 原文,作 L3 先验对照。

## 小白上手
模糊、不会写的提示词下,好不好用。
- 提示词:
- 表现(证据 \`/evidence/${name}/\`):

## 专家上手
清晰、有思路的提示词,看上限。
- 提示词:
- 表现:

## 最佳用法
这个 skill 最值得这么试吃的场景 —— 它真正发光的地方。

## 总评
- 一句斩:
- 段位:
- 谁该装 / 谁别碰:

## 一句话外带
（小红书钩子,陈述句)
`
}

function notes({ name }) {
  return `---
title: ${name} · 资料区
---

# ${name} · 资料区 🗒️

> 边测边记的草稿台:试过的 prompt、原始产出、截图链接、灵感、翻车现场。
> 这里随便写,成稿见 [← 文章](./)。

## 试过的 prompt

## 原始产出 / 观察

## 截图与链接
（图存 \`/evidence/${name}/\`)

## 灵感 / 待办
`
}

export function scaffoldSkill(opts) {
  const { name, category, episode, format = '横评', season = 1 } = opts
  const dir = join(ROOT, 'docs', 'skills', name)
  const evid = join(ROOT, 'docs', 'public', 'evidence', name)
  let created = 0
  mkdirSync(dir, { recursive: true })
  mkdirSync(evid, { recursive: true })
  const files = [
    [join(dir, 'index.md'), article({ name, category, season, episode, format })],
    [join(dir, 'notes.md'), notes({ name })],
    [join(evid, '.gitkeep'), ''],
  ]
  for (const [p, content] of files) {
    if (existsSync(p)) continue
    writeFileSync(p, content, 'utf8')
    created++
  }
  return { name, created }
}

// CLI mode
const isCli = process.argv[1] && process.argv[1].endsWith('new-skill.mjs')
if (isCli && process.argv.length > 2) {
  const [name, category, episode, format, season] = process.argv.slice(2)
  if (!name || !category || !episode) {
    console.error('Usage: node scripts/new-skill.mjs <name> <category> <episode> [format] [season]')
    process.exit(1)
  }
  const r = scaffoldSkill({ name, category, episode: Number(episode), format, season: season ? Number(season) : 1 })
  console.log(`✓ ${r.name}: ${r.created} file(s) created`)
}

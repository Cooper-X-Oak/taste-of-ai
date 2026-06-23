---
title: 按 skill 索引
---

<script setup>
import { withBase } from 'vitepress'
import { data } from '../.vitepress/theme/contestants.data'
const TIER = { S: '🔥S', A: '😋A', B: '😐B', C: '🥱C', D: '🤮D' }
const all = data
  .flatMap(g => g.players.map(p => ({ ...p, category: g.category })))
  .sort((a, b) => a.name.localeCompare(b.name))
const tl = (t) => (t ? TIER[t] || t : '❓')
</script>

# 按 skill 索引(A–Z)

共 {{ all.length }} 个 skill,点名字进各自文章。段位实测后点亮。

<ul class="skill-index">
  <li v-for="s in all" :key="s.name">
    <a :href="withBase(s.link)">{{ s.name }}</a>
    <span class="skill-index__tier" :data-tier="s.tier ?? '?'">{{ tl(s.tier) }}</span>
    <span class="skill-index__cat">{{ s.category }}</span>
  </li>
</ul>

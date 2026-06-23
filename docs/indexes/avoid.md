---
title: 避雷红榜
---

<script setup>
import { withBase } from 'vitepress'
import { data } from '../.vitepress/theme/contestants.data'
import { AVOID_KEYS, TIER_WORD } from '../.vitepress/theme/tiers'

const all = data.flatMap(g => g.players.map(p => ({ ...p, category: g.category })))
// 收哪些段位由 tiers.ts 的 avoid 标记决定(目前只有 D 拉)。
const avoid = all
  .filter(p => AVOID_KEYS.includes(p.tier))
  .sort((a, b) => a.name.localeCompare(b.name))
</script>

# 避雷红榜

> 实测定级「拉」(D)的全在这 —— 踩一个少一个。本页按各 skill 的 `tier` **自动收录**。
> 具体雷点、菜单 vs 实物的反差、有没有平替,见每个 skill 各自文章里的「总评」段。

<table v-if="avoid.length" class="avoid-table">
  <thead>
    <tr><th>skill</th><th>段位</th><th>分类</th><th>详情</th></tr>
  </thead>
  <tbody>
    <tr v-for="s in avoid" :key="s.name">
      <td><code>{{ s.name }}</code></td>
      <td :data-tier="s.tier">{{ TIER_WORD[s.tier] }}</td>
      <td>{{ s.category }}</td>
      <td><a :href="withBase(s.link)">看试吃 ›</a></td>
    </tr>
  </tbody>
</table>
<p v-else class="tier-empty"><em>暂无入榜 —— 还没有 skill 被主播定级为 D(拉)。实测后自动出现。</em></p>

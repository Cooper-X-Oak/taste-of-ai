---
title: 从夯到拉总榜
---

<script setup>
import { withBase } from 'vitepress'
import { data } from '../.vitepress/theme/contestants.data'
import { TIERS } from '../.vitepress/theme/tiers'

const all = data.flatMap(g => g.players.map(p => ({ ...p, category: g.category })))
const byTier = (t) => all.filter(p => p.tier === t).sort((a, b) => a.name.localeCompare(b.name))
const untested = all.filter(p => !p.tier).length
</script>

# 从夯到拉总榜

> 全手册 skill 实测后的段位总排名。段位写进各 skill frontmatter 的 `tier` 字段,本页**自动归位** —— 不用手抄。

<div v-for="t in TIERS" :key="t.key" class="tier-block">
  <h2>{{ t.dot }} {{ t.word }}</h2>
  <p class="tier-flavor">
    <em>{{ t.flavor }}</em>
    <template v-if="t.avoid"> → 也收录在 <a :href="withBase('/indexes/avoid')">避雷红榜</a>。</template>
  </p>
  <ul v-if="byTier(t.key).length" class="skill-index">
    <li v-for="s in byTier(t.key)" :key="s.name">
      <a :href="withBase(s.link)">{{ s.name }}</a>
      <span class="skill-index__tier" :data-tier="t.key">{{ t.key }}</span>
      <span class="skill-index__cat">{{ s.category }}</span>
    </li>
  </ul>
  <p v-else class="tier-empty">— 暂无 —</p>
</div>

<p class="tier-empty">还有 {{ untested }} 个 skill 待试吃定级。</p>

<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Group } from './contestants.data'

defineProps<{ groups: Group[] }>()

const TIER: Record<string, string> = {
  S: '🔥S', A: '😋A', B: '😐B', C: '🥱C', D: '🤮D',
}
const pad = (n: number) => String(n).padStart(2, '0')
const tierLabel = (t: string | null) => (t ? TIER[t] ?? t : '❓')
</script>

<template>
  <div v-for="g in groups" :key="g.category" class="roster-group">
    <h2 class="roster-group__title">
      <span class="roster-group__emoji">{{ g.emoji }}</span>
      {{ g.category }}
      <a class="roster-group__ep" :href="withBase(g.link)">EP{{ pad(g.episode) }} · {{ g.format }} ›</a>
    </h2>

    <div class="roster-grid">
      <a
        v-for="p in g.players"
        :key="p.name"
        class="player-card"
        :href="withBase(g.link)"
      >
        <span class="player-card__shine"></span>
        <div class="player-card__cover">
          <span class="player-card__emoji">{{ g.emoji }}</span>
          <span class="player-card__stamp">待试吃</span>
        </div>
        <div class="player-card__meta">
          <span class="player-card__name">{{ p.name }}</span>
          <span class="player-card__tier" :data-tier="p.tier ?? '?'">{{ tierLabel(p.tier) }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

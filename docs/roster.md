---
title: 选手表
aside: false
---

<script setup>
import { data as groups } from './.vitepress/theme/contestants.data'
</script>

# 选手表

> 第一季全体出场选手。每个 skill 一张封面框 —— 实测后,卡片右下角的段位徽章会从 ❓ 点亮成 S / A / B / C / D(夯 / 顶级 / 人上人 / NPC / 拉)。点卡片进对应横评。

<Roster :groups="groups" />

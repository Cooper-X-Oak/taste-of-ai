# 舌尖上的AI 🍜🤖

> 一档「硬核试吃 + 从夯到拉锐评」的 AI 能力测评手册。
> 只认入口实测,不认菜单吹嘘。

📖 **在线手册:https://cooper-x-oak.github.io/taste-of-ai/**

把 Claude Code 生态里的 skill、群组、工作流、harness 当食材逐个真跑,
留 L1 实测证据,排出 **从夯到拉** 梯队,沉淀成一本可分享的导航手册。
社交平台(公众号 / 小红书)只是把其中篇章一篇篇 drip 出去。

## 手册结构

```
docs/
├── index.md              门户首页
├── about/                节目宝典 / 评级体系 / 评测方法论
├── skills/<name>/        每个 skill:index.md(文章)+ notes.md(资料区)
├── seasons/s01/          第一季 8 期横评「综述」(对比 + 排名)
├── roster.md             选手表(卡片 → 各 skill 文章)
├── indexes/              从夯到拉总榜 / 避雷红榜 / 按 skill 索引
└── public/evidence/<name>/  L1 实测证据(截图)
scripts/                  new-skill 脚手架 + S1 批量生成
```

skill 页是唯一事实源:它的 frontmatter 自动喂给选手表、索引、横评综述。

```bash
npm run new-skill -- <名字> <品类> <第几期>   # 新增一个 skill 页(文章+资料区+证据目录)
```

## 本地预览

```bash
npm install
npm run docs:dev      # 本地开发
npm run docs:build    # 构建静态站
```

## 第一季排期

Skill 专场 · 避雷季,8 期紧凑赛制。品类与排期以 [本季导航](docs/seasons/s01/index.md) 为准
(分类正迁移到「官方 skill + 官方插件市场」基准)。

## 评级:从夯到拉

网络通用 tier 黑话:**夯 · 顶级 · 人上人 · NPC · 拉** —— 每个段位都挂实测证据。
详见 [评级体系](docs/about/rating.md)(定义源:`docs/.vitepress/theme/tiers.ts`)。

---

面向 AI agent 的协作规范见 [AGENTS.md](AGENTS.md)。

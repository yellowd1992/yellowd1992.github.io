# AGENTS.md - AI Coding Agent Guide

## Project Overview

**我们的家 | Our Family** 是一个使用 Vue 3 + Vite 构建的家庭成员展示网站。网站展示了一个四口之家的信息：两只猫咪（窝窝、伊伊）和两位铲屎官（YellowD、简单）。

项目采用组件化架构，将页面拆分为独立的 Vue 组件，每个组件职责单一。数据与视图分离，成员数据统一存放在 `data/members.js` 中。

## Technology Stack

- **Frontend Framework**: Vue 3 (Composition API with `<script setup>` syntax)
- **Build Tool**: Vite 5.x
- **Styling**: CSS Variables + Scoped CSS in Vue SFC
- **Module System**: ES6 Modules (type: "module" in package.json)
- **Fonts**: Inter + Noto Sans SC (loaded from Google Fonts)

## Project Structure

```
family/
├── index.html              # 入口 HTML 文件 (Vite 应用入口)
├── index-static.html       # 静态 HTML 版本 (纯 HTML/CSS/JS，无构建)
├── package.json            # 项目依赖配置
├── vite.config.js          # Vite 配置
├── README.md               # 项目说明文档
├── images/                 # 图片资源
│   ├── beer/               # 精酿啤酒图片 (YellowD 的画廊)
│   ├── cats/               # 猫咪图片 (窝窝、伊伊)
│   └── flowers/            # 花卉图片 (简单的画廊)
└── src/
    ├── main.js             # 应用入口，创建 Vue 应用实例
    ├── App.vue             # 根组件，管理全局状态
    ├── components/         # Vue 组件
    │   ├── Navigation.vue      # 导航栏组件
    │   ├── HomeSection.vue     # 首页展示组件
    │   ├── FamilyCard.vue      # 家庭成员卡片
    │   ├── ProfileSection.vue  # 个人资料页
    │   ├── TraitBar.vue        # 特性进度条
    │   ├── DetailItem.vue      # 详情项组件
    │   ├── Gallery.vue         # 图片画廊
    │   ├── Lightbox.vue        # 图片灯箱 (使用 Teleport)
    │   └── Footer.vue          # 页脚
    ├── data/
    │   └── members.js      # 成员数据 + 导航配置
    └── styles/
        └── global.css      # 全局样式、CSS 变量、动画
```

## Build and Development Commands

```bash
# 安装依赖
npm install

# 启动开发服务器 (端口 3000，自动打开浏览器)
npm run dev

# 构建生产版本 (输出到 dist/ 目录)
npm run build

# 预览生产构建
npm run preview
```

## Code Organization

### Component Architecture

- **App.vue**: 作为状态管理中心，维护 `currentSection` 和 `lightbox` 状态
- **导航通信**: 使用 `$emit('navigate', sectionId)` 进行组件间导航
- **数据流**: 单向数据流，props 向下传递，events 向上传递
- **Teleport**: Lightbox 组件使用 `<Teleport to="body">` 渲染到 body 层级

### Data Structure

成员数据定义在 `src/data/members.js`，包含以下结构：

```javascript
{
    id: 'unique-id',
    name: '显示名称',
    emoji: '🍊',
    role: '角色描述',
    avatar: '/images/path.jpg',  // null 则使用 emoji 头像
    theme: 'wo',  // 主题: wo | yi | blue | pink
    coverGradient: 'linear-gradient(...)',
    cardTitle: '卡片标题',
    tags: [{ text: '标签', class: 'theme-class' }],
    stats: [{ value: '值', label: '标签' }],
    bio: 'HTML 格式的个人简介',
    details: [{ icon: '🔧', title: '标题', content: '内容' }],
    traits: [{ name: '特性', value: 85, color: 'optional' }],
    gallery: {  // 可选
        title: '画廊标题',
        subtitle: '副标题',
        images: [{ src: '/images/...', alt: '描述' }]
    }
}
```

### Styling Conventions

- **CSS Variables**: 定义在 `global.css`，用于颜色、阴影等主题值
  - 主要变量: `--primary`, `--secondary`, `--accent-blue`, `--accent-pink`
  - 背景: `--bg-warm`, `--bg-cream`
  - 文本: `--text-dark`, `--text-light`
  - 阴影: `--shadow`, `--shadow-hover`

- **主题系统**: 四种主题色
  - `wo`: 橙色系 (#ff8c42) - 窝窝
  - `yi`: 紫色系 (#6b5b95) - 伊伊
  - `blue`: 蓝色系 (#3498db) - YellowD
  - `pink`: 粉色系 (#e91e63) - 简单

- **Scoped CSS**: 所有组件使用 `<style scoped>`
- **响应式断点**: 移动端适配使用 `@media (max-width: 768px)`

## Key Implementation Details

### Image Handling

图片加载失败时会使用占位图服务：
```javascript
// 猫咪图片失败时使用特定颜色
'https://placehold.co/150x150/{color}/ffffff?text={name}'

// 画廊图片失败时使用随机颜色
colors = ['e91e63', 'f39c12', '9b59b6', 'e74c3c', '27ae60', '3498db']
```

### Navigation

- 使用 `window.scrollTo({ top: 0, behavior: 'smooth' })` 实现平滑滚动
- 当前 section 通过 `currentSection` 状态控制显示

### Lightbox

- 使用 Vue 3 Teleport 渲染到 body
- 支持 ESC 键关闭
- 打开时禁止 body 滚动 (`document.body.style.overflow = 'hidden'`)

## Static HTML Version

`index-static.html` 是项目的静态 HTML 版本，包含：
- 所有内联 CSS (约 380 行)
- 所有内联 JavaScript
- 无构建步骤，可直接在浏览器打开

用途：作为备份/降级方案，或用于无 Node.js 环境部署。

## Development Guidelines

### Adding a New Family Member

1. 在 `src/data/members.js` 中添加成员对象到 `members` 导出对象
2. 在 `navItems` 数组中添加导航项
3. 如有图片，放入对应 `images/` 子目录
4. 如需新主题，在组件 CSS 中添加对应样式类

### Component Patterns

```vue
<template>
  <!-- 组件模板 -->
</template>

<script setup>
import { ref, computed } from 'vue';
// 组件逻辑使用 Composition API
</script>

<style scoped>
/* 组件局部样式 */
</style>
```

### Naming Conventions

- 组件文件名: PascalCase (如 `FamilyCard.vue`)
- 组件引用: PascalCase (如 `<FamilyCard />`)
- 数据属性: camelCase
- CSS 类名: kebab-case
- 注释和 UI 文本: 中文

## Deployment Considerations

- 构建输出为静态文件，可部署到任何静态托管服务
- 图片路径使用绝对路径 `/images/...`，确保部署时路径正确
- 生产构建会自动处理资源引用和优化

## Security Notes

- 使用 `v-html` 渲染成员 bio 字段，确保成员数据可信
- 图片使用 `onerror` 回退机制防止 broken image
- 无用户输入处理，无 XSS 风险（纯展示站点）

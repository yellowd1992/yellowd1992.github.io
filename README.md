# 我们的家 | Our Family

使用 Vue 3 + Vite 重构的家庭展示网站。

## 项目结构

```
family/
├── index.html              # 入口 HTML 文件
├── package.json            # 项目依赖配置
├── vite.config.js          # Vite 配置
├── README.md               # 项目说明
├── images/                 # 图片资源
│   ├── beer/               # 精酿啤酒图片
│   │   ├── 啤酒1.jpg
│   │   ├── 啤酒2.jpg
│   │   ├── 啤酒3.jpg
│   │   └── 啤酒4.jpg
│   ├── cats/               # 猫咪图片
│   │   ├── 窝窝.jpg
│   │   └── 伊伊.jpg
│   └── flowers/            # 花卉图片
│       ├── 花1.jpg
│       ├── 花2.jpg
│       ├── 花3.jpg
│       ├── 花4.jpg
│       └── 花5.jpg
└── src/
    ├── main.js             # 应用入口
    ├── App.vue             # 根组件
    ├── components/         # Vue 组件
    │   ├── Navigation.vue      # 导航栏
    │   ├── HomeSection.vue     # 首页
    │   ├── FamilyCard.vue      # 家庭成员卡片
    │   ├── ProfileSection.vue  # 个人资料页
    │   ├── TraitBar.vue        # 特性进度条
    │   ├── DetailItem.vue      # 详情项
    │   ├── Gallery.vue         # 图片画廊
    │   ├── Lightbox.vue        # 图片灯箱
    │   └── Footer.vue          # 页脚
    ├── data/
    │   └── members.js      # 成员数据
    └── styles/
        └── global.css      # 全局样式
```

## 安装依赖

```bash
npm install
```

## 开发运行

```bash
npm run dev
```

## 构建生产版本

```bash
npm run build
```

## 预览生产版本

```bash
npm run preview
```

## 重构亮点

1. **组件化架构**：将页面拆分为独立的 Vue 组件，每个组件职责单一
2. **数据与视图分离**：成员数据统一存放在 `data/members.js` 中
3. **现代框架**：使用 Vue 3 Composition API，代码更清晰
4. **响应式设计**：保留原版的响应式布局
5. **资源分类管理**：图片按类型分文件夹存放

## 技术栈

- Vue 3
- Vite
- CSS Variables
- ES6 Modules

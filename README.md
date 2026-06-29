# HONOR AI Tools

AI 工具产品导航网站 — 静态展示所有 AI 工具产品，支持在线体验与 ZIP 下载。

## 技术栈

- React 19 + TypeScript
- Vite 8
- 数据驱动：`public/products.json`
- 无后端、无数据库

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 部署

### Cloudflare Pages

1. 连接 Git 仓库
2. Build command: `npm run build`
3. Output directory: `dist`
4. 无需设置 `VITE_BASE_PATH`（默认为 `/`）

### GitHub Pages

1. 在仓库 Settings → Pages 中启用 GitHub Actions 或手动部署
2. 构建时设置 base path：

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

3. 将 `dist` 目录内容推送到 `gh-pages` 分支，或使用 GitHub Actions workflow

## 添加产品

编辑 `public/products.json`，添加新产品条目：

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "desc": "Short description",
  "version": "1.0.0",
  "updated": "2026-06-29",
  "tags": ["AI", "Tag"],
  "demoUrl": "https://oss.xxx.com/demo/index.html",
  "downloadUrl": "https://oss.xxx.com/demo.zip",
  "cover": "/covers/your-cover.svg"
}
```

## 站点配置

编辑 `src/config/site.ts` 修改 Logo 名称、标题、GitHub 链接等。

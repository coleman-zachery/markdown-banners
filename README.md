# Markdown Banner

Markdown Banner is a small React + Vite app that turns `A-Z` text into boxed ASCII banners for README files.

Live app: [Markdown Banner](https://coleman-zachery.github.io/markdown-banner/)

## Requirements

- Node `20.19.4`
- npm `11.7.0`

## Layout

- `web/`: application source, Vite config, and package files
- `web/dist/`: production build output
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow
- `Makefile`: convenience commands for local work

## Local development

```bash
make install-web
make dev
make build
make preview
```

If you prefer working directly in `web/`:

```bash
cd web
npm install
npm run dev
```

## GitHub Pages

This repository deploys to GitHub Pages through GitHub Actions.

- Repository name: `markdown-banner`
- Branch: `main`
- Vite base path: `/markdown-banner/`

GitHub configuration:

1. Open `Settings -> Pages`
2. Set `Source` to `GitHub Actions`

Deployment behavior:

- the workflow runs on pushes to `main`
- dependencies are installed in `web/` with `npm ci`
- the app is built with `npm run build`
- `web/dist` is deployed to GitHub Pages

If the repository name changes, update `base` in [web/vite.config.ts](/home/dev_user/generate_markdown/web/vite.config.ts).

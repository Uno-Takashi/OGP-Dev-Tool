# OGP Dev Tool

[![build](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/build.yml)
[![Code Quality](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/code-quality.yml)
[![Supply Chain](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/supply-chain.yml/badge.svg)](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/supply-chain.yml)
[![Storybook](https://img.shields.io/badge/Storybook-Docs-FF4785?logo=storybook&logoColor=white)](https://uno-takashi.github.io/OGP-Dev-Tool/)

OGP Dev Tool is a Chrome DevTools extension for developers to instantly preview how Open Graph Protocol (OGP) metadata renders on social networks and UI component libraries — including **localhost** without any uploads.

## Features

- Live OGP metadata table with per-field validation and copy-to-clipboard
- **Click-to-open** link icon on URL values
- Visual card previews: **X (Twitter)**, **Facebook**, **shadcn/ui**, **Ant Design**, **Material UI**
- Dark mode toggle, persisted per-browser
- **15-language UI**: English, 日本語, 中文, Deutsch, Français, Español, Português, 한국어, Русский, العربية, Italiano, Nederlands, Türkçe, Tiếng Việt, Bahasa Indonesia
- Works on localhost — no upload required

## Storybook

Component documentation is published via GitHub Pages:

👉 **https://uno-takashi.github.io/OGP-Dev-Tool/**

To run Storybook locally:

```bash
npm run storybook
```

## Development

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- npm

### Install

```bash
npm install --legacy-peer-deps
```

### Commands

| Command | Description |
|---|---|
| `npm run watch` | Dev build with watch mode |
| `npm run build` | Production build |
| `npm run storybook` | Launch Storybook dev server |
| `npm run build-storybook` | Build Storybook static output |
| `npm run type-check` | TypeScript type check |
| `npm run lint` | ESLint |
| `npm run test` | Jest tests |
| `npm run format` | Prettier format |

### Docker

```bash
docker compose up
```

Starts webpack watch mode inside a Node 22 container.

### Load extension in Chrome

1. Run `npm run build`
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked** → select the `dist/` directory

<details>
<summary>How to test the extension in Chrome</summary>

#### 1. Build and load

```bash
npm run build
# or with Docker
docker compose run --rm typescript npm run build
```

1. Open `chrome://extensions` in Chrome
2. Toggle **Developer mode** on (top right)
3. Click **Load unpacked** → select the `dist/` folder

#### 2. Open the DevTools panel (main feature)

1. Navigate to any page with OGP tags (or `localhost`)
2. Open DevTools with `F12`
3. Click `»` at the end of the tab bar → select **OGP**

OGP metadata and social previews will appear in the panel.

#### 3. Hot reload during development

```bash
npm run watch   # auto-rebuilds on file change
```

After `dist/` updates, reload the extension in Chrome:
- Go to `chrome://extensions` → click the **↺ refresh** icon on the extension card
- Then reload the DevTools panel with `Ctrl+R`

#### 4. Debugging each part

| Target | How |
|---|---|
| DevTools panel | Right-click inside panel → Inspect |
| Content script | Page DevTools → Sources tab |
| Background service worker | `chrome://extensions` → "Service Worker" link |
| Popup | Right-click toolbar icon → Inspect popup |

</details>

### Project Structure

```
src/
├── domain/           # Business logic entities and repository interfaces
├── application/      # Use cases
├── infrastructure/   # Chrome API adapter, DOM parser
├── presentation/     # React components, pages, store, hooks
│   ├── components/   # OGPTable, DarkModeToggle, LanguageSwitcher, previews
│   ├── pages/        # DevToolsPanel, Popup, Options
│   └── store/        # Redux Toolkit slices
├── i18n/             # react-i18next config + 15 locale JSON files
├── chrome/           # Extension entry files (background, content_script)
└── shared/           # Utility hooks (useCopyToClipboard)
```

See [AGENT.md](./AGENT.md) for full architecture documentation.

## CI/CD

| Workflow | Trigger |
|---|---|
| Build + Test | Push / PR to `main` |
| Code Quality | Every push |
| Supply Chain (npm audit, OSSF Scorecard) | Push to `main` + weekly |
| Release (version bump + Chrome Web Store) | Manual dispatch |
| Deploy Storybook to GitHub Pages | Push to `main` |

## License

MIT

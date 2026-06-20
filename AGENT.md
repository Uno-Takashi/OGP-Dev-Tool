# OGP Dev Tool — Agent Guide

This document is for AI coding assistants (Claude, GitHub Copilot, etc.) working on this codebase.

## Project Overview

OGP Dev Tool is a Chrome extension providing live preview of how a web page's Open Graph Protocol (OGP) metadata renders on social networks and UI component libraries (X/Twitter, Facebook, shadcn/ui, Ant Design, Material UI).

## Architecture: Clean Architecture

Dependencies point **inward only**: `presentation → application → domain ← infrastructure`

```
src/
├── domain/               # Pure business logic — no framework deps
│   ├── entities/         # OGPTag, OGPMessage interfaces
│   └── repositories/     # IOGPRepository interface
├── application/          # Use cases orchestrating domain + infra
│   └── usecases/         # FetchOGPDataUseCase
├── infrastructure/       # Adapters to external systems
│   ├── chrome/           # ChromeOGPRepository (chrome.tabs.sendMessage)
│   └── parsers/          # OGPMetadataParser (DOM → OGPTag[])
├── presentation/         # React UI
│   ├── components/       # Reusable components
│   │   ├── common/       # DarkModeToggle, LanguageSwitcher
│   │   ├── OGPTable.tsx  # Metadata table with validation + copy + link
│   │   └── previews/     # TwitterPreview, FacebookPreview, ShadcnPreview,
│   │                     # AntDesignPreview, MUIPreview
│   ├── contexts/         # ThemeContext (MUI theme driven by Redux)
│   ├── hooks/            # useOGPData, useAppDispatch, useAppSelector
│   ├── pages/            # DevToolsPanel, Popup, Options (rspack entries)
│   └── store/            # Redux Toolkit: ogpSlice + uiSlice
├── i18n/                 # react-i18next config + locale JSON
│   └── locales/          # 15 languages: en, ja, zh, de, fr, es, pt,
│                         #               ko, ru, ar, it, nl, tr, vi, id
├── chrome/               # Chrome extension entry files
│   ├── background.ts     # MV3 service worker
│   ├── content_script.tsx# DOM message listener
│   └── devtools_page.tsx # DevTools panel registration
└── shared/               # Framework-agnostic utilities
    ├── hooks/            # useCopyToClipboard
    └── utils/            # ogpValidation
```

## Key Technologies

| Purpose          | Library                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| UI Framework     | React 19                                                               |
| Language         | TypeScript 5                                                           |
| UI Components    | Material UI v9 (`@mui/material`)                                       |
| Design Preview   | Ant Design v5 (`antd`)                                                 |
| State Management | Redux Toolkit v2 + react-redux v9                                      |
| i18n             | i18next v26 + react-i18next v17                                        |
| Build            | Rspack + builtin:swc-loader                                            |
| Package Manager  | pnpm                                                                   |
| CSS              | SCSS + Tailwind CSS v4                                                 |
| Testing          | Jest v30 + jest-environment-jsdom + ts-jest                            |
| Linting          | ESLint v9 (flat config `eslint.config.js`) + unicorn, security plugins |
| Formatting       | Prettier 3 (`.prettierrc.json`)                                        |

## Import Paths

Path depth from file to `src/` root:

- `src/presentation/components/*.tsx` → use `../../` to reach `src/`
- `src/presentation/components/common/*.tsx` → use `../../../` to reach `src/`
- `src/presentation/components/previews/*.tsx` → use `../../../` to reach `src/`
- `src/presentation/pages/*.tsx` → use `../../` to reach `src/`
- `src/presentation/hooks/*.ts` → use `../../` to reach `src/`
- `src/presentation/store/*.ts` → use `../../` to reach `src/`
- `src/presentation/contexts/*.tsx` → use `../../` to reach `src/`
- `src/chrome/*.tsx` → use `../` to reach `src/`

## Build & Development

**After making any code changes, always verify the build via Docker:**

```bash
docker compose run --rm typescript pnpm run build
```

This is the canonical build verification step. Direct `pnpm run build` can also be used locally, but the Docker build is the definitive check to ensure the container environment is consistent.

Other useful commands (run via Docker or locally):

```bash
docker compose run --rm typescript pnpm run type-check  # TypeScript check
docker compose run --rm typescript pnpm run lint        # ESLint
docker compose run --rm typescript pnpm run test        # Jest tests
docker compose up                                       # rspack watch mode
```

Or run directly without Docker:

```bash
pnpm run watch       # Dev build with watch (rspack)
pnpm run build       # Production build (rspack)
pnpm run test        # Jest tests
pnpm run lint        # ESLint
pnpm run type-check  # tsc --noEmit
pnpm run format      # Prettier
```

Build output: `dist/`. Load in Chrome: chrome://extensions → Developer mode → Load unpacked → `dist/`

## Chrome Extension Architecture (Manifest V3)

- **DevTools Panel** — Main UI inspecting the active tab's OGP
- **Content Script** — Injected in every page; parses `<meta>` tags on message
- **Popup** — Shows current tab URL (i18n'd)
- **Options Page** — Language + theme prefs saved to `localStorage`

**Message flow:**

```
DevTools Panel → chrome.tabs.sendMessage(tabId) → Content Script → parse DOM → sendResponse(OGPTag[])
```

## Redux Store

```typescript
{
  ogp: { tags: OGPTag[]; isLoading: boolean; error: string | null; hasLoaded: boolean };
  ui:  { isDarkMode: boolean; language: SupportedLanguage };
}
```

`uiSlice` initializes both fields directly from `localStorage` at module load time — no `useEffect` needed to sync on mount.

## Internationalization

Languages (15): **en**, **ja**, **zh**, **de**, **fr**, **es**, **pt**, **ko**, **ru**, **ar**, **it**, **nl**, **tr**, **vi**, **id**

Files: `src/i18n/locales/{lang}/translation.json`

When adding UI strings, add the key to **all 15** locale files.

```typescript
const { t } = useTranslation();
t('panel.reload'); // → "Reload OGP data"
```

## Adding a New OGP Preview

1. Create `src/presentation/components/previews/YourPreview.tsx`
2. Accept props: `{ imageUrl, title, description, origin, siteName }`
3. Import and render in `src/presentation/pages/DevToolsPanel.tsx`
4. Add `preview.your.title` to all 15 translation files

## Adding a New OGP Tag

1. Add an entry to `TAG_DEFINITIONS` in `src/infrastructure/parsers/OGPMetadataParser.ts`
2. No other changes needed — the table and previews are data-driven

## GitHub Flow

- Default branch: **`main`**
- Feature branches: `feature/<description>`, `fix/<description>`
- Open a PR → CI must pass → merge to `main`

## CI/CD Workflows

| Workflow           | Trigger                    | Purpose                                                                      |
| ------------------ | -------------------------- | ---------------------------------------------------------------------------- |
| `build.yml`        | Push/PR to `main`          | Type check, lint, test, build                                                |
| `code-quality.yml` | Every push                 | Security scan, spell/link check, actionlint                                  |
| `supply-chain.yml` | Push/PR to `main` + weekly | pnpm audit, Dependency Review, OSSF Scorecard                                |
| `release.yml`      | Manual dispatch            | Version bump (patch/minor/major) → build → GitHub Release → Chrome Web Store |

### Release Process

Trigger `release.yml` via GitHub Actions → Workflow Dispatch:

1. Select bump type: `patch` / `minor` / `major`
2. Optionally add release notes
3. Workflow automatically: bumps `package.json` + `manifest.json`, commits back to `main`, builds, creates GitHub Release with zip, uploads to Chrome Web Store

### Chrome Web Store Publishing Secrets

Set in repository secrets:

- `EXTENSION_ID` — Chrome Web Store extension ID
- `CLIENT_ID` — Google OAuth 2.0 client ID
- `CLIENT_SECRET` — Google OAuth 2.0 client secret
- `REFRESH_TOKEN` — OAuth refresh token

See: https://developer.chrome.com/docs/webstore/using_webstore_api

## Code Conventions

- Functional React components only — no class components
- Named exports for components (default export only for page entry files)
- No `React.FC` — use explicit `(props: Props) => JSX.Element`
- No `import React from 'react'` — JSX transform handles it; use named imports only
- MUI `sx` prop for dynamic styles; SCSS for static/complex styles
- Hooks for side effects and shared logic — never plain utility functions for stateful logic
- `useCallback` for event handlers passed as props; `useMemo` for expensive derived values
- No comments unless WHY is non-obvious
- No `any` types (ESLint warns on use)
- `Number.parseInt` / `Number.isNaN` over global `parseInt` / `isNaN` (unicorn rule)
- `document.querySelector` over `getElementById` / `getElementsByTagName` (unicorn rule)

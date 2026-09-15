# vnstock-mobile

A native mobile app for Vietnamese stock-market data, built with
[**ReactLynx**](https://lynxjs.org/react/introduction.html) — Lynx's official React
framework, which renders native UI from React/JSX via a dual-threaded engine.

**Stack:** ReactLynx · [Rspeedy](https://lynxjs.org/rspeedy/) (Rspack build tool) ·
[`@lynx-js/lynx-ui`](https://lynxjs.org/next/ui/) component library ·
React Router v6 · TypeScript · ESLint + Prettier · Rstest.

## Prerequisites

- **Node.js** `^20.19.0 || >=22.12.0`
- **pnpm** (`corepack enable pnpm`)
- **Lynx Explorer** app to preview on device (iOS Simulator / Android / HarmonyOS) —
  see [Run on the iOS Simulator](#run-on-the-ios-simulator) below or the
  [Quick Start](https://lynxjs.org/guide/start/quick-start.html). The iOS Simulator path
  additionally needs a full **Xcode** install.

## Getting started

```bash
pnpm install
pnpm dev
```

Scan the QR code printed in the terminal with **Lynx Explorer** (or paste the bundle
URL into its "Enter Bundle URL" field). Edit a page under `src/pages/` and the app
hot-reloads.

## Run on the iOS Simulator

LynxExplorer is the sandbox app that loads your dev bundle. It is **not** on the App
Store — you install a prebuilt build into the simulator.

### One-time setup

1. Install **Xcode** (Mac App Store), then point the tools at it and add the iOS
   Simulator runtime:
   ```bash
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   xcodebuild -downloadPlatform iOS   # ~8–9 GB, needs ~16 GB free disk
   ```
2. Boot a simulator and open the Simulator app:
   ```bash
   xcrun simctl boot "iPhone 17"
   open -a Simulator
   ```
3. Install **LynxExplorer** (iOS-Simulator build, Apple Silicon) from the
   [Lynx releases](https://github.com/lynx-family/lynx/releases). Note: the iOS
   `.tar.gz` extracts the `.app` **contents flat**, so repackage them into a `.app`:
   ```bash
   curl -L -o LynxExplorer.tar.gz \
     https://github.com/lynx-family/lynx/releases/download/4.1.0/LynxExplorer-arm64.app.tar.gz
   mkdir -p LynxExplorer.app && tar -xzf LynxExplorer.tar.gz -C LynxExplorer.app
   xcrun simctl install booted ./LynxExplorer.app
   xcrun simctl launch booted com.lynx.LynxExplorer   # bundle id: com.lynx.LynxExplorer
   ```

### Each run

```bash
pnpm dev
```

In LynxExplorer, enter the **LAN-IP** bundle URL the dev server prints
(e.g. `http://192.168.1.88:3000/main.lynx.bundle`) and tap **Go**. Once loaded, it is
saved under **"Recently Opened"** for one-tap reloads.

### Troubleshooting — blank/white screen after tapping "Go"

> **The one that will bite you.** LynxExplorer's URL field **auto-capitalizes** the
> first letter, turning `http://` into `Http://`. Its scheme check is
> **case-sensitive**, so it silently refuses to load — you get a blank white screen
> with **no error** and no network request.

Fixes, in order of ease:

- **Paste** the URL instead of typing it (iOS does not capitalize pasted text). Set the
  simulator's clipboard from your Mac, then long-press the empty field → **Paste**:
  ```bash
  printf 'http://192.168.1.88:3000/main.lynx.bundle' | xcrun simctl pbcopy booted
  ```
- Or tap the entry under **"Recently Opened"** (already lowercase).
- Otherwise, just double-check the scheme is lowercase **`http://`**.

Other notes:

- Use the **LAN IP** the dev server prints, not `localhost`.
- After adding a **new** CSS import, a hot-reload may update the JS but not inject the
  CSS (plain unstyled text). Do a **full reload** — tap the ‹ back arrow, then **Go** —
  to apply styles.
- To debug a bad render, connect the **`lynx-devtool`** MCP server (see below) or the
  Lynx DevTool desktop app for the console/elements of the running card.

## Scripts

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `pnpm dev`           | Start the dev server (QR code + hot reload)  |
| `pnpm build`         | Production build (runs the type checker too) |
| `pnpm preview`       | Preview the production build                 |
| `pnpm test`          | Run tests (Rstest + React Lynx Testing Lib)  |
| `pnpm test:coverage` | Run tests with the 90% coverage gate         |
| `pnpm lint`          | Lint with ESLint                             |
| `pnpm format`        | Format with Prettier                         |

## Project structure

Each screen is a self-contained folder `pages/<name>/index.tsx`, with its unit tests
co-located under `__tests__/`. Building blocks shared across screens live in
`pages/shared/`.

```
src/
  index.tsx                          # entry: root.render() with <MemoryRouter> + <Routes>
  pages/
    login/
      index.tsx                      # Login screen
      __tests__/index.spec.tsx
    register/
      index.tsx                      # Register screen
      __tests__/index.spec.tsx
    shared/                          # reused across auth screens
      AuthScreen.tsx                 # scrollable, vertically-centered page shell
      Field.tsx                      # labeled <input> + inline validation error
      authValidation.ts              # pure, fully unit-tested form validation
      auth.css                       # shadcn-style design tokens + component styles
      __tests__/authValidation.spec.ts
```

Conventions:

- **Screens** are folders: `pages/<name>/index.tsx`, imported as `@/pages/<name>/index.js`.
- **Tests** are co-located in `__tests__/*.spec.tsx`. Rstest matches `*.{test,spec}.{ts,tsx}`,
  and CI enforces the **90 %** coverage thresholds from `rstest.config.js` — keep view
  components thin and push logic into pure, testable modules (e.g. `authValidation.ts`).
- **Shared building blocks** go under `pages/shared/`. As the app grows, cross-cutting
  concerns (a vnstock API client, shared hooks, framework-agnostic utils) can graduate to
  their own top-level `src/` folders.

The `@/*` path alias maps to `src/*` (configured in both `lynx.config.ts`
`source.alias` and `src/tsconfig.json` `paths`).

### Routing

React Router v6 with `MemoryRouter`. Routes are declared in `src/index.tsx`: `/` and
`/login` render the Login screen, `/register` renders Register. ReactLynx has no DOM, so
navigate with `useNavigate()` — `<Link>` / `<NavLink>` are not supported.

## AI-assisted development

This project is set up with the Lynx AI tooling (see <https://lynxjs.org/ai/>):

- **`AGENTS.md`** — instructs coding agents to read `https://lynxjs.org/llms.txt` first.
- **MCP servers** (`.mcp.json`): `lynx-docs` (live docs) and `lynx-devtool`
  (control / preview / debug a running Lynx page). Your agent will ask to trust them.
- **Agent skills** (`.agents/skills/`): `reactlynx-best-practices`, `lynx-typescript`,
  `lynx-ui`, `lynx-devtool`, `rspeedy-bundle-size`.

## ReactLynx must-knows

- Import React APIs from **`@lynx-js/react`**, not `react`.
- Native elements only: `<view>`, `<text>`, `<image>` — no `div`, `document`, or `window`.
- Events: `bindtap` (bubbles) / `catchtap` (stops); `main-thread:` prefix for
  gestures & animations.
- **Dual thread:** component code runs on both threads. Effects, event handlers, refs,
  and native APIs are **background-only** — never call them during render (mark with
  `'background only'` when needed).
- Use `rpx` units for responsive sizing.

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
| `pnpm bundle:copy`   | Copy `dist/main.lynx.bundle` into both shells |
| `pnpm ios`           | Build + regenerate the Xcode project + pods  |
| `pnpm android`       | Build + assemble the debug APK               |

## Native apps (iOS / Android)

The ReactLynx build only produces `dist/main.lynx.bundle`. Shipping an installable app
needs a native host embedding LynxEngine, which lives in `ios/` and `android/`. Both load
the bundle from local app resources — there is no dev server involved in a release build.

> **Engine version is coupled to the bundle.** `ios/Podfile` and `android/app/build.gradle.kts`
> both pin Lynx **4.1.0** / PrimJS **4.1.1** to match `@lynx-js/types` in `package.json`.
> Bump all three together or the bundle will fail to render.
>
> This is also why [Sparkling](https://tiktok.github.io/sparkling/) is not used here: as of
> 2.0.1 it pins Lynx 3.6.0, which predates `@lynx-js/lynx-ui`.

### iOS

Needs Xcode 16+, CocoaPods, and XcodeGen (`brew install cocoapods xcodegen`).

`VNStock.xcodeproj` is **generated** from `ios/project.yml` and is not committed — edit the
YAML, never the project file. After `pnpm ios`, open `ios/VNStock.xcworkspace` (the
workspace, not the project) and run.

### Android

Needs JDK 17 (`brew install --cask temurin@17`) and the Android SDK
(`brew install --cask android-commandlinetools`, then set `ANDROID_HOME`).

`pnpm android` writes the APK to `android/app/build/outputs/apk/debug/`.

## Project structure

Everything is organised as self-contained folders — `<name>/index.tsx` plus co-located
`__tests__/`. Screens live in `pages/`, reusable UI in `components/`, and pure logic in
`lib/`.

```
src/
  index.tsx                          # entry: root.render() with <MemoryRouter> + <Routes>
  global.css                         # shadcn-style design tokens on :root (imported once here)
  components/                        # reusable UI (same folder-per-component convention)
    AuthScreen/
      index.tsx                      # scrollable, vertically-centered page shell
      auth.css                       # auth-specific styles (consumes the global tokens)
      __tests__/index.spec.tsx
    Field/
      index.tsx                      # labeled <input> + inline validation error
      __tests__/index.spec.tsx
  lib/                               # framework-agnostic logic (no Lynx/JSX)
    authValidation.ts                # pure, fully unit-tested form validation
    __tests__/authValidation.spec.ts
  pages/
    login/
      index.tsx                      # Login screen
      __tests__/index.spec.tsx
    register/
      index.tsx                      # Register screen
      __tests__/index.spec.tsx
```

Conventions:

- **Folder-per-unit.** Screens (`pages/<name>/`) and components (`components/<Name>/`)
  are folders exposing an `index.tsx`, imported as `@/pages/<name>/index.js` /
  `@/components/<Name>/index.js`.
- **Styling (shadcn model).** The design tokens — the colour palette and `--radius` — live
  once in `src/global.css` on `:root` (Lynx supports `:root` for app-wide CSS variables),
  imported a single time from `src/index.tsx`. Component-specific CSS is co-located with its
  component (e.g. `components/AuthScreen/auth.css`) and only reads tokens via `var(--…)`, so
  the whole app re-themes from one file. The palette is monochrome; green/red are reserved
  for market-trend and status signals.
- **Tests** are co-located in `__tests__/*.spec.tsx`. Rstest matches `*.{test,spec}.{ts,tsx}`,
  and CI enforces the **90 %** coverage thresholds from `rstest.config.js` — keep view
  components thin and push logic into pure `lib/` modules (e.g. `authValidation.ts`).
- **Reusable building blocks** go in `components/` (UI) and `lib/` (logic), never under
  `pages/`, so screens depend on them and not the other way around.

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

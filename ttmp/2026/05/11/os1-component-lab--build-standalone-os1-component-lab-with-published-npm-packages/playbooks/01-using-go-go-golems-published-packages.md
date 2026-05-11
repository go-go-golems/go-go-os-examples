---
Title: Using published @go-go-golems packages in a standalone React app
Ticket: os1-component-lab
Status: active
Topics:
    - react
    - npm
    - design-system
    - storybook
DocType: playbook
Intent: long-term
Owners: []
RelatedFiles:
    - Path: .devctl.yaml
      Note: example multi-service local operation setup
    - Path: .storybook/preview.tsx
      Note: example Storybook theme wrapper setup
    - Path: package.json
      Note: standalone consumer dependency and script model
    - Path: scripts/devctl/os1_component_lab_plugin.py
      Note: example devctl plugin implementation
    - Path: src/features/ControlPanelApp/ControlPanelApp.tsx
      Note: example of theme imports and package consumption
    - Path: src/services/controlPanelApi.ts
      Note: example RTK Query integration shape
ExternalSources: []
Summary: Practical playbook for installing, wiring, theming, validating, and operating published @go-go-golems frontend packages in a standalone React application.
LastUpdated: 2026-05-11T16:10:00-04:00
WhatFor: Use this when starting a new standalone consumer app for the published go-go-os frontend packages.
WhenToUse: Use before scaffolding or validating a React/Vite/Storybook app that consumes @go-go-golems/os-core, os-repl, or os-widgets from npm.
---


# Using published @go-go-golems packages in a standalone React app

## Goal

This playbook explains how to consume the published `@go-go-golems` frontend packages from npm in a standalone React application, how to apply the OS1 theme correctly, how to add Storybook and RTK Query, and how to validate that the consumer app is genuinely independent of the source monorepo.

## Package inventory

First-wave published packages:

```text
@go-go-golems/os-core@0.1.0
@go-go-golems/os-repl@0.1.0
@go-go-golems/os-widgets@0.1.0
```

Use them as follows:

- `@go-go-golems/os-core`
  - low-level primitives
  - theme entrypoints
  - buttons, lists, forms, alerts, tables, tabs
- `@go-go-golems/os-repl`
  - REPL/terminal-specific package
  - useful if you need terminal-like interactions
- `@go-go-golems/os-widgets`
  - richer widgets and widget-level primitives
  - toolbars, status bars, search bar, sparklines, richer panels

## Step 1: Scaffold the app

Recommended stack:

- Vite
- React
- TypeScript
- Redux Toolkit
- React Redux
- Storybook

Example:

```bash
npm create vite@latest my-go-go-os-app -- --template react-ts
cd my-go-go-os-app
```

## Step 2: Install published packages

Install runtime packages:

```bash
npm install @go-go-golems/os-core @go-go-golems/os-widgets @reduxjs/toolkit react-redux
```

Install Storybook if needed:

```bash
npm install -D storybook @storybook/react-vite @storybook/addon-docs
```

If you also need REPL-specific functionality:

```bash
npm install @go-go-golems/os-repl
```

## Step 3: Configure npm scope mapping

If the scope does not already resolve normally in your environment, add `.npmrc`:

```ini
@go-go-golems:registry=https://registry.npmjs.org/
```

This is usually unnecessary for normal public consumption, but it is useful when machines still have an old scoped registry override.

## Step 4: Apply the OS1 theme correctly

The theme import alone is not enough. The root wrapper must match the package's theme scoping contract.

Import the theme entrypoints:

```ts
import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
```

Then wrap the app root like this:

```tsx
<div data-widget="hypercard" className="theme-macos1">
  <App />
</div>
```

This is required because the OS1/macOS-1 theme variables are scoped to that wrapper.

## Step 5: Start with low-level primitives

A good first validation is to use `os-core` primitives directly.

Example:

```tsx
import { Btn, Checkbox, RadioButton, TabControl } from '@go-go-golems/os-core';
```

Example component:

```tsx
import { useState } from 'react';
import { Btn, Checkbox, RadioButton, TabControl } from '@go-go-golems/os-core';

export function DemoPanel() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [density, setDensity] = useState<'Compact' | 'Comfortable'>('Comfortable');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section>
      <Btn isDefault>Default Action</Btn>
      <Checkbox label="Enable sound" checked={soundEnabled} onChange={() => setSoundEnabled(!soundEnabled)} />
      <RadioButton label="Compact" selected={density === 'Compact'} onChange={() => setDensity('Compact')} />
      <RadioButton label="Comfortable" selected={density === 'Comfortable'} onChange={() => setDensity('Comfortable')} />
      <TabControl tabs={['One', 'Two']} activeTab={activeTab} onTabChange={setActiveTab}>
        <div>{activeTab === 0 ? 'First tab' : 'Second tab'}</div>
      </TabControl>
    </section>
  );
}
```

## Step 6: Add widget-level primitives when needed

If you want toolbar/status/search behaviors, import from `os-widgets`:

```tsx
import { WidgetToolbar, WidgetStatusBar, SearchBar, Sparkline } from '@go-go-golems/os-widgets';
import '@go-go-golems/os-widgets/theme';
```

Use `os-widgets` selectively. The low-level design-system layer still lives primarily in `os-core`.

## Step 7: Add Redux Toolkit and RTK Query

If the app needs realistic state flows, add an RTK Query API even when using local mock data.

Minimal store:

```ts
import { configureStore } from '@reduxjs/toolkit';
import { controlPanelApi } from './services/controlPanelApi';

export const store = configureStore({
  reducer: {
    [controlPanelApi.reducerPath]: controlPanelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(controlPanelApi.middleware),
});
```

Minimal RTK Query shape:

```ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const controlPanelApi = createApi({
  reducerPath: 'controlPanelApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getSettings: builder.query({
      queryFn: async () => ({ data: { profileName: 'Demo' } }),
    }),
  }),
});
```

## Step 8: Add Storybook with colocated stories

Recommended structure:

```text
src/components/
  MyComponent/
    MyComponent.tsx
    MyComponent.stories.tsx
    index.ts
```

Storybook preview should import package theme CSS and wrap the story root:

```tsx
import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';

const preview = {
  decorators: [
    (Story) => (
      <div data-widget="hypercard" className="theme-macos1">
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

Use `.tsx` for preview files that contain JSX.

## Step 9: Validate the consumer app

Minimum validation sequence:

```bash
npm install
npm run typecheck
npm run build
npm run build-storybook
```

Expected outcomes:

- TypeScript passes against the published type declarations.
- Production Vite build succeeds.
- Storybook build succeeds.

## Step 10: Validate independence from the source monorepo

A standalone consumer is valid only if it does **not** depend on local workspace aliases or unpublished source paths.

Check these conditions:

- no imports from sibling repo paths
- no `workspace:*` dependencies in the consumer app
- all `@go-go-golems/*` packages install from npm
- app still works from a clean directory on another machine

## Common failure modes

### Theme imported, but UI does not look themed

Cause:

- missing `data-widget="hypercard"`
- missing `className="theme-macos1"`

Fix:

- add the required root wrapper

### Storybook preview fails to parse JSX

Cause:

- preview file is `.ts` instead of `.tsx`

Fix:

- rename `preview.ts` to `preview.tsx`

### TypeScript rejects local arrays or config objects

Cause:

- the published package declarations are stricter than ad hoc local object literals

Fix:

- explicitly type arrays and config structures
- use the package-exported types when available

### npm tries to fetch from GitHub Packages

Cause:

- local/global npm config overrides the `@go-go-golems` scope registry

Fix:

- add `.npmrc` with:

```ini
@go-go-golems:registry=https://registry.npmjs.org/
```

## Recommended project sequence

```text
1. Scaffold Vite React TypeScript app.
2. Install published packages from npm.
3. Import os-core theme and macOS1 theme.
4. Build a primitive-only demo first.
5. Add RTK Query and realistic state flow.
6. Add Storybook with colocated component stories.
7. Add richer os-widgets primitives if needed.
8. Validate with typecheck, Vite build, and Storybook build.
9. Optionally add devctl support for operating app + Storybook together.
```

## Optional: devctl support

If the repo should run both the Vite app and Storybook together, add devctl support with:

- `.devctl.yaml`
- a small protocol v2 plugin
- two services:
  - app on `5173`
  - storybook on `6006`

Useful commands:

```bash
devctl plugins list
devctl plan
devctl up --force
devctl status --tail-lines 5
devctl logs --service app --follow
devctl logs --service storybook --follow
devctl down
```

## Working rules

- Treat `os-core` as the primary low-level primitive package.
- Treat `os-widgets` as a higher-level primitive/widget layer.
- Always validate against the public registry, not only local tarballs.
- Always document the theme wrapper contract in consumer apps.
- Treat Storybook as an integration test for the package API surface.

## References

Source repos used during this work:

- `/home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/go-go-os-frontend`
- `/home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test`

Ticket docs for the standalone consumer app:

- `ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/`

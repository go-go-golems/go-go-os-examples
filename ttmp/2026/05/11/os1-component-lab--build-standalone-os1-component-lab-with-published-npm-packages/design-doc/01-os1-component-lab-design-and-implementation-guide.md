---
Title: OS1 component lab design and implementation guide
Ticket: os1-component-lab
Status: active
Topics:
    - react
    - storybook
    - npm
    - design-system
    - rtk-query
DocType: design-doc
Intent: long-term
Owners: []
RelatedFiles:
    - Path: ../../../../../../../go-go-os-frontend/packages/os-core/src/components/widgets/index.ts
      Note: source reference for low-level primitive exports consumed from the published os-core package
    - Path: ../../../../../../../go-go-os-frontend/packages/os-core/src/theme/desktop/theme/macos1.css
      Note: source reference for OS1 theme scoping and token overrides
    - Path: ../../../../../../../go-go-os-frontend/packages/os-widgets/src/primitives
      Note: source reference for optional widget-level primitives
    - Path: ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/tasks.md
      Note: implementation task checklist
ExternalSources: []
Summary: Design and implementation guide for a standalone React/RTK Query/Storybook OS1 component lab using published @go-go-golems npm packages.
LastUpdated: 2026-05-11T14:35:00-04:00
WhatFor: Use this guide to build and review a standalone consumer app that validates low-level go-go-os primitives from public npm packages.
WhenToUse: Use while implementing the 2026-05-11--npm-go-go-os-test app, adding components, stories, RTK Query data, and validation scripts.
---


# OS1 component lab design and implementation guide

## Executive summary

This ticket builds a self-contained React application in `2026-05-11--npm-go-go-os-test/` that consumes the public npm packages published from `go-go-os-frontend`. The app is not a monorepo workspace consumer. It installs `@go-go-golems/os-core`, optionally `@go-go-golems/os-widgets`, and supporting React/Redux/Storybook dependencies from npm.

The app will be an **OS1 Control Panel**: a small design-system showcase that exercises low-level primitives such as buttons, checkboxes, radio buttons, tabs, lists, tables, chips, progress bars, forms, alerts, and status/toolbars under the OS1/macOS-1 HyperCard theme.

The implementation uses:

- React + Vite + TypeScript for the app shell.
- Redux Toolkit and RTK Query for realistic local data loading/mutations.
- Storybook for component-driven development.
- One directory per component with colocated `.stories.tsx` files.
- Published npm packages, not local workspace aliases.

## Goals

1. Prove public packages are usable in a normal standalone React project.
2. Validate low-level `@go-go-golems/os-core` components, not only rich widgets.
3. Validate the OS1 theme entrypoints:
   - `@go-go-golems/os-core/theme`
   - `@go-go-golems/os-core/desktop-theme-macos1`
4. Create a maintainable component-driven app with colocated stories.
5. Exercise RTK Query so future examples can model backend-driven apps.
6. Produce a production build and a Storybook build.

## Non-goals

- Do not depend on the unpublished source checkout of `go-go-os-frontend`.
- Do not publish this demo as an npm package.
- Do not build a full desktop shell or launcher runtime.
- Do not use the large rich widgets as the primary demo surface.

## Package model

### Main primitive package: `@go-go-golems/os-core`

`os-core` is the low-level package. It exports primitive UI components and the OS1 theme. Key imports:

```ts
import {
  Btn,
  Checkbox,
  RadioButton,
  Chip,
  DropdownMenu,
  TabControl,
  ListBox,
  DataTable,
  ProgressBar,
  AlertDialog,
  Toast,
  FormView,
  FieldRow,
} from '@go-go-golems/os-core';

import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
```

The OS1 theme is scoped through a root wrapper:

```tsx
<div data-widget="hypercard" className="theme-macos1">
  <App />
</div>
```

### Optional widget-primitive package: `@go-go-golems/os-widgets`

`os-widgets` contains rich widgets and widget-level primitives. Use sparingly in this app for extra polish:

```ts
import {
  WidgetToolbar,
  WidgetStatusBar,
  SearchBar,
  Separator,
  Sparkline,
} from '@go-go-golems/os-widgets';

import '@go-go-golems/os-widgets/theme';
```

### Supporting packages

- `@reduxjs/toolkit` for store and RTK Query.
- `react-redux` for Redux provider and hooks.
- Storybook packages for component stories.

## Architecture

```text
src/
  app/
    store.ts
  services/
    controlPanelApi.ts
  components/
    Os1Shell/
      Os1Shell.tsx
      Os1Shell.stories.tsx
      Os1Shell.css
      index.ts
    PrimitiveGallery/
      PrimitiveGallery.tsx
      PrimitiveGallery.stories.tsx
      PrimitiveGallery.css
      index.ts
    SettingsForm/
      SettingsForm.tsx
      SettingsForm.stories.tsx
      index.ts
    DeviceList/
      DeviceList.tsx
      DeviceList.stories.tsx
      index.ts
    SystemStatusTable/
      SystemStatusTable.tsx
      SystemStatusTable.stories.tsx
      index.ts
    FeedbackDemo/
      FeedbackDemo.tsx
      FeedbackDemo.stories.tsx
      index.ts
  features/
    ControlPanelApp/
      ControlPanelApp.tsx
      ControlPanelApp.stories.tsx
      ControlPanelApp.css
      index.ts
  main.tsx
  preview.tsx
  styles.css
```

The strict component convention is:

```text
ComponentName/
  ComponentName.tsx
  ComponentName.stories.tsx
  ComponentName.css      # only if needed
  index.ts
```

## Runtime flow

```mermaid
graph TD
  Main[main.tsx] --> Provider[Redux Provider]
  Provider --> App[ControlPanelApp]
  App --> Query[RTK Query hooks]
  Query --> MockBase[local mock baseQuery]
  App --> Shell[Os1Shell]
  Shell --> Gallery[PrimitiveGallery]
  Shell --> Forms[SettingsForm]
  Shell --> Lists[DeviceList]
  Shell --> Data[SystemStatusTable]
  Shell --> Feedback[FeedbackDemo]
  Gallery --> Core[@go-go-golems/os-core primitives]
```

## RTK Query design

The app should use RTK Query without requiring a real server. Use a custom `baseQuery` or `fakeBaseQuery` plus endpoint `queryFn`s. This keeps the demo self-contained while still validating the app architecture a real backend app would use.

Data model sketch:

```ts
export interface Device {
  id: string;
  name: string;
  kind: 'Display' | 'Sound' | 'Network' | 'Storage';
  enabled: boolean;
  health: 'good' | 'warning' | 'offline';
}

export interface ControlPanelSettings {
  profileName: string;
  soundEnabled: boolean;
  desktopPattern: 'Grid' | 'Dither' | 'Plain';
  density: 'Compact' | 'Comfortable';
}
```

Endpoint sketch:

```ts
export const controlPanelApi = createApi({
  reducerPath: 'controlPanelApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Settings', 'Device'],
  endpoints: (builder) => ({
    getSettings: builder.query<ControlPanelSettings, void>({ queryFn: async () => ({ data: settings }) }),
    updateSettings: builder.mutation<ControlPanelSettings, Partial<ControlPanelSettings>>(...),
    getDevices: builder.query<Device[], void>(...),
    toggleDevice: builder.mutation<Device, string>(...),
  }),
});
```

## Storybook design

Stories should demonstrate components with realistic props and minimal external setup.

Rules:

- Every component directory gets a colocated `.stories.tsx`.
- Feature stories that need RTK Query use a Storybook decorator with a configured store.
- Primitive stories should be interaction-friendly and small.
- Story names should cover states: default, selected, disabled, loading, warning/offline, etc.

Storybook preview must import theme CSS:

```ts
import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
import '../src/styles.css';
```

## Component implementation guide

### `Os1Shell`

Purpose: Theme-scoped shell that creates the OS1 window frame.

Props:

```ts
interface Os1ShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

Responsibilities:

- Apply `data-widget="hypercard"` and `theme-macos1`.
- Render title bar and content region.
- Avoid Redux awareness.

### `PrimitiveGallery`

Purpose: Show low-level primitives in a small control panel section.

Use:

- `Btn`
- `Checkbox`
- `RadioButton`
- `Chip`
- `DropdownMenu`
- `ProgressBar`
- `TabControl`

### `SettingsForm`

Purpose: Use RTK Query settings data and `FormView`/`FieldRow` style controls.

Responsibilities:

- Accept values and event handlers from `ControlPanelApp`.
- Keep component storyable without a store where possible.

### `DeviceList`

Purpose: Show `ListBox` and/or `SelectableList` with device records.

### `SystemStatusTable`

Purpose: Show `DataTable` with health states.

### `FeedbackDemo`

Purpose: Exercise `AlertDialog`, `Toast`, and action buttons.

## Implementation phases

### Phase 1: Scaffold

- Add Vite React TypeScript project files.
- Add package dependencies from public npm.
- Add scripts for `dev`, `build`, `storybook`, `build-storybook`, `typecheck`.

### Phase 2: Tooling and Storybook

- Add `.storybook/main.ts` and `.storybook/preview.ts`.
- Add global styles and theme imports.
- Verify Storybook starts/builds.

### Phase 3: State and API

- Add Redux store.
- Add RTK Query self-contained `controlPanelApi`.
- Add typed hooks if useful.

### Phase 4: Components and stories

- Implement each component directory and colocated stories.
- Keep props explicit and story-friendly.

### Phase 5: Compose app

- Implement `ControlPanelApp` that uses RTK Query hooks.
- Render tabs/panels in the OS1 shell.

### Phase 6: Validate and commit

- `npm run typecheck`
- `npm run build`
- `npm run build-storybook`
- Commit focused changes after meaningful milestones.

## Risks and mitigations

- **Published primitive props may differ from assumptions.** Mitigate by compiling early and using source/package declarations as API reference.
- **Storybook CSS scoping may differ from app CSS.** Mitigate by wrapping every story in `data-widget="hypercard" className="theme-macos1"`.
- **RTK Query may be overkill for a demo.** It is intentional: the user asked for RTK Query driven design, and local fake endpoints keep the app self-contained.
- **Tokens/secrets in parent `.envrc`.** Do not commit `.envrc`; do not write tokens to project files.

## Validation commands

```bash
npm install
npm run typecheck
npm run build
npm run build-storybook
```

## References

- Published packages:
  - `@go-go-golems/os-core@0.1.0`
  - `@go-go-golems/os-repl@0.1.0`
  - `@go-go-golems/os-widgets@0.1.0`
- Source API references in sibling repo:
  - `../go-go-os-frontend/packages/os-core/src/components/widgets/`
  - `../go-go-os-frontend/packages/os-core/src/theme/desktop/theme/macos1.css`
  - `../go-go-os-frontend/packages/os-widgets/src/primitives/`

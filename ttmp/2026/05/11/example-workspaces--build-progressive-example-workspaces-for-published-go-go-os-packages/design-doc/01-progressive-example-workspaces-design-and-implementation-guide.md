---
Title: Progressive example workspaces design and implementation guide
Ticket: example-workspaces
Status: active
Topics:
    - react
    - storybook
    - npm
    - design-system
    - widgets
DocType: design-doc
Intent: long-term
Owners: []
RelatedFiles:
    - Path: ../../../../../../../go-go-os-frontend/packages/os-core/README.md
      Note: public package onboarding surface for low-level primitive examples
    - Path: ../../../../../../../go-go-os-frontend/packages/os-repl/README.md
      Note: public package onboarding surface for REPL-oriented examples
    - Path: ../../../../../../../go-go-os-frontend/packages/os-widgets/README.md
      Note: public package onboarding surface for widget-level and richer widget examples
    - Path: README.md
      Note: workspace overview
    - Path: examples/00-theme-smoke/src/ThemeSmokeExample.tsx
      Note: stage 00 theme contract smoke test
    - Path: examples/01-os-core-primitives/src/OsCorePrimitivesExample.tsx
      Note: stage 01 low-level primitive example
    - Path: examples/02-local-state-forms/src/LocalStateFormsExample.tsx
      Note: stage 02 local state example
    - Path: examples/03-rtk-query-control-panel/src/features/ControlPanelApp/ControlPanelApp.tsx
      Note: stage 03 original RTK Query app
    - Path: examples/04-rich-widgets/src/RichWidgetsExample.tsx
      Note: stage 04 rich widget example
    - Path: examples/shared/src/ExampleFrame.tsx
      Note: shared instructional frame used by examples
    - Path: package.json
      Note: current standalone consumer repo root that will be restructured into examples
    - Path: src/ExampleWorkspaceApp.tsx
      Note: root navigator proving the root is no longer the control-panel app
    - Path: src/exampleRegistry.ts
      Note: stage registry including implemented stages and planned shell stage
    - Path: src/features/ControlPanelApp/ControlPanelApp.tsx
      Note: current later-stage example candidate for the progression
    - Path: ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/design-doc/01-os1-component-lab-design-and-implementation-guide.md
      Note: current standalone consumer architecture that will become one stage of the progression
ExternalSources: []
Summary: Design and implementation guide for evolving the standalone consumer repo into a progression of example workspaces for published go-go-os packages.
LastUpdated: 2026-05-11T16:25:00-04:00
WhatFor: Use this guide to build a structured example workspace ladder that teaches the published go-go-os package family from primitives to richer widgets and shell-oriented surfaces.
WhenToUse: Use before restructuring the consumer repo or adding new examples for primitives, RTK Query apps, Storybook labs, richer widgets, or desktop/window-manager layers.
---



# Progressive example workspaces design and implementation guide

## Executive summary

The current standalone consumer repository, `/home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test`, already proves that the published `@go-go-golems` package family can be installed from npm and used in a normal React/Vite/Storybook application. That repository now needs to evolve from a single demonstration app into a structured examples workspace.

The target shape is a progression of independently understandable examples that increase in complexity step by step. The progression should begin with the smallest credible consumer: a theme smoke test and a low-level primitive gallery. It should then move through local state, RTK Query-backed feature composition, Storybook-centered component labs, richer widget composition, and eventually shell/window-manager-oriented examples if and when the necessary packages are publicly consumable.

The purpose of the progression is pedagogical and architectural. Pedagogically, a new engineer or intern should be able to start with a simple package import and reach the more complex desktop-oriented examples without a large conceptual jump. Architecturally, the progression forces the package family to justify its public API at multiple levels: low-level primitives, widget-level primitives, richer widgets, and eventually window-manager/shell surfaces.

## Problem statement

A single demo application is useful for proof of existence, but it is weak as a teaching surface. It mixes foundational concepts and advanced concepts into one codebase. A newcomer who only wants to understand theme imports and button usage must read the same repository that contains RTK Query setup, Storybook configuration, devctl integration, and a composed control-panel app. That is too much surface area for onboarding.

There is a second problem. The published package family is now split across layers:

- `@go-go-golems/os-core`
- `@go-go-golems/os-repl`
- `@go-go-golems/os-widgets`

This is already enough for a low-level design-system progression. But later examples will likely want to show larger desktop-oriented building blocks, shell integration, or runtime-bound features. Some of those capabilities may require additional packages such as `@go-go-golems/os-shell`, `@go-go-golems/os-kanban`, or `@go-go-golems/os-ui-cards` to be made public first. The examples plan therefore needs to be explicit about which stages are available now and which stages depend on later packaging work.

The design problem is therefore not only “how do we organize examples?” It is also “how do we define a progression that accurately reflects the current public package surface while leaving room for future package publication?”

## Goals

1. Turn the current standalone consumer repo into a structured examples workspace.
2. Make the example progression explicit, ordered, and easy to navigate.
3. Keep each example focused on one main new concept.
4. Reuse shared tooling where it helps, without blurring example boundaries.
5. Preserve the existing control-panel app as one later-stage example rather than the only example.
6. Define the package publication implications of later-stage examples.

## Non-goals

1. Do not immediately split the examples into multiple repositories.
2. Do not package additional frontend packages unless later-stage examples actually require them.
3. Do not collapse all examples into one giant app with hidden “levels.”
4. Do not turn the examples workspace into a production product repository.

## Current state

At the moment, the repository contains one substantial example application:

- an OS1 control panel
- React + Vite + TypeScript
- Redux Toolkit + RTK Query
- Storybook with colocated stories
- devctl support for app + Storybook supervision

This is useful as a later-stage example. It is not the right entry point for someone who simply wants to understand:

- how to install `@go-go-golems/os-core`
- how to apply the OS1 theme wrapper contract
- how to use the simplest primitives
- how `os-core` differs from `os-widgets`

That is why the repository should be restructured into a ladder of examples.

## Proposed repository model

Use one repository, not many repositories, and place multiple examples inside it.

Recommended high-level shape:

```text
2026-05-11--npm-go-go-os-test/
├── package.json                # workspace root
├── docs/
│   └── progression.md
├── examples/
│   ├── 00-theme-smoke/
│   ├── 01-os-core-primitives/
│   ├── 02-local-state-forms/
│   ├── 03-rtk-query-control-panel/
│   ├── 04-storybook-component-lab/
│   ├── 05-rich-widgets/
│   └── 06-shell-windowing/     # only if/when package surface allows it
├── shared/
│   ├── theme/
│   ├── storybook/
│   ├── sample-data/
│   └── utils/
└── ttmp/
```

The crucial rule is that the numbering is meaningful. It is not cosmetic. It expresses the intended learning order.

## Why one repository is the correct default

A separate repository for each example would create unnecessary duplication:

- duplicate lockfiles
- duplicate TypeScript configs
- duplicate Storybook setup
- duplicate CI or devctl setup
- duplicate explanations of the same package scope and theme wrapper rules

A single examples workspace is better because the examples are different views of the same package family. They should remain easy to compare side by side. A reader should be able to diff `01-os-core-primitives` against `02-local-state-forms` and see exactly what additional concepts were introduced.

A single repository also makes future package-surface evolution easier. If `os-shell` becomes public later, a shell/windowing example can be added as a new level in the same progression instead of being born in a disconnected repository.

## Example progression

### 00 — Theme Smoke

Purpose: prove that package installation, theme imports, and root wrapper scoping work.

Should include:

- `@go-go-golems/os-core`
- `@go-go-golems/os-core/theme`
- `@go-go-golems/os-core/desktop-theme-macos1`
- one `Btn`
- one `Chip`
- one minimal wrapper root

This is the minimal correctness check for theme and package consumption.

### 01 — os-core Primitives

Purpose: introduce low-level primitives without Redux, RTK Query, or widget-level complexity.

Should include:

- buttons
- checkboxes
- radio buttons
- dropdowns
- tabs
- progress bars
- lists
- simple tables

This stage demonstrates that `os-core` is a real low-level design system.

### 02 — Local State and Forms

Purpose: show normal React state management using the primitives.

Should include:

- `useState`
- `FormView`
- `FieldRow`
- local settings panels
- local validation or submission feedback

This stage answers the question: “Can I use these primitives in a normal React app before I introduce Redux?”

### 03 — RTK Query Control Panel

Purpose: show a realistic but self-contained app architecture.

This is where the existing control-panel app likely belongs.

Should include:

- Redux Toolkit store
- RTK Query `createApi`
- fake or local query/mutation endpoints
- data table + detail panel
- toasts/alerts
- tabbed composition

This stage validates that the packages survive realistic app architecture.

### 04 — Storybook Component Lab

Purpose: show component-driven development with colocated stories.

Should include:

- one directory per component
- `.stories.tsx` next to each component
- preview wrapper for theme imports and `data-widget="hypercard"`
- isolated prop/state examples

This is the reference structure for package documentation and UI exploration.

### 05 — Rich Widgets

Purpose: introduce the richer surface exported by `@go-go-golems/os-widgets`.

Candidate examples:

- `LogViewer`
- `ChartView`
- `MacWrite`
- `NodeEditor`
- `MacCalendar`
- `MermaidEditor`

This stage should explain the difference between widget-level primitives and richer full widgets.

### 06 — Shell / Window Manager / Desktop Integration

Purpose: show the package family at the desktop shell layer.

This is the first stage that may require additional public packages beyond the current first-wave set. A serious shell/window-manager example may need:

- `@go-go-golems/os-shell`
- possibly more explicit shell/runtime exports from `os-core`
- possibly other runtime packages depending on example ambition

This stage should **not** be started until package boundaries are clear and a second-wave publication decision has been made.

## Package implications by example stage

The package surface required by the examples does not remain constant. That is a feature, not a bug. The progression should make this explicit.

| Stage | Primary packages | Notes |
|---|---|---|
| 00 | `os-core` | theme contract only |
| 01 | `os-core` | low-level primitives |
| 02 | `os-core` | local state composition |
| 03 | `os-core`, `os-widgets` | richer app composition |
| 04 | `os-core`, `os-widgets` | Storybook-centered consumer workflow |
| 05 | `os-core`, `os-widgets`, maybe `os-repl` | richer widgets and REPL-derived surfaces |
| 06 | likely `os-shell` plus others | future packaging decision |

This table matters because it prevents a common documentation error: promising examples that cannot be built with the current published package family.

## Shared infrastructure design

Not every repeated file should be duplicated in every example. But shared infrastructure must stay small and explicit.

Good candidates for `shared/`:

- theme wrapper helpers
- Storybook preview decorators
- sample RTK Query data shapes
- shared CSS helpers for page framing

Bad candidates for `shared/`:

- large feature components
- hidden business logic that makes examples hard to understand in isolation
- opaque utility abstractions that save a few lines but obscure the lesson

The rule is simple: share infrastructure when it removes noise, but do not share so much that each example stops being readable on its own.

## Documentation model for the examples workspace

The examples repository needs one root guide that explains the progression.

Recommended file:

```text
docs/progression.md
```

This document should include:

- the purpose of the repository
- what each example teaches
- which packages each example uses
- run/build/storybook commands
- what example to read next

A new intern should be able to read `docs/progression.md`, open `examples/00-theme-smoke`, and understand why it exists before reading any source code.

## Architecture diagram for the examples workspace

```mermaid
flowchart TD
  A[Workspace root] --> B[docs/progression.md]
  A --> C[shared/]
  A --> D[examples/00-theme-smoke]
  A --> E[examples/01-os-core-primitives]
  A --> F[examples/02-local-state-forms]
  A --> G[examples/03-rtk-query-control-panel]
  A --> H[examples/04-storybook-component-lab]
  A --> I[examples/05-rich-widgets]
  A --> J[examples/06-shell-windowing]

  D --> K[@go-go-golems/os-core]
  E --> K
  F --> K
  G --> K
  G --> L[@go-go-golems/os-widgets]
  H --> K
  H --> L
  I --> L
  I --> M[@go-go-golems/os-repl]
  J --> N[@go-go-golems/os-shell ?]
```

The question mark on `os-shell` is deliberate. It marks an unresolved packaging dependency.

## Recommended implementation sequence

A new intern should not start by moving everything at once. The correct approach is staged.

### Phase 1: Freeze the current example as a later-stage reference

- preserve the current control-panel app
- decide that it becomes `03-rtk-query-control-panel`
- avoid large semantic changes during the move

### Phase 2: Create the simplest examples first

- add `00-theme-smoke`
- add `01-os-core-primitives`
- add `02-local-state-forms`

These examples define the lower end of the ladder.

### Phase 3: Extract shared infrastructure only after duplication becomes obvious

- move only the truly duplicated theme or Storybook wrapper code into `shared/`
- do not prematurely abstract

### Phase 4: Re-home the existing control panel

- move the current app into `03-rtk-query-control-panel`
- keep its Storybook and validation path working

### Phase 5: Add richer widget examples

- create `05-rich-widgets`
- pick a small but representative subset of rich widgets
- validate package consumption from npm again

### Phase 6: Evaluate shell/window-manager requirements

- identify what current public packages make possible
- inspect whether `os-shell` or related packages must be published
- only then plan `06-shell-windowing`

## Pseudocode for workspace migration

```text
current_repo = standalone_consumer_repo

create examples/ directory
move current app -> examples/03-rtk-query-control-panel
create examples/00-theme-smoke
create examples/01-os-core-primitives
create examples/02-local-state-forms

for each example:
    define its single main teaching goal
    install only the packages it needs
    add README or local note for purpose
    add run/build validation

if duplicated theme/storybook wrappers appear across >= 2 examples:
    extract minimal shared helper into shared/

if future example needs shell/window-manager behavior:
    inspect public package coverage
    if missing packages are required:
        open packaging ticket before implementation
```

## API reference anchors that matter for future examples

The examples progression should stay aligned with the real public API surface. Important reference points include:

- `go-go-os-frontend/packages/os-core/src/components/widgets/index.ts`
- `go-go-os-frontend/packages/os-core/src/desktop-theme-macos1.ts`
- `go-go-os-frontend/packages/os-repl/src/index.ts`
- `go-go-os-frontend/packages/os-widgets/src/index.ts`
- `go-go-os-frontend/packages/os-widgets/src/primitives/`
- `2026-05-11--npm-go-go-os-test/src/features/ControlPanelApp/ControlPanelApp.tsx`
- `2026-05-11--npm-go-go-os-test/src/services/controlPanelApi.ts`

These files define the surfaces that the examples must teach.

## Risks and open questions

### Risk 1: a shared workspace can accidentally hide per-example dependencies

If all examples inherit too much from the root, it becomes unclear which packages a reader actually needs for a given stage.

Mitigation:

- keep per-example dependency declarations explicit if examples become independent packages
- document per-example package requirements in `docs/progression.md`

### Risk 2: the progression can outrun the current public package surface

A shell/window-manager example may require packages that are not yet public.

Mitigation:

- treat later-stage examples as package-dependent milestones, not guaranteed deliverables

### Risk 3: over-abstraction can make the examples hard to teach from

If too much is moved into `shared/`, then the beginner examples stop being self-contained.

Mitigation:

- only extract helpers when duplication clearly harms maintainability
- prefer visible code over clever reuse in early examples

## Alternatives considered

### Alternative A: one giant app with hidden “levels”

Rejected because the progression would be conceptual only. The filesystem would not teach the intended order.

### Alternative B: many small repositories immediately

Rejected because the examples are still about one package family and should share tooling and comparisons.

### Alternative C: Storybook-only progression

Rejected because Storybook is excellent for components but insufficient for app-level architecture, state, and operational examples.

## References

Existing consumer repo:

- `/home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test`

Existing consumer ticket:

- `ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/`

Published package source repo:

- `/home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/go-go-os-frontend`

Published package surfaces:

- `packages/os-core/README.md`
- `packages/os-repl/README.md`
- `packages/os-widgets/README.md`

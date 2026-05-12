# Changelog

## 2026-05-11

- Initial workspace created


## 2026-05-11

Created ticket, task list, diary, and design guide for progressive example workspaces built on top of the published go-go-os package family.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/design-doc/01-progressive-example-workspaces-design-and-implementation-guide.md — primary design and implementation guide
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/reference/01-diary.md — planning diary
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/tasks.md — task checklist


## 2026-05-11

Implemented the progressive examples scaffold, moved the original app into stage 03, added stages 00/01/02/04 plus shared infrastructure and a root navigator.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/README.md — workspace run commands and progression overview
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/00-theme-smoke/src/ThemeSmokeExample.tsx — theme contract smoke example
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/01-os-core-primitives/src/OsCorePrimitivesExample.tsx — low-level os-core primitive example
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/02-local-state-forms/src/LocalStateFormsExample.tsx — local React state example
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/03-rtk-query-control-panel/src/features/ControlPanelApp/ControlPanelApp.tsx — original app moved into stage 03
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/04-rich-widgets/src/RichWidgetsExample.tsx — rich widgets example
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/ExampleWorkspaceApp.tsx — root workspace navigator


## 2026-05-11

Validated the implemented example workspace with typecheck, production build, and Storybook build; marked ticket tasks complete for this implementation pass.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/reference/01-diary.md — validation diary entries
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/tasks.md — completed implementation checklist


## 2026-05-11

Browser-smoked the root workspace navigator and confirmed stages 03 and 04 render through Vite dev server.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/reference/01-diary.md — browser smoke validation entry


## 2026-05-11

Added stage 05 window-manager shell example using the published @go-go-golems/os-shell package and revalidated the workspace.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/README.md — updated example progression
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/05-window-manager-shell/src/WindowManagerShellExample.tsx — stage 05 shell/window-manager example
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package.json — public os-shell dependency
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/exampleRegistry.ts — stage 05 marked implemented


## 2026-05-11

Retroactively reformatted the diary to the strict diary skill structure with prompt context, failures, tricky parts, review notes, and validation commands.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/reference/01-diary.md — strict diary format


## 2026-05-11

Added stage 06 REPL console example using @go-go-golems/os-repl with a custom driver, completions, help, and host effects.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/README.md — updated progression and dependency list
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/06-repl-console/src/ReplConsoleExample.tsx — stage 06 public os-repl example
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package.json — direct os-repl dependency
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/exampleRegistry.ts — registered stage 06


## 2026-05-11

Added local package debug playbook and updated the demo to os-repl@0.1.5/os-widgets@0.1.2 with deduped REPL dependency and focus validation.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/06-repl-console/src/ReplConsoleExample.tsx — stage used for browser focus validation
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package-lock.json — deduped package resolution
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package.json — registry dependencies for fixed os-repl and os-widgets
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/playbooks/02-local-package-debug-workflow.md — local package debugging workflow


## 2026-05-11

Fixed stage 08 VM host notifications by rendering the local notifications toast inside VmExampleHost (commit 529228f).

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/examples/shared/src/VmExampleHost.tsx — connected notification slice to Toast for VM examples
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/reference/01-diary.md — recorded reproduction


## 2026-05-11

Updated the demo to VM package docs releases 0.1.2 and added favicon assets so browser smoke has no favicon 404 (commit e42c0da).

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/index.html — links SVG favicon and ICO fallback
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package-lock.json — locks VM package family at 0.1.2
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/public/favicon.ico — serves /favicon.ico with HTTP 200
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/reference/01-diary.md — records validation and browser-console check


## 2026-05-11

Added Playwright browser regressions for stages 06, 08, and 09 plus a production Kanban CSS selector check (commit 01590a0).

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/playwright.config.ts — Playwright web-server configuration
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/scripts/check-kanban-css.mjs — Built CSS selector check
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/tests/e2e/runtime-stages.spec.ts — Stage runtime behavior checks


## 2026-05-11

Updated examples app to the aligned trusted-published go-go-os package stack and validated build/CSS/e2e locally.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package-lock.json — Resolved aligned package stack
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package.json — Aligned public package versions
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/scripts/check-kanban-css.mjs — Kanban production CSS regression used for validation
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/tests/e2e/runtime-stages.spec.ts — Runtime regressions used for validation


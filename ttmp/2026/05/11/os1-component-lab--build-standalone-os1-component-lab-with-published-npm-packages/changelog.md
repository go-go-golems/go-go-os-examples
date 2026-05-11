# Changelog

## 2026-05-11

- Initial workspace created


## 2026-05-11

Created ticket, design guide, task list, and initial diary for the standalone OS1 component lab.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/design-doc/01-os1-component-lab-design-and-implementation-guide.md — primary implementation guide
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/reference/01-diary.md — chronological diary
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/tasks.md — task checklist


## 2026-05-11

Scaffolded standalone Vite/React/Storybook app using published @go-go-golems packages and validated typecheck/build.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/.storybook/main.ts — Storybook React/Vite configuration
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/.storybook/preview.ts — Storybook OS1 theme decorator
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/package.json — standalone app dependencies and scripts
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/features/ControlPanelApp/ControlPanelApp.tsx — initial app shell using os-core theme and Btn
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/reference/01-diary.md — Step 2 scaffold diary


## 2026-05-11

Implemented RTK Query-driven OS1 component lab with component directories, colocated stories, app composition, and successful typecheck/build/Storybook build.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/.storybook/preview.tsx — Storybook OS1 theme decorator
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/app/store.ts — Redux store with RTK Query reducer and middleware
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/components/PrimitiveGallery/PrimitiveGallery.tsx — low-level primitive gallery using os-core and os-widgets primitives
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/features/ControlPanelApp/ControlPanelApp.tsx — composed OS1 control panel app
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/src/services/controlPanelApi.ts — RTK Query self-contained mock API
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/reference/01-diary.md — Step 3 implementation diary


## 2026-05-11

Recorded implementation commit hash e447e3230d96008d1b2c39d5dbe3d798fb7e73db in the diary.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/reference/01-diary.md — commit hash update for Step 3


## 2026-05-11

Added devctl plugin/config that plans Vite app and Storybook services with HTTP health checks.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/.devctl.yaml — devctl plugin registration
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/scripts/devctl/os1_component_lab_plugin.py — NDJSON protocol v2 plugin for config
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/reference/01-diary.md — Step 4 devctl support diary


## 2026-05-11

Verified devctl-managed app and Storybook services are alive and reachable, and ignored local .devctl state/logs.

### Related Files

- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/.gitignore — ignores devctl local state/log directory
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/reference/01-diary.md — Step 5 records service verification
- /home/manuel/workspaces/2026-05-11/npm-packages-go-go-os/2026-05-11--npm-go-go-os-test/ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/tasks.md — marks devctl run verification complete


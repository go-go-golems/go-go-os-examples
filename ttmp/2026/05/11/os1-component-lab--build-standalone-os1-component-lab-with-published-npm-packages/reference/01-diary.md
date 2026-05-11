---
Title: Diary
Ticket: os1-component-lab
Status: active
Topics:
    - react
    - storybook
    - npm
    - design-system
    - rtk-query
DocType: reference
Intent: long-term
Owners: []
RelatedFiles: []
ExternalSources: []
Summary: "Chronological implementation diary for the standalone OS1 component lab built from public @go-go-golems npm packages."
LastUpdated: 2026-05-11T16:15:00-04:00
WhatFor: "Use this diary to understand implementation steps, validation commands, failures, commits, and future review instructions."
WhenToUse: "Read before continuing or reviewing the standalone npm package consumer app."
---

# Diary

## Goal

This diary records the step-by-step implementation of a standalone React/RTK Query/Storybook OS1 component lab that consumes the published `@go-go-golems` npm packages.

## Step 1: Created ticket, design guide, and task plan

I created the docmgr ticket and wrote the implementation plan before scaffolding the app. This gives the work a durable structure and makes the implementation reviewable as a series of focused milestones rather than one large unexplained change.

### Prompt Context

**User prompt (verbatim):** "do a react / rtk-query / storybook driven design, where each component has its own directory and a .stories.tsx next to it to have all the stories. Create a new ticket to build that, and add a detailed implementation guide / design guide, and a list of tasks. THen go ahead and implement it task by task, committing at appropriate intervals, and keeping a diary as you work"

**Assistant interpretation:** Create a docmgr ticket and detailed plan for a standalone React app that uses RTK Query and Storybook, colocates stories next to components, then implement it incrementally with commits and diary updates.

**Inferred user intent:** Build a real consumer demo for the newly published packages and preserve enough documentation/history for future maintenance.

**Commit (code):** N/A yet — documentation step before first implementation commit.

### What I did

- Created ticket `os1-component-lab`.
- Added design doc `design-doc/01-os1-component-lab-design-and-implementation-guide.md`.
- Added diary `reference/01-diary.md`.
- Replaced the generated task placeholder with a concrete task checklist.
- Inspected low-level primitive APIs in the sibling `go-go-os-frontend` source to avoid guessing component prop shapes.

### Why

- The design guide clarifies architecture, dependencies, component directory conventions, RTK Query design, Storybook rules, and validation commands.
- Inspecting the source APIs first avoids compile churn when using published package components.

### What worked

- The ticket and docs were created successfully.
- `@go-go-golems/os-core` was confirmed as the main low-level primitive package.
- `@go-go-golems/os-core/desktop-theme-macos1` was confirmed as the OS1 theme entrypoint.

### What didn't work

- N/A.

### What I learned

- `TabControl` uses `tabs: string[]`, `activeTab: number`, `onTabChange`, and `children` rather than object tab descriptors.
- OS1 theme variables are scoped to `[data-widget="hypercard"].theme-macos1`.

### What was tricky to build

- The project should validate published package APIs, not local source aliases. It is still useful to read sibling source files as documentation, but the app must install from npm.

### What warrants a second pair of eyes

- Review whether the component set is broad enough to validate the low-level package surface.
- Review whether RTK Query remains self-contained and does not require a real backend.

### What should be done in the future

- Scaffold app and commit initial project structure.
- Implement components and stories in small commits.
- Run production and Storybook builds before final handoff.

### Code review instructions

- Start with the design doc and task list.
- Validate the ticket with `docmgr doctor --ticket os1-component-lab --stale-after 30`.

### Technical details

Ticket path:

```text
ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages
```


## Step 2: Scaffolded standalone Vite app and Storybook shell

I created the first runnable application scaffold using published npm packages. This step intentionally kept the UI minimal: the goal was to prove that the project can install, typecheck, and build before adding RTK Query and a larger component surface.

### Prompt Context

**User prompt (verbatim):** (same as Step 1)

**Assistant interpretation:** Implement the project incrementally, starting with a standalone React/Vite/Storybook foundation.

**Inferred user intent:** Establish a clean npm consumer baseline before building the full component lab.

**Commit (code):** 744d593df62de37ba1063e2408a4fac91fa10c61 — "Scaffold OS1 component lab app"

### What I did

- Added `package.json` with Vite, React, Storybook, Redux Toolkit, and published `@go-go-golems` package dependencies.
- Added TypeScript configs and Vite config.
- Added `.npmrc` that maps `@go-go-golems` to the public npm registry.
- Added `.gitignore` for `node_modules`, `dist`, Storybook static output, logs, and env files.
- Added `src/main.tsx`, a minimal Redux store, global OS1 styles, and initial `ControlPanelApp` feature component.
- Added Storybook config and an initial `ControlPanelApp.stories.tsx`.
- Ran `npm install`, `npm run typecheck`, and `npm run build`.

### Why

- The scaffold validates package installation and theme imports from npm before implementation complexity increases.
- A minimal initial Storybook setup confirms the component-driven structure can be extended component by component.

### What worked

- `npm install` completed with 0 vulnerabilities.
- `npm run typecheck` passed.
- `npm run build` passed and generated a production Vite build.

### What didn't work

- N/A.

### What I learned

- The published `@go-go-golems/os-core` package can be imported directly in this standalone project.
- The OS1 theme entrypoints can be loaded from npm package subpaths.

### What was tricky to build

- The repository sits below a parent `.envrc` that exports `NPM_TOKEN`; I avoided writing token values anywhere and added `.gitignore` env rules to reduce accidental leakage risk.

### What warrants a second pair of eyes

- Review `.npmrc` to confirm it only contains registry mapping and no auth token.
- Review `package-lock.json` to confirm public npm package versions are resolved as expected.

### What should be done in the future

- Add RTK Query API/store integration.
- Replace the placeholder app with component directories and colocated stories.

### Code review instructions

- Review `package.json`, `.npmrc`, `.gitignore`, `.storybook/*`, `src/main.tsx`, `src/app/store.ts`, and `src/features/ControlPanelApp/*`.
- Validate with `npm run typecheck` and `npm run build`.

### Technical details

Validation output:

```text
npm run typecheck
# passed

npm run build
# ✓ built in 913ms
```


## Step 3: Implemented RTK Query-driven OS1 component lab

I implemented the full component-lab surface after the scaffold was validated. This step added a self-contained RTK Query API, a Redux store integration, a Storybook store decorator, and component directories with colocated stories for shell, primitive gallery, settings form, device list, status table, feedback demo, and the composed app feature.

### Prompt Context

**User prompt (verbatim):** (same as Step 1)

**Assistant interpretation:** Continue implementing the planned app task by task, keeping each component in its own directory with colocated stories and validating with build commands.

**Inferred user intent:** Produce a complete standalone consumer app that demonstrates the public packages as a UI kit, not only as rich widgets.

**Commit (code):** e447e3230d96008d1b2c39d5dbe3d798fb7e73db — "Build RTK Query OS1 component lab"

### What I did

- Added `src/services/controlPanelApi.ts` using RTK Query `createApi` and `fakeBaseQuery`.
- Wired `controlPanelApi.reducer` and middleware into `src/app/store.ts`.
- Added a `WithStore` Storybook helper for feature stories that use RTK Query hooks.
- Added component directories and colocated stories:
  - `Os1Shell`
  - `PrimitiveGallery`
  - `SettingsForm`
  - `DeviceList`
  - `SystemStatusTable`
  - `FeedbackDemo`
- Reworked `ControlPanelApp` to compose all panels with `TabControl`, RTK Query hooks, and published package primitives.
- Imported both `@go-go-golems/os-core` and `@go-go-golems/os-widgets` theme entrypoints.
- Ran `npm run typecheck`, `npm run build`, and `npm run build-storybook`.

### Why

- RTK Query proves the demo is a realistic app architecture rather than a static screenshot.
- Colocated stories make each primitive wrapper/component inspectable and maintainable.
- Using `os-core` primitives under the OS1 theme validates the low-level UI kit surface from public npm.

### What worked

- `npm run typecheck` passed.
- `npm run build` passed:
  - `✓ 312 modules transformed.`
  - `✓ built in 1.33s`
- `npm run build-storybook` passed:
  - `Storybook build completed successfully`

### What didn't work

- First `npm run typecheck` failed with type issues:
  - Storybook stories with custom `render` still needed `args` for required props.
  - `ButtonGroup` expected a mutable options array, but the initial options were readonly via `as const`.
  - `FormView` fields needed explicit `FieldConfig[]` typing.
  - `DataTable<T>` requires `T extends Record<string, unknown>`, so `SystemMetric` rows needed a compatible row type.
- First Storybook build failed because `.storybook/preview.ts` contained JSX. Renaming it to `.storybook/preview.tsx` fixed the build.

### What I learned

- The published package declarations are strict enough to catch story/demo misuse quickly.
- Storybook preview files that contain JSX must use `.tsx` in this setup.
- The low-level primitives can be used directly from npm with app-level CSS wrappers for layout.

### What was tricky to build

- `FormView` consumes the `FieldConfig` type exported by `@go-go-golems/os-core`; without explicit typing TypeScript widens field `type` to `string`, which does not satisfy the package API.
- `DataTable`'s generic constraint requires row objects to satisfy `Record<string, unknown>`, so domain interfaces without an index signature need a local intersection type when passed to the generic.

### What warrants a second pair of eyes

- Review the `SettingsForm` behavior: it saves each field immediately through `onChange` while still rendering an Apply button for demo familiarity.
- Review package imports to ensure the demo remains a public-npm consumer and does not introduce sibling source aliases.
- Review the Storybook chunk-size warning; it is acceptable for this demo but worth noting if Storybook is deployed publicly.

### What should be done in the future

- Add screenshot/visual regression tests if this becomes a long-lived demo.
- Add README instructions with npm package purpose and local commands.
- Consider deploying the built Storybook or Vite app.

### Code review instructions

- Start with `src/services/controlPanelApi.ts`, then `src/features/ControlPanelApp/ControlPanelApp.tsx`.
- Review each component directory and colocated story under `src/components`.
- Validate with:
  - `npm run typecheck`
  - `npm run build`
  - `npm run build-storybook`

### Technical details

Validation commands run successfully:

```text
npm run typecheck
npm run build
npm run build-storybook
```


## Step 4: Added devctl support for running app and Storybook

I added a small devctl plugin so the standalone lab can run both the Vite app and Storybook through a single supervised workflow. The plugin computes stable service URLs, validates local prerequisites, and returns a launch plan with two services.

### Prompt Context

**User prompt (verbatim):** "run both, add devctl support"

**Assistant interpretation:** Add devctl configuration/plugin support to run both the Vite app and Storybook, then launch both services and verify them.

**Inferred user intent:** Make the demo easy to start and inspect without manually managing multiple terminals.

**Commit (code):** daeab9e0aad130d21ee6bbb4be1ede6733f29d81 — "Add devctl support for OS1 lab"

### What I did

- Read the installed devctl help topics for user workflow, scripting, and plugin authoring.
- Added `.devctl.yaml` pointing at a repo-local Python plugin.
- Added `scripts/devctl/os1_component_lab_plugin.py` implementing protocol v2 handshake plus:
  - `config.mutate`
  - `validate.run`
  - `launch.plan`
- Configured two services:
  - `app` at `http://127.0.0.1:5173`
  - `storybook` at `http://127.0.0.1:6006`
- Ran `devctl plugins list` and `devctl plan` successfully.

### Why

- devctl gives one command for starting/stopping/logging both frontend processes.
- The plugin keeps repo-specific ports and commands versioned with the app.

### What worked

- `devctl plugins list` discovered the plugin and handshake capabilities.
- `devctl plan` returned two services with HTTP health checks.

### What didn't work

- N/A so far; service launch happens after this commit.

### What I learned

- The current devctl docs use topic names `user-guide`, `scripting-guide`, and `plugin-authoring`.
- The plugin must keep stdout as NDJSON only; all operational logs should go to stderr if added later.

### What was tricky to build

- The parent directory has `direnv` output, but the plugin itself avoids shell startup and emits a clean JSON handshake first.

### What warrants a second pair of eyes

- Review service ports and health URLs for conflicts with other local dev servers.
- Review whether Storybook should be optional in future profiles.

### What should be done in the future

- Run `devctl up --force`, verify `devctl status`, inspect tails, and leave services running if healthy.

### Code review instructions

- Review `.devctl.yaml` and `scripts/devctl/os1_component_lab_plugin.py`.
- Validate with:
  - `devctl plugins list`
  - `devctl plan`
  - `devctl up --force`
  - `devctl status --tail-lines 5`

### Technical details

Launch plan services:

```text
app       npm run dev -- --host 127.0.0.1 --port 5173
storybook npm run storybook -- --host 127.0.0.1
```


## Step 5: Verified both devctl-managed services are running

After committing the devctl plugin, I verified that both the Vite application and Storybook are running under devctl supervision. I also added `.devctl/` to `.gitignore` because devctl creates local state and log files that should not be committed.

### Prompt Context

**User prompt (verbatim):** (same as Step 4)

**Assistant interpretation:** Confirm both services are actually alive and reachable after adding devctl support.

**Inferred user intent:** Have a one-command local environment with app and Storybook running at stable URLs.

**Commit (code):** pending — ignore/verification diary commit will follow this update.

### What I did

- Ran `devctl status --tail-lines 5`.
- Confirmed both services are alive:
  - `app`
  - `storybook`
- Checked HTTP reachability with `curl -I`:
  - `http://127.0.0.1:5173/` returned HTTP 200.
  - `http://127.0.0.1:6006/` returned HTTP 200.
- Added `.devctl/` to `.gitignore` so local devctl state/logs remain untracked.

### Why

- devctl support is only useful if it can supervise both processes and expose stable local URLs.
- `.devctl/` contains machine-local process state and logs; committing it would be noise.

### What worked

- `devctl status` reported both services as `alive: true`.
- The Vite app is reachable at `http://127.0.0.1:5173/`.
- Storybook is reachable at `http://127.0.0.1:6006/`.

### What didn't work

- N/A.

### What I learned

- devctl created local state under `.devctl/`, so the repo needs to ignore that directory.

### What was tricky to build

- The parent shell prints direnv messages, but that is outside the plugin protocol path. The supervised services still start correctly and logs are captured by devctl.

### What warrants a second pair of eyes

- Confirm whether the services should remain running after handoff or be stopped with `devctl down` for cleanup.

### What should be done in the future

- Use `devctl down` to stop both services when done.
- Use `devctl logs --service app --follow` or `devctl logs --service storybook --follow` for debugging.

### Code review instructions

- Verify with:
  - `devctl status --tail-lines 5`
  - `curl -I http://127.0.0.1:5173/`
  - `curl -I http://127.0.0.1:6006/`

### Technical details

Current running URLs:

```text
App:       http://127.0.0.1:5173/
Storybook: http://127.0.0.1:6006/
```


## Step 6: Added a consumer playbook to the ticket

I added a playbook document to the standalone consumer app ticket so future work does not have to reconstruct the consumer setup from the implementation diary alone. The playbook is narrower than the project report: it is meant to be an operational guide for using the published packages in a new React application.

### Prompt Context

**User prompt (verbatim):** "Then create a playbook on using these packages and store in 2026-05-11--npm-go-go-os-test/ 's ticket."

**Assistant interpretation:** Write a durable, practical playbook inside the consumer app ticket that explains package installation, theming, state wiring, Storybook setup, validation, and optional devctl usage.

**Inferred user intent:** Turn the consumer app implementation into a reusable onboarding guide for future standalone apps.

**Commit (code):** pending — ticket-document commit will follow this diary update.

### What I did

- Added `playbooks/01-using-go-go-golems-published-packages.md` to the `os1-component-lab` ticket.
- Related the playbook to the package consumer repo files that demonstrate the pattern.
- Updated the ticket changelog.
- Re-ran `docmgr doctor --ticket os1-component-lab --stale-after 30`.

### Why

- The implementation diary is chronological and useful for archaeology, but a playbook is better for repetition.
- Future consumers need a short path from `npm install` to a working OS1-themed app.

### What worked

- The playbook was added successfully.
- Related-file bookkeeping was updated successfully.
- `docmgr doctor` still passes.

### What didn't work

- N/A.

### What I learned

- The consumer setup now has three complementary documentation layers:
  - design guide for architecture and rationale
  - diary for chronological implementation history
  - playbook for repeatable usage

### What was tricky to build

- The playbook had to stay focused on package usage rather than drifting into another long-form project report.

### What warrants a second pair of eyes

- Review whether the playbook should eventually include screenshots or more explicit component API examples.

### What should be done in the future

- Commit the playbook into the repo history.
- Add package README files in `go-go-os-frontend` so the package pages themselves provide direct onboarding.

### Code review instructions

- Read `playbooks/01-using-go-go-golems-published-packages.md` and compare it against the actual app files in `src/`, `.storybook/`, and `.devctl.yaml`.

### Technical details

Playbook path:

```text
ttmp/2026/05/11/os1-component-lab--build-standalone-os1-component-lab-with-published-npm-packages/playbooks/01-using-go-go-golems-published-packages.md
```

---
Title: Diary
Ticket: example-workspaces
Status: active
Topics:
    - react
    - storybook
    - npm
    - design-system
    - widgets
DocType: reference
Intent: long-term
Owners: []
RelatedFiles:
    - Path: README.md
      Note: example progression and commands referenced throughout diary
    - Path: examples/03-rtk-query-control-panel/src/features/ControlPanelApp/ControlPanelApp.tsx
      Note: original app moved into stage 03 in diary step 2
    - Path: examples/05-window-manager-shell/src/WindowManagerShellExample.tsx
      Note: os-shell stage added in diary step 5
    - Path: examples/08-vm-events-and-intents/src/VmEventsAndIntentsExample.tsx
      Note: stage 08 owns notify.show capability and uses shared VM host
    - Path: examples/08-vm-events-and-intents/src/eventsBundle.vm.js
      Note: Notify host handler dispatches notify.show from QuickJS
    - Path: examples/shared/src/VmExampleHost.tsx
      Note: mounts connected Toast presenter for VM host notifications (commit 529228f)
    - Path: index.html
      Note: links favicon assets to avoid browser default favicon 404 (commit e42c0da)
    - Path: package-lock.json
      Note: locks VM package family at 0.1.2
    - Path: package.json
      Note: |-
        demo consumes VM package docs releases 0.1.2
        Validation scripts for e2e and CSS checks (commit 01590a0)
    - Path: playwright.config.ts
      Note: Playwright configuration for runtime-stage browser regressions (commit 01590a0)
    - Path: public/favicon.ico
      Note: ICO fallback so /favicon.ico returns HTTP 200 (commit e42c0da)
    - Path: public/favicon.svg
      Note: primary SVG favicon served by Vite static public directory (commit e42c0da)
    - Path: scripts/check-kanban-css.mjs
      Note: Production Kanban CSS selector regression (commit 01590a0)
    - Path: src/ExampleWorkspaceApp.tsx
      Note: root navigator implemented in diary step 2
    - Path: src/exampleRegistry.ts
      Note: stage registry updated in diary steps 2 and 5
    - Path: tests/e2e/runtime-stages.spec.ts
      Note: Stage 06/08/09 browser regressions (commit 01590a0)
    - Path: ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/design-doc/01-progressive-example-workspaces-design-and-implementation-guide.md
      Note: design guide created in diary step 1
ExternalSources: []
Summary: Chronological planning and implementation diary for the progressive example workspaces initiative built on top of published go-go-os frontend packages.
LastUpdated: 2026-05-11T18:20:00-04:00
WhatFor: Use this diary to understand why the example workspace ticket exists, how it was implemented, how it was validated, and how stage 05 evolved after os-shell publication.
WhenToUse: Read before restructuring the consumer repo, adding later-stage examples, or reviewing package-consumption examples.
---





# Diary

## Goal

This diary records the planning and implementation work for turning the standalone npm consumer repository into a progression of example workspaces that teach the published `@go-go-golems` package family from low-level primitives to richer widgets and shell/window-manager-oriented surfaces.

## Step 1: Created the ticket and wrote the first design guide

I created a new docmgr ticket because the examples-workspace effort is not the same task as package publication and not the same task as building the first standalone control panel. The new ticket isolates the next architectural problem: how to turn one working app into a structured learning and validation ladder.

The main output was a clear intern-oriented design guide. It defined the staged example progression, explained why one repo with numbered examples was preferable initially, and documented that shell/window-manager examples would need a separate public package boundary.

### Prompt Context

**User prompt (verbatim):** "ok, let's write the readmes, and then I want you to create a new docmgr ticket for building example workspaces. We can skip the devctl one, but I then want to continue showing features of the packages, including starting to package larger pieces and widgets, as building blocks but also moving to the window manager side of things, etc... This might require packaging more packages though, not sure.

Create  a detailed analysis / design / implementation guide that is for a new intern, explaining all the parts of the system needed to understand what it is, with prose paragraphs and bullet point sand pseudocode and diagrams and api references and file references. It should be very clear and technical. Store in the ticket and the nupload to remarkable.


anyway readmes first, new ticket + design guide / implementation guide next."

**Assistant interpretation:** First add README files to the published packages, then create a separate docmgr ticket that plans the next repo evolution into progressively more advanced example workspaces, with intern-grade design documentation and a reMarkable upload.

**Inferred user intent:** Move from one successful proof-of-consumption app to a durable teaching and package-validation workspace that can grow toward richer widgets and eventually shell-level examples.

**Commit (code):** `e8068d6` — "Plan progressive example workspaces"

### What I did

- Created ticket `example-workspaces` in the standalone consumer repo.
- Added a design doc, this diary, a task list, an index, and a changelog.
- Wrote a detailed design guide describing:
  - why one repo is preferable to many repos initially
  - why examples should be numbered and conceptually staged
  - which example stages map to which published packages
  - where later-stage examples may require additional package publication
- Uploaded the ticket bundle to reMarkable.
- Ran `docmgr doctor --ticket example-workspaces --stale-after 30`.
- Committed the planning ticket baseline.

### Why

- The standalone control-panel app was already useful, but it was too complex to be the first teaching surface.
- The next problem was repository pedagogy and public package evolution, not raw consumer viability.
- Planning first made it clear that stage 05 should wait until `os-shell` had a public package boundary.

### What worked

- The ticket and docs were created successfully.
- The design guide established a staged progression model from theme smoke to shell/window-manager examples.
- `docmgr doctor` passed.

### What didn't work

- The ticket initially introduced a new topic value, `widgets`, that was not in the local docmgr vocabulary.
- `docmgr doctor` reported:

```text
[warning] Unknown vocabulary value for Topics
Value: "widgets"
```

- I fixed it with:

```bash
docmgr vocab add --category topics --slug widgets --description "Reusable visual widgets, widget primitives, and higher-level UI surfaces."
```

### What I learned

- The package family had enough public surface for a real examples ladder, but not enough for final shell-oriented stages without more packaging work.
- `docmgr doctor` is useful for catching vocabulary drift early.

### What was tricky to build

- The design guidance had to separate what was feasible with the currently published packages from what was only a future direction if additional packages such as `os-shell` became public.
- The solution was to mark shell/window-manager work as a later stage with an explicit package-boundary dependency instead of pretending it was ready.

### What warrants a second pair of eyes

- Review the proposed example numbering and whether the original control-panel app belongs at stage 03.
- Review whether the shell/window-manager stage should be split into multiple later tickets rather than one final example.

### What should be done in the future

- Implement the workspace restructuring in small commits.
- Add root-level progression docs.
- Begin with the simplest examples first, then add richer package surfaces.

### Code review instructions

- Read the design guide first, then the task list.
- Validate with:

```bash
docmgr doctor --ticket example-workspaces --stale-after 30
```

### Technical details

Ticket path:

```text
ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages
```

## Step 2: Implemented the examples workspace scaffold

This step converted the repo from a single root app into a staged examples workspace. The original control-panel app was preserved, but moved into stage 03 so the root app could become a navigator rather than the only example.

The implementation also added earlier teaching stages for theme setup, low-level primitives, and local state, plus a rich-widgets stage that uses higher-level package exports. This made the repo useful both as a learning path and as a package-consumption validation suite.

### Prompt Context

**User prompt (verbatim):** "Ok, implement example-workspaces ticket, use a diary, commit at appropriate intervals."

**Assistant interpretation:** Start implementing the previously planned progressive examples, keep the diary updated, and create focused commits as coherent implementation slices are validated.

**Inferred user intent:** Convert the single consumer app into a real progressive example workspace without starting unrelated devctl or release-automation work.

**Commit (code):** `04d9b3b` — "Implement progressive example workspace"

### What I did

- Committed the previously created ticket and planning docs first, creating a clean documented baseline.
- Moved the original `src/` app into:

```text
examples/03-rtk-query-control-panel/src/
```

- Added shared example infrastructure:

```text
examples/shared/src/ExampleFrame.tsx
examples/shared/src/exampleFrame.css
```

- Added implemented examples:
  - `examples/00-theme-smoke/`
  - `examples/01-os-core-primitives/`
  - `examples/02-local-state-forms/`
  - `examples/04-rich-widgets/`
- Replaced the root `src/` app with a workspace navigator:
  - `src/ExampleWorkspaceApp.tsx`
  - `src/exampleRegistry.ts`
  - `src/main.tsx`
- Added a planned placeholder for shell/window-manager stage 05.
- Updated Storybook to load stories from `examples/`.
- Updated package dependencies to consume published `0.1.1` packages.
- Added a repository README with run commands and the example ladder.

### Why

- New consumers need a simpler on-ramp than the full RTK Query control panel.
- Keeping the original app as a later-stage example preserves the existing validation value while making the repo easier to teach.
- A root navigator makes all examples discoverable from one Vite app.

### What worked

- TypeScript typecheck passed after fixing two API mismatches.
- The original app could be moved into `examples/03-rtk-query-control-panel/src/` without rewriting most of its internal imports.
- Storybook could discover stories under `examples/`.

### What didn't work

- I initially used `FieldRow` as a generic children wrapper. The public `FieldRow` API takes `{ field, value, onChange }`, so TypeScript rejected the usage.
- I fixed that by replacing those examples with local layout rows.
- I initially configured `ChartView` with:

```tsx
availableTypes={['line', 'bar', 'area']}
```

- The public `ChartType` union is:

```text
line | bar | pie | scatter
```

- I changed `area` to `scatter`.

### What I learned

- The public package APIs are stricter than quick visual sketches. The examples should follow the actual published contracts even when a simpler-looking JSX composition would be convenient.
- Keeping examples typechecked is valuable because it turns public API mismatches into immediate feedback.

### What was tricky to build

- Keeping the original control-panel example intact while making it no longer be the root app required moving the whole previous source tree and then creating a new root app around it.
- The root navigator imports example components directly. That is good for teaching, but it means large examples are eagerly bundled.

### What warrants a second pair of eyes

- Review `src/exampleRegistry.ts` to confirm the stage descriptions and package-focus labels are accurate.
- Review the moved stage 03 imports to ensure no accidental assumptions about the old root `src/` layout remain.
- Review whether direct imports are acceptable or whether stage-level lazy loading should be introduced later.

### What should be done in the future

- If the workspace grows larger, convert `src/exampleRegistry.ts` to lazy-load example stages.
- Add per-stage README files if users need to copy examples independently.

### Code review instructions

- Start in `README.md` for the progression overview.
- Then review `src/ExampleWorkspaceApp.tsx` and `src/exampleRegistry.ts`.
- Review new examples under `examples/00-*`, `examples/01-*`, `examples/02-*`, and `examples/04-*`.
- Validate with:

```bash
npm run typecheck
```

### Technical details

Root app responsibilities after this step:

```text
src/main.tsx                 mount OS1 theme root
src/ExampleWorkspaceApp.tsx  render navigation and selected example
src/exampleRegistry.ts       define ordered example stages
```

## Step 3: Validated the implemented workspace

This step validated the scaffold beyond typechecking. It proved that the new root navigator and moved examples compile into a production Vite build and a static Storybook build.

The validation also surfaced a non-blocking bundle-size warning. That warning is acceptable for this teaching workspace, but it identifies the future point at which lazy-loading examples becomes useful.

### Prompt Context

**User prompt (verbatim):** (same as Step 2)

**Assistant interpretation:** Validate the implemented example workspace before recording the implementation as complete.

**Inferred user intent:** Ensure the restructuring did not only typecheck but also builds in the same ways a consumer/demo repo needs to build.

**Commit (code):** `04d9b3b` — "Implement progressive example workspace"

### What I did

- Ran full validation commands:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

- Updated tasks and changelog after validation.
- Related the major implementation files back to the ticket design doc.

### Why

- Vite build and Storybook build catch different issues than `tsc` alone.
- The examples workspace is meant to serve as public-package validation, so it needs to pass the same commands a maintainer would run before release.

### What worked

- `npm run typecheck`: passed.
- `npm run build`: passed and produced `dist/`.
- `npm run build-storybook`: passed and produced `storybook-static/`.
- `docmgr doctor --ticket example-workspaces --stale-after 30`: passed.

### What didn't work

- Storybook/Vite reported large chunk warnings for documentation and rich-widget bundles:

```text
(!) Some chunks are larger than 500 kB after minification.
```

- This was not a build failure, so I left it as a documented warning rather than changing architecture prematurely.

### What I learned

- The eager-import root navigator is acceptable for the first examples workspace, but rich widgets and Storybook docs quickly make bundle-size warnings likely.
- The warning is a future optimization signal, not a correctness blocker.

### What was tricky to build

- The tricky part was avoiding overreaction to the chunk warning. The workspace is intentionally a teaching and validation repo; immediate code-splitting would add complexity before it is necessary.
- I recorded the warning so future maintainers know why it exists and when to revisit it.

### What warrants a second pair of eyes

- Review whether the bundle-size warning should be acceptable for this repo, or whether the public demo app should use lazy loading before more examples are added.

### What should be done in the future

- Introduce lazy-loaded stages if bundle size becomes a user-facing problem or if more heavy widgets are added.

### Code review instructions

- Re-run:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

- Confirm any bundle-size warnings remain warnings only.

### Technical details

Build outputs are ignored local artifacts:

```text
dist/
storybook-static/
```

## Step 4: Browser-smoked the root workspace navigator

This step performed a runtime smoke test in a browser after the static builds passed. It verified that the root navigator rendered and that both the rich-widget stage and the moved control-panel stage could be selected.

The smoke test produced only a harmless missing favicon error. No example-stage runtime errors appeared.

### Prompt Context

**User prompt (verbatim):** (same as Step 2)

**Assistant interpretation:** Confirm the implemented workspace works interactively in a browser, not just in build commands.

**Inferred user intent:** Keep the examples workspace reliable as a human-facing demo, not only as a compile-time artifact.

**Commit (code):** `64bf9cf` — "Record example workspace browser smoke"

### What I did

- Started the Vite dev server:

```bash
npm run dev -- --host 127.0.0.1
```

- Confirmed the root page responded:

```bash
curl -fsS http://127.0.0.1:5173/
```

- Opened `http://127.0.0.1:5173/` in Playwright.
- Clicked:
  - `04 Rich widgets showcase`
  - `03 RTK Query control panel`
- Recorded the smoke test in the diary and changelog.

### Why

- Some package-consumption failures only appear in the browser at runtime.
- The root navigator is interactive state, so it should be browser-smoked after implementation.

### What worked

- The root navigator rendered the stage list.
- Stage 04 rendered without runtime errors.
- Stage 03 rendered the moved control-panel app through the root navigator.

### What didn't work

- Browser console had one harmless missing favicon error:

```text
Failed to load resource: the server responded with a status of 404 (Not Found) @ http://127.0.0.1:5173/favicon.ico:0
```

- I did not fix this because it does not affect package validation or example behavior.

### What I learned

- The moved control-panel app still works when nested under the new navigator and provider handling.
- Browser smoke is worth recording separately from build validation because it catches runtime wiring issues.

### What was tricky to build

- The runtime smoke needed to distinguish real app errors from unrelated browser chrome issues like missing `favicon.ico`.
- I checked console output and snapshots after stage navigation to confirm the favicon 404 was the only error.

### What warrants a second pair of eyes

- Review whether a favicon should be added to eliminate noise in future browser smoke checks.
- Review whether browser smoke should become a scripted Playwright test rather than an ad hoc validation step.

### What should be done in the future

- Add a tiny favicon or ignore rule if the 404 becomes distracting in automated checks.
- Consider a scripted smoke test that clicks each stage in `src/exampleRegistry.ts`.

### Code review instructions

- Run:

```bash
npm run dev -- --host 127.0.0.1
```

- Open `http://127.0.0.1:5173/` and click stages 03 and 04.
- Check browser console for runtime errors.

### Technical details

Relevant commit:

```text
64bf9cf Record example workspace browser smoke
```

## Step 5: Added stage 05 for the published os-shell package

This step completed the progression that had previously been blocked on a shell/window-manager package boundary. After `@go-go-golems/os-shell` was made publishable, I added a real stage-05 example that imports `DesktopShell` and `createLauncherStore` from the public shell package.

The example was validated twice: first against a local tarball artifact before publication, then against `@go-go-golems/os-shell@^0.1.0` from npm after publication.

### Prompt Context

**User prompt (verbatim):** "make os-shell package. Add a design/implementation guide to the ticket, a list of tasks to extract the os-shell package out, then do it, make a set of examples in the demo project (can you build it before publishing?) then publish"

**Assistant interpretation:** Add a demo-project stage that exercises the new public `os-shell` package, validate it before publishing, then keep it on the public npm dependency afterward.

**Inferred user intent:** Turn the planned shell/window-manager stage into a real consumer example once the package boundary exists.

**Commit (code):** `2bb2332` — "Add os-shell window manager example"

### What I did

- Added `@go-go-golems/os-shell` to the standalone consumer app.
- Built:

```text
examples/05-window-manager-shell
```

- The new stage uses:
  - `DesktopShell`
  - `createLauncherStore([])`
  - `DesktopIconDef`
  - a small `RuntimeBundleDefinition`
- Updated `src/exampleRegistry.ts` so stage 05 is implemented instead of planned.
- Updated `README.md` to include stage 05.
- Updated the example-workspaces diary and changelog.
- Committed the demo example.

### Why

- The examples ladder should now show shell/window-manager consumption because `@go-go-golems/os-shell` exists as a public package.
- The stage proves the package can be consumed from a standalone Vite/React app.

### What worked

- Pre-publish validation against a local tarball passed:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

- Post-publish validation against the public npm dependency passed:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

- Browser smoke selected `05 Window manager shell`; it rendered without browser console errors.

### What didn't work

- The first typecheck failed because the shell bundle omitted the required `plugin` field:

```text
Property 'plugin' is missing ... but required in type 'RuntimeBundleDefinition'.
```

- I fixed the example by adding an empty plugin config:

```ts
plugin: {
  packageIds: [],
  bundleCode: '',
},
```

### What I learned

- Even a static shell demo must satisfy the full runtime bundle type.
- Stage 05 is a good place to document minimal shell bundle boilerplate because it is the first example that crosses from widget composition into shell runtime composition.

### What was tricky to build

- The example needed to be small enough to teach `DesktopShell` while still satisfying the real runtime contract.
- The solution was to use simple report surfaces and explicit desktop icons, avoiding rich app registration until later examples need it.

### What warrants a second pair of eyes

- Review whether `WindowManagerShellExample.tsx` should include richer window contents from `os-widgets`, or whether the current static report surfaces are the right first shell example.
- Review whether stage 05 should be split into multiple stages later: basic shell, app registry, rich widget windows, and launcher contributions.

### What should be done in the future

- Add a later shell example that registers `os-widgets` components as app windows through launcher/app module APIs.
- Consider adding a helper API in `os-shell` only if repeated examples show that `RuntimeBundleDefinition` boilerplate is too noisy.

### Code review instructions

- Start with `examples/05-window-manager-shell/src/WindowManagerShellExample.tsx`.
- Then review `src/exampleRegistry.ts` and `README.md`.
- Validate from the public npm dependency with:

```bash
npm install @go-go-golems/os-shell@^0.1.0 --registry https://registry.npmjs.org/
npm run typecheck
npm run build
npm run build-storybook
```

- Browser-smoke the stage:

```bash
npm run dev -- --host 127.0.0.1
```

Then open `http://127.0.0.1:5173/` and select `05 Window manager shell`.

### Technical details

Public dependency after publication:

```json
"@go-go-golems/os-shell": "^0.1.0"
```

Stage path:

```text
examples/05-window-manager-shell/src/WindowManagerShellExample.tsx
```


## Step 6: Added a public os-repl console example

This step added a focused REPL/terminal stage to the progressive examples workspace. The new stage demonstrates `@go-go-golems/os-repl` as a standalone public package rather than only as a dependency that can be pulled in through richer widgets.

The example uses `MacRepl` with a custom driver layered on top of the built-in demo driver. That makes the stage useful for teaching both the default terminal UI and the extension points consumers use to connect REPL commands to host app behavior.

### Prompt Context

**User prompt (verbatim):** "ok, make a repl rexample"

**Assistant interpretation:** Add a new examples-workspace stage that demonstrates the published `@go-go-golems/os-repl` package.

**Inferred user intent:** Show the REPL package as its own public building block in the demo progression, similar to the shell/window-manager stage.

**Commit (code):** pending at time of diary update.

### What I did

- Installed the direct public dependency:

```bash
npm install @go-go-golems/os-repl@^0.1.1 --registry https://registry.npmjs.org/
```

- Added:

```text
examples/06-repl-console/src/ReplConsoleExample.tsx
examples/06-repl-console/src/ReplConsoleExample.css
examples/06-repl-console/src/ReplConsoleExample.stories.tsx
examples/06-repl-console/src/index.ts
```

- Updated `src/exampleRegistry.ts` with stage `06 REPL console`.
- Updated `README.md` with the stage-06 row and direct `@go-go-golems/os-repl` dependency.
- The example imports `@go-go-golems/os-repl/theme` and renders `MacRepl`.
- Added a custom `ReplDriver` that handles:
  - `status`
  - `open notes`
  - `effect ping`
  - custom completions
  - custom help for `help example`
- Delegated unknown commands to `BUILTIN_DEMO_REPL_DRIVER`.

### Why

- `os-repl` deserves a direct public example because it is a separate package with its own UI, state, command, completion, help, and effect contracts.
- A custom driver example is more useful than rendering only the default REPL because it shows how a host app can bridge commands to surrounding app behavior.

### What worked

Validation passed:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

Browser smoke passed:

```bash
npm run dev -- --host 127.0.0.1
curl -fsS http://127.0.0.1:5173/
```

Then I opened the root navigator and selected `06 REPL console`. It rendered with no browser console errors.

### What didn't work

- No implementation blocker occurred in this step.
- Storybook still reports the existing large-chunk warning for docs/rich examples, but the build completes successfully.

### What I learned

- `MacRepl` can be consumed without registering a Redux slice because it falls back to standalone local reducer mode when `MAC_REPL_STATE_KEY` is not present in the surrounding Redux store.
- This makes `os-repl` a good early example stage: it is interactive but does not require users to learn store wiring first.

### What was tricky to build

- The custom driver needed to preserve built-in command behavior while adding example-specific commands. The solution was to implement custom commands first and delegate all unknown inputs to `BUILTIN_DEMO_REPL_DRIVER.execute()`.
- Effects are intentionally generic, so the example needed a small host-side effect panel to make `onEffects` visible without requiring a full shell integration.

### What warrants a second pair of eyes

- Review whether `open notes` should only emit an effect or whether a future shell-integrated example should actually open a stage-05 shell window.
- Review whether importing `@go-go-golems/os-repl/theme` inside the example component is the right pattern, or whether it should move to Storybook/root app theme imports.
- Review whether stage 06 should come before stage 05 in the learning order, since REPL is simpler than shell.

### What should be done in the future

- Add a later shell+REPL integration example that registers a REPL app inside `DesktopShell`.
- Consider adding scripted tests for built-in REPL commands if command behavior becomes critical to package releases.

### Code review instructions

- Start with `examples/06-repl-console/src/ReplConsoleExample.tsx`.
- Review `createExampleDriver()` for custom command semantics and fallback behavior.
- Review `src/exampleRegistry.ts` to confirm stage ordering and package labels.
- Validate with:

```bash
npm run typecheck
npm run build
npm run build-storybook
npm run dev -- --host 127.0.0.1
```

- In the browser, select `06 REPL console` and try commands:

```text
status
open notes
effect ping
fortune
help example
```

### Technical details

The example relies on these public `os-repl` exports:

```ts
import {
  BUILTIN_DEMO_REPL_DRIVER,
  MacRepl,
  type ReplDriver,
  type ReplEffect,
  type TerminalLine,
} from '@go-go-golems/os-repl';
```

The example stage path is:

```text
examples/06-repl-console/src/ReplConsoleExample.tsx
```


## Step 7: Added the local package debug playbook and verified the REPL focus fix in the demo

This step converted the REPL focus investigation into a repeatable workflow. The important operational change is that package bugs exposed by the examples workspace should not be debugged by repeatedly publishing npm patches; they should be reproduced locally, validated through package dist, and published once after the fix is known.

After `@go-go-golems/os-repl@0.1.5` and `@go-go-golems/os-widgets@0.1.2` were published, the demo was updated to use those public versions. The dependency tree now dedupes to one fixed `os-repl` version, and the stage 06 REPL example keeps focus after Enter when tested from a fresh Vite dev server.

### Prompt Context

**User prompt (verbatim):** "ok, do the clean fix."

**Assistant interpretation:** Finish the REPL focus fix using the local-debug workflow, publish only the verified package patches, and update the demo to consume the fixed versions.

**Inferred user intent:** Get the REPL example back to a clean package-consumer state with the focus bug fixed and without temporary tarball dependencies.

**Commit (code):** pending at time of diary update.

### What I did

- Added playbook:

```text
ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/playbooks/02-local-package-debug-workflow.md
```

- Updated demo dependencies to:

```json
"@go-go-golems/os-repl": "^0.1.5",
"@go-go-golems/os-widgets": "^0.1.2"
```

- Verified dependency dedupe:

```bash
npm ls @go-go-golems/os-repl
```

Result:

```text
npm-go-go-os-test@0.1.0
├── @go-go-golems/os-repl@0.1.5
└─┬ @go-go-golems/os-widgets@0.1.2
  └── @go-go-golems/os-repl@0.1.5 deduped
```

- Re-ran demo validation:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

- Browser-smoked stage `06 REPL console` from a fresh Vite dev server after clearing stale cache/server state.

### Why

- The demo should consume public npm versions, not `/tmp/*.tgz` files or local dist paths, in committed state.
- The playbook captures the workflow that avoided further noisy npm patch releases.
- Dedupe matters because an old nested `os-repl` under `os-widgets` can preserve stale focus behavior even when the app has a newer direct dependency.

### What worked

- `npm ls @go-go-golems/os-repl` showed one deduped fixed version.
- `npm run typecheck`, `npm run build`, and `npm run build-storybook` passed.
- Browser focus smoke for `effect ping` after cache reset returned:

```text
activeTag: INPUT
activePart: repl-input
```

### What didn't work

- Before clearing Vite cache and old dev servers, the demo still appeared to lose focus even with fixed packages installed.
- The stale result was misleading because package-local repro and installed package code showed the fix. Restarting from a fresh dev server and clearing `node_modules/.vite` resolved the mismatch.

### What I learned

- For Vite dependency debugging, always clear `node_modules/.vite` and kill old dev servers when switching between tarballs, local dist installs, and registry installs.
- `npm ls` is mandatory after patching package families with transitive dependencies.

### What was tricky to build

- The full demo had multiple moving parts: direct `os-repl`, transitive `os-repl` through `os-widgets`, Vite prebundling, and browser focus state. Any stale layer could make the fix look ineffective.
- The stable method was to verify the fix in the package repro first, then verify installed package files, then verify dependency dedupe, then run the browser smoke against a fresh dev server.

### What warrants a second pair of eyes

- Review whether `playbooks/02-local-package-debug-workflow.md` should also live in the publication repo, not only the examples ticket.
- Review whether the stage 06 REPL example should gain a committed Playwright test that asserts focus after Enter.

### What should be done in the future

- Add a scripted browser regression for `06 REPL console` so focus behavior is not manually checked.
- Add a package release checklist item to run `npm ls` for package families with nested package dependencies.

### Code review instructions

- Review `playbooks/02-local-package-debug-workflow.md`.
- Review `package.json` and `package-lock.json` to confirm registry dependencies are used:
  - `@go-go-golems/os-repl@^0.1.5`
  - `@go-go-golems/os-widgets@^0.1.2`
- Validate:

```bash
npm ls @go-go-golems/os-repl
npm run typecheck
npm run build
npm run build-storybook
npm run dev -- --host 127.0.0.1 --force
```

- In the browser, select `06 REPL console`, type `effect ping`, press Enter, and confirm focus remains on the input.

### Technical details

Fresh dev-server reset used during validation:

```bash
rm -rf node_modules/.vite
fuser -k 5173/tcp
npm run dev -- --host 127.0.0.1 --force
```


## Step 8: Rendered VM host notifications in the shared VM example host

The `Notify host` button in stage 08 was dispatching the expected `notify.show` runtime action, but the standalone VM example host did not render the notification slice as a toast. I fixed the shared `VmExampleHost` so VM examples mount a connected toast presenter next to `RuntimeSurfaceSessionHost`.

This makes stage 08 demonstrate the full host-notification loop: QuickJS handler emits `notify.show`, the runtime action router validates and dispatches `showToast`, the shared host reads `notifications.toast`, and `Toast` renders the message for users.

### Prompt Context

**User prompt (verbatim):** ""Notify host" in "VM events and intents" doesn't seem to work. 

Btw, make sure to keep a diary, (see skill if you haven't already seen it in your system prompt)"

**Assistant interpretation:** Debug the stage 08 `Notify host` behavior, fix the visible host notification path, validate it in the browser, and record the work in the diary.

**Inferred user intent:** Make the VM event/intents example prove host-facing runtime actions visibly work, not only internal draft-state updates.

**Commit (code):** `529228f` — "Render VM host notifications"

### What I did

- Re-read the diary skill before changing code.
- Reproduced the bug in the browser with Vite dev:

```bash
npm run dev -- --host 127.0.0.1 --force
```

- Browser repro result before the fix after clicking `Notify host`:

```json
{"hasToast":0,"toastText":null,"bodyHasNotificationText":0}
```

- Inspected the stage 08 bundle and host:
  - `examples/08-vm-events-and-intents/src/eventsBundle.vm.js`
  - `examples/08-vm-events-and-intents/src/VmEventsAndIntentsExample.tsx`
  - `examples/shared/src/VmExampleHost.tsx`
- Confirmed package-side routing already supports `notify.show` through `showToast` in `@go-go-golems/os-scripting`.
- Updated `examples/shared/src/VmExampleHost.tsx` to render a connected `VmExampleToast` using:
  - `selectToast`
  - `clearToast`
  - `Toast`
- Validated:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

- Browser-smoked stage 08 again. After clicking `Notify host`, Playwright observed:

```json
{"hasToast":1,"toastText":"Notification dispatched from QuickJS"}
```

### Why

- `notify.show` is a host-facing system intent; a consumer demo must include a host presenter if it wants users to see the notification.
- The VM examples use an isolated Redux store created by `createAppStore({})`, so dispatching `showToast` only updates that local store unless a component reads and renders `notifications.toast`.

### What worked

- The existing runtime action pipeline was correct:
  - QuickJS handler dispatches `{ type: 'notify.show', payload: { message } }`.
  - `dispatchRuntimeAction` authorizes `notify.show` using the runtime session capabilities.
  - `pluginIntentRouting.ts` maps the runtime action to `showToast(message)`.
- Adding a small connected toast presenter in the shared VM host made the existing pipeline visible.
- Typecheck, production build, Storybook build, and browser smoke passed.

### What didn't work

- Before the fix, clicking `Notify host` produced no visible DOM change:

```json
{"hasToast":0,"toastText":null,"bodyHasNotificationText":0}
```

- There was no package runtime failure or console error to chase. The missing piece was the demo host UI, not the QuickJS handler or runtime action routing.

### What I learned

- The VM host examples intentionally use isolated stores. That keeps examples self-contained, but it also means every host-visible effect needs a presenter in the same provider boundary.
- `notify.show` can be correctly routed and still appear broken if no `Toast` component subscribes to the notification slice.

### What was tricky to build

- The symptom looked like the button handler might not run, but `Increment in VM` and other runtime actions worked. The correct distinction was draft-state actions versus host-system actions: draft patches re-render the VM surface directly, while notifications require separate host chrome.
- The fix had to live inside the `Provider` created by `VmExampleHost`; rendering a toast outside that provider would subscribe to the wrong or missing Redux store.

### What warrants a second pair of eyes

- Review whether every VM example should always mount the toast presenter, or whether `VmExampleHost` should eventually expose an opt-out prop for examples that want custom host chrome.
- Review whether host notification rendering belongs in the reusable published package as an optional helper, not only in the consumer examples workspace.

### What should be done in the future

- Add a scripted Playwright regression for stage 08 that clicks `Notify host` and asserts the `data-part="toast"` text.

### Code review instructions

- Start with `examples/shared/src/VmExampleHost.tsx`.
- Confirm `VmExampleToast` is rendered inside the `Provider` that owns the store returned by `createAppStore({})`.
- Validate:

```bash
npm run typecheck
npm run build
npm run build-storybook
npm run dev -- --host 127.0.0.1 --force
```

- In the browser, select `08 VM events and intents`, click `Notify host`, and confirm the toast says `Notification dispatched from QuickJS`.

### Technical details

The runtime bundle already declared the system capability:

```ts
capabilities: {
  domain: [],
  system: ['notify.show'],
}
```

The QuickJS handler already dispatched the intent:

```js
notify(ctx) {
  ctx.dispatch({ type: 'notify.show', payload: { message: 'Notification dispatched from QuickJS' } });
}
```

The missing rendering layer is now:

```tsx
function VmExampleToast() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => selectToast(state));

  if (!toast) {
    return null;
  }

  return <Toast message={toast} onDone={() => dispatch(clearToast())} />;
}
```


## Step 9: Updated VM demo dependencies and silenced the favicon 404

I updated the standalone examples workspace to consume the newly published VM README/doc patch releases and added favicon assets so fresh browser smoke runs no longer report the default `/favicon.ico` 404. This keeps the demo aligned with the public npm package pages and removes the last distracting console error from manual validation.

The app now links an SVG favicon and also serves `/favicon.ico` for browser fallback behavior. Vite dev, production build, and Storybook all continue to work with the VM package family at `0.1.2`.

### Prompt Context

**User prompt (verbatim):** "do 4. 
5. silence 404"

**Assistant interpretation:** Apply the VM package README/docs release in the consumer app and add favicon assets so browser validation is clean.

**Inferred user intent:** Keep the demo consuming the latest public packages and eliminate harmless but noisy browser-console 404s.

**Commit (code):** `e42c0da` — "Update VM package docs release and favicon"

### What I did

- Updated demo dependencies and lockfile to consume:

```text
@go-go-golems/os-scripting@0.1.2
@go-go-golems/os-ui-cards@0.1.2
@go-go-golems/os-kanban@0.1.2
```

- Added favicon assets:
  - `public/favicon.svg`
  - `public/favicon.ico`
- Linked the favicon assets from `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" href="/favicon.ico" />
```

- Verified favicon routes:

```bash
curl -fsSI http://127.0.0.1:5173/favicon.ico
curl -fsSI http://127.0.0.1:5173/favicon.svg
```

Both returned HTTP 200.

- Validated the app:

```bash
npm ls @go-go-golems/os-scripting @go-go-golems/os-ui-cards @go-go-golems/os-kanban
npm run typecheck
npm run build
npm run build-storybook
npm run dev -- --host 127.0.0.1 --force
```

- Browser-smoked the root app plus VM stages 08 and 09. Playwright reported zero console errors.

### Why

- The public package docs release should be reflected by the consumer app's lockfile, not only by semver ranges.
- The favicon 404 was harmless, but it made smoke-test output look dirty and could hide real errors during quick browser checks.

### What worked

- `npm ls` showed all three VM packages deduped at `0.1.2`.
- `/favicon.ico` and `/favicon.svg` both returned HTTP 200 from the Vite dev server.
- Typecheck, production build, and Storybook build passed.
- Browser smoke of stage 08 notification and stage 09 Kanban runtime completed with no console errors.

### What didn't work

- N/A. The favicon assets and package update worked on the first validation pass.

### What I learned

- Adding both an explicit SVG favicon link and an `.ico` fallback is the simplest way to keep browser behavior clean across favicon-loading implementations.
- Even docs-only package releases are worth pulling into the demo lockfile when the demo is the canonical consumer reference.

### What was tricky to build

- The favicon issue was not caused by React or Vite routing; it was the browser's default request for `/favicon.ico`. The fix needed a real static asset in `public/`, not a React route.
- The package docs release did not change runtime code, but updating the lockfile proves a clean consumer can install the latest published versions.

### What warrants a second pair of eyes

- Review the favicon artwork if visual branding matters; it is intentionally minimal.
- Review whether the examples workspace should also add Playwright tests now that console output is clean.

### What should be done in the future

- Add Playwright regressions for stages 06-09 and assert zero unexpected browser console errors.

### Code review instructions

- Review `index.html` and `public/favicon.svg` / `public/favicon.ico`.
- Review `package.json` and `package-lock.json` for `0.1.2` package resolution.
- Validate:

```bash
npm ls @go-go-golems/os-scripting @go-go-golems/os-ui-cards @go-go-golems/os-kanban
npm run typecheck
npm run build
npm run build-storybook
npm run dev -- --host 127.0.0.1 --force
```

- In the browser, open the root app and confirm the console has no `/favicon.ico` 404.

### Technical details

Dependency tree after update:

```text
@go-go-golems/os-kanban@0.1.2
├── @go-go-golems/os-scripting@0.1.2 deduped
└── @go-go-golems/os-ui-cards@0.1.2 deduped
@go-go-golems/os-scripting@0.1.2
@go-go-golems/os-ui-cards@0.1.2
```

Favicon validation returned:

```text
HTTP/1.1 200 OK
Content-Type: image/x-icon

HTTP/1.1 200 OK
Content-Type: image/svg+xml
```

## Step 10: Added runtime-stage browser regressions

I added automated browser coverage for the examples that had already exposed package-boundary regressions during manual validation. The goal was to turn the known stage 06, 08, and 09 failures into repeatable checks: REPL focus after command submission, VM host notification rendering, and Kanban theme CSS preservation in the browser bundle.

This step also added a production CSS selector check for the Kanban theme. The browser test proves computed styles at runtime; the CSS script proves the built Vite stylesheet still contains the selectors that production tree-shaking previously removed.

### Prompt Context

**User prompt (verbatim):** "continue, keep diary, commit at appropriate intervals. Once you get to the dashboardUX, stop and let me know"

**Assistant interpretation:** Continue implementing the next documented follow-ups for the go-go-os examples work, keep the ticket diary current, commit focused changes, and stop if work reaches an item or area named `dashboardUX`.

**Inferred user intent:** Convert the remaining manual validation findings into durable regressions without running past the next larger UI/design phase marker.

**Commit (code):** 01590a0 — "Add runtime stage browser regressions"

### What I did
- Added `@playwright/test` as a dev dependency.
- Added `playwright.config.ts` with a Vite web server and a Chromium project.
- Added `tests/e2e/runtime-stages.spec.ts` covering:
  - stage 06 REPL focus after submitting `status`;
  - stage 08 `Notify host` toast text;
  - stage 09 Kanban runtime text, computed layout styles, and CSS rule presence.
- Added `scripts/check-kanban-css.mjs` to fail when built CSS does not include representative Kanban selectors.
- Added npm scripts:
  - `test:e2e`
  - `test:e2e:ui`
  - `check:kanban-css`
- Added `test-results/` and `playwright-report/` to `.gitignore`.
- Ran validation:
  - `npm run build`
  - `npm run check:kanban-css`
  - `npm run test:e2e`

### Why
- Stage 06 had previously caught a real package bug where `disabled` blurred the REPL input after Enter.
- Stage 08 had previously caught a host/provider boundary issue where `notify.show` dispatched correctly but no toast presenter was mounted.
- Stage 09 had previously caught a production-only CSS side-effect metadata issue in `@go-go-golems/os-kanban`.
- These regressions are package-boundary contracts, so they should be executable checks rather than only diary notes.

### What worked
- `npm run build` completed successfully.
- `npm run check:kanban-css` found `[data-part=kb-board]`, `[data-part=kb-card]`, and `[data-part=kb-column]` in the built CSS.
- After installing the Playwright Chromium browser, all three e2e tests passed.

### What didn't work
- The first `npm run test:e2e` failed because Playwright had been installed but its browser binary was not present locally:

```text
Error: browserType.launch: Executable doesn't exist at /home/manuel/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
Looks like Playwright was just installed or updated.
Please run the following command to download new browsers:

    npx playwright install
```

- I resolved this local validation failure with:

```bash
npx playwright install chromium
```

### What I learned
- The examples app now has enough surface area that manual browser smoke checks should not remain the only protection.
- The Kanban CSS regression needs both a runtime computed-style assertion and a static production-build selector assertion because either layer can fail independently.
- Installing `@playwright/test` updates package metadata, but local browser binaries remain an operator/environment setup step.

### What was tricky to build
- The tests need to assert user-visible behavior while avoiding brittle implementation details. The Kanban test uses `data-part` selectors because those are the package theming contract, not incidental DOM classes.
- Console-error checks are per-test so unrelated later tests do not inherit stale browser messages.

### What warrants a second pair of eyes
- The Playwright config currently downloads/runs only Chromium; CI may need `npx playwright install --with-deps chromium` or the official Playwright GitHub Action setup if Linux dependencies are missing.
- The CSS selector script checks representative selectors, not the full theme. That is intentional, but reviewers should confirm the chosen selectors are stable package contracts.

### What should be done in the future
- Wire `npm run build`, `npm run check:kanban-css`, and `npm run test:e2e` into CI for the public examples repository.
- Consider adding a separate production-server Playwright pass against `dist/` rather than only Vite dev.

### Code review instructions
- Start with `tests/e2e/runtime-stages.spec.ts` and confirm each test maps to a previously observed failure mode.
- Review `scripts/check-kanban-css.mjs` for the production CSS selector contract.
- Validate with:

```bash
npm run build
npm run check:kanban-css
npm run test:e2e
```

### Technical details
- The REPL focus assertion uses `[data-part="repl-input"]` and `toBeFocused()`.
- The VM notification assertion clicks the `Notify host` button and expects `Notification dispatched from QuickJS`.
- The Kanban assertion checks:

```json
{
  "kbDisplay": "flex",
  "boardDisplay": "flex",
  "boardOverflowX": "auto",
  "columnWidth": "200px",
  "hasKanbanCssRule": true
}
```

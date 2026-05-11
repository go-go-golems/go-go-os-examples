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
    - Path: src/ExampleWorkspaceApp.tsx
      Note: root navigator implemented in diary step 2
    - Path: src/exampleRegistry.ts
      Note: stage registry updated in diary steps 2 and 5
    - Path: ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages/design-doc/01-progressive-example-workspaces-design-and-implementation-guide.md
      Note: design guide created in diary step 1
ExternalSources: []
Summary: Chronological planning and implementation diary for the progressive example workspaces initiative built on top of published go-go-os frontend packages.
LastUpdated: 2026-05-11T17:55:00-04:00
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

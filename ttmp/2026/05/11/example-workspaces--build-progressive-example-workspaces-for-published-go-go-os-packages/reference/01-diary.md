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
RelatedFiles: []
ExternalSources: []
Summary: "Chronological planning diary for the progressive example workspaces initiative built on top of published go-go-os frontend packages."
LastUpdated: 2026-05-11T16:55:00-04:00
WhatFor: "Use this diary to understand why the example workspace ticket exists, what progression is proposed, and how future implementation should proceed."
WhenToUse: "Read before restructuring the consumer repo or adding later-stage examples."
---

# Diary

## Goal

This diary records the planning work for turning the standalone npm consumer repository into a progression of example workspaces that teach the published `@go-go-golems` package family from low-level primitives to richer widgets and eventually shell or window-manager-oriented surfaces.

## Step 1: Created the ticket and wrote the first design guide

I created a new docmgr ticket because the examples-workspace effort is not the same task as package publication and not the same task as building the first standalone control panel. The new ticket isolates the next architectural problem: how to turn one working app into a structured learning and validation ladder.

### Prompt Context

**User prompt (verbatim):** "ok, let's write the readmes, and then I want you to create a new docmgr ticket for building example workspaces. We can skip the devctl one, but I then want to continue showing features of the packages, including starting to package larger pieces and widgets, as building blocks but also moving to the window manager side of things, etc... This might require packaging more packages though, not sure.

Create  a detailed analysis / design / implementation guide that is for a new intern, explaining all the parts of the system needed to understand what it is, with prose paragraphs and bullet point sand pseudocode and diagrams and api references and file references. It should be very clear and technical. Store in the ticket and the nupload to remarkable.


anyway readmes first, new ticket + design guide / implementation guide next."

**Assistant interpretation:** First add README files to the published packages, then create a separate docmgr ticket that plans the next repo evolution into progressively more advanced example workspaces, with intern-grade design documentation and a reMarkable upload.

**Inferred user intent:** Move from one successful proof-of-consumption app to a durable teaching and package-validation workspace that can grow toward richer widgets and eventually shell-level examples.

**Commit (code):** N/A — planning and documentation step only.

### What I did

- Created ticket `example-workspaces` in the standalone consumer repo.
- Added a design doc and this diary.
- Wrote a task list for restructuring the repo into multiple numbered examples.
- Wrote a detailed design guide describing:
  - why one repo is preferable to many repos initially
  - why the examples should be numbered and conceptually staged
  - which example stages map to which published packages
  - where later-stage examples may require additional package publication

### Why

- The standalone control-panel app is already useful, but it is too complex to be the first teaching surface.
- The next problem is repository pedagogy and public package evolution, not raw consumer viability.

### What worked

- The ticket and docs were created successfully.
- The design guide established a six-stage progression model from theme smoke to shell/window-manager examples.

### What didn't work

- N/A.

### What I learned

- The package family now has enough public surface for a real examples ladder, but not necessarily enough for the final shell-oriented stages without more packaging work.

### What was tricky to build

- The guidance had to separate what is feasible with the currently published packages from what is only a future direction if additional packages such as `os-shell` become public.

### What warrants a second pair of eyes

- Review the proposed example numbering and whether the current control-panel app belongs at stage 03 or stage 04.
- Review whether the shell/window-manager stage should be split into multiple later tickets rather than one final example.

### What should be done in the future

- Upload the new ticket bundle to reMarkable.
- After approval, implement the workspace restructuring in small commits.
- Add root-level progression docs and begin with the simplest examples first.

### Code review instructions

- Read the design guide first, then the task list.
- Validate with `docmgr doctor --ticket example-workspaces --stale-after 30`.

### Technical details

Ticket path:

```text
ttmp/2026/05/11/example-workspaces--build-progressive-example-workspaces-for-published-go-go-os-packages
```


## Step 2: Implemented the examples workspace scaffold

### Prompt Context

**User prompt (verbatim):** "Ok, implement example-workspaces ticket, use a diary, commit at appropriate intervals."

**Assistant interpretation:** Start implementing the previously planned progressive examples, keep the diary updated, and create focused commits as coherent implementation slices are validated.

**Inferred user intent:** Convert the single consumer app into a real progressive example workspace without starting unrelated devctl or release-automation work.

**Commit (code):** pending at time of writing this diary entry.

### What I did

- Committed the previously created ticket and planning docs first so the implementation starts from a clean documented baseline.
- Moved the original `src/` app into `examples/03-rtk-query-control-panel/src/` so it becomes one later-stage example rather than the root app.
- Added shared example infrastructure under `examples/shared/src/`.
- Added implemented examples:
  - `examples/00-theme-smoke/`
  - `examples/01-os-core-primitives/`
  - `examples/02-local-state-forms/`
  - `examples/04-rich-widgets/`
- Replaced the root `src/` app with a workspace navigator that selects examples by stage.
- Added a planned placeholder for the shell/window-manager stage.
- Updated Storybook to load stories from both `src/` and `examples/`.
- Updated package dependencies to consume the published `0.1.1` packages.
- Added a repository README with run commands and the example ladder.

### Validation

```bash
npm run typecheck
```

Result: passed after correcting two API mismatches.

### What failed and how I fixed it

- I initially used `FieldRow` as a generic children wrapper. The public `FieldRow` API takes `{ field, value, onChange }`, so I replaced those uses with local layout rows for the examples.
- I initially configured `ChartView` with `availableTypes={['line', 'bar', 'area']}`. The public `ChartType` union is `line | bar | pie | scatter`, so I changed `area` to `scatter`.

### What was tricky

- Keeping the original control-panel example intact while making it no longer be the root app required moving the whole previous source tree under `examples/03-rtk-query-control-panel/src/` and then making the new root app only a navigator.
- Storybook paths needed to include both the new examples and the moved original stories.

### What warrants review

- The new root app imports the example components directly. This is simple and good for a teaching workspace, but if the examples become very heavy, later work may split each stage into lazy-loaded routes.

### Next step

Full build and Storybook build passed. Update tasks/changelog and commit the implementation slice.


## Step 3: Validated the implemented workspace

### Validation commands

```bash
npm run typecheck
npm run build
npm run build-storybook
```

### Results

- `npm run typecheck`: passed.
- `npm run build`: passed; Vite produced `dist/` successfully.
- `npm run build-storybook`: passed; Storybook produced `storybook-static/` successfully.

### Warnings

Storybook/Vite reported large chunk warnings for documentation and rich-widget bundles. This is expected for the current eager-import teaching workspace. If the example set grows, the next optimization should be lazy-loading stage components from the root navigator.

### Package-boundary decision

The implemented examples stop at the rich-widget level because the shell/window-manager stage should not be implemented until an explicit public package boundary exists for the shell package surface. The root navigator includes a planned stage 05 placeholder to document this boundary.


## Step 4: Browser-smoked the root workspace navigator

### Validation commands

```bash
npm run dev -- --host 127.0.0.1
curl -fsS http://127.0.0.1:5173/
```

Then I opened `http://127.0.0.1:5173/` in Playwright and clicked:

- `04 Rich widgets showcase`
- `03 RTK Query control panel`

### Results

- The root navigator rendered the stage list.
- Stage 04 rendered without runtime errors.
- Stage 03 rendered the moved control-panel app through the root navigator.
- Browser console had one harmless 404 for `/favicon.ico`.

### Commit

- `04d9b3b Implement progressive example workspace`

---
Title: Local package debug workflow for go-go-os examples
Ticket: example-workspaces
Status: active
Topics:
    - react
    - storybook
    - npm
    - design-system
    - widgets
DocType: playbook
Intent: operational
Owners: []
RelatedFiles: []
ExternalSources: []
Summary: "Playbook for debugging published go-go-os package bugs locally without repeatedly publishing npm patch versions."
LastUpdated: 2026-05-11T18:05:00-04:00
WhatFor: "Use when a demo example exposes a package bug and the fix needs a fast local edit/test loop before one final publish."
WhenToUse: "Use before editing package source for bugs reproduced in the standalone examples workspace, especially os-repl/os-shell/os-widgets focus or runtime issues."
---

# Local Package Debug Workflow

## Goal

Debug package behavior locally without publishing every experimental patch version.

Use this workflow when the standalone examples workspace reveals a package bug, such as `MacRepl` losing focus after Enter. The loop should be:

```text
reproduce locally
write or script a focused regression
fix against local source or local dist
validate the package artifact
publish once
switch the demo back to public npm
```

## Why this playbook exists

npm versions are immutable. Publishing each attempted fix creates noisy public versions and makes it harder to know which patch actually contains the verified behavior.

Instead, use local source aliases or local dist installs for the inner loop, then publish only after the bug is understood and validated.

## Phase 0: Clean up experimental state

Before starting a debug loop, make both repos intentional.

In `go-go-os-frontend`, inspect package changes:

```bash
cd go-go-os-frontend
git status --short
```

If there are failed experimental changes, either commit them intentionally or revert them:

```bash
git checkout -- packages/os-repl/package.json packages/os-repl/src/MacRepl.tsx packages/os-repl/src/ReplInputLine.tsx
rm -f packages/os-repl/.tsconfig.build-dist.tmp.json
```

In the demo repo, restore package dependencies away from temporary tarballs:

```bash
cd 2026-05-11--npm-go-go-os-test
npm install @go-go-golems/os-repl@^0.1.4 --registry https://registry.npmjs.org/
```

Use the actual latest known-good-or-known-buggy published version for reproduction.

## Phase 1: Reproduce inside the package first

Prefer an in-package repro before using the full examples workspace.

For `os-repl`, create either:

- a Storybook story that renders the smallest `MacRepl` surface, or
- a local Vite/Playwright harness if Storybook is too heavy.

The repro should answer one question:

```text
After typing a command and pressing Enter, is the REPL input still focused?
```

A Playwright assertion should look conceptually like:

```ts
await input.click();
await page.keyboard.type('status');
await page.keyboard.press('Enter');
await expect(input).toBeFocused();
```

If the bug reproduces in-package, fix it there first.

## Phase 2: Use source alias for fast demo debugging

For rapid demo debugging, temporarily point Vite at local package source.

In `2026-05-11--npm-go-go-os-test/vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@go-go-golems/os-repl': path.resolve(
        __dirname,
        '../go-go-os-frontend/packages/os-repl/src/index.ts',
      ),
      '@go-go-golems/os-repl/theme': path.resolve(
        __dirname,
        '../go-go-os-frontend/packages/os-repl/src/theme.css',
      ),
    },
  },
});
```

Then run Vite with cache reset:

```bash
rm -rf node_modules/.vite
npm run dev -- --host 127.0.0.1 --force
```

Do not publish during this loop.

## Phase 3: Validate through local dist before publishing

Once the source fix works, test the publish artifact locally.

```bash
cd go-go-os-frontend
npm run typecheck -w packages/os-repl
npm test -w packages/os-repl
npm run build:dist -w packages/os-repl
```

Then install local dist into the demo repo:

```bash
cd ../2026-05-11--npm-go-go-os-test
npm install ../go-go-os-frontend/packages/os-repl/dist
rm -rf node_modules/.vite
npm run typecheck
npm run build
npm run build-storybook
npm run dev -- --host 127.0.0.1 --force
```

Run the same Playwright focus script against the demo.

## Phase 4: Publish once

Only after source and local-dist validation pass:

```bash
cd go-go-os-frontend
npm run build:dist -w packages/os-repl
npm publish --access public ./packages/os-repl/dist
```

Then switch the demo to the public version:

```bash
cd ../2026-05-11--npm-go-go-os-test
npm install @go-go-golems/os-repl@^VERSION --registry https://registry.npmjs.org/
```

Re-run:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

And browser-smoke the relevant example.

## Phase 5: Diary and commits

Use the strict diary format.

For each meaningful implementation step, record:

- exact user prompt
- what changed
- why
- what worked
- what failed, with exact commands/errors
- what was tricky
- review instructions
- validation commands
- commit hashes

Commit code first, then diary/changelog updates.

## Rules

- Do not publish during exploratory debugging.
- Do not leave demo `package.json` pointing at `/tmp/*.tgz` in a final commit.
- Do not commit temporary source aliases unless they are explicitly documented as a permanent development mode.
- Prefer a package-local regression before changing the full demo app.
- Always validate the final dist artifact before publishing.

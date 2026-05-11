# go-go-os Published Package Examples

This repository is a standalone consumer workspace for the public `@go-go-golems/*` npm packages. It intentionally installs packages from npm instead of using monorepo workspace aliases.

The root app is only a navigator. Implemented learning stages live under `examples/`.

## Run

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run storybook
npm run build-storybook
```

## Example progression

| Stage | Directory | Purpose |
| --- | --- | --- |
| 00 | `examples/00-theme-smoke` | Minimal theme imports and root wrapper contract. |
| 01 | `examples/01-os-core-primitives` | Low-level primitives from `@go-go-golems/os-core`. |
| 02 | `examples/02-local-state-forms` | Local React state composed with core and widget primitives. |
| 03 | `examples/03-rtk-query-control-panel` | Original RTK Query control-panel app moved into the progression. |
| 04 | `examples/04-rich-widgets` | Larger widgets and sample-data helpers from `@go-go-golems/os-widgets`. |
| 05 | `examples/05-window-manager-shell` | Desktop shell/window-manager consumption through `@go-go-golems/os-shell`. |
| 06 | `examples/06-repl-console` | REPL/terminal consumption through `@go-go-golems/os-repl`. |
| 07 | `examples/07-vm-ui-card` | Minimal QuickJS runtime bundle rendered as a `ui.card.v1` surface. |
| 08 | `examples/08-vm-events-and-intents` | VM handlers dispatch `draft.patch` and `notify.show` runtime actions. |
| 09 | `examples/09-vm-kanban-runtime` | Higher-level `kanban.v1` runtime package rendered from a VM-authored tree. |

## Theme contract

Every standalone app and Storybook story should import:

```ts
import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
import '@go-go-golems/os-widgets/theme';
```

Then wrap rendered content with:

```tsx
<div data-widget="hypercard" className="theme-macos1">
  <App />
</div>
```

## Package policy

This repo is a consumer app. Keep dependencies pointed at public npm versions such as:

```json
{
  "@go-go-golems/os-core": "^0.1.1",
  "@go-go-golems/os-widgets": "^0.1.2",
  "@go-go-golems/os-shell": "^0.1.0",
  "@go-go-golems/os-repl": "^0.1.5",
  "@go-go-golems/os-scripting": "^0.1.0",
  "@go-go-golems/os-ui-cards": "^0.1.0",
  "@go-go-golems/os-kanban": "^0.1.0"
}
```

Do not replace them with sibling workspace aliases when validating public releases.

## VM package note

The VM examples consume `.vm.js?raw` assets from published packages. Vite dev dependency optimization needs those packages excluded so the raw imports are handled by Vite instead of esbuild prebundling. This repo configures that in `vite.config.ts` and `.storybook/main.ts` for:

```ts
[
  '@go-go-golems/os-scripting',
  '@go-go-golems/os-ui-cards',
  '@go-go-golems/os-kanban',
]
```

The `debug` package is explicitly included in dependency optimization because excluded VM packages import it through published browser code.

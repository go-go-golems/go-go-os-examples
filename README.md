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
| 05 | planned | Shell/window-manager examples after the public package boundary exists. |

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
  "@go-go-golems/os-widgets": "^0.1.1"
}
```

Do not replace them with sibling workspace aliases when validating public releases.

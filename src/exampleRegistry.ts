import type { ComponentType } from 'react';
import { ThemeSmokeExample } from '../examples/00-theme-smoke/src';
import { OsCorePrimitivesExample } from '../examples/01-os-core-primitives/src';
import { LocalStateFormsExample } from '../examples/02-local-state-forms/src';
import { ControlPanelApp } from '../examples/03-rtk-query-control-panel/src/features/ControlPanelApp';
import { RichWidgetsExample } from '../examples/04-rich-widgets/src';
import { WindowManagerShellExample } from '../examples/05-window-manager-shell/src';
import { ReplConsoleExample } from '../examples/06-repl-console/src';
import { VmUiCardExample } from '../examples/07-vm-ui-card/src';
import { VmEventsAndIntentsExample } from '../examples/08-vm-events-and-intents/src';
import { VmKanbanRuntimeExample } from '../examples/09-vm-kanban-runtime/src';

export interface ExampleDefinition {
  id: string;
  stage: string;
  title: string;
  description: string;
  packages: string[];
  status: 'implemented' | 'planned';
  Component?: ComponentType;
}

export const examples: ExampleDefinition[] = [
  {
    id: '00-theme-smoke',
    stage: '00',
    title: 'Theme smoke test',
    description: 'Minimal CSS imports and OS1 root wrapper contract.',
    packages: ['@go-go-golems/os-core'],
    status: 'implemented',
    Component: ThemeSmokeExample,
  },
  {
    id: '01-os-core-primitives',
    stage: '01',
    title: 'os-core primitives',
    description: 'Buttons, toggles, tabs, field rows, tables, and feedback primitives.',
    packages: ['@go-go-golems/os-core'],
    status: 'implemented',
    Component: OsCorePrimitivesExample,
  },
  {
    id: '02-local-state-forms',
    stage: '02',
    title: 'Local state forms',
    description: 'React state composition with os-core and os-widgets primitives.',
    packages: ['@go-go-golems/os-core', '@go-go-golems/os-widgets'],
    status: 'implemented',
    Component: LocalStateFormsExample,
  },
  {
    id: '03-rtk-query-control-panel',
    stage: '03',
    title: 'RTK Query control panel',
    description: 'The original standalone consumer app, now positioned as a later-stage example.',
    packages: ['@go-go-golems/os-core', '@go-go-golems/os-widgets', '@reduxjs/toolkit'],
    status: 'implemented',
    Component: ControlPanelApp,
  },
  {
    id: '04-rich-widgets',
    stage: '04',
    title: 'Rich widgets showcase',
    description: 'Complete widgets and sample-data helpers from @go-go-golems/os-widgets.',
    packages: ['@go-go-golems/os-core', '@go-go-golems/os-widgets'],
    status: 'implemented',
    Component: RichWidgetsExample,
  },
  {
    id: '05-window-manager-shell',
    stage: '05',
    title: 'Window manager shell',
    description: 'DesktopShell, shell store composition, icons, and shell-managed windows from @go-go-golems/os-shell.',
    packages: ['@go-go-golems/os-shell', '@go-go-golems/os-core'],
    status: 'implemented',
    Component: WindowManagerShellExample,
  },
  {
    id: '06-repl-console',
    stage: '06',
    title: 'REPL console',
    description: 'MacRepl, custom commands, completions, help, and host effects from @go-go-golems/os-repl.',
    packages: ['@go-go-golems/os-repl', '@go-go-golems/os-core'],
    status: 'implemented',
    Component: ReplConsoleExample,
  },
  {
    id: '07-vm-ui-card',
    stage: '07',
    title: 'VM UI card',
    description: 'A minimal QuickJS runtime bundle rendered through the public ui.card.v1 package.',
    packages: ['@go-go-golems/os-scripting', '@go-go-golems/os-ui-cards'],
    status: 'implemented',
    Component: VmUiCardExample,
  },
  {
    id: '08-vm-events-and-intents',
    stage: '08',
    title: 'VM events and intents',
    description: 'Runtime handlers dispatch draft.patch and notify.show actions through the host bridge.',
    packages: ['@go-go-golems/os-scripting', '@go-go-golems/os-ui-cards'],
    status: 'implemented',
    Component: VmEventsAndIntentsExample,
  },
  {
    id: '09-vm-kanban-runtime',
    stage: '09',
    title: 'VM Kanban runtime',
    description: 'A higher-level kanban.v1 surface returned from QuickJS and rendered by @go-go-golems/os-kanban.',
    packages: ['@go-go-golems/os-scripting', '@go-go-golems/os-ui-cards', '@go-go-golems/os-kanban'],
    status: 'implemented',
    Component: VmKanbanRuntimeExample,
  },
];

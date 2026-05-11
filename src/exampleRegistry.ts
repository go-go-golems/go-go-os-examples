import type { ComponentType } from 'react';
import { ThemeSmokeExample } from '../examples/00-theme-smoke/src';
import { OsCorePrimitivesExample } from '../examples/01-os-core-primitives/src';
import { LocalStateFormsExample } from '../examples/02-local-state-forms/src';
import { ControlPanelApp } from '../examples/03-rtk-query-control-panel/src/features/ControlPanelApp';
import { RichWidgetsExample } from '../examples/04-rich-widgets/src';

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
    id: '05-window-manager-planned',
    stage: '05',
    title: 'Window manager and shell packaging',
    description: 'Planned stage for desktop shell/window-manager examples after additional packages are published.',
    packages: ['@go-go-golems/os-shell or future public shell package'],
    status: 'planned',
  },
];

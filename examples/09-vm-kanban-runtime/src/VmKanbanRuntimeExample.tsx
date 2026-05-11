import type { RuntimeBundleDefinition } from '@go-go-golems/os-shell';
import { Chip } from '@go-go-golems/os-core';
import { WidgetStatusBar, WidgetToolbar } from '@go-go-golems/os-widgets';
import '@go-go-golems/os-kanban/theme';
import { ExampleFrame, VmExampleHost } from '../../shared/src';
import bundleCode from './kanbanBundle.vm.js?raw';
import './VmKanbanRuntimeExample.css';

const bundle: RuntimeBundleDefinition = {
  id: 'vm-kanban-example',
  name: 'VM Kanban Example',
  icon: '🗂️',
  homeSurface: 'board',
  plugin: {
    packageIds: ['ui', 'kanban'],
    bundleCode,
    capabilities: {
      domain: [],
      system: [],
    },
  },
  surfaces: {
    board: {
      id: 'board',
      type: 'kanban.v1',
      title: 'VM Kanban',
      icon: '🗂️',
      ui: {},
    },
  },
};

export function VmKanbanRuntimeExample() {
  return (
    <ExampleFrame
      stage="09"
      title="VM Kanban runtime"
      subtitle="Registers the higher-level kanban runtime package and renders a kanban.v1 tree returned from QuickJS."
      packageFocus={['@go-go-golems/os-scripting', '@go-go-golems/os-ui-cards', '@go-go-golems/os-kanban']}
    >
      <div className="vm-kanban-runtime example-card">
        <WidgetToolbar>
          <Chip>packageIds: ui, kanban</Chip>
          <Chip>widgets.kanban.*</Chip>
          <Chip>kanban.v1</Chip>
        </WidgetToolbar>

        <VmExampleHost bundle={bundle} windowId="window:vm-kanban" sessionId="session:vm-kanban" />

        <WidgetStatusBar>
          This stage proves runtime package dependency ordering: the host registers <code>ui</code> and <code>kanban</code>, then the VM bundle renders a typed Kanban surface.
        </WidgetStatusBar>
      </div>
    </ExampleFrame>
  );
}

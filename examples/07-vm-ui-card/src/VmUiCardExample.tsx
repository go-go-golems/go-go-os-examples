import type { RuntimeBundleDefinition } from '@go-go-golems/os-shell';
import { WidgetStatusBar, WidgetToolbar } from '@go-go-golems/os-widgets';
import { Chip } from '@go-go-golems/os-core';
import { ExampleFrame, VmExampleHost } from '../../shared/src';
import bundleCode from './uiCardBundle.vm.js?raw';
import './VmUiCardExample.css';

const bundle: RuntimeBundleDefinition = {
  id: 'vm-ui-card-example',
  name: 'VM UI Card Example',
  icon: '🧪',
  homeSurface: 'home',
  plugin: {
    packageIds: ['ui'],
    bundleCode,
    capabilities: {
      domain: [],
      system: [],
    },
  },
  surfaces: {
    home: {
      id: 'home',
      type: 'ui.card.v1',
      title: 'VM UI Card',
      icon: '🧪',
      ui: {},
    },
  },
};

export function VmUiCardExample() {
  return (
    <ExampleFrame
      stage="07"
      title="VM UI card"
      subtitle="Registers the public ui runtime package and renders a QuickJS-produced ui.card.v1 surface."
      packageFocus={['@go-go-golems/os-scripting', '@go-go-golems/os-ui-cards']}
    >
      <div className="vm-ui-card example-card">
        <WidgetToolbar>
          <Chip>defineRuntimeBundle</Chip>
          <Chip>RuntimeSurfaceSessionHost</Chip>
          <Chip>ui.card.v1</Chip>
        </WidgetToolbar>

        <VmExampleHost bundle={bundle} windowId="window:vm-ui-card" sessionId="session:vm-ui-card" />

        <WidgetStatusBar>
          The VM bundle is imported as raw source via <code>?raw</code>, then executed inside QuickJS by
          <code> @go-go-golems/os-scripting</code>.
        </WidgetStatusBar>
      </div>
    </ExampleFrame>
  );
}

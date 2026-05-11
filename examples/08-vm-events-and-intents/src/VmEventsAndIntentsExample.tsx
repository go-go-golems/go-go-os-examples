import type { RuntimeBundleDefinition } from '@go-go-golems/os-shell';
import { Chip } from '@go-go-golems/os-core';
import { WidgetStatusBar, WidgetToolbar } from '@go-go-golems/os-widgets';
import { ExampleFrame, VmExampleHost } from '../../shared/src';
import bundleCode from './eventsBundle.vm.js?raw';
import './VmEventsAndIntentsExample.css';

const bundle: RuntimeBundleDefinition = {
  id: 'vm-events-example',
  name: 'VM Events Example',
  icon: '⚡',
  homeSurface: 'home',
  plugin: {
    packageIds: ['ui'],
    bundleCode,
    capabilities: {
      domain: [],
      system: ['notify.show'],
    },
  },
  surfaces: {
    home: {
      id: 'home',
      type: 'ui.card.v1',
      title: 'VM Events',
      icon: '⚡',
      ui: {},
    },
  },
};

export function VmEventsAndIntentsExample() {
  return (
    <ExampleFrame
      stage="08"
      title="VM events and intents"
      subtitle="Executes QuickJS handlers that dispatch draft state updates and host notifications through the runtime action schema."
      packageFocus={['@go-go-golems/os-scripting', '@go-go-golems/os-ui-cards', '@reduxjs/toolkit']}
    >
      <div className="vm-events example-card">
        <WidgetToolbar>
          <Chip>handlers</Chip>
          <Chip>draft.patch</Chip>
          <Chip>notify.show</Chip>
        </WidgetToolbar>

        <VmExampleHost bundle={bundle} windowId="window:vm-events" sessionId="session:vm-events" />

        <WidgetStatusBar>
          Local state lives in the runtime session reducer. Button clicks and input edits run VM handlers, not React callbacks.
        </WidgetStatusBar>
      </div>
    </ExampleFrame>
  );
}

import { useMemo } from 'react';
import { Provider } from 'react-redux';
import {
  DesktopShell,
  createLauncherStore,
  type DesktopIconDef,
  type RuntimeBundleDefinition,
} from '@go-go-golems/os-shell';
import { Chip } from '@go-go-golems/os-core';
import { ExampleFrame } from '../../shared/src';
import './WindowManagerShellExample.css';

const shellBundle: RuntimeBundleDefinition = {
  id: 'published-os-shell-demo',
  name: 'Published OS Shell Demo',
  icon: '🖥️',
  homeSurface: 'home',
  plugin: {
    packageIds: [],
    bundleCode: '',
  },
  surfaces: {
    home: {
      id: 'home',
      type: 'report',
      title: 'Home',
      icon: '🏠',
      ui: {
        t: 'text',
        value: 'This shell is imported from @go-go-golems/os-shell and backed by createLauncherStore().',
      },
    },
    notes: {
      id: 'notes',
      type: 'report',
      title: 'Notes',
      icon: '📝',
      ui: {
        t: 'text',
        value: 'Double-click desktop icons to open shell-managed windows. Drag and resize windows to exercise the window manager.',
      },
    },
    metrics: {
      id: 'metrics',
      type: 'report',
      title: 'Metrics',
      icon: '📈',
      ui: {
        t: 'text',
        value: 'Stage 05 proves that the shell package can be consumed by a standalone npm app before publishing.',
      },
    },
  },
};

const shellIcons: DesktopIconDef[] = [
  { id: 'home', label: 'Home', icon: '🏠', kind: 'app', x: 24, y: 56 },
  { id: 'notes', label: 'Notes', icon: '📝', kind: 'app', x: 24, y: 148 },
  { id: 'metrics', label: 'Metrics', icon: '📈', kind: 'app', x: 24, y: 240 },
  {
    id: 'folder.examples',
    label: 'Examples',
    icon: '🗂️',
    kind: 'folder',
    x: 24,
    y: 332,
    folder: { memberIconIds: ['home', 'notes', 'metrics'] },
  },
];

export function WindowManagerShellExample() {
  const launcher = useMemo(() => createLauncherStore([]), []);

  return (
    <ExampleFrame
      stage="05"
      title="Window manager shell"
      subtitle="A public-package validation stage for DesktopShell, createLauncherStore, desktop icons, and shell-managed windows."
      packageFocus={['@go-go-golems/os-shell', '@go-go-golems/os-core']}
    >
      <div className="window-manager-shell example-card">
        <div className="window-manager-shell__intro">
          <Chip>@go-go-golems/os-shell</Chip>
          <p>
            This stage was built against a local tarball of the unpublished package first, so the example validates the npm
            artifact shape before publication.
          </p>
        </div>
        <Provider store={launcher.store}>
          <div className="window-manager-shell__desktop">
            <DesktopShell bundle={shellBundle} icons={shellIcons} />
          </div>
        </Provider>
      </div>
    </ExampleFrame>
  );
}

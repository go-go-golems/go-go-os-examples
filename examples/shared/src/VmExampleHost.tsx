import { useMemo, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from '@go-go-golems/os-scripting';
import type { RuntimeBundleDefinition } from '@go-go-golems/os-shell';
import { RuntimeSurfaceSessionHost } from '@go-go-golems/os-scripting';
import { registerExampleRuntimePackages } from './runtimePackages';

export interface VmExampleHostProps {
  bundle: RuntimeBundleDefinition;
  windowId: string;
  sessionId: string;
  children?: ReactNode;
}

export function VmExampleHost({ bundle, windowId, sessionId, children }: VmExampleHostProps) {
  registerExampleRuntimePackages();

  const store = useMemo(() => createAppStore({}).store, []);

  return (
    <Provider store={store}>
      <div className="vm-example-host">
        <div className="vm-example-host__surface">
          <RuntimeSurfaceSessionHost windowId={windowId} sessionId={sessionId} bundle={bundle} />
        </div>
        {children}
      </div>
    </Provider>
  );
}

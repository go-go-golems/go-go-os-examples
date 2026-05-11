import { useState } from 'react';
import { Btn, Checkbox, Chip, DataTable, ProgressBar, RadioButton, TabControl } from '@go-go-golems/os-core';
import { ExampleFrame } from '../../shared/src';
import './OsCorePrimitivesExample.css';

const rows = [
  { component: 'Btn', role: 'action', package: 'os-core' },
  { component: 'Checkbox', role: 'boolean input', package: 'os-core' },
  { component: 'TabControl', role: 'section switcher', package: 'os-core' },
];

export function OsCorePrimitivesExample() {
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState<'inspect' | 'operate'>('inspect');
  const [tab, setTab] = useState(0);

  return (
    <ExampleFrame
      stage="01"
      title="os-core primitives"
      subtitle="A focused example that imports only low-level design-system building blocks from @go-go-golems/os-core."
      packageFocus={['@go-go-golems/os-core']}
    >
      <div className="core-primitives example-grid">
        <section className="example-card example-stack">
          <h2>Controls</h2>
          <Checkbox label="Enable diagnostics" checked={enabled} onChange={() => setEnabled((value) => !value)} />
          <RadioButton label="Inspect mode" selected={mode === 'inspect'} onChange={() => setMode('inspect')} />
          <RadioButton label="Operate mode" selected={mode === 'operate'} onChange={() => setMode('operate')} />
          <div className="core-primitives__buttons">
            <Btn isDefault>Apply</Btn>
            <Btn>Cancel</Btn>
          </div>
          <ProgressBar value={enabled ? 78 : 18} label="Diagnostic readiness" />
        </section>

        <section className="example-card example-stack">
          <h2>Composition</h2>
          <div className="core-primitives__summary">
            <div className="core-primitives__row"><span>Package</span><Chip>@go-go-golems/os-core</Chip></div>
            <div className="core-primitives__row"><span>Mode</span><Chip>{mode}</Chip></div>
            <div className="core-primitives__row"><span>Diagnostics</span><Chip>{enabled ? 'enabled' : 'disabled'}</Chip></div>
          </div>
          <TabControl tabs={['Table', 'Notes']} activeTab={tab} onTabChange={setTab}>
            {tab === 0 ? (
              <DataTable
                items={rows}
                columns={[
                  { key: 'component', label: 'Component' },
                  { key: 'role', label: 'Role' },
                  { key: 'package', label: 'Package' },
                ]}
                rowKey="component"
              />
            ) : (
              <p>Use this stage when teaching the primitive API before introducing app state or RTK Query.</p>
            )}
          </TabControl>
        </section>
      </div>
    </ExampleFrame>
  );
}

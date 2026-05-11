import { useMemo, useState } from 'react';
import { Btn, Chip } from '@go-go-golems/os-core';
import { WidgetStatusBar, WidgetToolbar } from '@go-go-golems/os-widgets';
import { Provider } from 'react-redux';
import { examples } from './exampleRegistry';
import { store } from '../examples/03-rtk-query-control-panel/src/app/store';
import './ExampleWorkspaceApp.css';

export function ExampleWorkspaceApp() {
  const [selectedId, setSelectedId] = useState(examples[0]?.id ?? '');
  const selected = useMemo(() => examples.find((example) => example.id === selectedId) ?? examples[0], [selectedId]);
  const SelectedComponent = selected?.Component;

  return (
    <div className="workspace-app">
      <aside className="workspace-app__nav" aria-label="Example workspace navigation">
        <div className="workspace-app__brand">
          <p>go-go-os npm</p>
          <h1>Progressive Examples</h1>
        </div>
        <nav className="workspace-app__stages">
          {examples.map((example) => (
            <button
              key={example.id}
              type="button"
              className={example.id === selected?.id ? 'workspace-app__stage is-selected' : 'workspace-app__stage'}
              onClick={() => setSelectedId(example.id)}
            >
              <span>{example.stage}</span>
              <strong>{example.title}</strong>
              <small>{example.status}</small>
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace-app__content">
        <WidgetToolbar>
          <Chip>{selected?.id}</Chip>
          {selected?.packages.map((pkg) => <Chip key={pkg}>{pkg}</Chip>)}
          <Btn onClick={() => setSelectedId(examples[0]?.id ?? selectedId)}>Reset to 00</Btn>
        </WidgetToolbar>

        {selected?.status === 'planned' || !SelectedComponent ? (
          <div className="workspace-app__planned">
            <h2>{selected?.title}</h2>
            <p>{selected?.description}</p>
            <p>
              This stage intentionally remains a documented placeholder. It should be implemented after the shell/window-manager
              package boundary is published and validated from npm.
            </p>
          </div>
        ) : selected.id === '03-rtk-query-control-panel' ? (
          <Provider store={store}>
            <SelectedComponent />
          </Provider>
        ) : (
          <SelectedComponent />
        )}

        <WidgetStatusBar>
          Implemented examples live under <code>examples/</code>; the root app is only a navigator.
        </WidgetStatusBar>
      </section>
    </div>
  );
}

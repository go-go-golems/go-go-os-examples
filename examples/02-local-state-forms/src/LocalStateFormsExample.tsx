import { useMemo, useState } from 'react';
import { AlertDialog, Btn, Chip, ProgressBar, Toast } from '@go-go-golems/os-core';
import { LabeledSlider, SearchBar, WidgetStatusBar, WidgetToolbar } from '@go-go-golems/os-widgets';
import { ExampleFrame } from '../../shared/src';
import './LocalStateFormsExample.css';

type Profile = {
  name: string;
  alertVolume: number;
  filter: string;
};

export function LocalStateFormsExample() {
  const [profile, setProfile] = useState<Profile>({ name: 'Intern Workbench', alertVolume: 68, filter: '' });
  const [toast, setToast] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const summary = useMemo(() => {
    const filterText = profile.filter.trim() || 'no filter';
    return `${profile.name}: ${profile.alertVolume}% volume, ${filterText}`;
  }, [profile]);

  return (
    <ExampleFrame
      stage="02"
      title="Local state forms"
      subtitle="A React-only state example that teaches how package primitives compose before introducing Redux or RTK Query."
      packageFocus={['@go-go-golems/os-core', '@go-go-golems/os-widgets/primitives']}
    >
      <div className="local-state example-card">
        <WidgetToolbar>
          <Btn isDefault onClick={() => setToast('Saved local profile draft.')}>Save Draft</Btn>
          <Btn onClick={() => setShowAlert(true)}>Explain State</Btn>
          <Chip>useState + useMemo</Chip>
        </WidgetToolbar>

        <div className="local-state__grid">
          <section className="example-stack">
            <h2>Editable profile</h2>
            <label className="local-state__field">
              <span>Profile name</span>
              <input
                className="local-state__input"
                value={profile.name}
                onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
              />
            </label>
            <LabeledSlider
              label="Alert volume"
              value={profile.alertVolume}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(alertVolume) => setProfile((current) => ({ ...current, alertVolume }))}
            />
            <SearchBar
              value={profile.filter}
              onChange={(filter) => setProfile((current) => ({ ...current, filter }))}
              placeholder="Filter package surfaces…"
              count={profile.filter ? 1 : 0}
            />
          </section>

          <section className="example-stack">
            <h2>Derived output</h2>
            <p>{summary}</p>
            <ProgressBar value={profile.alertVolume} label="Volume" />
            <WidgetStatusBar>{profile.filter ? `Filtering by ${profile.filter}` : 'No filter active'}</WidgetStatusBar>
          </section>
        </div>

        {showAlert ? (
          <AlertDialog
            type="note"
            message="This example keeps all state local. The next stage moves server-like state into RTK Query."
            actions={[{ label: 'OK', isDefault: true, onClick: () => setShowAlert(false) }]}
          />
        ) : null}
        {toast ? <Toast message={toast} onDone={() => setToast(null)} /> : null}
      </div>
    </ExampleFrame>
  );
}

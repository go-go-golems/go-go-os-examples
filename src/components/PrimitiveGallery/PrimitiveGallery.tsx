import { useMemo, useState } from 'react';
import { Btn, Checkbox, Chip, DropdownMenu, ProgressBar, RadioButton, TabControl } from '@go-go-golems/os-core';
import { ButtonGroup, LabeledSlider, SearchBar, Separator, Sparkline, WidgetToolbar } from '@go-go-golems/os-widgets';
import './PrimitiveGallery.css';

const patternOptions = ['Grid', 'Dither', 'Plain'];
type Tone = 'quiet' | 'balanced' | 'loud';

const toneOptions: { value: Tone; label: string }[] = [
  { value: 'quiet', label: 'Quiet' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'loud', label: 'Loud' },
];

export function PrimitiveGallery() {
  const [sound, setSound] = useState(true);
  const [grid, setGrid] = useState(true);
  const [density, setDensity] = useState<'Compact' | 'Comfortable'>('Comfortable');
  const [pattern, setPattern] = useState(1);
  const [volume, setVolume] = useState(62);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [tone, setTone] = useState<Tone>('balanced');

  const sparkData = useMemo(() => [3, 5, 4, 8, 6, 7, 10, 9, 12, 8, 14, 11], []);

  return (
    <section className="primitive-gallery" aria-label="Primitive gallery">
      <WidgetToolbar>
        <Btn isDefault onClick={() => setVolume((value) => Math.min(100, value + 5))}>Boost</Btn>
        <Btn onClick={() => setVolume(50)}>Reset</Btn>
        <Btn variant="danger" onClick={() => setSound(false)}>Mute</Btn>
        <Separator />
        <Chip>os-core primitives</Chip>
      </WidgetToolbar>

      <div className="primitive-gallery__grid">
        <div className="lab-card">
          <h2>Controls</h2>
          <div className="stack">
            <Checkbox label="Enable alert sound" checked={sound} onChange={() => setSound((value) => !value)} />
            <Checkbox label="Show desktop grid" checked={grid} onChange={() => setGrid((value) => !value)} />
            <RadioButton label="Compact density" selected={density === 'Compact'} onChange={() => setDensity('Compact')} />
            <RadioButton label="Comfortable density" selected={density === 'Comfortable'} onChange={() => setDensity('Comfortable')} />
          </div>
        </div>

        <div className="lab-card">
          <h2>Inputs</h2>
          <div className="stack">
            <DropdownMenu options={patternOptions} selected={pattern} onSelect={setPattern} width={180} />
            <LabeledSlider label="Alert volume" value={volume} min={0} max={100} step={1} onChange={setVolume} unit="%" />
            <SearchBar value={search} onChange={setSearch} placeholder="Search controls…" count={search ? 1 : 0} />
            <ButtonGroup options={toneOptions} value={tone} onChange={setTone} />
          </div>
        </div>

        <div className="lab-card">
          <h2>Feedback</h2>
          <div className="stack">
            <ProgressBar value={volume} label="Alert volume" />
            <Sparkline data={sparkData} width={220} height={42} />
            <div className="chip-row">
              <Chip>{patternOptions[pattern]}</Chip>
              <Chip>{density}</Chip>
              <Chip>{sound ? 'Sound on' : 'Muted'}</Chip>
            </div>
          </div>
        </div>
      </div>

      <TabControl tabs={['Summary', 'Notes']} activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 0 ? (
          <p className="primitive-gallery__note">This panel combines primitives from public npm packages with local React state.</p>
        ) : (
          <p className="primitive-gallery__note">Stories next to each component exercise the same primitives in isolation.</p>
        )}
      </TabControl>
    </section>
  );
}

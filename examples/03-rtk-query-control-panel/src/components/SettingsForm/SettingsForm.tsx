import { FormView, type FieldConfig } from '@go-go-golems/os-core';
import type { ControlPanelSettings } from '../../services/controlPanelApi';

export interface SettingsFormProps {
  settings: ControlPanelSettings;
  saving?: boolean;
  onSave: (patch: Partial<ControlPanelSettings>) => void;
}

const fields: FieldConfig[] = [
  { id: 'profileName', label: 'Profile', type: 'text', required: true },
  { id: 'soundEnabled', label: 'Sound', type: 'boolean' },
  { id: 'desktopPattern', label: 'Pattern', type: 'select', options: ['Grid', 'Dither', 'Plain'] },
  { id: 'density', label: 'Density', type: 'select', options: ['Compact', 'Comfortable'] },
  { id: 'alertVolume', label: 'Volume', type: 'number', step: 1 },
];

export function SettingsForm({ settings, saving, onSave }: SettingsFormProps) {
  const values = { ...settings } as Record<string, unknown>;

  return (
    <FormView
      fields={fields}
      values={values}
      onChange={(id, value) => onSave({ [id]: value })}
      onSubmit={(nextValues) => onSave(nextValues as Partial<ControlPanelSettings>)}
      submitLabel={saving ? 'Saving…' : 'Apply'}
      submitResult="Changes are stored in RTK Query mock state."
    />
  );
}

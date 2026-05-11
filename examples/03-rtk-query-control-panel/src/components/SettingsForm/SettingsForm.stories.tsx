import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsForm } from './SettingsForm';

const meta = {
  title: 'Components/SettingsForm',
  component: SettingsForm,
  args: {
    settings: {
      profileName: 'Storybook Demo',
      soundEnabled: true,
      desktopPattern: 'Dither',
      density: 'Comfortable',
      alertVolume: 62,
    },
    onSave: (patch) => console.log('save', patch),
  },
} satisfies Meta<typeof SettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Saving: Story = {
  args: { saving: true },
};

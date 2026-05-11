import type { Meta, StoryObj } from '@storybook/react-vite';
import { Btn, Chip } from '@go-go-golems/os-core';
import { Os1Shell } from './Os1Shell';

const meta = {
  title: 'Layout/Os1Shell',
  component: Os1Shell,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Os1Shell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'OS1 Shell',
    subtitle: 'macOS-1 theme wrapper',
    footer: <><Chip>npm</Chip><span>Public package consumer</span></>,
    children: (
      <div style={{ display: 'grid', gap: 12 }}>
        <p>This shell applies data-widget=&quot;hypercard&quot; and the theme-macos1 class.</p>
        <Btn isDefault>Default Action</Btn>
      </div>
    ),
  },
};

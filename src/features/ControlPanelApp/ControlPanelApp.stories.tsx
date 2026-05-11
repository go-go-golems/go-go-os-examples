import type { Meta, StoryObj } from '@storybook/react-vite';
import { WithStore } from '../../storybook/withStore';
import { ControlPanelApp } from './ControlPanelApp';

const meta = {
  title: 'Features/ControlPanelApp',
  component: ControlPanelApp,
  decorators: [
    (Story) => (
      <WithStore>
        <Story />
      </WithStore>
    ),
  ],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ControlPanelApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

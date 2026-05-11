import type { Meta, StoryObj } from '@storybook/react-vite';
import { RichWidgetsExample } from './RichWidgetsExample';

const meta = {
  title: 'Examples/04 Rich Widgets',
  component: RichWidgetsExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof RichWidgetsExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReplConsoleExample } from './ReplConsoleExample';

const meta = {
  title: 'Examples/06 REPL Console',
  component: ReplConsoleExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ReplConsoleExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

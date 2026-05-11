import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocalStateFormsExample } from './LocalStateFormsExample';

const meta = {
  title: 'Examples/02 Local State Forms',
  component: LocalStateFormsExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LocalStateFormsExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

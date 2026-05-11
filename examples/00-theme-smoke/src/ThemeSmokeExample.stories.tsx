import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeSmokeExample } from './ThemeSmokeExample';

const meta = {
  title: 'Examples/00 Theme Smoke',
  component: ThemeSmokeExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ThemeSmokeExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

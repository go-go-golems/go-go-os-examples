import type { Meta, StoryObj } from '@storybook/react-vite';
import { VmKanbanRuntimeExample } from './VmKanbanRuntimeExample';

const meta = {
  title: 'Examples/09 VM Kanban Runtime',
  component: VmKanbanRuntimeExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof VmKanbanRuntimeExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

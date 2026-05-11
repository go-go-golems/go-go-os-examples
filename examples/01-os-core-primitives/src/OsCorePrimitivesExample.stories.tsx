import type { Meta, StoryObj } from '@storybook/react-vite';
import { OsCorePrimitivesExample } from './OsCorePrimitivesExample';

const meta = {
  title: 'Examples/01 os-core Primitives',
  component: OsCorePrimitivesExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof OsCorePrimitivesExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

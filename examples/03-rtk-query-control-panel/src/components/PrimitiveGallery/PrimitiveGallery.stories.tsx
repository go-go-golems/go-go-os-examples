import type { Meta, StoryObj } from '@storybook/react-vite';
import { PrimitiveGallery } from './PrimitiveGallery';

const meta = {
  title: 'Components/PrimitiveGallery',
  component: PrimitiveGallery,
} satisfies Meta<typeof PrimitiveGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

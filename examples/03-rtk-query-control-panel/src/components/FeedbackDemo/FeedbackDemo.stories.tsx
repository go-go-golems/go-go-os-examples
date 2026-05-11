import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeedbackDemo } from './FeedbackDemo';

const meta = {
  title: 'Components/FeedbackDemo',
  component: FeedbackDemo,
} satisfies Meta<typeof FeedbackDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

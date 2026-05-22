import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DarkModeToggle } from './DarkModeToggle';

const meta: Meta<typeof DarkModeToggle> = {
  title: 'Common/DarkModeToggle',
  component: DarkModeToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toggle button that switches between dark and light mode via Redux.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof DarkModeToggle>;

export const Default: Story = {};

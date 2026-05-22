import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Common/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Language selector dropdown supporting English, Japanese, and Chinese.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {};

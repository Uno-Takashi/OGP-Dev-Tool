import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AntDesignPreview } from './AntDesignPreview';

const meta: Meta<typeof AntDesignPreview> = {
  title: 'Previews/Ant Design Card',
  component: AntDesignPreview,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AntDesignPreview>;

const defaultArgs = {
  imageUrl: 'https://via.placeholder.com/384x200/ff6b00/ffffff?text=Cover+Image',
  title: 'Example Page Title',
  description: 'This is how your content looks in an Ant Design Card component.',
  origin: 'example.com',
};

export const Default: Story = { args: defaultArgs };
export const NoImage: Story = { args: { ...defaultArgs, imageUrl: null } };

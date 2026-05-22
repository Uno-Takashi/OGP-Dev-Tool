import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TwitterPreview } from './TwitterPreview';

const meta: Meta<typeof TwitterPreview> = {
  title: 'Previews/X',
  component: TwitterPreview,
  tags: ['autodocs'],
  argTypes: {
    imageUrl: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    origin: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof TwitterPreview>;

const defaultArgs = {
  imageUrl: 'https://via.placeholder.com/1200x630/0073e6/ffffff?text=OGP+Image',
  title: 'Example Page Title',
  description: 'This is an example description for OGP preview. It shows how your content will appear when shared on X.',
  origin: 'example.com',
};

export const Default: Story = { args: defaultArgs };
export const NoImage: Story = { args: { ...defaultArgs, imageUrl: null } };
export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'This is a very long title that will be truncated when displayed in the X card preview widget',
  },
};

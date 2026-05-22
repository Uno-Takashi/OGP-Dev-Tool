import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ShadcnPreview } from './ShadcnPreview';

const meta: Meta<typeof ShadcnPreview> = {
  title: 'Previews/shadcn Card',
  component: ShadcnPreview,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ShadcnPreview>;

const defaultArgs = {
  imageUrl: 'https://via.placeholder.com/384x216/f5f5f5/333333?text=Cover+Image',
  title: 'Example Page Title',
  description: 'This is how your content looks in a shadcn/ui Card component.',
  origin: 'example.com',
  siteName: 'Example Site',
};

export const Default: Story = { args: defaultArgs };
export const NoImage: Story = { args: { ...defaultArgs, imageUrl: null } };

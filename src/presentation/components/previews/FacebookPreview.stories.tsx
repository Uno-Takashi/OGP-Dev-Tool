import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FacebookPreview } from './FacebookPreview';

const meta: Meta<typeof FacebookPreview> = {
  title: 'Previews/Facebook',
  component: FacebookPreview,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FacebookPreview>;

const defaultArgs = {
  imageUrl: 'https://via.placeholder.com/1200x630/1877F2/ffffff?text=OGP+Image',
  title: 'Example Page Title',
  description: 'This is an example description for OGP preview on Facebook.',
  origin: 'example.com',
};

export const Default: Story = { args: defaultArgs };
export const NoImage: Story = { args: { ...defaultArgs, imageUrl: null } };

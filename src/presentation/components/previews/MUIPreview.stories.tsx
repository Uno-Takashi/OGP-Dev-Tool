import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MUIPreview } from './MUIPreview';

const meta: Meta<typeof MUIPreview> = {
  title: 'Previews/Material UI Card',
  component: MUIPreview,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MUIPreview>;

const defaultArgs = {
  imageUrl: 'https://via.placeholder.com/384x200/1976d2/ffffff?text=Cover+Image',
  title: 'Example Page Title',
  description: 'This is how your content looks in a Material UI Card component.',
  origin: 'example.com',
};

export const Default: Story = { args: defaultArgs };
export const NoImage: Story = { args: { ...defaultArgs, imageUrl: null } };
export const Elevation4: Story = {
  args: defaultArgs,
  name: 'With elevation',
};

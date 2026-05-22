import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { OGPTable } from './OGPTable';

const meta: Meta<typeof OGPTable> = {
  title: 'Components/OGPTable',
  component: OGPTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof OGPTable>;

const sampleTags = [
  {
    tag: 'meta',
    tipKey: 'ogp.tips.ogUrl',
    name: 'property',
    ogpType: 'og:url',
    content: 'content',
    contentValue: 'https://example.com',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.ogType',
    name: 'property',
    ogpType: 'og:type',
    content: 'content',
    contentValue: 'website',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.ogTitle',
    name: 'property',
    ogpType: 'og:title',
    content: 'content',
    contentValue: 'Example Page Title',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.ogDescription',
    name: 'property',
    ogpType: 'og:description',
    content: 'content',
    contentValue: 'This is an example description for OGP.',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.ogSiteName',
    name: 'property',
    ogpType: 'og:site_name',
    content: 'content',
    contentValue: 'Example Site',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.ogLocale',
    name: 'property',
    ogpType: 'og:locale',
    content: 'content',
    contentValue: 'en_US',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.ogImage',
    name: 'property',
    ogpType: 'og:image',
    content: 'content',
    contentValue: 'https://via.placeholder.com/1200x630',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.twitterCard',
    name: 'name',
    ogpType: 'twitter:card',
    content: 'content',
    contentValue: 'summary_large_image',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.twitterSite',
    name: 'name',
    ogpType: 'twitter:site',
    content: 'content',
    contentValue: '@example',
  },
  {
    tag: 'meta',
    tipKey: 'ogp.tips.fbAppId',
    name: 'property',
    ogpType: 'fb:app_id',
    content: 'content',
    contentValue: null,
  },
];

export const WithData: Story = {
  args: { tags: sampleTags },
};

export const Empty: Story = {
  args: { tags: [] },
};

export const WithNullValues: Story = {
  args: {
    tags: sampleTags.map((t) => ({ ...t, contentValue: null })),
  },
};

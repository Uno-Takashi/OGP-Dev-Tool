import type { OGPTag } from '../../domain/entities/OGPMetadata';

type TagDefinition = Omit<OGPTag, 'contentValue'>;

const TAG_DEFINITIONS: TagDefinition[] = [
  // Open Graph — basic
  { tag: 'meta', tipKey: 'ogp.tips.ogUrl',          name: 'property', ogpType: 'og:url',          content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogType',         name: 'property', ogpType: 'og:type',         content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogTitle',        name: 'property', ogpType: 'og:title',        content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogDescription',  name: 'property', ogpType: 'og:description',  content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogSiteName',     name: 'property', ogpType: 'og:site_name',    content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogLocale',       name: 'property', ogpType: 'og:locale',       content: 'content' },
  // Open Graph — image
  { tag: 'meta', tipKey: 'ogp.tips.ogImage',           name: 'property', ogpType: 'og:image',            content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogImageSecureUrl',  name: 'property', ogpType: 'og:image:secure_url', content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogImageType',       name: 'property', ogpType: 'og:image:type',       content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogImageWidth',      name: 'property', ogpType: 'og:image:width',      content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogImageHeight',     name: 'property', ogpType: 'og:image:height',     content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.ogImageAlt',        name: 'property', ogpType: 'og:image:alt',        content: 'content' },
  // X (Twitter) Card
  { tag: 'meta', tipKey: 'ogp.tips.twitterCard',        name: 'name', ogpType: 'twitter:card',        content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.twitterSite',        name: 'name', ogpType: 'twitter:site',        content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.twitterCreator',     name: 'name', ogpType: 'twitter:creator',     content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.twitterTitle',       name: 'name', ogpType: 'twitter:title',       content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.twitterDescription', name: 'name', ogpType: 'twitter:description', content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.twitterImage',       name: 'name', ogpType: 'twitter:image',       content: 'content' },
  // Facebook
  { tag: 'meta', tipKey: 'ogp.tips.fbAppId', name: 'property', ogpType: 'fb:app_id', content: 'content' },
  // article
  { tag: 'meta', tipKey: 'ogp.tips.articleAuthor',        name: 'property', ogpType: 'article:author',         content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.articlePublishedTime', name: 'property', ogpType: 'article:published_time', content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.articleModifiedTime',  name: 'property', ogpType: 'article:modified_time',  content: 'content' },
  { tag: 'meta', tipKey: 'ogp.tips.articleSection',       name: 'property', ogpType: 'article:section',        content: 'content' },
];

export function parseOGPTags(metas: HTMLCollection): OGPTag[] {
  return TAG_DEFINITIONS.map((def) => {
    let contentValue: string | null = null;
    for (const meta of Array.from(metas)) {
      if (
        meta.tagName.toLowerCase() === def.tag &&
        meta.getAttribute(def.name) === def.ogpType
      ) {
        contentValue = meta.getAttribute(def.content);
        break;
      }
    }
    return { ...def, contentValue };
  });
}

export function toJSON(metas: HTMLCollection): { ogp: OGPTag[] } {
  return { ogp: parseOGPTags(metas) };
}

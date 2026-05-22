export type ValidationStatus = 'valid' | 'invalid' | 'missing';

const isAbsoluteUrl = (v: string) => /^https?:\/\/.+\..+/.test(v);
const isHttpsUrl    = (v: string) => /^https:\/\/.+\..+/.test(v);
const isPositiveInt = (v: string) => /^\d+$/.test(v) && parseInt(v, 10) > 0;
// eslint-disable-next-line security/detect-unsafe-regex
const isMimeType    = (v: string) => /^[\w][\w!#$&\-^]*\/[\w][\w!#$&\-^]*(;.*)?$/.test(v);
// OGP locale uses underscore: en_US, ja_JP, zh_CN, or bare language code: en
// eslint-disable-next-line security/detect-unsafe-regex
const isLocale      = (v: string) => /^[a-z]{2,8}(_[A-Z]{2,3})?$/.test(v);
// X/Twitter handle: @username (1–50 chars, alphanumeric + underscore)
const isAtHandle    = (v: string) => /^@[A-Za-z0-9_]{1,50}$/.test(v);
// ISO 8601 date-time: must contain a date separator and parse successfully
const isIso8601     = (v: string) => v.includes('-') && !isNaN(Date.parse(v));
const isNumericStr  = (v: string) => /^\d+$/.test(v);
const isNonEmpty    = (v: string) => v.trim().length > 0;

const TWITTER_CARD_VALUES = ['summary', 'summary_large_image', 'app', 'player'] as const;

const VALIDATORS: Record<string, (v: string) => boolean> = {
  'og:url':                 isAbsoluteUrl,
  'og:type':                isNonEmpty,
  'og:title':               isNonEmpty,
  'og:description':         isNonEmpty,
  'og:site_name':           isNonEmpty,
  'og:locale':              isLocale,
  'og:image':               isAbsoluteUrl,
  'og:image:secure_url':    isHttpsUrl,
  'og:image:type':          isMimeType,
  'og:image:width':         isPositiveInt,
  'og:image:height':        isPositiveInt,
  'og:image:alt':           isNonEmpty,
  'twitter:card':           (v) => (TWITTER_CARD_VALUES as readonly string[]).includes(v),
  'twitter:site':           isAtHandle,
  'twitter:creator':        isAtHandle,
  'twitter:title':          isNonEmpty,
  'twitter:description':    isNonEmpty,
  'twitter:image':          isAbsoluteUrl,
  'fb:app_id':              isNumericStr,
  'article:author':         isAbsoluteUrl,
  'article:published_time': isIso8601,
  'article:modified_time':  isIso8601,
  'article:section':        isNonEmpty,
};

export function validateOGPValue(ogpType: string, value: string | null): ValidationStatus {
  if (value === null || value === '') return 'missing';
  // eslint-disable-next-line security/detect-object-injection
  const validate = Object.prototype.hasOwnProperty.call(VALIDATORS, ogpType) ? VALIDATORS[ogpType] : undefined;
  if (!validate) return 'valid';
  return validate(value) ? 'valid' : 'invalid';
}

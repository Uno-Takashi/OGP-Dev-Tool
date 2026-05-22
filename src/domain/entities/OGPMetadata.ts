export interface OGPTag {
  tag: string;
  tipKey: string;
  name: string;
  ogpType: string;
  content: string;
  contentValue: string | null;
}

export interface OGPMessage {
  ogp: OGPTag[];
}

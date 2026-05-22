import type { OGPTag } from '../entities/OGPMetadata';

export interface IOGPRepository {
  fetchOGPTags(tabId: number): Promise<OGPTag[]>;
}

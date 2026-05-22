import type { OGPTag } from '../../domain/entities/OGPMetadata';
import type { IOGPRepository } from '../../domain/repositories/IOGPRepository';

export class FetchOGPDataUseCase {
  constructor(private readonly repository: IOGPRepository) {}

  async execute(tabId: number): Promise<OGPTag[]> {
    return this.repository.fetchOGPTags(tabId);
  }
}

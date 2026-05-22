import type { OGPTag } from '../../domain/entities/OGPMetadata';
import type { IOGPRepository } from '../../domain/repositories/IOGPRepository';

export class ChromeOGPRepository implements IOGPRepository {
  async fetchOGPTags(tabId: number): Promise<OGPTag[]> {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, {}, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve(response?.ogp ?? []);
      });
    });
  }
}

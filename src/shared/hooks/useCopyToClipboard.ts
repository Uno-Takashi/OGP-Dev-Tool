import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copy: (text: string) => Promise<void>;
  copied: boolean;
}

export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text ?? '');
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        // Clipboard access may be denied in some contexts
      }
    },
    [resetDelay]
  );

  return { copy, copied };
}

// Mock for chrome extension APIs in Storybook environment
const chromeMock = {
  tabs: {
    create: (_: { url: string }) => {},
    query: (_: object, cb: (tabs: { url: string }[]) => void) =>
      cb([{ url: 'https://example.com' }]),
    sendMessage: (_tabId: number, _msg: object, cb: (res: unknown) => void) =>
      cb({ ogp: [] }),
  },
  runtime: {
    lastError: undefined as undefined,
    onMessage: {
      addListener: (_: unknown) => {},
    },
  },
  storage: {
    sync: {
      get: (_keys: unknown, cb: (result: Record<string, unknown>) => void) => cb({}),
      set: (_items: object, cb?: () => void) => cb?.(),
    },
  },
  devtools: {
    inspectedWindow: { tabId: 1 },
    panels: {
      create: (_: string, __: string, ___: string, cb?: () => void) => cb?.(),
    },
  },
};

if (typeof window !== 'undefined' && !(window as unknown as { chrome?: unknown }).chrome) {
  (window as unknown as { chrome: typeof chromeMock }).chrome = chromeMock;
}

export {};

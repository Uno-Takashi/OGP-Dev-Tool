import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import i18n, { type SupportedLanguage } from '../../i18n';
import type { OGPTag } from '../../domain/entities/OGPMetadata';
import { store } from '../store';
import { setDarkMode, setLanguage } from '../store/uiSlice';
import { AppThemeProvider } from '../contexts/ThemeContext';
import { OGPTable } from '../components/OGPTable';
import { TwitterPreview } from '../components/previews/TwitterPreview';
import { FacebookPreview } from '../components/previews/FacebookPreview';
import { ShadcnPreview } from '../components/previews/ShadcnPreview';
import { AntDesignPreview } from '../components/previews/AntDesignPreview';
import { MUIPreview } from '../components/previews/MUIPreview';

interface PreviewData {
  tags: OGPTag[];
  isDarkMode: boolean;
  language: SupportedLanguage;
}

function parseHashData(): OGPTag[] {
  const params = new URLSearchParams(globalThis.location.hash.slice(1));
  const raw = params.get('data');
  if (!raw) return [];
  try {
    const { tags, isDarkMode, language } = JSON.parse(decodeURIComponent(raw)) as PreviewData;
    store.dispatch(setDarkMode(isDarkMode));
    store.dispatch(setLanguage(language));
    void i18n.changeLanguage(language);
    return tags;
  } catch {
    return [];
  }
}

function Preview() {
  const [tags] = useState<OGPTag[]>(parseHashData);

  const imageUrl = tags.find((t) => t.ogpType === 'og:image')?.contentValue ?? null;
  const title = tags.find((t) => t.ogpType === 'og:title')?.contentValue ?? '';
  const description = tags.find((t) => t.ogpType === 'og:description')?.contentValue ?? '';
  const siteName = tags.find((t) => t.ogpType === 'og:site_name')?.contentValue ?? '';
  const url = tags.find((t) => t.ogpType === 'og:url')?.contentValue ?? '';
  let origin = '';
  try {
    origin = new URL(url).hostname;
  } catch {
    // ignore invalid URL
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 2 }}>
      <OGPTable tags={tags} />

      <Divider sx={{ my: 2 }} />

      <TwitterPreview imageUrl={imageUrl} title={title} description={description} origin={origin} />
      <FacebookPreview
        imageUrl={imageUrl}
        title={title}
        description={description}
        origin={origin}
      />

      <Divider sx={{ my: 2 }} />

      <ShadcnPreview
        imageUrl={imageUrl}
        title={title}
        description={description}
        origin={origin}
        siteName={siteName}
      />
      <AntDesignPreview
        imageUrl={imageUrl}
        title={title}
        description={description}
        origin={origin}
      />
      <MUIPreview imageUrl={imageUrl} title={title} description={description} origin={origin} />
    </Box>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <Preview />
      </AppThemeProvider>
    </Provider>
  );
}

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

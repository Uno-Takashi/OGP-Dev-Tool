import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const theme = createTheme({ palette: { mode: 'light' } });

function Popup() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0]?.url ?? '');
    });
  }, []);

  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t('popup.title')}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
        {t('popup.currentUrl')}
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
        {url}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {t('popup.openDevtools')}
      </Typography>
    </Box>
  );
}

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Popup />
    </ThemeProvider>
  );
}

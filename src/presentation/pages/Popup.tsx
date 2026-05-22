import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import '../../i18n';

function Popup() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: localStorage.getItem('isDarkMode') === 'true' ? 'dark' : 'light' },
      }),
    []
  );

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0]?.url ?? '');
    });
  }, []);

  const steps = useMemo(
    () => [
      { label: t('popup.step1'), desc: t('popup.step1Desc') },
      { label: t('popup.step2'), desc: t('popup.step2Desc') },
      { label: t('popup.step3'), desc: t('popup.step3Desc') },
      { label: t('popup.step4'), desc: t('popup.step4Desc') },
    ],
    [t]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: 360, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Box
            component="img"
            src="icon32.png"
            alt="OGP Dev Tool"
            sx={{ width: 32, height: 32 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
              OGP Dev Tool
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t('popup.subtitle')}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          {t('popup.currentUrl')}
        </Typography>
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 1,
            px: 1.5,
            py: 0.75,
            mb: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontFamily: 'monospace', wordBreak: 'break-all', display: 'block' }}
          >
            {url || '—'}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={600}
          display="block"
          sx={{ mb: 0.5, textTransform: 'uppercase', letterSpacing: 0.5 }}
        >
          {t('popup.howToUse')}
        </Typography>

        <List dense disablePadding>
          {steps.map((step, index) => (
            <ListItem key={step.label} alignItems="flex-start" sx={{ px: 0, py: 0.75 }}>
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: 'primary.main',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={step.label}
                secondary={step.desc}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                secondaryTypographyProps={{ variant: 'caption', display: 'block', mt: 0.25 }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
}

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
}

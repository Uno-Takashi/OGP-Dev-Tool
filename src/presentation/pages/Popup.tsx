import { useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import type { SelectChangeEvent } from '@mui/material/Select';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import type { SupportedLanguage } from '../../i18n';

interface LanguageOption {
  value: SupportedLanguage;
  code: string;
  native: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'en', code: 'EN', native: 'English' },
  { value: 'ja', code: '日本語', native: '日本語' },
  { value: 'zh', code: '中文', native: '中文' },
  { value: 'de', code: 'DE', native: 'Deutsch' },
  { value: 'fr', code: 'FR', native: 'Français' },
  { value: 'es', code: 'ES', native: 'Español' },
  { value: 'pt', code: 'PT', native: 'Português' },
  { value: 'ko', code: '한국어', native: '한국어' },
  { value: 'ru', code: 'RU', native: 'Русский' },
  { value: 'ar', code: 'AR', native: 'العربية' },
  { value: 'it', code: 'IT', native: 'Italiano' },
  { value: 'nl', code: 'NL', native: 'Nederlands' },
  { value: 'tr', code: 'TR', native: 'Türkçe' },
  { value: 'vi', code: 'VI', native: 'Tiếng Việt' },
  { value: 'id', code: 'ID', native: 'Bahasa Indonesia' },
];

function Popup() {
  const { t, i18n } = useTranslation();
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const stored = localStorage.getItem('language');
    return stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)
      ? (stored as SupportedLanguage)
      : 'en';
  });

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

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent) => {
      const lang = event.target.value as SupportedLanguage;
      setLanguage(lang);
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
    },
    [i18n]
  );

  const handleDownloadUrl = useCallback(() => {
    if (!url) return;
    const blob = new Blob([url], { type: 'text/plain' });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'url.txt';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
  }, [url]);

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
          <Box component="img" src="icon32.png" alt="OGP Dev Tool" sx={{ width: 32, height: 32 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              OGP Dev Tool
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t('popup.subtitle')}
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 70 }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              inputProps={{ 'aria-label': t('common.language') }}
              renderValue={(val) => LANGUAGE_OPTIONS.find((o) => o.value === val)?.code ?? val}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.native}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} gutterBottom>
          {t('popup.currentUrl')}
        </Typography>
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 1,
            px: 1.5,
            py: 0.75,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontFamily: 'monospace', wordBreak: 'break-all', flexGrow: 1 }}
          >
            {url || '—'}
          </Typography>
          <Tooltip title={t('popup.downloadUrl')}>
            <span>
              <IconButton size="small" onClick={handleDownloadUrl} disabled={!url}>
                <DownloadIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mb: 0.5,
            fontWeight: 600,
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
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
                slotProps={{
                  primary: { variant: 'body2', sx: { fontWeight: 600 } },
                  secondary: { variant: 'caption', sx: { display: 'block', mt: 0.25 } },
                }}
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

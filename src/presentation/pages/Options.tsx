import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import type { SelectChangeEvent } from '@mui/material/Select';
import '../../i18n';
import type { SupportedLanguage } from '../../i18n';

const LANGUAGES: { value: SupportedLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
];

function Options() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['language', 'isDarkMode'], (result) => {
      if (result.language) setLanguage(result.language as SupportedLanguage);
      if (result.isDarkMode !== undefined) setIsDarkMode(result.isDarkMode as boolean);
    });
  }, []);

  const theme = createTheme({ palette: { mode: isDarkMode ? 'dark' : 'light' } });

  function handleSave() {
    chrome.storage.sync.set({ language, isDarkMode }, () => {
      i18n.changeLanguage(language);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('options.title')}
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>{t('options.language')}</InputLabel>
          <Select
            value={language}
            label={t('options.language')}
            onChange={(e: SelectChangeEvent) =>
              setLanguage(e.target.value as SupportedLanguage)
            }
          >
            {LANGUAGES.map((l) => (
              <MenuItem key={l.value} value={l.value}>
                {l.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
            />
          }
          label={t('common.darkMode')}
          sx={{ mb: 3, display: 'block' }}
        />

        <Button variant="contained" onClick={handleSave}>
          {saved ? t('options.saved') : t('options.save')}
        </Button>
      </Box>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Options />);
}

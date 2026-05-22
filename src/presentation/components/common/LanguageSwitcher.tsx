import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../hooks/useOGPData';
import { setLanguage } from '../../store/uiSlice';
import type { SupportedLanguage } from '../../../i18n';

interface LanguageOption {
  value: SupportedLanguage;
  code: string;
  native: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'en', code: 'EN',    native: 'English' },
  { value: 'ja', code: '日本語', native: '日本語' },
  { value: 'zh', code: '中文',  native: '中文' },
  { value: 'de', code: 'DE',    native: 'Deutsch' },
  { value: 'fr', code: 'FR',    native: 'Français' },
  { value: 'es', code: 'ES',    native: 'Español' },
  { value: 'pt', code: 'PT',    native: 'Português' },
  { value: 'ko', code: '한국어', native: '한국어' },
  { value: 'ru', code: 'RU',    native: 'Русский' },
  { value: 'ar', code: 'AR',    native: 'العربية' },
  { value: 'it', code: 'IT',    native: 'Italiano' },
  { value: 'nl', code: 'NL',    native: 'Nederlands' },
  { value: 'tr', code: 'TR',    native: 'Türkçe' },
  { value: 'vi', code: 'VI',    native: 'Tiếng Việt' },
  { value: 'id', code: 'ID',    native: 'Bahasa Indonesia' },
];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const handleChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as SupportedLanguage;
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 80 }}>
      <InputLabel id="lang-select-label">{t('common.language')}</InputLabel>
      <Select
        labelId="lang-select-label"
        value={language}
        label={t('common.language')}
        onChange={handleChange}
        renderValue={(val) =>
          LANGUAGE_OPTIONS.find((o) => o.value === val)?.code ?? val
        }
      >
        {LANGUAGE_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.native}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

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

const LANGUAGE_OPTIONS: { value: SupportedLanguage; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const handleChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as SupportedLanguage;
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 90 }}>
      <InputLabel id="lang-select-label">{t('common.language')}</InputLabel>
      <Select
        labelId="lang-select-label"
        value={language}
        label={t('common.language')}
        onChange={handleChange}
      >
        {LANGUAGE_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

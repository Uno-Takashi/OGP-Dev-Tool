import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/useOGPData';
import { toggleDarkMode } from '../../store/uiSlice';

export function DarkModeToggle() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

  const handleToggle = () => {
    const next = !isDarkMode;
    dispatch(toggleDarkMode());
    localStorage.setItem('isDarkMode', String(next));
  };

  return (
    <Tooltip title={isDarkMode ? t('common.lightMode') : t('common.darkMode')}>
      <IconButton onClick={handleToggle} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}

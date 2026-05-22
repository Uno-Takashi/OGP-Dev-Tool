import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import type { SupportedLanguage } from '../../i18n';

interface UIState {
  isDarkMode: boolean;
  language: SupportedLanguage;
  isAutoReload: boolean;
}

const storedLang = localStorage.getItem('language') as SupportedLanguage | null;

const initialState: UIState = {
  isDarkMode: localStorage.getItem('isDarkMode') === 'true',
  language:
    storedLang && (SUPPORTED_LANGUAGES as readonly string[]).includes(storedLang)
      ? storedLang
      : 'en',
  isAutoReload: localStorage.getItem('isAutoReload') === 'true',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
    setLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.language = action.payload;
    },
    setAutoReload(state, action: PayloadAction<boolean>) {
      state.isAutoReload = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode, setLanguage, setAutoReload } = uiSlice.actions;
export default uiSlice.reducer;

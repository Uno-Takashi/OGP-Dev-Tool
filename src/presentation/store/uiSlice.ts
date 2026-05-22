import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SupportedLanguage } from '../../i18n';

interface UIState {
  isDarkMode: boolean;
  language: SupportedLanguage;
}

const initialState: UIState = {
  isDarkMode: false,
  language: 'en',
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
  },
});

export const { toggleDarkMode, setDarkMode, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;

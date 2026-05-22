import React from 'react';
import type { Preview, Decorator } from '@storybook/react-webpack5';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/i18n';
import './chrome-mock';
import ogpReducer from '../src/presentation/store/ogpSlice';
import uiReducer from '../src/presentation/store/uiSlice';

const createMockStore = (isDarkMode = false) =>
  configureStore({
    reducer: { ogp: ogpReducer, ui: uiReducer },
    preloadedState: {
      ogp: { tags: [], isLoading: false, error: null },
      ui: { isDarkMode, language: 'en' as const },
    },
  });

const withProviders: Decorator = (Story, context) => {
  const isDarkMode = context.globals['theme'] === 'dark';
  const store = createMockStore(isDarkMode);
  const theme = createTheme({ palette: { mode: isDarkMode ? 'dark' : 'light' } });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

const preview: Preview = {
  decorators: [withProviders],
  globalTypes: {
    theme: {
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
};

export default preview;

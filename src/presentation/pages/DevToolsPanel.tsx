import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CachedIcon from '@mui/icons-material/Cached';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { store } from '../store';
import { AppThemeProvider } from '../contexts/ThemeContext';
import { DarkModeToggle } from '../components/common/DarkModeToggle';
import { OGPTable } from '../components/OGPTable';
import { TwitterPreview } from '../components/previews/TwitterPreview';
import { FacebookPreview } from '../components/previews/FacebookPreview';
import { ShadcnPreview } from '../components/previews/ShadcnPreview';
import { AntDesignPreview } from '../components/previews/AntDesignPreview';
import { MUIPreview } from '../components/previews/MUIPreview';
import { useOGPData, useAppDispatch, useAppSelector } from '../hooks/useOGPData';
import { fetchOGPData } from '../store/ogpSlice';
import { setAutoReload } from '../store/uiSlice';
import { exportOGPAsJson, exportOGPAsHtml } from '../../shared/utils/ogpExport';

function Panel() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { tags, isLoading, error, imageUrl, title, description, origin, siteName } = useOGPData();
  const hasLoaded = useAppSelector((state) => state.ogp.hasLoaded);
  const isAutoReload = useAppSelector((state) => state.ui.isAutoReload);

  const [showToast, setShowToast] = useState(false);
  const isExplicitReload = useRef(false);

  useEffect(() => {
    dispatch(fetchOGPData(chrome.devtools.inspectedWindow.tabId));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && isExplicitReload.current) {
      isExplicitReload.current = false;
      setShowToast(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isAutoReload) return;

    let timerId: ReturnType<typeof setTimeout> | undefined;
    const handleNavigated = () => {
      if (timerId !== undefined) clearTimeout(timerId);
      timerId = setTimeout(() => {
        dispatch(fetchOGPData(chrome.devtools.inspectedWindow.tabId));
      }, 300);
    };

    chrome.devtools.network.onNavigated.addListener(handleNavigated);
    return () => {
      chrome.devtools.network.onNavigated.removeListener(handleNavigated);
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [isAutoReload, dispatch]);

  const handleReload = useCallback(() => {
    isExplicitReload.current = true;
    dispatch(fetchOGPData(chrome.devtools.inspectedWindow.tabId));
  }, [dispatch]);

  const handleAutoReloadToggle = useCallback(() => {
    const next = !isAutoReload;
    localStorage.setItem('isAutoReload', String(next));
    dispatch(setAutoReload(next));
  }, [isAutoReload, dispatch]);

  const handleExportJson = useCallback(() => exportOGPAsJson(tags), [tags]);
  const handleExportHtml = useCallback(() => exportOGPAsHtml(tags), [tags]);

  const isInitialLoad = !hasLoaded && isLoading;
  const isReloading = hasLoaded && isLoading;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar variant="dense" sx={{ gap: 0.5, px: 1 }}>
          <Tooltip title={t('panel.reload')}>
            <IconButton onClick={handleReload} color="inherit" size="small" disabled={isLoading}>
              <CachedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('panel.autoReload')}>
            <Switch
              checked={isAutoReload}
              onChange={handleAutoReloadToggle}
              size="small"
              color="primary"
              slotProps={{ input: { 'aria-label': t('panel.autoReload') } }}
            />
          </Tooltip>
          <Tooltip title={t('panel.exportJson')}>
            <span>
              <IconButton
                onClick={handleExportJson}
                color="inherit"
                size="small"
                disabled={!hasLoaded || tags.length === 0}
              >
                <DataObjectIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('panel.exportHtml')}>
            <span>
              <IconButton
                onClick={handleExportHtml}
                color="inherit"
                size="small"
                disabled={!hasLoaded || tags.length === 0}
              >
                <CodeIcon />
              </IconButton>
            </span>
          </Tooltip>
          <DarkModeToggle />
          <Tooltip title={t('panel.github')}>
            <IconButton
              size="small"
              color="inherit"
              onClick={() =>
                chrome.tabs.create({ url: 'https://github.com/Uno-Takashi/OGP-Dev-Tool' })
              }
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={t('panel.settings')}>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => chrome.runtime.openOptionsPage()}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {isInitialLoad ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>{t('panel.loading')}</Typography>
        </Box>
      ) : (
        <Box sx={{ p: 1 }}>
          {isReloading && <LinearProgress sx={{ mb: 1 }} />}

          {error && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          )}

          <OGPTable tags={tags} />

          <Divider sx={{ my: 2 }} />

          <TwitterPreview
            imageUrl={imageUrl}
            title={title}
            description={description}
            origin={origin}
          />
          <FacebookPreview
            imageUrl={imageUrl}
            title={title}
            description={description}
            origin={origin}
          />

          <Divider sx={{ my: 2 }} />

          <ShadcnPreview
            imageUrl={imageUrl}
            title={title}
            description={description}
            origin={origin}
            siteName={siteName}
          />
          <AntDesignPreview
            imageUrl={imageUrl}
            title={title}
            description={description}
            origin={origin}
          />
          <MUIPreview imageUrl={imageUrl} title={title} description={description} origin={origin} />
        </Box>
      )}

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowToast(false)} sx={{ width: '100%' }}>
          {t('panel.reloadSuccess')}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <Panel />
      </AppThemeProvider>
    </Provider>
  );
}

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchOGPData } from '../store/ogpSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useOGPData() {
  const dispatch = useAppDispatch();
  const { tags, isLoading, error } = useAppSelector((state) => state.ogp);

  const reload = useCallback(() => {
    dispatch(fetchOGPData(chrome.devtools.inspectedWindow.tabId));
  }, [dispatch]);

  const { imageUrl, title, description, url, origin, siteName } = useMemo(() => {
    const imageUrl = tags.find((t) => t.ogpType === 'og:image')?.contentValue ?? null;
    const title = tags.find((t) => t.ogpType === 'og:title')?.contentValue ?? '';
    const description = tags.find((t) => t.ogpType === 'og:description')?.contentValue ?? '';
    const url = tags.find((t) => t.ogpType === 'og:url')?.contentValue ?? '';
    const siteName = tags.find((t) => t.ogpType === 'og:site_name')?.contentValue ?? '';
    let origin = '';
    try {
      if (url) origin = new URL(url).hostname;
    } catch {}
    return { imageUrl, title, description, url, origin, siteName };
  }, [tags]);

  return { tags, isLoading, error, reload, imageUrl, title, description, url, origin, siteName };
}

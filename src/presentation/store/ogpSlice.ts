import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { OGPTag } from '../../domain/entities/OGPMetadata';
import { ChromeOGPRepository } from '../../infrastructure/chrome/ChromeOGPRepository';
import { FetchOGPDataUseCase } from '../../application/usecases/FetchOGPDataUseCase';

interface OGPState {
  tags: OGPTag[];
  isLoading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

const initialState: OGPState = {
  tags: [],
  isLoading: false,
  error: null,
  hasLoaded: false,
};

const repository = new ChromeOGPRepository();
const fetchUseCase = new FetchOGPDataUseCase(repository);

export const fetchOGPData = createAsyncThunk<OGPTag[], number>(
  'ogp/fetch',
  async (tabId) => fetchUseCase.execute(tabId)
);

const ogpSlice = createSlice({
  name: 'ogp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOGPData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOGPData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchOGPData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch OGP data';
        state.hasLoaded = true;
      });
  },
});

export default ogpSlice.reducer;

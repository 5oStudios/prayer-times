import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Hadith, HadithClient } from '@islamic-kit/hadith';

export const fetchHadithList = createAsyncThunk('hadith/fetchHadithList', async (lang: string) => {
  const hadithClient = new HadithClient({
    language: lang === 'ar' ? 'ARABIC' : 'ENGLISH',
    strategy: 'offline',
  });

  try {
    const response = await hadithClient.getHadithList({
      index: 0,
      page: 1,
      perPage: 100,
      categoryId: 4,
    });

    if (Array.isArray(response)) {
      // Handle the case where response is string[]
      return convertStringsToHadithResponse(response);
    } else {
      // Handle the case where response is OnlineAPIResponse<Hadith[]>
      return response;
    }
  } catch (error) {
    throw error;
  }
});

const initialState: {
  hadith: Hadith[];
  status: string;
  error: unknown;
} = {
  hadith: [],
  status: 'idle',
  error: null,
};

const hadithSlice = createSlice({
  name: 'hadith',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHadithList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHadithList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hadith = action.payload;
      })
      .addCase(fetchHadithList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  selectors: {
    selectHadith: (state) => state.hadith,
    selectHadithStatus: (state) => state.status,
    selectHadithError: (state) => state.error,
  },
});

export default hadithSlice;

export const hadithActions = { fetchHadithList };

export const { selectHadith, selectHadithStatus, selectHadithError } = hadithSlice.selectors;
function convertStringsToHadithResponse(response: any): any {
  throw new Error('Function not implemented.');
}

'use client';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type FiltersState = {
  dateRange: string;
  userType: string | null;
};

const initialState: FiltersState = {
  dateRange: '30d',
  userType: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDateRange(state, action: PayloadAction<string>) {
      state.dateRange = action.payload;
    },
    setUserType(state, action: PayloadAction<string | null>) {
      state.userType = action.payload;
    },
  },
});

export const { setDateRange, setUserType } = filtersSlice.actions;

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {};

export const globalDataSlice = createSlice({
    name: 'globalData',
    initialState,
    reducers: {}
});

// export const {} = globalDataSlice.actions;

export const selectGlobalData = (state: RootState) => state.globalData;

export default globalDataSlice.reducer;

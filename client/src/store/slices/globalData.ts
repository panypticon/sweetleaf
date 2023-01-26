import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GlobalDataState {
    user: Object | null;
}

const initialState: GlobalDataState = {
    user: null
};

export const globalDataSlice = createSlice({
    name: 'globalData',
    initialState,
    reducers: {}
});

// export const {} = globalDataSlice.actions;

export const selectGlobalData = (state: RootState) => state.globalData;

export default globalDataSlice.reducer;

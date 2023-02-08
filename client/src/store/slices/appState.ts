import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import type { AppStateState } from '../../types';

const initialState: AppStateState = {
    mobileNavOpen: false
};

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setMobileNavState: (state, action: PayloadAction<boolean>) => {
            state.mobileNavOpen = action.payload;
        }
    }
});

export const { setMobileNavState } = appStateSlice.actions;

export const selectappState = (state: RootState) => state.appState;

export default appStateSlice.reducer;

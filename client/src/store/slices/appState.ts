import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppStateState } from '../../types';
import type { RootState } from '../store';

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

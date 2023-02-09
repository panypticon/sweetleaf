import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';
import type { RootState } from '../store';

interface GlobalDataState {
    user: User | null;
}

const initialState: GlobalDataState = {
    user: null
};

export const globalDataSlice = createSlice({
    name: 'globalData',
    initialState,
    reducers: {
        removeUser: state => {
            state.user = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser, removeUser } = globalDataSlice.actions;

export const selectGlobalData = (state: RootState) => state.globalData;

export default globalDataSlice.reducer;

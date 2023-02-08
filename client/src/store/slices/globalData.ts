import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import type { User } from '../../types';

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

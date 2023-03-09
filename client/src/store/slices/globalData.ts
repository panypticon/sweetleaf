import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { postJSONData } from '../../api/fetch';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, LaxProps } from '../../types';
import type { RootState } from '../store';

interface GlobalDataState {
    user: User | null;
}

const initialState: GlobalDataState = {
    user: null
};

export const updateUser = createAsyncThunk(
    'globalData/updateUser',
    async ({ id, preferences }: { id: String; preferences: LaxProps }) => {
        const res = await postJSONData(`/api/v1/users/${id}`, { preferences }, 'PUT');
        return res;
    }
);

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
    },
    extraReducers: builder => {
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = { ...state.user, ...action.payload };
        });
    }
});

export const { setUser, removeUser } = globalDataSlice.actions;

export const selectGlobalData = (state: RootState) => state.globalData;

export default globalDataSlice.reducer;

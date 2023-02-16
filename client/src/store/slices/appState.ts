import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppStateState, CartItem } from '../../types';
import type { RootState } from '../store';

const initialState: AppStateState = {
    mobileNavOpen: false,
    mobileSearchOpen: false,
    searchTerm: '',
    cart: JSON.parse(localStorage.getItem('cart') || '{}')
};

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setMobileNavState: (state, action: PayloadAction<boolean>) => {
            state.mobileNavOpen = action.payload;
        },
        setMobileSearchState: (state, action: PayloadAction<boolean>) => {
            state.mobileSearchOpen = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { item, amount, packageSize } = action.payload;
            const cartItemId = `${item.id}-${packageSize}`;
            if (!state.cart[cartItemId]) state.cart[cartItemId] = action.payload;
            else state.cart[cartItemId].amount = state.cart[cartItemId].amount + amount;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }
});

export const { setMobileNavState, setSearchTerm, setMobileSearchState, addToCart } = appStateSlice.actions;

export const selectappState = (state: RootState) => state.appState;

export default appStateSlice.reducer;

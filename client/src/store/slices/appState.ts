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

const calculateCartItemPrice = (item: CartItem) =>
    item.amount * (item.item.inventory.find(size => size.size === item.packageSize)?.price || 0);

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
            else {
                state.cart[cartItemId].amount = state.cart[cartItemId].amount + amount;
                state.cart[cartItemId].price = calculateCartItemPrice(state.cart[cartItemId]);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        incrementInCart: (state, action: PayloadAction<string>) => {
            state.cart[action.payload].amount <= 99 && state.cart[action.payload].amount++;
            state.cart[action.payload].price = calculateCartItemPrice(state.cart[action.payload]);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        decrementInCart: (state, action: PayloadAction<string>) => {
            if (state.cart[action.payload].amount > 1) {
                state.cart[action.payload].amount--;
                state.cart[action.payload].price = calculateCartItemPrice(state.cart[action.payload]);
            } else delete state.cart[action.payload];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        resetCart: state => {
            state.cart = {};
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }
});

export const {
    setMobileNavState,
    setSearchTerm,
    setMobileSearchState,
    addToCart,
    incrementInCart,
    decrementInCart,
    resetCart
} = appStateSlice.actions;

export const selectAppState = (state: RootState) => state.appState;

export default appStateSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import globalDataReducer from '../store/slices/globalData';
import appStateReducer from '../store/slices/appState';

export const store = configureStore({
    reducer: {
        globalData: globalDataReducer,
        appState: appStateReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

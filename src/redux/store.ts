import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import generalReducer from './generalSlice';
import accountsReducer from './accountsSlice';
import fundsReducer from './fundsSlice';
import settingsReducer from './settingsSlice';
import transactionsReducer from './transactionsSlice';
import categoriesReducer from './categoriesSlice';

import { retrieveFromStorage, saveToStorage } from "../utils/localStorage.utils";

const localStorageListener = createListenerMiddleware();
localStorageListener.startListening({
    predicate: (action) => {
        if (action.type.includes('general')) return false;
        return true;
    },
    effect: (_, listenerApi ) => {
        const state = listenerApi.getState() as RootState;
        saveToStorage(state);
    }
});

export const reducer = {
    general: generalReducer,
    accounts: accountsReducer,
    categories: categoriesReducer,
    funds: fundsReducer,
    settings: settingsReducer,
    transactions: transactionsReducer
}

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageListener.middleware),
    preloadedState: retrieveFromStorage()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
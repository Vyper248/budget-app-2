import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import generalReducer from './generalSlice';
import accountsReducer from './accountsSlice';
import fundsReducer from './fundsSlice';
import settingsReducer from './settingsSlice';
import transactionsReducer from './transactionsSlice';
import categoriesReducer from './categoriesSlice';
import toolsReducer from "./toolsSlice";

import { retrieveFromStorage, saveToStorage } from "@/utils/localStorage.utils";
import { sync } from "@/utils/sync.utils";

let timeout: NodeJS.Timeout | null = null;
let localTimeout: NodeJS.Timeout | null = null;

const localStorageListener = createListenerMiddleware();
localStorageListener.startListening({
    predicate: (action) => {
        if (action.type === 'general/setUser') return true;
        if (action.type === 'general/setLastSync') return true;
        if (action.type.includes('general')) return false;
        if (action.type === 'transactions/setAddingTransaction') return false;
        if (action.type === 'transactions/selectTransaction') return false;
        return true;
    },
    effect: (_, listenerApi ) => {
        const state = listenerApi.getState() as RootState;
        if (localTimeout) clearTimeout(localTimeout);
        
        localTimeout = setTimeout(() => {
            saveToStorage(state);
        }, 200);
    }
});

const syncListener = createListenerMiddleware();
syncListener.startListening({
    predicate: (action) => {
        
        const ignoreList = ['transactions/setAddingTransaction', 'transactions/selectTransaction', 'transactions/setTransactions'];
        if (ignoreList.includes(action.type)) return false;
        if (action.type.includes('general/')) return false;
        if (action.type.includes('sync')) return false;
        if (action.type.includes('settings/')) return true;
        if (action.type.includes('tools/')) return true;
        if (action.type.includes('/set')) return false;
        
        return true;
    },
    effect: (_, listenerApi ) => {
        const state = listenerApi.getState() as RootState;
        const dispatch = listenerApi.dispatch as AppDispatch;
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            sync(state, dispatch);
        }, 500);
    }
});

export const reducer = {
    general: generalReducer,
    accounts: accountsReducer,
    categories: categoriesReducer,
    funds: fundsReducer,
    settings: settingsReducer,
    transactions: transactionsReducer,
    tools: toolsReducer
}

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageListener.middleware, syncListener.middleware),
    preloadedState: retrieveFromStorage()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
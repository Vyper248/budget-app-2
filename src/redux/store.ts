import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import generalReducer from './generalSlice';
import accountsReducer from './accountsSlice';
import fundsReducer from './fundsSlice';
import settingsReducer from './settingsSlice';
import transactionsReducer from './transactionsSlice';
import categoriesReducer from './categoriesSlice';
import toolsReducer from "./toolsSlice";

import { retrieveFromStorage, saveToStorage } from "@/utils/localStorage.utils";

let localTimeout: NodeJS.Timeout | null = null;

const localStorageListener = createListenerMiddleware();
localStorageListener.startListening({
    predicate: (action) => {
        if (action.type === 'general/setLastSync') return true;
        if (action.type.includes('general')) return false;
        if (action.type === 'transactions/setAddingTransaction') return false;
        if (action.type === 'transactions/selectTransaction') return false;
        return true;
    },
    effect: (action, listenerApi ) => {
        const state = listenerApi.getState() as RootState;
        if (localTimeout) clearTimeout(localTimeout);

        if (action.type === 'general/setLastSync') {
            saveToStorage(state);
            if (localTimeout) clearTimeout(localTimeout);
        } else {
            localTimeout = setTimeout(() => {
                saveToStorage(state);
            }, 200);
        }
        
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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageListener.middleware),
    preloadedState: retrieveFromStorage()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
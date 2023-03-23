import { configureStore } from "@reduxjs/toolkit";
import generalReducer from './generalSlice';
import accountsReducer from './accountsSlice';
import fundsReducer from './fundsSlice';
import settingsReducer from './settingsSlice';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
    reducer: {
        general: generalReducer,
        accounts: accountsReducer,
        funds: fundsReducer,
        settings: settingsReducer,
        transactions: transactionsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
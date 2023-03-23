import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Account = {
    id: number;
    name: string;
    closed: boolean;
    currency: string;
    dateOpened: string;
    defaultAccount: boolean;
    extraCharges: number;
    interestRate: number;
    note: string;
    startingBalance: number;
    updated: number;
}

export interface AccountsState {
    accounts: Account[];
}

const initialState: AccountsState = {
    accounts: [],
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
            state.accounts.push(action.payload);
        },
        editAccount: (state, action: PayloadAction<Account>) => {
            const accountIndex = state.accounts.findIndex(account => account.id === action.payload.id);
            if (accountIndex !== -1) {
                state.accounts[accountIndex] = action.payload;
            }
        },
        removeAccount: (state, action: PayloadAction<number>) => {
            state.accounts = state.accounts.filter(account => account.id !== action.payload);
        },
        setAccounts: (state, action: PayloadAction<Account[]>) => {
            state.accounts = action.payload;
        }
    },
})

export const { addAccount, editAccount, removeAccount, setAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;
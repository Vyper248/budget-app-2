import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';

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
    deleted?: number;
}

export interface AccountsState {
    accounts: Account[];
}

export const initialState: AccountsState = {
    accounts: [
        {
            id: 20190723153000,
            name: 'Starling',
            closed: false,
            currency: '£',
            dateOpened: '2019-07-23',
            defaultAccount: true,
            extraCharges: 0,
            interestRate: 0,
            note: '',
            startingBalance: 0,
            updated: 20190723153000
        },
        {
            id: 20200101153000,
            name: 'NatWest',
            closed: false,
            currency: '£',
            dateOpened: '2019-07-23',
            defaultAccount: false,
            extraCharges: 0,
            interestRate: 0,
            note: '',
            startingBalance: 0,
            updated: 20200101153000
        }
    ],
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
            state.accounts.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber() });
        },
        editAccount: (state, action: PayloadAction<Account>) => {
            const accountIndex = state.accounts.findIndex(account => account.id === action.payload.id);
            if (accountIndex !== -1) {
                state.accounts[accountIndex] = { ...action.payload, updated: getDateNumber() };

                //there can only be one default account
                if (action.payload.defaultAccount === true) {
                    state.accounts.forEach(acc => acc.id !== action.payload.id ? acc.defaultAccount = false : null);
                }
            }
        },
        removeAccount: (state, action: PayloadAction<number>) => {
            const account = state.accounts.find(account => account.id === action.payload);
            if (account) {
                account.deleted = getDateNumber();
            }
        },
        setAccounts: (state, action: PayloadAction<Account[]>) => {
            state.accounts = action.payload;
        }
    },
})

export const { addAccount, editAccount, removeAccount, setAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;
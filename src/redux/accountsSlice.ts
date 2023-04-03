import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';

export type Account = {
    id: number;
    name: string;
    hidden: boolean;
    defaultAccount: boolean;
    extraCharges: number;
    interestRate: number;
    note: string;
    startingBalance: number;
    updated: number;
    deleted?: number;
}

export const initialState: Account[] = [
    {
        id: 20190723153000,
        name: 'Starling',
        hidden: false,
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
        hidden: false,
        defaultAccount: false,
        extraCharges: 0,
        interestRate: 0,
        note: '',
        startingBalance: 0,
        updated: 20200101153000
    }
]

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
            state.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber() });
        },
        editAccount: (state, action: PayloadAction<Account>) => {
            const accountIndex = state.findIndex(account => account.id === action.payload.id);
            if (accountIndex !== -1) {
                state[accountIndex] = { ...action.payload, updated: getDateNumber() };

                //there can only be one default account
                if (action.payload.defaultAccount === true) {
                    state.forEach(acc => acc.id !== action.payload.id ? acc.defaultAccount = false : null);
                }
            }
        },
        removeAccount: (state, action: PayloadAction<number>) => {
            const account = state.find(account => account.id === action.payload);
            if (account) {
                account.deleted = getDateNumber();
            }
        },
        setAccounts: (_, action: PayloadAction<Account[]>) => {
            return action.payload;
        }
    },
})

export const { addAccount, editAccount, removeAccount, setAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;
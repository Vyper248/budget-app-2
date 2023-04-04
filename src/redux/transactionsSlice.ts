import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';
import { RootState } from './store';

type TransactionBase = {
    id: number;
    amount: number;
    date: string;
    updated: number;
    deleted?: number;
}

type SpendExtra = {
    type: 'spend';
    description: string;
    category: number | undefined;
    fund: number | undefined;
    account: number;
}

type TransferExtra = {
    type: 'transfer';
    from: number;
    to: number;
}

type FundExtra = {
    type: 'fundAddition';
    description: string;
    fund: number;
}

export type Transaction = TransactionBase & (SpendExtra | TransferExtra | FundExtra);
export type SpendTransaction = TransactionBase & SpendExtra;
export type TransferTransaction = TransactionBase & TransferExtra;
export type FundTransaction = TransactionBase & FundExtra;

export interface TransactionsState {
    transactions: Transaction[];
    addingTransaction: boolean;
}

export const initialState: TransactionsState = {
    transactions: [],
    addingTransaction: false
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setAddingTransaction: (state, action: PayloadAction<boolean>) => {
            state.addingTransaction = action.payload;
        },
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber() });
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = { ...action.payload, updated: getDateNumber() };
            }
        },
        removeTransaction: (state, action: PayloadAction<number>) => {
            const transaction = state.transactions.find(transaction => transaction.id === action.payload);
            if (transaction) {
                transaction.deleted = getDateNumber();
            }
        },
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
        }
    },
})

export const selectTransactions = (state: RootState) => state.transactions.transactions;

export const selectFundAdditions = createSelector([selectTransactions], (transactions) => {
    return transactions.filter((tr: Transaction) => tr.type === 'fundAddition') as FundTransaction[];
});

export const { setAddingTransaction, addTransaction, editTransaction, removeTransaction, setTransactions  } = transactionsSlice.actions;
export default transactionsSlice.reducer;
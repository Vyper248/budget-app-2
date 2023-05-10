import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '@/utils/date.utils';
import { RootState } from './store';

export type TransactionObj = {
	runningBalance?: number;
	transaction: Transaction;
}

export type MonthlyTransactions = {
	month: string;
	transactions: TransactionObj[];
}

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
    selectedTransaction: Transaction | null;
}

export const initialState: TransactionsState = {
    transactions: [],
    addingTransaction: false,
    selectedTransaction: null
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setAddingTransaction: (state, action: PayloadAction<boolean>) => {
            state.addingTransaction = action.payload;
            if (action.payload === true) state.selectedTransaction = null;
        },
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber() });
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = { ...action.payload, updated: getDateNumber() };
            }
            state.addingTransaction = false;
            state.selectedTransaction = null;
        },
        removeTransaction: (state, action: PayloadAction<number>) => {
            const transaction = state.transactions.find(transaction => transaction.id === action.payload);
            if (transaction) {
                transaction.deleted = getDateNumber();
            }
            state.addingTransaction = false;
            state.selectedTransaction = null;
        },
        selectTransaction: (state, action: PayloadAction<Transaction | null>) => {
            state.selectedTransaction = action.payload;
            if (action.payload !== null) state.addingTransaction = false;
        }, 
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
        }
    },
})

export const selectTransactionsBasic = (state: RootState) => state.transactions.transactions;

export const selectTransactions = createSelector([selectTransactionsBasic], (transactions) => {
    return transactions.filter((tr: Transaction) => tr.deleted === undefined || tr.deleted === 0) as Transaction[];
});

export const selectFundAdditions = createSelector([selectTransactions], (transactions) => {
    return transactions.filter((tr: Transaction) => tr.type === 'fundAddition') as FundTransaction[];
});

export const { setAddingTransaction, addTransaction, editTransaction, removeTransaction, selectTransaction, setTransactions  } = transactionsSlice.actions;
export default transactionsSlice.reducer;
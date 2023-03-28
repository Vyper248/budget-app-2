import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';

type SpendTransaction = {
    id: number;
    type: 'spend';
    amount: number;
    date: string;
    description: string;
    category: number;
    account: number;
    updated: number;
    deleted?: number;
}

type TransferTransaction = {
    id: number;
    type: 'transfer';
    amount: number;
    date: string;
    from: number;
    to: number;
    updated: number;
    deleted?: number;
}

export type Transaction = SpendTransaction | TransferTransaction;

export type FundAddition = {
    id: number;
    amount: number;
    date: string;
    fund: number;
    updated: number;
    deleted?: number;
}

export interface TransactionsState {
    transactions: Transaction[];
    fundAdditions: FundAddition[];
    addingTransaction: boolean;
}

export const initialState: TransactionsState = {
    transactions: [],
    fundAdditions: [],
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
            state.transactions.push({ ...action.payload, id: getDateNumber() });
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
        addFundAddition: (state, action: PayloadAction<FundAddition>) => {
            state.fundAdditions.push({ ...action.payload, id: getDateNumber() });
        },
        editFundAddition: (state, action: PayloadAction<FundAddition>) => {
            const index = state.fundAdditions.findIndex(fundAddition => fundAddition.id === action.payload.id);
            if (index !== -1) {
                state.fundAdditions[index] = { ...action.payload, updated: getDateNumber() };
            }
        },
        removeFundAddition: (state, action: PayloadAction<number>) => {
            const fundAddition = state.fundAdditions.find(fundAddition => fundAddition.id === action.payload);
            if (fundAddition) {
                fundAddition.deleted = getDateNumber();
            }
        },
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
        },
        setFundAdditions: (state, action: PayloadAction<FundAddition[]>) => {
            state.fundAdditions = action.payload;
        }
    },
})

export const { setAddingTransaction, addTransaction, editTransaction, removeTransaction, 
                                     addFundAddition, editFundAddition, removeFundAddition,
                                    setTransactions, setFundAdditions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
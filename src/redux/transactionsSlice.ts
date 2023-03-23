import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type SpendTransaction = {
    id: number;
    type: 'spend';
    amount: number;
    date: string;
    description: string;
    category: number;
    account: number;
}

type TransferTransaction = {
    id: number;
    type: 'transfer';
    amount: number;
    date: string;
    from: number;
    to: number;
}

export type Transaction = SpendTransaction | TransferTransaction;

export type FundAddition = {
    id: number;
    amount: number;
    date: string;
    fund: number;
}

export interface TransactionsState {
    transactions: Transaction[];
    fundAdditions: FundAddition[];
    addingTransaction: boolean;
}

const initialState: TransactionsState = {
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
            state.transactions.push(action.payload);
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        removeTransaction: (state, action: PayloadAction<number>) => {
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
        },
        addFundAddition: (state, action: PayloadAction<FundAddition>) => {
            state.fundAdditions.push(action.payload);
        },
        editFundAddition: (state, action: PayloadAction<FundAddition>) => {
            const index = state.fundAdditions.findIndex(fundAddition => fundAddition.id === action.payload.id);
            if (index !== -1) {
                state.fundAdditions[index] = action.payload;
            }
        },
        removeFundAddition: (state, action: PayloadAction<number>) => {
            state.fundAdditions = state.fundAdditions.filter(fundAddition => fundAddition.id !== action.payload);
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
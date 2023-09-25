import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Category } from './categoriesSlice';
import type { Account } from './accountsSlice';
import type { Fund } from './fundsSlice';
import type { Transaction } from './transactionsSlice';

export type Message = {
    text: string;
    type: string;
}

export type SelectedTotal = {
	transactions: Transaction[];
	date: string;
	itemId: number;
	type: string;
	x: number;
	y: number;
}

export type Item = Category | Account | Fund;
export type ItemType = 'category' | 'account' | 'fund';

export interface GeneralState {
    currentPage: string;
    currentToolPage: string;
    selectedItem: number;
    selectedTotal: SelectedTotal | null;
    lastSync: number;
    fetching: boolean;
    message: Message;
}

export const initialState: GeneralState = {
    currentPage: 'Home',
    currentToolPage: 'Category Breakdown',
    selectedItem: 0,
    selectedTotal: null,
    lastSync: 0,
    fetching: false,
    message: {
        text: '',
        type: ''
    }
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
            state.selectedItem = 0;
            state.selectedTotal = null;
        },
        setCurrentToolPage: (state, action: PayloadAction<string>) => {
            state.currentToolPage = action.payload;
        },
        setSelectedItem: (state, action: PayloadAction<number>) => {
            state.selectedItem = action.payload;
        },
        setSelectedTotal: (state, action: PayloadAction<SelectedTotal | null>) => {
            state.selectedTotal = action.payload;
        },
        setLastSync: (state, action: PayloadAction<number>) => {
            state.lastSync = action.payload;
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.fetching = action.payload;
        },
        setMessage: (state, action: PayloadAction<Message>) => {
            state.message = action.payload;
        },
    },
})

export const { setCurrentPage, setCurrentToolPage, setSelectedItem, setSelectedTotal, setLastSync, setFetching, setMessage } = generalSlice.actions;
export default generalSlice.reducer;
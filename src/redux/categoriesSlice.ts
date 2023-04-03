import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';

export type Category = {
    id: number;
    name: string;
    type: 'income' | 'expense';
    description: string;
    hidden: boolean;
    startingBalance: number;
    updated: number;
    deleted?: number;
}

export const initialState: Category[] = [
    {
        id: 20200723153000,
        name: 'Earnings',
        description: '',
        type: 'income',
        hidden: false,
        startingBalance: 0,
        updated: 0
    },
    {
        id: 20200723153001,
        name: 'Interest',
        description: '',
        type: 'income',
        hidden: false,
        startingBalance: 0,
        updated: 0
    },
    {
        id: 20200723153102,
        name: 'Food',
        description: '',
        type: 'expense',
        hidden: false,
        startingBalance: 0,
        updated: 0
    },
]

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber() });
        },
        editCategory: (state, action: PayloadAction<Category>) => {
            const categoryIndex = state.findIndex(category => category.id === action.payload.id);
            if (categoryIndex !== -1) {
                state[categoryIndex] = { ...action.payload, updated: getDateNumber() };
            }
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            const category = state.find((category) => category.id === action.payload);
            if (category) {
                category.deleted = getDateNumber();
            }
        },
        setCategories: (_, action: PayloadAction<Category[]>) => {
            return action.payload;
        }
    },
})

export const { addCategory, editCategory, removeCategory, setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
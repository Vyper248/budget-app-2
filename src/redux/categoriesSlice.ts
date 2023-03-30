import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';

export type Category = {
    id: number;
    name: string;
    type: 'income' | 'expense';
    description: string;
    dateCreated: string;
    hidden: boolean;
    startingBalance: number;
    updated: number;
    deleted?: number;
}

export interface CategoriesState {
    categories: Category[];
}

export const initialState: CategoriesState = {
    categories: [
        {
            id: 20200723153000,
            name: 'Earnings',
            description: '',
            type: 'income',
            hidden: false,
            dateCreated: '2023-01-01',
            startingBalance: 0,
            updated: 0
        },
        {
            id: 20200723153001,
            name: 'Interest',
            description: '',
            type: 'income',
            hidden: false,
            dateCreated: '2023-01-01',
            startingBalance: 0,
            updated: 0
        },
        {
            id: 20200723153102,
            name: 'Food',
            description: '',
            type: 'expense',
            hidden: false,
            dateCreated: '2023-01-01',
            startingBalance: 0,
            updated: 0
        },
    ]
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber() });
        },
        editCategory: (state, action: PayloadAction<Category>) => {
            const categoryIndex = state.categories.findIndex(category => category.id === action.payload.id);
            if (categoryIndex !== -1) {
                state.categories[categoryIndex] = { ...action.payload, updated: getDateNumber() };
            }
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            const category = state.categories.find((category) => category.id === action.payload);
            if (category) {
                category.deleted = getDateNumber();
            }
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        }
    },
})

export const { addCategory, editCategory, removeCategory, setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
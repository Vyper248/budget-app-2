import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Category = {
    id: number;
    name: string;
    type: 'income' | 'expense';
    description: string;
    dateCreated: string;
    hidden: boolean;
    startingBalance: number;
    updated: number;
}

export interface CategoriesState {
    categories: Category[];
}

const initialState: CategoriesState = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        editCategory: (state, action: PayloadAction<Category>) => {
            const categoryIndex = state.categories.findIndex(category => category.id === action.payload.id);
            if (categoryIndex !== -1) {
                state.categories[categoryIndex] = action.payload;
            }
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        }
    },
})

export const { addCategory, editCategory, removeCategory, setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
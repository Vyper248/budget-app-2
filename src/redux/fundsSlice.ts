import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Fund = {
    id: number;
    name: string;
    description: string;
    targetAmount: number;
    dateCreated: string;
    complete: boolean;
    startingBalance: number;
    updated: number;
}

export interface FundsState {
    funds: Fund[];
}

const initialState: FundsState = {
    funds: []
}

export const fundsSlice = createSlice({
    name: 'funds',
    initialState,
    reducers: {
        addFund: (state, action: PayloadAction<Fund>) => {
            state.funds.push(action.payload);
        },
        editFund: (state, action: PayloadAction<Fund>) => {
            const fundIndex = state.funds.findIndex(fund => fund.id === action.payload.id);
            if (fundIndex !== -1) {
                state.funds[fundIndex] = action.payload;
            }
        },
        removeFund: (state, action: PayloadAction<number>) => {
            state.funds = state.funds.filter(fund => fund.id !== action.payload);
        },
        setFunds: (state, action: PayloadAction<Fund[]>) => {
            state.funds = action.payload;
        }
    },
})

export const { addFund, editFund, removeFund, setFunds } = fundsSlice.actions;
export default fundsSlice.reducer;
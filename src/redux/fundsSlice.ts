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
    funds: [
        {
            id: 20200723153130,
            name: 'Savings',
            description: 'General Savings',
            targetAmount: 0,
            complete: false,
            dateCreated: '2023-01-01',
            startingBalance: 0,
            updated: 0
        }
    ]
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
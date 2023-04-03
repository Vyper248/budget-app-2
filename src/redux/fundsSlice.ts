import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';

export type Fund = {
    id: number;
    name: string;
    description: string;
    targetAmount: number;
    dateCreated: string;
    complete: boolean;
    startingBalance: number;
    updated: number;
    deleted?: number;
}

export const initialState: Fund[] = [
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

export const fundsSlice = createSlice({
    name: 'funds',
    initialState,
    reducers: {
        addFund: (state, action: PayloadAction<Fund>) => {
            state.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber() });
        },
        editFund: (state, action: PayloadAction<Fund>) => {
            const fundIndex = state.findIndex(fund => fund.id === action.payload.id);
            if (fundIndex !== -1) {
                state[fundIndex] = { ...action.payload, updated: getDateNumber() };
            }
        },
        removeFund: (state, action: PayloadAction<number>) => {
            const fund = state.find(fund => fund.id === action.payload);
            if (fund) {
                fund.deleted = getDateNumber();
            }
        },
        setFunds: (_, action: PayloadAction<Fund[]>) => {
            return action.payload;
        }
    },
})

export const { addFund, editFund, removeFund, setFunds } = fundsSlice.actions;
export default fundsSlice.reducer;
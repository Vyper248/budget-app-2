import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '@/utils/date.utils';
import { RootState } from './store';

export type Fund = {
    id: number;
    name: string;
    description: string;
    targetAmount: number;
    hidden: boolean;
    startingBalance: number;
    updated: number;
    deleted?: number;
    sort: number;
}

export const initialState: Fund[] = [
    {
        id: 20200723153130,
        name: 'Savings',
        description: 'General Savings',
        targetAmount: 0,
        hidden: false,
        startingBalance: 0,
        updated: 0,
        sort: 0
    }
]

export const fundsSlice = createSlice({
    name: 'funds',
    initialState,
    reducers: {
        addFund: (state, action: PayloadAction<Fund>) => {
            state.push({ ...action.payload, id: getDateNumber(), updated: getDateNumber(), sort: state.length });
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
                fund.updated = getDateNumber();
            }
        },
        reorderFunds: (state, action: PayloadAction<Fund[]>) => {
            const deleted = state.filter(obj => obj.deleted !== undefined && obj.deleted > 0);
            return [...action.payload, ...deleted];
        },
        setFunds: (_, action: PayloadAction<Fund[]>) => {
            return action.payload;
        }
    },
})

export const selectFundsBasic = (state: RootState) => state.funds;

export const selectFunds = createSelector(selectFundsBasic, funds => {
    const filtered = funds.filter(fund => fund.deleted === undefined || fund.deleted === 0);
    return filtered.sort((a,b) => a.sort - b.sort);
});

export const { addFund, editFund, removeFund, reorderFunds, setFunds } = fundsSlice.actions;
export default fundsSlice.reducer;
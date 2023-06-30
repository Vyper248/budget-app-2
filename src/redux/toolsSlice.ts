import { getDateNumber } from '@/utils/date.utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ToolsState {
    savingsTargetDate: string;
    savingsTarget: number;
    savingsUseMoney: boolean;
    updated: number;
}

export const initialState: ToolsState = {
    savingsTargetDate: '',
    savingsTarget: 0,
    savingsUseMoney: true,
    updated: 0
}

export const toolsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        setSavingsTargetDate: (state, action: PayloadAction<string>) => {
            state.savingsTargetDate = action.payload;
            state.updated = getDateNumber();
        },
        setSavingsTarget: (state, action: PayloadAction<number>) => {
            state.savingsTarget = action.payload;
            state.updated = getDateNumber();
        },
        setSavingsUseMoney: (state, action: PayloadAction<boolean>) => {
            state.savingsUseMoney = action.payload;
            state.updated = getDateNumber();
        },
        syncTools: (_, action: PayloadAction<ToolsState>) => {
            return action.payload;
        }
    },
})

export const { setSavingsTargetDate,  setSavingsTarget, setSavingsUseMoney, syncTools } = toolsSlice.actions;
export default toolsSlice.reducer;
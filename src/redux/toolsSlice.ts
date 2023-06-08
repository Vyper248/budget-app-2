import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ToolsState {
    savingsTargetDate: string;
    savingsTarget: number;
    savingsUseMoney: boolean;
}

export const initialState: ToolsState = {
    savingsTargetDate: '',
    savingsTarget: 0,
    savingsUseMoney: true
}

export const toolsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        setSavingsTargetDate: (state, action: PayloadAction<string>) => {
            state.savingsTargetDate = action.payload;
        },
        setSavingsTarget: (state, action: PayloadAction<number>) => {
            state.savingsTarget = action.payload;
        },
        setSavingsUseMoney: (state, action: PayloadAction<boolean>) => {
            state.savingsUseMoney = action.payload;
        }
    },
})

export const { setSavingsTargetDate,  setSavingsTarget, setSavingsUseMoney } = toolsSlice.actions;
export default toolsSlice.reducer;
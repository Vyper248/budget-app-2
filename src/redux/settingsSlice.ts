import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '@/utils/date.utils';
import { changeColourScheme } from '@/utils/general.utils';

export type PayPeriodType = 'monthly' | 'fourWeekly' | 'weekly' | 'twoWeekly';
export type ColourScheme = 'dark' | 'light';

export interface SettingsState {
    payPeriodType: PayPeriodType;
    currencySymbol: string;
    colourScheme: ColourScheme;
    showDecimals: boolean;
    startDate: string;
    swapSummaries: boolean;
    periodsToDisplay: number;
    displayMonths: boolean;
    displayIncomeTotal: boolean;
    displayExpenseTotal: boolean;
    showChart: boolean;
    updated: number;
}

export const initialState: SettingsState = {
    payPeriodType: 'monthly',
    currencySymbol: '£',
    colourScheme: 'dark',
    showDecimals: true,
    startDate: '2023-01-01',
    swapSummaries: false,
    periodsToDisplay: 6,
    displayMonths: false,
    displayIncomeTotal: false,
    displayExpenseTotal: false,
    showChart: true,
    updated: 20230101120000,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        syncSettings: (_, action: PayloadAction<SettingsState>) => {
            changeColourScheme(action.payload.colourScheme);
            return action.payload;
        },
        setSettings: (_, action: PayloadAction<SettingsState>) => {
            changeColourScheme(action.payload.colourScheme);
            return {...action.payload, updated: getDateNumber()};
        }
    },
})

export const { syncSettings, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
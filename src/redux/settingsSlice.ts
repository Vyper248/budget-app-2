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
        setPayPeriodType: (state, action: PayloadAction<PayPeriodType>) => {
            state.payPeriodType = action.payload;
            state.updated = getDateNumber();
        },
        setCurrencySymbol: (state, action: PayloadAction<string>) => {
            state.currencySymbol = action.payload;
            state.updated = getDateNumber();
        },
        setColourScheme: (state, action: PayloadAction<ColourScheme>) => {
            state.colourScheme = action.payload;
            changeColourScheme(action.payload);
            state.updated = getDateNumber();
        },
        setShowDecimals: (state, action: PayloadAction<boolean>) => {
            state.showDecimals = action.payload;
            state.updated = getDateNumber();
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.startDate = action.payload;
            state.updated = getDateNumber();
        },
        setSwapSummaries: (state, action: PayloadAction<boolean>) => {
            state.swapSummaries = action.payload;
            state.updated = getDateNumber();
        },
        setPeriodsToDisplay: (state, action: PayloadAction<number>) => {
            state.periodsToDisplay = action.payload;
            state.updated = getDateNumber();
        },
        setDisplayMonths: (state, action: PayloadAction<boolean>) => {
            state.displayMonths = action.payload;
            state.updated = getDateNumber();
        },
        setDisplayIncomeTotal: (state, action: PayloadAction<boolean>) => {
            state.displayIncomeTotal = action.payload;
            state.updated = getDateNumber();
        },
        setDisplayExpenseTotal: (state, action: PayloadAction<boolean>) => {
            state.displayExpenseTotal = action.payload;
            state.updated = getDateNumber();
        },
        setShowChart: (state, action: PayloadAction<boolean>) => {
            state.showChart = action.payload;
            state.updated = getDateNumber();
        },
        setUpdated: (state, action: PayloadAction<number>) => {
            state.updated = action.payload;
        },
        setSettings: (_, action: PayloadAction<SettingsState>) => {
            changeColourScheme(action.payload.colourScheme);
            return action.payload;
        }
    },
})

export const { setPayPeriodType, setCurrencySymbol, setColourScheme, setShowDecimals, setStartDate, setSwapSummaries,
                setPeriodsToDisplay, setDisplayMonths, setDisplayIncomeTotal, 
                setDisplayExpenseTotal, setShowChart, setUpdated, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
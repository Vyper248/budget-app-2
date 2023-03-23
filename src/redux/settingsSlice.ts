import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
    reverseSummaryTable: boolean;
    displayMonths: boolean;
    displayIncomeTotal: boolean;
    displayExpenseTotal: boolean;
    showChart: boolean;
    updated: number;
}

const initialState: SettingsState = {
    payPeriodType: 'monthly',
    currencySymbol: '£',
    colourScheme: 'dark',
    showDecimals: true,
    startDate: '2023-01-01',
    swapSummaries: false,
    periodsToDisplay: 6,
    reverseSummaryTable: false,
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
        },
        setCurrencySymbol: (state, action: PayloadAction<string>) => {
            state.currencySymbol = action.payload;
        },
        setColourScheme: (state, action: PayloadAction<ColourScheme>) => {
            state.colourScheme = action.payload;
        },
        setShowDecimals: (state, action: PayloadAction<boolean>) => {
            state.showDecimals = action.payload;
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.startDate = action.payload;
        },
        setSwapSummaries: (state, action: PayloadAction<boolean>) => {
            state.swapSummaries = action.payload;
        },
        setPeriodsToDisplay: (state, action: PayloadAction<number>) => {
            state.periodsToDisplay = action.payload;
        },
        setReverseSummaryTable: (state, action: PayloadAction<boolean>) => {
            state.reverseSummaryTable = action.payload;
        },
        setDisplayMonths: (state, action: PayloadAction<boolean>) => {
            state.displayMonths = action.payload;
        },
        setDisplayIncomeTotal: (state, action: PayloadAction<boolean>) => {
            state.displayIncomeTotal = action.payload;
        },
        setDisplayExpenseTotal: (state, action: PayloadAction<boolean>) => {
            state.displayExpenseTotal = action.payload;
        },
        setShowChart: (state, action: PayloadAction<boolean>) => {
            state.showChart = action.payload;
        },
        setUpdated: (state, action: PayloadAction<number>) => {
            state.updated = action.payload;
        },
        setSettings: (_, action: PayloadAction<SettingsState>) => {
            return action.payload;
        }
    },
})

export const { setPayPeriodType, setCurrencySymbol, setColourScheme, setShowDecimals, setStartDate, setSwapSummaries,
                setPeriodsToDisplay, setReverseSummaryTable, setDisplayMonths, setDisplayIncomeTotal, 
                setDisplayExpenseTotal, setShowChart, setUpdated, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
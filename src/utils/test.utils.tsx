import React from 'react';
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { RootState } from '@/redux/store';

import { initialState as initialGeneralState } from '@/redux/generalSlice';
import { initialState as initialSettingsState } from '@/redux/settingsSlice';
import { initialState as initialTransactionsState } from '@/redux/transactionsSlice';
import { initialState as initialAccountsState } from '@/redux/accountsSlice';
import { initialState as initialCategoriesState } from '@/redux/categoriesSlice';
import { initialState as initialFundsState } from '@/redux/fundsSlice';
import { initialState as initialToolsState } from '@/redux/toolsSlice';
import { reducer } from '@/redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> { 
    preloadedState?: PreloadedState<RootState>;
}

const customRender = (
    ui: React.ReactElement,
    options?: ExtendedRenderOptions,
) => {

    const AllProviders = ( { children }: { children: React.ReactNode } ) => {
        let preloadedState = options?.preloadedState ? options.preloadedState : {};
        let store = configureStore({ reducer: reducer, preloadedState });
    
        return (
            <Provider store={store}>
                { children }
            </Provider>
        )
    }

    return render(ui, { wrapper: AllProviders, ...options })
}

export { customRender as render };

type MockState = {
    general: Partial<RootState['general']>
    accounts: RootState['accounts']
    categories: RootState['categories']
    funds: RootState['funds']
    settings: Partial<RootState['settings']>
    transactions: Partial<RootState['transactions']>
    tools: Partial<RootState['tools']>
}

//helper function to get a mock state with any values passed in to replace defaults
export const getBasicMockState = (state: Partial<MockState>) => {
    let mockGeneralState = state.general ? { ...initialGeneralState, ...state.general } : initialGeneralState;
    let mockSettingsState = state.settings ? { ...initialSettingsState, ...state.settings } : initialSettingsState;
    let mockTransactionsState = state.transactions ? { ...initialTransactionsState, ...state.transactions } : initialTransactionsState;
    let mockAccountsState = state.accounts ? state.accounts : initialAccountsState;
    let mockCategoriesState = state.categories ? state.categories : initialCategoriesState;
    let mockFundsState = state.funds ? state.funds : initialFundsState;
    let mockToolsState = state.tools ? { ...initialToolsState, ...state.tools } : initialToolsState;

    let mockState = {
        general: mockGeneralState,
        accounts: mockAccountsState,
        categories: mockCategoriesState,
        funds: mockFundsState,
        settings: mockSettingsState,
        transactions: mockTransactionsState,
        tools: mockToolsState
    };
    return { preloadedState: mockState};
}
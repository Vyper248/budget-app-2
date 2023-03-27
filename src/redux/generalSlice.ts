import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getDateNumber } from '../utils/date.utils';

export type Message = {
    text: string;
    type: string;
}

export type User = {
    username: string,
    id: string,
    jwt: string,
}

export interface GeneralState {
    currentPage: string;
    selectedAccount: number;
    lastSync: number;
    user: User | null;
    fetching: boolean;
    message: Message;
}

const initialState: GeneralState = {
    currentPage: '',
    selectedAccount:0,
    lastSync: 0,
    user: null,
    fetching: false,
    message: {
        text: '',
        type: ''
    }
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
            state.message = { text: '', type: '' };
        },
        setSelectedAccount: (state, action: PayloadAction<number>) => {
            state.selectedAccount = action.payload;
        },
        updateSyncDate: (state) => {
            state.lastSync = getDateNumber();
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.fetching = action.payload;
        },
        setMessage: (state, action: PayloadAction<Message>) => {
            state.message = action.payload;
        },
    },
})

export const { setCurrentPage, setSelectedAccount, updateSyncDate, setUser, setFetching, setMessage } = generalSlice.actions;
export default generalSlice.reducer;
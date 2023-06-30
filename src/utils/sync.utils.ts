import { getDateNumber } from "./date.utils";

import { Account, setAccounts } from "@/redux/accountsSlice";
import { Category, setCategories } from "@/redux/categoriesSlice";
import { Fund, setFunds } from "@/redux/fundsSlice";
import { User, setFetching, setLastSync, setMessage, setUser } from "@/redux/generalSlice";
import { SettingsState, syncSettings } from "@/redux/settingsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { ToolsState, syncTools } from "@/redux/toolsSlice";
import { Transaction, syncTransactions } from "@/redux/transactionsSlice";

export const syncUrl = import.meta.env.DEV ? 'http://localhost:8888/.netlify/functions/' : 'https://budget-app-serverless.netlify.app/.netlify/functions/';

let controller: AbortController | null = null;

export type SyncData = {
    user: User | null;
    syncTime: number;
    lastSync: number;
    settings: SettingsState;
    tools: ToolsState;
    accounts: Account[];
    categories: Category[];
    funds: Fund[];
    transactions?: Transaction[];
}

export type ServerData = {
    settings: SettingsState;
    accounts: Account[];
    categories: Category[];
    funds: Fund[];
    transactions: Transaction[];
    tools: ToolsState;
}

type MergeData = {
    id: number;
    updated: number;
    deleted?: number;
}

export const getDataToSync = (state: RootState): SyncData => {
	const lastSync = state.general.lastSync;

    const data: SyncData = {
        lastSync,
        user: state.general.user,
        syncTime: getDateNumber(),
        settings: state.settings,
        tools: state.tools,
        accounts: state.accounts,
        categories: state.categories,
        funds: state.funds,
    }

    const transactions = state.transactions.transactions.filter(obj => obj.updated > lastSync);
    if (transactions.length > 0) data.transactions = transactions;

    return data;
}

const updateLocalData = (serverData: ServerData, dispatch: AppDispatch) => {    
    dispatch(setAccounts(serverData.accounts));
    dispatch(setCategories(serverData.categories));
    dispatch(setFunds(serverData.funds));
    dispatch(syncTools(serverData.tools));
    dispatch(syncSettings(serverData.settings));
    dispatch(syncTransactions(serverData.transactions));
}

export const sync = async (state: RootState, dispatch: AppDispatch, manual=false) => {
    if (!state.general.user) return; //not logged in, don't do anything
    if (manual === false && !window.navigator.onLine) return; //auto sync while offline, don't do anything

    dispatch(setFetching(true));

    const syncData = getDataToSync(state);

    //if a fetch is already in process, abort it before starting a new one
    if (controller !== null) {
        controller.abort();
        controller = null;
    }
    
    controller = new AbortController();

    try {
        const data = await fetch(syncUrl+'backup2', {
            method: 'POST', 
            signal: controller.signal,
            headers: {'content-type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(syncData)
        }).then(res => res.json());

        dispatch(setFetching(false));
        controller = null;

        if (data.status === 'success') {
            // console.log(data);
            dispatch(setUser(data.user));
            dispatch(setLastSync(syncData.syncTime));
            updateLocalData(data.data, dispatch);
            if (manual) dispatch(setMessage({text: 'Data successfully synced!', type: 'success'}));
        } else {
            // console.log(data);
            if (data.type === 'logout') setUser(null);
            setMessage({text: data.message, type: 'error'});
        }
    } catch (err: any) {
        console.log('Error Syncing: ', err.message);
        controller = null;

        //if a request is aborted, it's because another has started, so don't need to set fetching to false
        if (err.message.includes('The user aborted a request.')) return;

        dispatch(setFetching(false));

        //if device is offline (will only show when user does a manual sync offline)
        dispatch(setMessage({text: 'Failed to contact server for syncing. Please check your connection and try again.', type: 'error'}));
    }
}

//merge arrays and remove deleted items (once synced to server, no reason to keep them on local)
export const mergeArrays = <T extends MergeData>(localArray: MergeData[], serverArray: MergeData[]) => {
    const newArray = [] as T[];
    
    //create quick lookup objects to store array data
    const serverIdObj = serverArray.reduce((a, c) => {
        a[c.id] = c as T;
        return a;
    }, {} as {[key: number]: T});

    const localIdObj = localArray.reduce((a, c) => {
        a[c.id] = c as T;
        return a;
    }, {} as {[key: number]: T});

    localArray.forEach(obj => {
        const server = serverIdObj[obj.id];

        if (server === undefined) {
            //not on server, so add local (if its not deleted)
            if (obj.deleted === undefined) newArray.push(obj as T);
        } else if (server.updated > obj.updated) {
            //on server and updated, so add server (if its not deleted)
            if (server.deleted === undefined) newArray.push(server);
        } else {
            //on server but not updated, so add local (if its not deleted)
            if (obj.deleted === undefined) newArray.push(obj as T);
        }
    });

    serverArray.forEach(obj => {
        const local = localIdObj[obj.id];

        if (local === undefined && obj.deleted === undefined) {
            //not on local and not deleted, so add it
            newArray.push(obj as T);
        }

        //if it does exist on local, then should have already checked it, so dont do anything
    });

    return newArray;
}
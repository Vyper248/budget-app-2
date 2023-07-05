import { Account, setAccounts } from "@/redux/accountsSlice";
import { Category, setCategories } from "@/redux/categoriesSlice";
import { Fund, setFunds } from "@/redux/fundsSlice";
import { SettingsState, syncSettings } from "@/redux/settingsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { ToolsState, syncTools } from "@/redux/toolsSlice";
import { Transaction, setTransactions } from "@/redux/transactionsSlice";

export const syncUrl = import.meta.env.DEV ? 'http://localhost:8888/.netlify/functions/' : 'https://budget-app-2-serverless.netlify.app/.netlify/functions/';

export type BackupData = {
    settings: SettingsState;
    tools: ToolsState;
    accounts: Account[];
    categories: Category[];
    funds: Fund[];
    transactions: Transaction[];
}

export type SyncData = {
    uniqueId: string;
    type: string;
    syncComplete: boolean;
    finalCheck: boolean;
    data: BackupData;
}

export type ServerData = {
    settings: SettingsState;
    accounts: Account[];
    categories: Category[];
    funds: Fund[];
    transactions: Transaction[];
    tools: ToolsState;
}

export const getDataToSync = (state: RootState): BackupData => {
    const data: BackupData = {
        settings: state.settings,
        tools: state.tools,
        accounts: state.accounts,
        categories: state.categories,
        funds: state.funds,
        transactions: state.transactions.transactions
    }

    return data;
}

export const sendData = async (syncData: SyncData) => {
    try {
        const returnData = await fetch(syncUrl+'sync', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(syncData)
        }).then(resp => resp.json());

        return returnData;
    } catch (err: any) {
        return {status: 'error', message: 'Failed to send data to the server, please try again.'};
    }
}

//check data every second to see if it's been received by other device
export const checkData = async (uniqueId: string, intervalObj: { interval: NodeJS.Timer | null }) => {
    return new Promise ((resolve, _) => {
        let numberOfChecks = 0;

        if (intervalObj.interval !== null) {
            clearInterval(intervalObj.interval);
        }

        intervalObj.interval = setInterval(async () => {
            const maxChecks = 29;
            const dataToSend = {
                uniqueId,
                type: 'check',
                finalCheck: numberOfChecks >= maxChecks ? true : false
            }
    
            try {
                const data = await fetch(syncUrl+'sync', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(dataToSend)
                }).then(resp => resp.json());    
                numberOfChecks++;

                //if status is no change, then receiving device hasn't done anything yet, so return
                if (data.status === 'noChange') return;
    
                //otherwise, data has change or timed out, so clear and resolve
                if (intervalObj.interval) clearInterval(intervalObj.interval);
                resolve(data);
            } catch (err: any) {
                console.log('Error Checking: ', err.message);
                if (intervalObj.interval) clearInterval(intervalObj.interval);
                resolve({status: 'error', message: err.message});
            }
        }, 1000);
    });
}

export const updateLocalData = (serverData: ServerData, dispatch: AppDispatch) => {    
    dispatch(setAccounts(serverData.accounts));
    dispatch(setCategories(serverData.categories));
    dispatch(setFunds(serverData.funds));
    dispatch(syncTools(serverData.tools));
    dispatch(syncSettings(serverData.settings));
    dispatch(setTransactions(serverData.transactions));
}
import { RootState } from "@/redux/store";
import { changeColourScheme } from "./general.utils";

import { initialState as generalState } from "@/redux/generalSlice";

export const saveToStorage = (state: RootState) => {
    const saveObj = {
        accounts: state.accounts,
        funds: state.funds,
        categories: state.categories,
        transactions: state.transactions,
        settings: state.settings,
        tools: state.tools,
        general: {
            user: state.general.user,
            lastSync: state.general.lastSync
        }
    }

    localStorage.setItem('budget-app-2-state', JSON.stringify(saveObj));
}

export const retrieveFromStorage = () => {  
    try {
        const storedState = localStorage.getItem('budget-app-2-state');
        if (!storedState) return undefined;
        let state = JSON.parse(storedState);
        //set any default values here
        state.transactions.addingTransaction = false;
        state.general = {...generalState, user: state.general.user, lastSync: state.general.lastSync };
        changeColourScheme(state.settings.colourScheme);
        return state;
    } catch (e) {
        return undefined;
    }
}
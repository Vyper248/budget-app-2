import { RootState } from "../redux/store";

export const saveToStorage = (state: RootState) => {
    const saveObj = {
        accounts: state.accounts,
        funds: state.funds,
        categories: state.categories,
        transactions: state.transactions,
        settings: state.settings,
    }

    localStorage.setItem('budget-app-2-state', JSON.stringify(saveObj));
}

export const retrieveFromStorage = () => {  
    try {
        const storedState = localStorage.getItem('budget-app-2-state');
        if (!storedState) return undefined;
        return JSON.parse(storedState);
    } catch (e) {
        return undefined;
    }
}
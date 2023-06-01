import type { Category } from "@/redux/categoriesSlice";
import type { SettingsState } from "@/redux/settingsSlice";
import type { SpendTransaction, TransferTransaction } from "@/redux/transactionsSlice";
import type { BackupData } from "./BackupRestore";

export type OldAccount = {
	name: string;
	note: string;
	interestRate: number;
	startingBalance: number;
	defaultAccount: boolean;
	closed: boolean;
	extraCharges: number;
	currency: string;
	dateOpened: string;
	id: number;
	updated: number;
	deleted?: number | undefined;
}

export type OldCategory = Category & {
    dateCreated: string;
}

export type OldFund = {
    id: number;
    name: string;
    description: string;
    targetAmount: number;
    complete: boolean;
    dateCreated: string;
    startingBalance: number;
    updated: number;
    deleted?: number | undefined;
}

export type OldFundAddition = {
    id: number;
    date: string;
    amount: number;
    fund: number;
    description?: string | undefined;
    updated?: number | undefined;
    deleted?: number | undefined;
}

export type OldTransaction = {
    id: number;
    type: 'spend' | 'transfer';
    amount: number;
    description: string;
    date: string;
    account: number;
    category: number | undefined;
    fund: number | undefined;
    updated?: number | undefined;
    deleted?: number | undefined;
}

type OldBackupData = {
	general: SettingsState,
	accounts: OldAccount[],
	categories: OldCategory[],
	funds: OldFund[],
	fundAdditions: OldFundAddition[],
	transactions: SpendTransaction[] | TransferTransaction[]
}

export const convertAccount = (oldAccount: OldAccount) => {
    const { id, name, note, closed, defaultAccount, extraCharges, interestRate, startingBalance, updated, deleted } = oldAccount;

    return {
        id, name,
        description: note,
        hidden: closed,
        defaultAccount, extraCharges, interestRate, startingBalance, updated, deleted
    }
}

export const convertCategory = (oldCategory: OldCategory) => {
    const { id, name, description, type, hidden, startingBalance, updated, deleted } = oldCategory;
    return { id, name, description, type, hidden, startingBalance: startingBalance, updated, deleted };
}

export const convertFund = (oldFund: OldFund) => {
    const { id, name, description, targetAmount, complete, startingBalance, updated, deleted } = oldFund;
    return { id, name, description, targetAmount, hidden: complete, startingBalance, updated, deleted };
}

export const convertFundAddition = (oldFundAddition: OldFundAddition) => {
    const { id, date, amount, fund, description, updated, deleted} = oldFundAddition;
    return { id, amount, date, fund, type: 'fundAddition' as 'fundAddition', description: description || '', updated: updated || id, deleted };
}

export const convertOldTransaction = (oldTransaction: SpendTransaction | TransferTransaction) => {
    if (oldTransaction.type === 'spend') { 
        const { id, amount, date, type, description, category, fund, account, updated, deleted } = oldTransaction;
        return { id, amount, date, type, description, category, fund, account, updated: updated || id, deleted }
    } else if (oldTransaction.type === 'transfer') {
        const { id, amount, date, type, to, from, updated, deleted } = oldTransaction;
        return { id, amount, date, type, to, from, updated: updated || id, deleted };
    } else return null;
}

export const getSettingValues = (oldSettings: SettingsState) => {
    const { payPeriodType, currencySymbol, colourScheme, showDecimals, 
        startDate, swapSummaries, periodsToDisplay, displayMonths, 
        displayIncomeTotal, displayExpenseTotal, showChart, updated } = oldSettings;

    return { payPeriodType, currencySymbol, colourScheme, showDecimals, 
        startDate, swapSummaries, periodsToDisplay, displayMonths, 
        displayIncomeTotal, displayExpenseTotal, showChart, updated };
}

export const convertOldData = (data: OldBackupData) => {
    let newObj = {
        accounts: [],
        categories: [],
        funds: [],
        settings: {} as SettingsState,
        transactions: []
    } as BackupData;

    data.accounts.forEach(oldAcc => {
        newObj.accounts.push(convertAccount(oldAcc));
    });

    data.categories.forEach(oldCat => {
        newObj.categories.push(convertCategory(oldCat));
    });

    data.funds.forEach(oldFund => {
        newObj.funds.push(convertFund(oldFund));
    });

    data.fundAdditions.forEach(fundAddition => {
        newObj.transactions.push(convertFundAddition(fundAddition));
    });

    data.transactions.forEach(oldTransaction => {
        let newTransaction = convertOldTransaction(oldTransaction);
        if (newTransaction) newObj.transactions.push(newTransaction);
    });

    newObj.settings = getSettingValues(data.general);	
    
    return newObj;
}
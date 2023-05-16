import { getObjectName, joinStrings } from "@/utils/general.utils";
import { store } from "@/redux/store";

import type { Transaction } from "@/redux/transactionsSlice";

export const getDescription = (transaction: Transaction, selectedAccount: number, currentPage: string) => {
    const state = store.getState();
    const { categories, funds, accounts } = state;

	let category = transaction.type === 'spend' ? getObjectName(transaction.category, categories) : '';
	let account = transaction.type === 'spend' ? getObjectName(transaction.account, accounts) : '';
	let fund = transaction.type === 'spend' || transaction.type === 'fundAddition' ? getObjectName(transaction.fund, funds, ' Fund') : '';
	let description = transaction.type === 'spend' || transaction.type === 'fundAddition' ? transaction.description : '';

	if (transaction.type === 'transfer') {
		const from = getObjectName(transaction.from, accounts);
		const to = getObjectName(transaction.to, accounts);

		if (transaction.from === selectedAccount) description = `Transferred to ${to}`;
		else if (transaction.to === selectedAccount) description = `Transferred from ${from}`;
		else description = `Transferred from ${from} to ${to}`;
	}

	if (currentPage === 'Categories') {
		category = '';
	}

	if (currentPage === 'Accounts') {
		account = '';
	}

	if (currentPage === 'Funds') {
		category = '';
		fund = '';
	}

	if (currentPage === 'Home') {
		category = '';
		fund = '';
	}

	return joinStrings(' - ', category, fund, account, description);
}

export const parseCurrency = (value: number) => {
    let { settings } = store.getState();    
    let { currencySymbol, showDecimals } = settings;    

    //make sure it doens't return -£0.00
    if (value > -0.009 && value < 0.009) return `${currencySymbol}0${showDecimals ? '.00' : ''}`;
    if (value === null || value === undefined || value === 0 || isNaN(value)) return `${currencySymbol}0${showDecimals ? '.00' : ''}`;

    //check if it's negative and remove symbol
    let negative = false;
    if (value < 0) {
        negative = true;
        value *= -1;
    }

    //convert to string and split into array
    let string = Number(value).toFixed(showDecimals ? 2 : 0);    
    let arr = string.split('');

    //add commas where needed
    for (let i = arr.length-4; i >= 0; i--) {
        let fromRight = arr.length - i - 4;
        if (fromRight > 0 && fromRight%3 === 0) arr[i] += ',';
    }

    //add currency symbol to beginning
    arr.unshift(currencySymbol);

    //add back negative symbol if needed
    if (negative) arr.unshift('-');

    return arr.join('');    
}

export const getAmount = (transaction: Transaction, asCurrency=true, selectedAccount?: number) => {
    const state = store.getState();

    const { categories } = state;

    //fund addition, so positive
    if (transaction.type === 'fundAddition') return asCurrency ? parseCurrency(transaction.amount) : transaction.amount;

    //transaction for a fund, so negative
    if (transaction.type === 'spend' && transaction.fund !== undefined) return asCurrency ? parseCurrency(-transaction.amount) : -transaction.amount;

    if (transaction.type === 'spend' && transaction.category !== undefined) {
        let category = categories.find(obj => obj.id === transaction.category);
        if (category !== undefined) {
            //transaction for expense category, so negative
            if (category.type === 'expense') return asCurrency ? parseCurrency(-transaction.amount) : -transaction.amount;

            //transaction for income category, so positive
            if (category.type ===  'income') return asCurrency ? parseCurrency(transaction.amount) : transaction.amount;
        } else {
            //has a category, but can't find it, so return 0
            return asCurrency ? parseCurrency(0) : 0;
        }
    }    

    if (transaction.type === 'transfer' && transaction.from !== undefined && selectedAccount !== undefined) {
        //transfer from this account, so negative
        if (transaction.from === selectedAccount) return asCurrency ? parseCurrency(-transaction.amount) : -transaction.amount;

        //transfer to this account, so positive
        if (transaction.to === selectedAccount) return asCurrency ? parseCurrency(transaction.amount) : transaction.amount;
    }

    return asCurrency ? parseCurrency(0) : 0;
}
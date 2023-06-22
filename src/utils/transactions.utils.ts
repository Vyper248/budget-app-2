import compareAsc from "date-fns/compareAsc";
import parseISO from "date-fns/parseISO";
import parse from "date-fns/parse";
import compareDesc from "date-fns/compareDesc";

import { store } from "@/redux/store";
import { formatMonthYear, compareDates } from "./date.utils";

import type { TransactionObj, MonthlyTransactions, Transaction, SpendTransaction, FundTransaction } from "@/redux/transactionsSlice";
import type { Item } from "@/redux/generalSlice";
import type { Account } from "@/redux/accountsSlice";

type MonthlyTransactionsObj = {
	[key: string]: TransactionObj[];
}

export const sortTransactions = (transactions: TransactionObj[], reverse?: boolean) => {
    let sortedTransactions = [...transactions];
    sortedTransactions.sort((a,b) => {
        if (reverse) return compareAsc(parseISO(b.transaction.date), parseISO(a.transaction.date));
        else return compareDesc(parseISO(b.transaction.date), parseISO(a.transaction.date));
    });
    return sortedTransactions;
}

export const organiseTransactions = (transactions: Transaction[]) => {
	//organise by month/year
	let organisedObj = {} as MonthlyTransactionsObj;
	transactions.forEach(obj => {
		let date = obj.date;
		let formatted = formatMonthYear(date);
		if (organisedObj[formatted] === undefined) organisedObj[formatted] = [];
		organisedObj[formatted].push({
			transaction: obj
		});
	});

	//put into an array and sort by date so newest first
	let organisedArr = Object.keys(organisedObj).map(key => {
		let sortedTransactions = organisedObj[key].sort((a,b) => {
            return compareDates(b.transaction.date, a.transaction.date);
		});
		return {month: key, transactions: sortedTransactions};
	}).sort((a,b) => {
		let first = parse(a.month, 'MMMM yyyy', new Date());
		let second = parse(b.month, 'MMMM yyyy', new Date());
		return compareAsc(second, first);
	});

	return organisedArr as MonthlyTransactions[];
}

export const addRunningBalances = (arr: MonthlyTransactions[], accountId: number, startingBalance: number) => {
    let runningBalance = startingBalance;

    const addBalance = (transactionObj: TransactionObj) => {
		const amount = getAmount(transactionObj.transaction, false, accountId) as number;
        runningBalance += amount;
		return { transaction: transactionObj.transaction, runningBalance };
    }

	const organisedArr = [];

    //reverse loop to work backwards from first month
    for (let i = arr.length-1; i >= 0; i--) {
        let monthObj = arr[i];
        let transactions = [...monthObj.transactions];

        //reverse to work backwards from first transaction, add balance and reverse again
		let newTransactions = transactions.reverse().map(addBalance).reverse();
		organisedArr.push({month: monthObj.month, transactions: newTransactions});
    }

	organisedArr.reverse();

	return organisedArr as MonthlyTransactions[];
}

export const getTransactionTotal = (transactions: Transaction[], selectedItem?: number) => {
	return transactions.reduce((t,c) => {
        t += getAmount(c, false, selectedItem) as number;
        return t;
    }, 0);  
}

export const checkSearch = (tr: Transaction, search: string) => {
	if (search.length === 0) return true;
	if (tr.type === 'transfer') return false;

    //If user adds a + between words, all words much match
    if (search.split('+').every(str => {
        str = str.trim();
		if (parseCurrency(tr.amount).includes(str)) return true;
		if (tr.description.toLowerCase().includes(str.toLowerCase())) return true;
	})) return true;

    //If user adds a  , between words, any word can match (this will match single words without a comma too)
    if (search.split(',').some(str => {
        str = str.trim();
        if (str.length === 0) return false;
		if (parseCurrency(tr.amount).includes(str)) return true;
		if (tr.description.toLowerCase().includes(str.toLowerCase())) return true;
	})) return true;

	return false;
}

export const getItemsWithSearchValue = (itemArr: Item[], search: string, transactions: Transaction[], itemKey: 'category' | 'account' | 'fund') => {
	//Search for categories with filteredTransactions and add number to name for displaying
    return itemArr.map(item => {
        if (search.length === 0) return item;

		if (itemKey === 'category' || itemKey === 'account') {
			let spendTransactions = transactions as SpendTransaction[];
			let transactionArr = spendTransactions.filter((obj: SpendTransaction) => obj[itemKey] === item.id);
			return {...item, name: item.name + ' - ' + transactionArr.length};
		} else if (itemKey === 'fund') {
			let spendFundTransactions = transactions as SpendTransaction[] & FundTransaction[];
			let transactionArr = spendFundTransactions.filter(obj => obj.fund === item.id);
			return {...item, name: item.name + ' - ' + transactionArr.length};
		} else {
			return item;
		}
    });
}

export const getSearchedTransactions = (transactions: Transaction[], search: string) => {
	//filter transactions based on search
    return transactions.filter(tr => {
        if (checkSearch(tr, search)) return true;
        return false;
    });
}

export const parseCurrency = (value: number) => {
    let { settings } = store.getState();    
    let { currencySymbol, showDecimals } = settings;    

    //make sure it doens't return -£0.00
    if (value > -0.009 && value < 0.009) return `${currencySymbol}0${showDecimals ? '.00' : ''}`;
    if (value === null || value === undefined || value === 0 || isNaN(value) || value === Infinity) return `${currencySymbol}0${showDecimals ? '.00' : ''}`;

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

export const getAccountTotals = (transactions: Transaction[], accounts: Account[]) => {
	const dataObj = {} as {[key: number]: number};
	accounts.forEach(acc => dataObj[acc.id] = (acc?.startingBalance || 0));

	//calculate account totals
	transactions.forEach(tr => {
		if (tr.type === 'fundAddition') return;

		if (tr.type === 'spend') {
			let amount = getAmount(tr, false) as number;
			if (dataObj[tr.account] !== undefined) dataObj[tr.account] += amount;
			return;
		}

		if (tr.type === 'transfer') {
			let amountFrom = getAmount(tr, false, tr.from) as number;
			if (dataObj[tr.from] !== undefined) dataObj[tr.from] += amountFrom;

			let amountTo = getAmount(tr, false, tr.to) as number;
			if (dataObj[tr.to] !== undefined) dataObj[tr.to] += amountTo;
		}
	});

    return dataObj;
}
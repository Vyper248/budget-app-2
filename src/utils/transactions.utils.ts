import { compareAsc, parseISO, parse } from "date-fns";

import { formatDate } from "./date.utils";
import { getAmount } from "@/components/TransactionComponents/Transaction/Transaction.utils";

import type { TransactionObj, MonthlyTransactions, Transaction, SpendTransaction, FundTransaction } from "@/redux/transactionsSlice";
import type { Item } from "@/redux/generalSlice";

type MonthlyTransactionsObj = {
	[key: string]: TransactionObj[];
}

export const organiseTransactions = (transactions: Transaction[]) => {
	//organise by month/year
	let organisedObj = {} as MonthlyTransactionsObj;
	transactions.forEach(obj => {
		let date = obj.date;
		let formatted = formatDate(date, 'MMMM yyyy');;
		if (organisedObj[formatted] === undefined) organisedObj[formatted] = [];
		organisedObj[formatted].push({
			transaction: obj
		});
	});

	//put into an array and sort by date so newest first
	let organisedArr = Object.keys(organisedObj).map(key => {
		let sortedTransactions = organisedObj[key].sort((a,b) => {
			return compareAsc(parseISO(b.transaction.date), parseISO(a.transaction.date));
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
	if (tr.description.toLowerCase().includes(search.toLowerCase())) return true;
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
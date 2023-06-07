import { getDateValue } from "@/utils/date.utils";

import type { Transaction } from "@/redux/transactionsSlice";
import type { TransactionDisplay } from "@/utils/summary.utils";
import type { PayPeriodType } from "@/redux/settingsSlice";

type DateObj = {
	total: number;
	[key: number]: TransactionDisplay;
}

type DataObj = {
	[key: string]: DateObj;
}

const addToData = (dataObj: DataObj, date: string, account: number, tr: Transaction) => {
	if (dataObj[date] === undefined) dataObj[date] = {total: 0};
	if (dataObj[date][account] === undefined) dataObj[date][account] = {total: 0, transactions: []};

	dataObj[date][account].transactions.push(tr);
	dataObj[date][account].total += tr.amount;
	dataObj[date].total += tr.amount;
}

export const getCategoryData = (transactions: Transaction[], categoryId: number, startDate: string, payPeriodType: PayPeriodType, dates: string[]) => {
	const organisedObj = {} as DataObj;
	const accountTotals = {} as {[key: number]: number};
	let total = 0;

	//loop through transactions and add correct values to data objects
	transactions.forEach(tr => {
		if (tr.type !== 'spend') return;
		if (tr.category !== categoryId) return;

		//if date doesnt include this date, then it's not within the date range
		let date = getDateValue(tr.date, startDate, payPeriodType);
		if (dates.includes(date)) {
			addToData(organisedObj, date, tr.account, tr);
			accountTotals[tr.account] = accountTotals[tr.account] === undefined ? tr.amount : accountTotals[tr.account] + tr.amount;
			total += tr.amount;
		}
	});

	return { organisedObj, accountTotals, total };
}
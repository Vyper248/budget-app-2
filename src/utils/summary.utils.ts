import parseISO from "date-fns/parseISO";
import compareAsc from "date-fns/compareAsc";

import { store } from "@/redux/store";
import { getAmount } from "./transactions.utils";
import { getStartingBalance } from "./general.utils";
import { getDateValue } from "./date.utils";

import type { Transaction } from "@/redux/transactionsSlice";
import type { Category } from "@/redux/categoriesSlice";
import type { Fund } from "@/redux/fundsSlice";
import type { DateRange } from "@/components/DateRangeInput/DateRangeInput";

export type TransactionDisplay = {
    total: number;
    transactions: Transaction[];
};

type ItemGroup = {
    remaining: number;
    incomeTotal: number;
    expenseTotal: number;
    [key: number]: TransactionDisplay;
}

export type SummaryTotals = {
    remaining: number;
    incomeTotal: number;
    expenseTotal: number;
    [key: number]: number;
}

export type Summary = {
    monthly: {
        [key: string]: ItemGroup;
    };
    totals: SummaryTotals;
}

export const getHeadingColor = (type: string) => {
    switch(type) {
        case 'income': return 'green';
        case 'fund': return 'lightsteelblue';
        case 'expense': return 'darkorange';
        default: return '';
    }
}

export const createMonthlyItemObj = (categories: Category[], funds: Fund[]) => {
    let obj = {remaining: 0, incomeTotal: 0, expenseTotal: 0} as ItemGroup;
    categories.forEach(cat => obj[cat.id] = {total: 0, transactions: []});
    funds.forEach(fund => obj[fund.id] = {total: 0, transactions: []});
    return obj;
}

export const getSummaryData = (transactions: Transaction[], categories: Category[], funds: Fund[], dateRange?: DateRange) => {
    const { settings } = store.getState();
    const { startDate, payPeriodType } = settings;

    const summaryObj = {monthly: {}, totals: { remaining: 0, incomeTotal: 0, expenseTotal: 0 }} as Summary;
    const totalsObj = summaryObj.totals;

    //create an object for easily finding the type of a category
    const categoryTypes = {} as {[key: number]: string};
    categories.forEach(cat => categoryTypes[cat.id] = cat.type);

    //setup totalsObj with category and fund IDs
    categories.forEach(cat => totalsObj[cat.id] = dateRange ? 0 : getStartingBalance(cat));
    funds.forEach(fund => totalsObj[fund.id] = dateRange ? 0 : fund.startingBalance || 0);

    //sort transactions into correct group
    transactions.forEach(transaction => {
        if (transaction.type === 'transfer') return;
        if (dateRange && compareAsc(parseISO(transaction.date), parseISO(dateRange.from)) < 0) return;
        if (dateRange && compareAsc(parseISO(transaction.date), parseISO(dateRange.to)) > 0) return;

        //Get the start date of the period this transaction is in and create an item object if needed
        const dateVal = getDateValue(transaction.date, startDate, payPeriodType);
        if (summaryObj.monthly[dateVal] === undefined) summaryObj.monthly[dateVal] = createMonthlyItemObj(categories, funds);
        const dateObj = summaryObj.monthly[dateVal];
        const amount = getAmount(transaction, false) as number;

        //get correct item ID (either a category or a fund)
        let itemId = 0;
        if (transaction.type === 'spend' && transaction.category !== undefined) itemId = transaction.category;
        else if (transaction.fund !== undefined) itemId = transaction.fund;

        //add transactions and amounts
        if (itemId !== 0) {
            let itemObj = dateObj[itemId];
            itemObj.transactions.push(transaction);
            itemObj.total += amount;
            totalsObj[itemId] += amount; 
        }

        //Add values to remaining objects
        if (transaction.type === 'spend' && transaction.fund === undefined) {
            dateObj.remaining += amount;
            totalsObj.remaining += amount;
        } else if (transaction.type === 'fundAddition') {
            dateObj.remaining -= amount;
            totalsObj.remaining -= amount;
        }

        //add income and expense totals
        if (transaction.type === 'spend' && transaction.category !== undefined) {
            let type = categoryTypes[transaction.category];
            if (type === 'income') {
                totalsObj.incomeTotal += amount;
                dateObj.incomeTotal += amount;
            } else {
                totalsObj.expenseTotal += amount;
                dateObj.expenseTotal += amount;
            }
        }
    });

    return summaryObj;
}
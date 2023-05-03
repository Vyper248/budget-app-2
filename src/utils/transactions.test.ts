import { checkSearch, getTransactionTotal, addRunningBalances, organiseTransactions } from "./transactions.utils";
import { RootState, store } from "../redux/store";
import type { Category } from "../redux/categoriesSlice";
import type { Account } from "../redux/accountsSlice";
import { vi } from "vitest";

const mockTransactions = [
    {
        id: 1,
        description: 'test transaction',
        amount: 100,
        date: '2021-01-01',
        type: 'spend' as 'spend',
        updated: 0,
        category: 1,
        account: 2,
        fund: undefined
    },
    {
        id: 2,
        description: 'test transaction',
        amount: 50,
        date: '2021-01-21',
        type: 'spend' as 'spend',
        updated: 0,
        category: 1,
        account: 2,
        fund: undefined
    },
    {
        id: 3,
        description: 'test transaction',
        amount: -25,
        date: '2021-02-10',
        type: 'spend' as 'spend',
        updated: 0,
        category: 1,
        account: 2,
        fund: undefined
    }
];

const mockCategory = {
    id: 1,
    type: 'expense'
} as Category;

const mockAccount = {
    id: 2,
    name: 'Account'
} as Account

const mockstate = {
    categories: [mockCategory],
    accounts: [mockAccount]
} as RootState;

describe('Checking the checkSearch function', () => {
    it('Returns true if text found in description', () => {
        let mockTransaction = mockTransactions[0];    
        expect(checkSearch(mockTransaction, 'test')).toBe(true);
    });

    it('Returns false if text not found in description', () => {
        let mockTransaction = mockTransactions[0];   
        expect(checkSearch(mockTransaction, 'hello')).toBe(false);
    });
});


describe('Checking the getTrasactionTotal function', () => {
    it('Returns the correct total', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        let total = getTransactionTotal(mockTransactions);
        expect(total).toBe(-125);
    });
});

describe('Checking the organiseTransactions function', () => {
    it('Organises an array of transactions by month', () => {
        let organisedTransactions = organiseTransactions(mockTransactions);

        expect(organisedTransactions[0].month).toBe('February 2021');
        expect(organisedTransactions[0].transactions.length).toBe(1);

        expect(organisedTransactions[1].month).toBe('January 2021');
        expect(organisedTransactions[1].transactions.length).toBe(2);

        expect(organisedTransactions[0].transactions[0].transaction.id).toBe(3);
        expect(organisedTransactions[1].transactions[0].transaction.id).toBe(2);
        expect(organisedTransactions[1].transactions[1].transaction.id).toBe(1);
    });
});

describe('Checking the addRunningBalances function', () => {
    it('Adds running balances to an array of transactions', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        let organisedTransactions = organiseTransactions(mockTransactions);
        let transactions = addRunningBalances(organisedTransactions, 2);

        expect(transactions[0].transactions[0].runningBalance).toBe(-125);
        expect(transactions[1].transactions[0].runningBalance).toBe(-150);
        expect(transactions[1].transactions[1].runningBalance).toBe(-100);
    });
});
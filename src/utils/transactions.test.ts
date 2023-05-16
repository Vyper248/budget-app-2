import { checkSearch, getTransactionTotal, addRunningBalances, 
        getAmount, parseCurrency, organiseTransactions, getItemsWithSearchValue, 
        getSearchedTransactions } from "./transactions.utils";
import { RootState, store } from "@/redux/store";
import type { Category } from "@/redux/categoriesSlice";
import type { Account } from "@/redux/accountsSlice";
import { vi } from "vitest";
import { Transaction } from "@/redux/transactionsSlice";

const mockTransactions = [
    {
        id: 1,
        description: 'test',
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
        description: 'hello',
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
        description: 'world',
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
    type: 'expense',
    name: 'Food'
} as Category;

const mockCategory2 = {
    id: 2,
    type: 'income',
    name: 'Earnings'
}

const mockAccount = {
    id: 2,
    name: 'Account'
} as Account

const mockAccount2 = {
    id: 3,
    name: 'Account 2'
} as Account

const mockstate = {
    categories: [mockCategory, mockCategory2],
    accounts: [mockAccount, mockAccount2],
    settings: {
        currencySymbol: '£',
        showDecimals: true
    }
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
        let transactions = addRunningBalances(organisedTransactions, 2, 0);

        expect(transactions[0].transactions[0].runningBalance).toBe(-125);
        expect(transactions[1].transactions[0].runningBalance).toBe(-150);
        expect(transactions[1].transactions[1].runningBalance).toBe(-100);
    });

    it('Adds running balances to an array of transactions with a starting balance', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        let organisedTransactions = organiseTransactions(mockTransactions);
        let transactions = addRunningBalances(organisedTransactions, 2, 100);

        expect(transactions[0].transactions[0].runningBalance).toBe(-25);
        expect(transactions[1].transactions[0].runningBalance).toBe(-50);
        expect(transactions[1].transactions[1].runningBalance).toBe(0);
    });
});

describe('Checking the getItemsWithSearchValue function', () => {
    it('Correctly adds number of items found to the item objects', () => {
        let searchedItems = getItemsWithSearchValue([mockCategory], 'any string', [mockTransactions[0]], 'category');
        expect(searchedItems[0].name).toBe('Food - 1');
    });
});

describe('Checking the getSearchedItems function', () => {
    it('Correctly finds the transactions with the search value', () => {
        expect(getSearchedTransactions(mockTransactions, 'test').length).toBe(1);
        expect(getSearchedTransactions(mockTransactions, 'hello').length).toBe(1);
        expect(getSearchedTransactions(mockTransactions, 'e').length).toBe(2);
    });
});

describe('Checking the parseCurrency function', () => {
    it('Gives the correct string for any value', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        expect(parseCurrency(100)).toBe('£100.00');
        expect(parseCurrency(256.2)).toBe('£256.20');
        expect(parseCurrency(0)).toBe('£0.00');
        expect(parseCurrency(1)).toBe('£1.00');
        expect(parseCurrency(0.5)).toBe('£0.50');
        expect(parseCurrency(10000)).toBe('£10,000.00');
        expect(parseCurrency(1000)).toBe('£1,000.00');
        expect(parseCurrency(1000000)).toBe('£1,000,000.00');
        expect(parseCurrency(-100)).toBe('-£100.00');
        expect(parseCurrency(-1000)).toBe('-£1,000.00');
    });

    it('Uses the correct currency symbol', () => {
        vi.spyOn(store, 'getState').mockReturnValue({...mockstate, settings: {...mockstate.settings, currencySymbol: '$'}});

        expect(parseCurrency(100)).toBe('$100.00');
    });

    it('Hides decimals if that option is set', () => {
        vi.spyOn(store, 'getState').mockReturnValue({...mockstate, settings: {...mockstate.settings, showDecimals: false}});

        expect(parseCurrency(100)).toBe('£100');
    });
});

describe('Checking the getAmount function', () => {
    it('Returns the correct amount for an expense transaction', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        const mockTransaction = {
            id: 1,
            amount: 25,
            date: '2022-01-01',
            updated: 0,
            type: 'spend',
            description: '',
            category: 1,
            fund: undefined,
            account: 2
        } as Transaction;

        expect(getAmount(mockTransaction)).toBe('-£25.00');
        expect(getAmount(mockTransaction, false)).toBe(-25);
    });

    it('Returns the correct amount for an income transaction', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        const mockTransaction = {
            id: 2,
            amount: 50,
            date: '2022-01-01',
            updated: 0,
            type: 'spend',
            description: '',
            category: 2,
            fund: undefined,
            account: 2
        } as Transaction;

        expect(getAmount(mockTransaction)).toBe('£50.00');
        expect(getAmount(mockTransaction, false)).toBe(50);
    });

    it('Returns the correct amount for a transfer transaction', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        const mockTransaction = {
            id: 2,
            amount: 50,
            date: '2022-01-01',
            updated: 0,
            type: 'transfer',
            from: 2,
            to: 3
        } as Transaction;

        //show as negative when transferring from the account
        expect(getAmount(mockTransaction, true, 2)).toBe('-£50.00');
        expect(getAmount(mockTransaction, false, 2)).toBe(-50);

        //show as positive when transferring to the account
        expect(getAmount(mockTransaction, true, 3)).toBe('£50.00');
        expect(getAmount(mockTransaction, false, 3)).toBe(50);
    });

    it('Returns the correct amount for a fund transaction', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        const mockTransaction = {
            id: 2,
            amount: 50,
            date: '2022-01-01',
            updated: 0,
            type: 'fundAddition',
            description: '',
            fund: 1
        } as Transaction;

        expect(getAmount(mockTransaction)).toBe('£50.00');
        expect(getAmount(mockTransaction, false)).toBe(50);
    });

    it('Returns the correct amount for a spend from fund transaction', () => {
        vi.spyOn(store, 'getState').mockReturnValue(mockstate);

        const mockTransaction = {
            id: 2,
            amount: 50,
            date: '2022-01-01',
            updated: 0,
            type: 'spend',
            description: '',
            category: undefined,
            fund: 1,
            account: 2
        } as Transaction;

        expect(getAmount(mockTransaction)).toBe('-£50.00');
        expect(getAmount(mockTransaction, false)).toBe(-50);
    });
});
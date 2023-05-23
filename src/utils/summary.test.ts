import { Category } from "@/redux/categoriesSlice";
import { getSummaryData, getDateValue, createMonthlyItemObj, getDates, getDaysInPeriod } from "./summary.utils";
import { Fund } from "@/redux/fundsSlice";
import { getBasicMockState } from "./test.utils";
import { vi } from "vitest";
import { store } from "@/redux/store";

describe('Testing the getDateValue function', () => {
    it('Returns the correct date for a monthly pay period', () => {
        expect(getDateValue('2023-02-20', '2023-01-05', 'monthly')).toBe('2023-02-05');
        expect(getDateValue('2023-03-14', '2023-01-01', 'monthly')).toBe('2023-03-01');
        expect(getDateValue('2023-01-02', '2023-01-01', 'monthly')).toBe('2023-01-01');
    });

    it('Returns Before Start string if date is before start date', () => {
        expect(getDateValue('2022-02-20', '2023-01-01', 'monthly')).toBe('Before Start');
        expect(getDateValue('2022-12-31', '2023-01-01', 'monthly')).toBe('Before Start');
        expect(getDateValue('2023-01-01', '2023-01-01', 'monthly')).toBe('2023-01-01');
    });

    it('Returns the correct date for a 4 weekly pay period', () => {
        expect(getDateValue('2023-01-15', '2023-01-01', 'fourWeekly')).toBe('2023-01-01');
        expect(getDateValue('2023-01-30', '2023-01-01', 'fourWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-10', '2023-01-01', 'fourWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-03-01', '2023-01-01', 'fourWeekly')).toBe('2023-02-26');
    });

    it('Returns the correct date for a 2 weekly pay period', () => {
        expect(getDateValue('2023-01-17', '2023-01-01', 'twoWeekly')).toBe('2023-01-15');
        expect(getDateValue('2023-01-30', '2023-01-01', 'twoWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-10', '2023-01-01', 'twoWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-20', '2023-01-01', 'twoWeekly')).toBe('2023-02-12');
        expect(getDateValue('2023-03-01', '2023-01-01', 'twoWeekly')).toBe('2023-02-26');
    });

    it('Returns the correct date for a weekly pay period', () => {
        expect(getDateValue('2023-01-17', '2023-01-01', 'weekly')).toBe('2023-01-15');
        expect(getDateValue('2023-01-30', '2023-01-01', 'weekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-10', '2023-01-01', 'weekly')).toBe('2023-02-05');
        expect(getDateValue('2023-02-20', '2023-01-01', 'weekly')).toBe('2023-02-19');
        expect(getDateValue('2023-03-01', '2023-01-01', 'weekly')).toBe('2023-02-26');
    });
});

describe('Testing the setupMonthlyItemObj function', () => {
    const mockCategories = [
        {
            id: 1,
        } as Category,
        {
            id: 2,
        } as Category
    ];

    const mockFunds = [
        {
            id: 3,
        } as Fund
    ];

    it('Returns the correct data', () => {        
        let obj = createMonthlyItemObj(mockCategories, mockFunds);
        expect(obj).toEqual({
            remaining: 0,
            incomeTotal: 0,
            expenseTotal: 0,
            1: {total: 0, transactions: []},
            2: {total: 0, transactions: []},
            3: {total: 0,transactions: []}
        });
    });
});

describe('Testing the getSummaryData function', () => {
    const mockTransactions = [
        {
            id: 1,
            description: 'test',
            amount: 100,
            date: '2023-01-01',
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
            date: '2023-01-21',
            type: 'spend' as 'spend',
            updated: 0,
            category: 2,
            account: 2,
            fund: undefined
        },
        {
            id: 3,
            description: 'world',
            amount: -25,
            date: '2023-02-10',
            type: 'spend' as 'spend',
            updated: 0,
            category: 1,
            account: 2,
            fund: undefined
        },
        {
            id: 4,
            description: 'test',
            amount: 100,
            date: '2023-02-15',
            type: 'fundAddition' as 'fundAddition',
            updated: 0,
            fund: 3
        }
    ];

    const mockCategories = [
        {
            id: 1,
            type: 'expense',
            startingBalance: 0
        } as Category,
        {
            id: 2,
            type: 'income',
            startingBalance: 0
        } as Category
    ];

    const mockFunds = [
        {
            id: 3,
            startingBalance: 0
        } as Fund
    ];

    it('Returns the correct data', () => {
        let mockState = getBasicMockState({
            categories: mockCategories,
            funds: mockFunds,
        });

        vi.spyOn(store, 'getState').mockReturnValue(mockState.preloadedState);

        let summaryData = getSummaryData(mockTransactions, mockCategories, mockFunds);

        expect(summaryData.monthly).toHaveProperty('2023-01-01');
        expect(summaryData.monthly).toHaveProperty('2023-02-01');

        const testObj = summaryData.monthly['2023-01-01'];
        expect(testObj).toHaveProperty('1');
        expect(testObj).toHaveProperty('2');
        expect(testObj).toHaveProperty('3');
        expect(testObj).toHaveProperty('remaining');

        expect(testObj.remaining).toBe(-50);
        expect(testObj['1']).toEqual({total: -100, transactions: [mockTransactions[0]]});
        expect(testObj['2']).toEqual({total: 50, transactions: [mockTransactions[1]]});
        expect(testObj['3']).toEqual({total: 0, transactions: []});

        const testObj2 = summaryData.monthly['2023-02-01'];
        expect(testObj2).toHaveProperty('1');
        expect(testObj2).toHaveProperty('2');
        expect(testObj2).toHaveProperty('3');
        expect(testObj2).toHaveProperty('remaining');

        expect(testObj2.remaining).toBe(-75);
        expect(testObj2['1']).toEqual({total: 25, transactions: [mockTransactions[2]]});
        expect(testObj2['2']).toEqual({total: 0, transactions: []});
        expect(testObj2['3']).toEqual({total: 100, transactions: [mockTransactions[3]]});

        //Totals
        expect(summaryData.totals[1]).toBe(-75);
        expect(summaryData.totals[2]).toBe(50);
        expect(summaryData.totals[3]).toBe(100);
    });
});

describe('Testing the getDates function', () => {
    it('Gives the correct array of dates when using a date range', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: '2023-02-01',
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'monthly', dateRange);

        expect(dates.length).toBe(2);
        expect(dates[0]).toBe('2023-02-01');
        expect(dates[1]).toBe('2023-03-01');
    });

    it('Gives the correct array of dates for a monthly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'monthly', dateRange);

        expect(dates.length).toBe(3);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-02-01');
        expect(dates[2]).toBe('2023-03-01');
    });

    it('Gives the correct array of dates for a 4 weekly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'fourWeekly', dateRange);

        expect(dates.length).toBe(3);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-01-29');
        expect(dates[2]).toBe('2023-02-26');
    });

    it('Gives the correct array of dates for a 2 weekly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'twoWeekly', dateRange);

        expect(dates.length).toBe(5);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-01-15');
        expect(dates[2]).toBe('2023-01-29');
        expect(dates[3]).toBe('2023-02-12');
        expect(dates[4]).toBe('2023-02-26');
    });

    it('Gives the correct array of dates for a weekly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'weekly', dateRange);

        expect(dates.length).toBe(9);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-01-08');
        expect(dates[2]).toBe('2023-01-15');
        expect(dates[3]).toBe('2023-01-22');
        expect(dates[4]).toBe('2023-01-29');
        expect(dates[5]).toBe('2023-02-05');
        expect(dates[6]).toBe('2023-02-12');
        expect(dates[7]).toBe('2023-02-19');
        expect(dates[8]).toBe('2023-02-26');
    });
});

describe('Testing the getDaysInPeriod function', () => {
    it('Returns the correct value', () => {
        expect(getDaysInPeriod('fourWeekly')).toBe(28);
        expect(getDaysInPeriod('twoWeekly')).toBe(14);
        expect(getDaysInPeriod('weekly')).toBe(7);
        expect(getDaysInPeriod('monthly')).toBe(0); //not used for monthly
    });
});
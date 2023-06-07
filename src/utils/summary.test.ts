import { Category } from "@/redux/categoriesSlice";
import { getSummaryData, createMonthlyItemObj } from "./summary.utils";
import { Fund } from "@/redux/fundsSlice";
import { getBasicMockState } from "./test.utils";
import { vi } from "vitest";
import { store } from "@/redux/store";

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
import {screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryTable from "./SummaryTable";
import { getBasicMockState, render } from "@/utils/test.utils";
import { getSummaryData } from "@/utils/summary.utils";

import type { Transaction } from "@/redux/transactionsSlice";

const mockTransactions: Transaction[] = [
	{
		id: 1,
		amount: 10,
		date: '2023-01-01',
		updated: 20232434,
		type: 'spend',
		description: 'Food from Sainsburys',
		category: 20200723153102,
		fund: undefined,
		account: 20190723153000
	},
	{
		id: 2,
		amount: 20,
		date: '2023-02-10',
		updated: 20232434,
		type: 'spend',
		description: 'Food from tesco',
		category: 20200723153102,
		fund: undefined,
		account: 20190723153000
	},
	{
		id: 4,
		amount: 30,
		date: '2023-01-15',
		updated: 20232434,
		type: 'spend',
		description: 'Spending from savings because it was needed',
		category: undefined,
		fund: 20200723153130,
		account: 20190723153000
	},
	{
		id: 5,
		amount: 50,
		date: '2023-01-10',
		updated: 20232434,
		type: 'fundAddition',
		fund: 20200723153130,
		description: ''
	}
];

const mockSummary = {
    monthly: {},
    totals: {
        remaining: 0,
        incomeTotal: 0,
        expenseTotal: 0
    }
}

it("Loads element without crashing", () => {
	render(<SummaryTable summaryData={mockSummary}/>);
});

it('Displays all headings', () => {
	render(<SummaryTable summaryData={mockSummary}/>);

	//All categories and funds are shown
	screen.getByText('Earnings');
	screen.getByText('Interest');
	screen.getByText('Savings');
	screen.getByText('Food');
	screen.getByText('Date');
	screen.getByText('Remaining');
	screen.getByText('Total');
});

it('Displays correct data in the table', () => {
	let mockState = getBasicMockState({transactions: {transactions: mockTransactions}});
	const { categories, funds } = mockState.preloadedState;
	let summaryData = getSummaryData(mockTransactions, categories, funds);
	render(<SummaryTable summaryData={summaryData} dateRange={{from: '2023-01-01', to: '2023-03-01'}}/>, mockState);

	let table = screen.getByRole('table');

	let dateRowData = table.querySelectorAll('tbody tr td.summaryData');
	expect(dateRowData.length).toBe(3);

	let dateRow = screen.getByRole('cell', { name: '01-01-2023' }).closest('tr');
	within(dateRow as HTMLElement).getByText('£10.00'); //category
	within(dateRow as HTMLElement).getByText('£20.00'); //fund
	within(dateRow as HTMLElement).getByText('-£60.00'); //remaining

	let dateRow2 = screen.getByRole('cell', { name: '01-02-2023' }).closest('tr');
	within(dateRow2 as HTMLElement).getByText('£20.00'); //category
	within(dateRow2 as HTMLElement).getByText('-£20.00'); //remaining

	let totalRow = screen.getByRole('cell', { name: 'Total' }).closest('tr');
	within(totalRow as HTMLElement).getByText('£30.00'); //category
	within(totalRow as HTMLElement).getByText('£20.00'); //fund
	within(totalRow as HTMLElement).getByText('-£80.00'); //remaining
});

it('Displays income and expense totals if setup', () => {
	let mockState = getBasicMockState({transactions: {transactions: mockTransactions}, settings: {displayIncomeTotal: true, displayExpenseTotal: true}});
	const { categories, funds } = mockState.preloadedState;
	let summaryData = getSummaryData(mockTransactions, categories, funds);
	render(<SummaryTable summaryData={summaryData} dateRange={{from: '2023-01-01', to: '2023-03-01'}}/>, mockState);

	screen.getByText('Total Income');
	screen.getByText('Total Expenses');
});
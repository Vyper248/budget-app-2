import { getAllByAltText, getAllByTestId, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionList from "./TransactionList"
import { getBasicMockState, render } from "../../utils/test.utils";

import { Transaction } from "../../redux/transactionsSlice";

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
		date: '2023-01-10',
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
		date: '2023-01-10',
		updated: 20232434,
		type: 'spend',
		description: 'Spending from savings because it was needed',
		category: undefined,
		fund: 20200723153130,
		account: 20190723153000
	},
	{
		id: 3,
		amount: 40,
		date: '2023-01-10',
		updated: 20232434,
		type: 'transfer',
		from: 20190723153000,
		to: 20200101153000
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

let runningBalance = 0;
let mockList = mockTransactions.map((transaction: Transaction) => ({transaction, runningBalance: runningBalance+=transaction.amount}));

let mockState = getBasicMockState({general: {selectedAccount: 20190723153000}});

it("Loads element without crashing", () => {
	render(<TransactionList list={mockList}/>);
});

it("Displays transactions and details", () => {
	render(<TransactionList list={mockList}/>, mockState);

	screen.getByText('Starling - Food from Sainsburys');
	screen.getByText('Starling - Food from tesco');
	screen.getByText('Starling - Spending from savings because it was needed');
	screen.getByText('Transferred to NatWest');
	screen.getByText('Jan 1, 2023');

	//shows dates
	let dates = screen.getAllByText('Jan 10, 2023');
	expect(dates.length).toEqual(4);

	//Shows amounts
	screen.getByText('-£10.00');
	screen.getByText('-£20.00');
	screen.getByText('-£30.00');
	screen.getByText('-£40.00');
	screen.getByText('+£50.00');

	//Shows running balances
	screen.getByText('£10.00');
	screen.getByText('£30.00');
	screen.getByText('£60.00');
	screen.getByText('£100.00');
	screen.getByText('£150.00');
});

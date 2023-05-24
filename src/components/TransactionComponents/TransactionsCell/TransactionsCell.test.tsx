import {screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionsCell from "./TransactionsCell"
import { render } from "@/utils/test.utils";
import { Transaction } from "@/redux/transactionsSlice";
import { vi } from "vitest";
import * as hooks from '@/redux/hooks';
import { setSelectedTotal } from "@/redux/generalSlice";

const date = '2023-01-01';
	const itemId = 0;
	const type = 'income';
	const displayObj = {
		total: 524.23,
		transactions: [
			{
				id: 1,
				amount: 300
			},
			{
				id: 2,
				amount: 224.23
			}
		] as Transaction[]
	}

const TableContainer = ({children}: {children: React.ReactNode}) => {
	return (
		<table>
			<tbody>
				<tr>
					{children}
				</tr>
			</tbody>
		</table>
	);
}

it("Loads element without crashing", () => {
	render(<TableContainer><TransactionsCell displayObj={displayObj} date={date} itemId={itemId} type={type}/></TableContainer>);
});

it("Displays the correct total", () => {
	render(<TableContainer><TransactionsCell displayObj={displayObj} date={date} itemId={itemId} type={type}/></TableContainer>);
	screen.getByText('£524.23');
});

it("Displays the correct total when type is expense", () => {
	render(<TableContainer><TransactionsCell displayObj={displayObj} date={date} itemId={itemId} type={'expense'}/></TableContainer>);
	screen.getByText('-£524.23');
});

it("Dispatches the correct object when clicking", () => {
	const mockDispatch = vi.fn();
	vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);

	render(<TableContainer><TransactionsCell displayObj={displayObj} date={date} itemId={itemId} type={type}/></TableContainer>);
	let cell = screen.getByText('£524.23');
	cell.click();

	expect(mockDispatch).toBeCalledWith(setSelectedTotal({
		transactions: displayObj.transactions,
		date, type, itemId,
		x: 0,
		y: 0
	}));
});
import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuBar from "./MenuBar"
import { vi } from 'vitest';
import * as redux from '@/redux/hooks';
import { render } from "@/utils/test.utils";

import { setCurrentPage } from "@/redux/generalSlice";
import { setAddingTransaction } from "@/redux/transactionsSlice";

import { getBasicMockState } from "@/utils/test.utils";

it("Loads element without crashing", () => {
	render(<MenuBar/>);
});

describe('Testing redux dispatch functions', () => {
	let mockDispatch = vi.fn();
	let mockUseDispatch = vi.spyOn(redux, 'useAppDispatch');
	mockUseDispatch.mockReturnValue(mockDispatch);

	beforeEach(() => {
        mockUseDispatch.mockClear();
        mockUseDispatch.mockReturnValue(mockDispatch);
    });

	it('Dispatches setAddingTransaction with true when clicking the Add Transaction button when its closed', () => {
		let mockState = getBasicMockState({transactions: {addingTransaction: false}});
		render(<MenuBar/>, mockState);

		let addBtn = screen.getByRole('button', { name: 'Add Transaction'});

		fireEvent.click(addBtn);
		expect(mockDispatch).toBeCalledWith(setAddingTransaction(true));
	});

	it('Dispatches setAddingTransaction with false when clicking the Add Transaction button when its open', () => {
		let mockState = getBasicMockState({transactions: {addingTransaction: true}});
		render(<MenuBar/>, mockState);

		let addBtn = screen.getByRole('button', { name: 'Add Transaction'});

		fireEvent.click(addBtn);
		expect(mockDispatch).toBeCalledWith(setAddingTransaction(false));
	});

	it.each(['Home', 'Categories', 'Funds', 'Accounts', 'Tools', 'Settings'])(
		'Sets the current page when clicking the page buttons', (label) => {
		const mockState = getBasicMockState({general: {currentPage: ''}});
		render(<MenuBar/>, mockState);

		let pageBtn = screen.getByText(label);
		fireEvent.click(pageBtn);

		expect(mockDispatch).toBeCalledWith(setCurrentPage(label));
	});
});
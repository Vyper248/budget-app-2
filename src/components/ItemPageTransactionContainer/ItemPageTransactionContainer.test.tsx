import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemPageTransactionContainer from "./ItemPageTransactionContainer"

import { render, getBasicMockState } from "../../utils/test.utils";

import { vi } from "vitest";

it("Loads element without crashing", () => {
	render(<ItemPageTransactionContainer heading='Account' startingBalance={0} totalText="Balance: £1.00" search='' onChangeSearch={()=>{}}><div>Test Child</div></ItemPageTransactionContainer>);
});

it("Calls the search function when changing search input", () => {
	const mockFn = vi.fn();
	render(<ItemPageTransactionContainer heading='Account' startingBalance={0} totalText="Balance: £1.00" search='' onChangeSearch={mockFn}><div>Test Child</div></ItemPageTransactionContainer>);
	
	const searchInput = screen.getByPlaceholderText("Search");
	fireEvent.change(searchInput, {target: {value: "test"}});
	expect(mockFn).toHaveBeenCalled();
});

it('Shows the passed in search value in the Search input', () => {
	render(<ItemPageTransactionContainer heading='Account' startingBalance={0} totalText="Balance: £1.00" search='test' onChangeSearch={()=>{}}><div>Test Child</div></ItemPageTransactionContainer>);

	const searchInput = screen.getByPlaceholderText("Search");
	expect(searchInput).toHaveValue("test");
});

it('Shows the correct heading', () => {
	render(<ItemPageTransactionContainer heading='Account' startingBalance={0} totalText="Balance: £1.00" search='' onChangeSearch={()=>{}}><div>Test Child</div></ItemPageTransactionContainer>);
	screen.getByText("Account");
});

it('Shows the correct starting balance', () => {
	render(<ItemPageTransactionContainer heading='Account' startingBalance={20} totalText="Balance: £1.00" search='' onChangeSearch={()=>{}}><div>Test Child</div></ItemPageTransactionContainer>);

	const balance = screen.queryAllByText("£20.00");
	expect(balance.length).toBe(1);
});

it('Shows the running balance with the opening balance when on the Accounts page', () => {
	const mockState = getBasicMockState({general: {currentPage: "Accounts"}});
	render(<ItemPageTransactionContainer heading='Account' startingBalance={20} totalText="Balance: £1.00" search='' onChangeSearch={()=>{}}><div>Test Child</div></ItemPageTransactionContainer>, mockState);

	const balance = screen.queryAllByText("£20.00");
	expect(balance.length).toBe(2);
});

it('Shows the correct totalText', () => {
	render(<ItemPageTransactionContainer heading='Account' startingBalance={0} totalText="Balance: £1.00" search='' onChangeSearch={()=>{}}><div>Test Child</div></ItemPageTransactionContainer>);
	screen.getByText("Balance: £1.00");
});

it('Shows the children', () => {
	render(<ItemPageTransactionContainer heading='Account' startingBalance={0} totalText="Balance: £1.00" search='' onChangeSearch={()=>{}}><div>Test Child</div></ItemPageTransactionContainer>);
	screen.getByText("Test Child");
});
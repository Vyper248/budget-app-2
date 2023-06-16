import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemPage from "./ItemPage"
import { render } from "@/utils/test.utils";

import type { Transaction } from "@/redux/transactionsSlice";
import type { Category } from "@/redux/categoriesSlice";

const mockCategories = [
    {
        id: 1,
        name: 'Food',
        type: 'expense' as 'expense',
        description: 'Any food stuff',
        hidden: false,
        startingBalance: 500,
        updated: 0,
    },
    {
        id: 2,
        name: 'Earnings',
        type: 'income' as 'income',
        description: 'Money from job',
        hidden: false,
        startingBalance: 0,
        updated: 0,
    }
] as Category[];

const mockFilter = (tr: Transaction) => true;

it("Loads element without crashing", () => {
	render(<ItemPage heading='Test' type='category' trFilter={mockFilter} items={mockCategories} totalTextLabel="Total"/>);
});

it('Displays the correct heading', () => {
    render(<ItemPage heading='Test' type='category' trFilter={mockFilter} items={mockCategories} totalTextLabel="Total"/>);

    screen.getByText('Test');
});

it('Displays the first category', () => {
    render(<ItemPage heading='Test' type='account' trFilter={mockFilter} items={mockCategories} totalTextLabel="Total"/>);

    screen.getByRole('heading', { name: 'Food' });
});

it('Displays the categories', () => {
    render(<ItemPage heading='Test' type='account' trFilter={mockFilter} items={mockCategories} totalTextLabel="Total"/>);

    screen.getByRole('button', { name: 'Food'});
    screen.getByRole('button', { name: 'Earnings'});
});

it('Displays the Search input', () => {
    render(<ItemPage heading='Test' type='account' trFilter={mockFilter} items={mockCategories} totalTextLabel="Total"/>);

    screen.getByPlaceholderText('Search');
});
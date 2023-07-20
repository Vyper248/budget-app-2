import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LineChart from "./LineChart";

const mockData = [
	{
		label: '2022-01-01',
		income: 400,
		realIncome: 400,
		expense: 300,
		realExpense: 300,
	},
	{
		label: '2022-02-01',
		income: 500,
		realIncome: 500,
		expense: 200,
		realExpense: 200,
	},
	{
		label: '2022-03-01',
		income: 450,
		realIncome: 450,
		expense: 350,
		realExpense: 350,
	}
];

it("Loads element without crashing", () => {
	render(<LineChart data={mockData}/>);
});

it("Shows the heading and option to hide outliers", () => {
	render(<LineChart data={mockData}/>);

	screen.getByText('Income vs Expenses');
	screen.getByText('Hide Outliers');
	screen.getByRole('checkbox');
});

it("Displays dates", () => {
	render(<LineChart data={mockData}/>);

	screen.getByText('January 2022');
	screen.getByText('February 2022');
	screen.getByText('March 2022');

	screen.getByText('£400');
});

it("Displays left values", () => {
	render(<LineChart data={mockData}/>);

	screen.getByText('£200');
	screen.getByText('£233');
	screen.getByText('£267');
	screen.getByText('£300');
	screen.getByText('£333');
	screen.getByText('£367');
	screen.getByText('£400');
	screen.getByText('£433');
	screen.getByText('£467');
	screen.getByText('£500');
});

it("Displays points", () => {
	const { container } = render(<LineChart data={mockData}/>);

	//income
	const svg400 = container.querySelector('[data-val="400"]');
	expect(svg400).toBeInTheDocument();

	const svg450 = container.querySelector('[data-val="450"]');
	expect(svg450).toBeInTheDocument();

	const svg500 = container.querySelector('[data-val="500"]');
	expect(svg500).toBeInTheDocument();

	//expenses
	const svg300 = container.querySelector('[data-val="300"]');
	expect(svg300).toBeInTheDocument();

	const svg350 = container.querySelector('[data-val="350"]');
	expect(svg350).toBeInTheDocument();

	const svg200 = container.querySelector('[data-val="200"]');
	expect(svg200).toBeInTheDocument();
});

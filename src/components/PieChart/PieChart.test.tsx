import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import PieChart from "./PieChart"
import { getPieData } from "@/pages/Home/Home.utils";
import { getPercentages } from "./PieChart.utils";
import { Category } from "@/redux/categoriesSlice";
import { Fund } from "@/redux/fundsSlice";

const mockData = [
	{
		label: 'Savings',
		value: 500
	},
	{
		label: 'Food',
		value: 100
	},
	{
		label: 'Travel',
		value: 400
	}
];

describe('Testing component', () => {
	it("Loads element without crashing", () => {
		render(<PieChart data={mockData}/>);
	});
	
	it("Displays all labels and percentages", () => {
		render(<PieChart data={mockData}/>);
	
		screen.getByText('Savings');
		screen.getByText('(50.0%)');
		screen.getByText('Food');
		screen.getByText('(10.0%)');
		screen.getByText('Travel');
		screen.getByText('(40.0%)');
	});

	it('Displays segments', () => {
		const { container } = render(<PieChart data={mockData}/>);

		const paths = container.querySelectorAll('path');
		expect(paths).toHaveLength(3);
	});
	
	it("Displays heading", () => {
		render(<PieChart data={mockData} heading='Test Pie'/>);
	
		screen.getByText('Test Pie');
	});
});

describe('Testing getPieData function', () => {
	it('Gives back the required data', () => {
		let mockCategories = [
			{ id: 1, name: 'Travel' },
			{ id: 2, name: 'Food' }
		] as Category[];

		let mockFunds = [
			{ id: 3, name: 'Savings' }
		] as Fund[];

		let mockTotals = {
			1: 500,
			2: 100,
			3: 300,
			remaining: 100,
			incomeTotal: 0,
			expenseTotal: 0
		}

		let data = getPieData(mockTotals, mockCategories, mockFunds);

		expect(data.length).toBe(4);
		expect(data[0]).toEqual({label: 'Travel', value: 500});
		expect(data[1]).toEqual({label: 'Food', value: 100});
		expect(data[2]).toEqual({label: 'Savings', value: 300});
		expect(data[3]).toEqual({label: 'Remaining', value: 100});
	});
});

describe('Testing the getPercentages function', () => {
	it('Returns the correct data', () => {
		const data = getPercentages([
			{label: 'Travel', value: 500},
			{label: 'Food', value: 100},
			{label: 'Savings', value: 300},
			{label: 'Remaining', value: 100}
		]);

		expect(data).toHaveLength(4);
		expect(data[0].percentage).toBe(50);
		expect(data[0].percentageSmall).toBe('50.0'); 
		
		expect(data[1].percentage).toBe(10);
		expect(data[1].percentageSmall).toBe('10.0');

		expect(data[2].percentage).toBe(30);
		expect(data[2].percentageSmall).toBe('30.0');

		expect(data[3].percentage).toBe(10);
		expect(data[3].percentageSmall).toBe('10.0');
	});

	it('Excludes 0 values', () => {
		const data = getPercentages([
			{label: 'Travel', value: 500},
			{label: 'Food', value: 0},
			{label: 'Savings', value: 300},
			{label: 'Remaining', value: 100}
		]);

		expect(data).toHaveLength(3);
	});
});
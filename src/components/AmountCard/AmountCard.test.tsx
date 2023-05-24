import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import AmountCard from "./AmountCard"

it("Loads element without crashing", () => {
	render(<AmountCard label='' amount={0}/>);
});

it("Displays label and amount", () => {
	render(<AmountCard label='Test' amount={200}/>);

	screen.getByText('Test');
	screen.getByText('£200.00');
});
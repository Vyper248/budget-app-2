import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import InterestCalculator from "./InterestCalculator";

it("Loads element without crashing", () => {
	render(<InterestCalculator/>);
});

it('Displays custom inputs', () => {
	render(<InterestCalculator/>);

	screen.getByRole('spinbutton', { name: 'Custom Interest Rate'});
	screen.getByRole('spinbutton', { name: 'Custom Amount'});
	screen.getByRole('spinbutton', { name: 'Custom Extra Charges'});
});

it('Allows changing custom inputs and seeing the result', () => {
	render(<InterestCalculator/>);

	const rateInput = screen.getByRole('spinbutton', { name: 'Custom Interest Rate'});
	const amountInput = screen.getByRole('spinbutton', { name: 'Custom Amount'});

	fireEvent.change(rateInput, { target: { value: 1 } });
	fireEvent.change(amountInput, { target: { value: 100 } });

	screen.getByText('£1.00');
	screen.getByText('£0.08');

	fireEvent.change(rateInput, { target: { value: 2 } });
	fireEvent.change(amountInput, { target: { value: 100 } });

	screen.getByText('£2.00');
	screen.getByText('£0.17');

	fireEvent.change(rateInput, { target: { value: 2 } });
	fireEvent.change(amountInput, { target: { value: 200 } });

	screen.getByText('£4.00');
	screen.getByText('£0.33');
});
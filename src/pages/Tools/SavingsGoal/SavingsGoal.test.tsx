import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SavingsGoal from "./SavingsGoal";
import { render } from "@/utils/test.utils";
import { vi } from "vitest";

it("Loads element without crashing", () => {
	render(<SavingsGoal/>);
});

it("Shows correnct inputs", () => {
	render(<SavingsGoal/>);

	screen.getByLabelText('Target Date');
	screen.getByLabelText('Target');
	screen.getByLabelText('Use Total Money');
});

it("Shows correnct amounts", () => {
	vi.setSystemTime('2023-01-01')
	render(<SavingsGoal/>);

	let date = screen.getByLabelText('Target Date');
	let target = screen.getByLabelText('Target');
	let useTotal = screen.getByLabelText('Use Total Money');

	fireEvent.change(date, { target: { value: '2023-03-01' } });
	fireEvent.change(target, { target: { value: '1000' } });
	fireEvent.click(useTotal);

	screen.getByText('£0.00');
	screen.getByText('2');
	screen.getByText('£1,000.00');
	screen.getByText('£500.00');
});
import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from 'vitest';
import Button from "./Button"

it("Loads element without crashing", () => {
	const onClickFn = vi.fn();
	render(<Button label='test' onClick={onClickFn}/>);

	let element = screen.getByRole('button');
	expect(element).toBeInTheDocument();
	expect(element.textContent).toBe('test');

	fireEvent.click(element);
	expect(onClickFn).toBeCalled();
});

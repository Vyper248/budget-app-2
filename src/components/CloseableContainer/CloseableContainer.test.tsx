import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import CloseableContainer from "./CloseableContainer"
import { vi } from "vitest";

it("Loads element without crashing", () => {
	render(<CloseableContainer heading='test'><div>Content</div></CloseableContainer>);
});

it("Displays the heading", () => {
	render(<CloseableContainer heading='test'><div>Content</div></CloseableContainer>);
	expect(screen.getByRole('heading')).toHaveTextContent('test');
});

it("Displays the content", () => {
	render(<CloseableContainer heading='test'><div>Content</div></CloseableContainer>);
	screen.getByText('Content');
});

it("Sets the state variables when needed", async () => {
	const mockSetHeight = vi.fn();
	const mockSetClosed = vi.fn();
	vi.spyOn(React, 'useState').mockReturnValueOnce(['20px', mockSetHeight]).mockReturnValueOnce([false, mockSetClosed]);

	render(<CloseableContainer heading='test'><div>Content</div></CloseableContainer>);

	//initial update when component is rendered
	expect(mockSetHeight).toBeCalledTimes(1);
	
	//setClosed should be called when clicking the heading
	let heading = screen.getByRole('heading');
	fireEvent.click(heading);
	expect(mockSetClosed).toBeCalledTimes(1);
});

it("Has the correct height for the container div", async () => {
	const mockSetHeight = vi.fn();
	const mockSetClosed = vi.fn();
	vi.spyOn(React, 'useState').mockReturnValueOnce(['20px', mockSetHeight]).mockReturnValueOnce([false, mockSetClosed]);

	render(<CloseableContainer heading='test'><div>Content</div></CloseableContainer>);

	let content = screen.getByText('Content');
	let contentDiv = content.parentElement?.parentElement as HTMLElement;
	let style = window.getComputedStyle(contentDiv);
	expect(style.height).toBe('20px');
});

it("Sets the container height to 0px when closed is true", async () => {
	const mockSetHeight = vi.fn();
	const mockSetClosed = vi.fn();
	vi.spyOn(React, 'useState').mockReturnValueOnce(['20px', mockSetHeight]).mockReturnValueOnce([true, mockSetClosed]);

	render(<CloseableContainer heading='test'><div>Content</div></CloseableContainer>);

	let content = screen.getByText('Content');
	let contentDiv = content.parentElement?.parentElement as HTMLElement;
	let style = window.getComputedStyle(contentDiv);
	expect(style.height).toBe('0px');
});
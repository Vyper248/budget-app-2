import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ScrollText from "./ScrollText";

it("Loads element without crashing", () => {
	render(<ScrollText left={true} right={true}/>);
});

it('Displays both text', () => {
	render(<ScrollText left={true} right={true}/>);

	const scrollText = screen.getAllByText('Scroll for more');
	expect(scrollText).toHaveLength(2);
});

it('Hides left text', () => {
	render(<ScrollText left={false} right={true}/>);

	const scrollText = screen.getAllByText('Scroll for more');
	expect(scrollText[0]).toHaveClass('hidden');
	expect(scrollText[1]).not.toHaveClass('hidden');
});

it('Hides right text', () => {
	render(<ScrollText left={true} right={false}/>);

	const scrollText = screen.getAllByText('Scroll for more');
	expect(scrollText[0]).not.toHaveClass('hidden');
	expect(scrollText[1]).toHaveClass('hidden');
});

it('Hides both text', () => {
	render(<ScrollText left={false} right={false}/>);

	const scrollText = screen.queryAllByText('Scroll for more');
	expect(scrollText).toHaveLength(0);
});

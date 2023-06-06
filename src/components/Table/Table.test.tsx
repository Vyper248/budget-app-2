import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table"

it("Loads element without crashing and displays children", () => {
	render(<Table><tbody><tr><td>Test</td></tr></tbody></Table>);

	screen.getByText('Test');
});

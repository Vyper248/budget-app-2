import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home"

it("Loads element without crashing", () => {
	render(<Home/>);

	let element = screen.getByText("test");
	expect(element).toBeInTheDocument();
});

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Settings from "./Settings"

it("Loads element without crashing", () => {
	render(<Settings/>);
});

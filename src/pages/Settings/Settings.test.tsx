import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Settings from "./Settings";
import { render } from "@/utils/test.utils";

it("Loads element without crashing", () => {
	render(<Settings/>);
});

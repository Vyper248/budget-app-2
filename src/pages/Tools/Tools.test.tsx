import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tools from "./Tools";
import { render } from "@/utils/test.utils";

it("Loads element without crashing", () => {
	render(<Tools/>);
});

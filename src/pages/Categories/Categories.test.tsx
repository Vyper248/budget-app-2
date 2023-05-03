import {screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Categories from "./Categories"
import { render } from "../../utils/test.utils";

it("Loads element without crashing", () => {
	render(<Categories/>);
});

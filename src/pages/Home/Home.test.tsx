import {screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home"

import { render } from "@/utils/test.utils";

it("Loads element without crashing", () => {
	render(<Home/>);
});

import {screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Funds from "./Funds"
import { render } from "../../utils/test.utils";

it("Loads element without crashing", () => {
	render(<Funds/>);
});

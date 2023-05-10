import "@testing-library/jest-dom";
import Accounts from "./Accounts"
import { render } from "@/utils/test.utils";

it("Loads element without crashing", () => {
	render(<Accounts/>);
});

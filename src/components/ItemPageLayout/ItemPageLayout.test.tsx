import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemPageLayout from "./ItemPageLayout"

it("Loads element without crashing and shows child elements", () => {
	render(<ItemPageLayout><div>List</div><div>Content</div></ItemPageLayout>);

	screen.getByText('List');
	screen.getByText('Content');
});

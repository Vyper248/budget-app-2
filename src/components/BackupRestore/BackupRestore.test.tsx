import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackupRestore from "./BackupRestore";
import { render } from "@/utils/test.utils";

it("Loads element without crashing", () => {
	render(<BackupRestore/>);
});

it('Shows back and restore sections', () => {
	render(<BackupRestore/>);

	screen.getByText('Backup');
	screen.getByRole('button', { name: 'Download Backup' });
	
	screen.getByText('Restore');
	screen.getByText('Choose a File');
	screen.getByText('Import');
});

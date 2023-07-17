import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SyncSettings from "./SyncSettings";
import { getBasicMockState, render } from "@/utils/test.utils";
import * as redux from '@/redux/hooks';
import { vi } from "vitest";

it("Loads element without crashing", () => {
	render(<SyncSettings/>);
});

it('Displays text with date if exists', () => {
	const mockState = getBasicMockState({general: {lastSync: 20230201105245330}});
	render(<SyncSettings/>, mockState);

	screen.getByRole('heading', { name: 'Syncing' });
	screen.getByText('This will allow you to sync your data with another device.');
	screen.getByText('Last synced on: 01/02/2023 at 10:52');
});

it('Displays Never if not synced yet', () => {
	const mockState = getBasicMockState({general: {lastSync: 0}});
	render(<SyncSettings/>, mockState);

	screen.getByText('Last synced on: Never');
});

it('Displays sync buttons', () => {
	render(<SyncSettings/>);

	screen.getByRole('button', { name: 'Up' });
	screen.getByRole('button', { name: 'Down' });
	screen.getByRole('button', { name: 'Merge' });
	screen.getByRole('button', { name: 'Scan' });
});
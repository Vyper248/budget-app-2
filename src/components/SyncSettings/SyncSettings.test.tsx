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
	screen.getByText('This will allow you to upload your data to the server for backup and to sync with other devices.');
	screen.getByText('Last synced on: 01/02/2023 at 10:52');
});

it('Displays Never if not synced yet', () => {
	const mockState = getBasicMockState({general: {lastSync: 0}});
	render(<SyncSettings/>, mockState);

	screen.getByText('Last synced on: Never');
});

it('Displays login/register inputs and buttons', () => {
	const mockState = getBasicMockState({general: {lastSync: 20230201105245330}});
	render(<SyncSettings/>, mockState);

	screen.getByRole('textbox', { name: 'Username' });
	screen.getByLabelText('Password');
	screen.getByRole('button', { name: 'Login' });
	screen.getByRole('button', { name: 'Register' });

	expect(screen.queryByRole('button', { name: 'Sync Now' })).toBeFalsy();
	expect(screen.queryByRole('button', { name: 'Logout' })).toBeFalsy();
});

it('Displays Sync and Logout buttons if logged in', () => {
	const mockState = getBasicMockState({general: {lastSync: 20230201105245330, user: {id: '1', username: 'Bob', jwt: ''}}});
	render(<SyncSettings/>, mockState);

	screen.getByRole('button', { name: 'Sync Now' });
	screen.getByRole('button', { name: 'Logout' });
});

it('Logs out when clickign the logout button', () => {
	const mockDispatch = vi.fn();
	vi.spyOn(redux, 'useAppDispatch').mockReturnValue(mockDispatch);
	const mockState = getBasicMockState({general: {lastSync: 20230201105245330, user: {id: '1', username: 'Bob', jwt: ''}}});
	render(<SyncSettings/>, mockState);

	const logout = screen.getByRole('button', { name: 'Logout' });
	fireEvent.click(logout);

	expect(mockDispatch).toBeCalledWith({type: 'general/setUser', payload: null});
});
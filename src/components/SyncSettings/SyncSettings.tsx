import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setUser } from "@/redux/generalSlice";
import { sync } from "@/utils/sync.utils";
import { formatDateTime } from "@/utils/date.utils";

import Grid from "../styled/Grid";
import Button from "../Button/Button";
import UserLoginRegister from "./UserLoginRegister";

const SyncSettings = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.general.user);
	const state = useAppSelector(state => state);
	const lastSync = useAppSelector(state => state.general.lastSync);
	const fetching = useAppSelector(state => state.general.fetching);

	const onClickSync = () => {
		if (user === null) return;
		sync(state, dispatch, true);
	}

	const onLogout = () => {
		dispatch(setUser(null));
	}

	return (
		<div>
			<h4>Syncing</h4>
			<p>This will allow you to upload your data to the server for backup and to sync with other devices.</p>
			<p>If you want to sync with someone else's account, it's recommended to clear data first, otherwise there will likely be issues.</p>
			<p>Last synced on: {formatDateTime(lastSync)}</p>
			{ user === null && <UserLoginRegister/> }
			{ user !== null && window.navigator.onLine && (
				<Grid template='1fr 1fr' width='250px'>
					<Button label='Sync Now' onClick={onClickSync} loading={fetching}/>
					<Button label='Logout' onClick={onLogout} loading={fetching}/>
				</Grid>
			) }
			{ window.navigator.onLine === false && <div>Can't sync while offline.</div>}
		</div>
	);
}

export default SyncSettings;

import { formatDateTime } from "@/utils/date.utils";

import Grid from "../styled/Grid";
import Button from "../Button/Button";

const SyncOptions = ({ lastSync, loading, onStartSyncing, onClickScan }
	: { lastSync: number, loading: string, onStartSyncing: (type: string) => () => void, onClickScan: () => void }) => {
	return (
		<div>
			<p>This will allow you to sync your data with another device.</p>
			<ul style={{ width: 'fit-content', margin: 'auto', textAlign: 'left' }}>
				<li><strong>Up</strong> syncs from this device to the one scanning. This will overwrite data.</li>
				<li><strong>Down</strong> syncs from the device scanning to this one. This will overwrite data.</li>
				<li><strong>Merge</strong> combines the data from both devices. This is the recommended method.</li>
				<li><strong>Scan</strong> lets you scan a QR code when you've started syncing from another device.</li>
			</ul>
			<p>Last synced on: {formatDateTime(lastSync)}</p>
			<Grid template='1fr 1fr' width='300px'>
				<Button label='Sync Up' onClick={onStartSyncing('up')} loading={loading === 'up'} />
				<Button label='Sync Down' onClick={onStartSyncing('down')} loading={loading === 'down'} />
				<Button label='Merge' onClick={onStartSyncing('merge')} loading={loading === 'merge'} />
				<Button label='Scan' onClick={onClickScan} />
			</Grid>
		</div>
	);
}

export default SyncOptions;
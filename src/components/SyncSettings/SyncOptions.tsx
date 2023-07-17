import { useState } from "react";
import { formatDateTime } from "@/utils/date.utils";
import { MdHelpOutline } from "react-icons/md";

import Grid from "../styled/Grid";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";

const SyncOptions = ({ lastSync, loading, onStartSyncing, onClickScan }
	: { lastSync: number, loading: string, onStartSyncing: (type: string) => () => void, onClickScan: () => void }) => {
	
	const [viewSteps, setViewSteps] = useState(false);

	const onOpenSteps = () => {
		setViewSteps(v => !v);
	}

	return (
		<div>
			<p>This will allow you to sync your data with another device. <IconButton Icon={MdHelpOutline} style={{position: 'relative', top: '3px'}} fontSize="1.2em" onClick={onOpenSteps} title='View Steps'/></p>
			<div className={viewSteps ? 'steps open' : 'steps'}>
				<ol style={{ width: 'fit-content', margin: 'auto', textAlign: 'left' }}>
					<li>On the first device, choose the sync method (up, down, merge). This will display a QR Code.</li>
					<li>On the second device, choose the scan option. Then you can either:</li>
					<ul>
						<li>Scan the QR code with the camera that's shown.</li>
						<li>Enter the code manually and click/touch the 'Go' button.</li>
					</ul>
					<li>All done. If it worked, you should see a message to confirm the sync was successful.</li>
				</ol>
				<p><strong>The sync methods are as follows:</strong></p>
				<ul style={{ width: 'fit-content', margin: 'auto', textAlign: 'left' }}>
					<li><strong>Up</strong> syncs from this device to the one scanning. This will overwrite data.</li>
					<li><strong>Down</strong> syncs from the device scanning to this one. This will overwrite data.</li>
					<li><strong>Merge</strong> combines the data from both devices. This is the recommended method.</li>
				</ul>
			</div>
			<p style={viewSteps ? {marginTop: '1em', transition: '0.3s'} : {marginTop: '0px', transition: '0.3s'}}>
				Last synced on: {formatDateTime(lastSync)}
			</p>
			<Grid template='1fr 1fr 1fr' width='300px'>
				<Button label='Up' onClick={onStartSyncing('up')} loading={loading === 'up'} />
				<Button label='Down' onClick={onStartSyncing('down')} loading={loading === 'down'} />
				<Button label='Merge' onClick={onStartSyncing('merge')} loading={loading === 'merge'} />
				<div></div>
				<Button label='Scan' onClick={onClickScan} />
			</Grid>
		</div>
	);
}

export default SyncOptions;
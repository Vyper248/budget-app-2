import StyledSyncSettings from "./SyncSettings.style";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { getDataToSync, sendData, checkData, BackupData, updateLocalData, ServerData } from "@/utils/sync.utils";
import { getDateNumber } from "@/utils/date.utils";
import { setLastSync } from "@/redux/generalSlice";

import SyncOptions from "./SyncOptions";
import QRCodeDisplay from "./QRCodeDisplay";
import QRCodeScanner from "./QRCodeScanner";

let intervalObj = {
	interval: null as NodeJS.Timer | null
}

type ServerReturn = {
	status: string;
	data?: ServerData;
	message?: string;
}

const getSyncObj = (type: string, uniqueId: string, data: BackupData) => {
	return {
		uniqueId, type, data,
		syncComplete: false,
		finalCheck: false,
	}
}

const SyncSettings = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(state => state);
	const lastSync = useAppSelector(state => state.general.lastSync);

	const [loading, setLoading] = useState('');

	const [beginSync, setBeginSync] = useState(false);
	const [showScanner, setShowScanner] = useState(false);

	const [syncStatus, setSyncStatus] = useState({ status: '', message: '' });

	const randomNumber = Math.round(Number(Date.now() + '' + Math.random() * 1000)) + '';
	const [uniqueId, _] = useState(randomNumber);

	useEffect(() => {
		return () => {
			if (intervalObj.interval) clearInterval(intervalObj.interval);
		}
	}, []);

	const dealWithSyncData = (data: ServerReturn) => {
		if (data.status === 'error') {
			setBeginSync(false);
			setSyncStatus({ status: 'error', message: data.message || 'Unkown error, please try again.' });
		} else {
			setBeginSync(false);
			if (data.data) {
				updateLocalData(data.data, dispatch);
			}
			dispatch(setLastSync(getDateNumber()));
			setSyncStatus({ status: 'success', message: data.message || 'Sync was successful!' });
		}
	}

	const onStartSyncing = (type: string) => async () => {
		setLoading(type);
		setSyncStatus({ status: '', message: '' });

		let dataToSync = getDataToSync(state);
		let syncObj = getSyncObj(type, uniqueId, type === 'down' ? {} as BackupData : dataToSync);
		let dataSent: any = await sendData(syncObj);

		if (dataSent.status === 'success') {
			setLoading('');
			setBeginSync(true);

			const data = await checkData(uniqueId, intervalObj) as ServerReturn;
			dealWithSyncData(data);
		} else {
			setLoading('');
			setBeginSync(false);
			setSyncStatus({ status: 'error', message: 'Failed to connect, please try again.' });
		}
	}

	const onCancelSync = () => {
		if (intervalObj.interval) clearInterval(intervalObj.interval);
		setBeginSync(false);
		setSyncStatus({ status: '', message: '' });
	}

	const onFinishScanning = useCallback(async (val: string) => {
		if (val.length === 0) return;

		setShowScanner(false);
		let dataToSync = getDataToSync(state);
		let syncObj = getSyncObj('receive', val, dataToSync);
		let data: ServerReturn = await sendData(syncObj);
		dealWithSyncData(data);
	}, [state]);

	const onClickScan = () => {
		setShowScanner(true);
		setSyncStatus({ status: '', message: '' });
	}

	const onCancelScan = () => {
		setShowScanner(false);
		setSyncStatus({ status: '', message: '' });
	}

	return (
		<StyledSyncSettings>
			<h4>Syncing</h4>

			{beginSync === false && showScanner === false && <SyncOptions lastSync={lastSync} loading={loading} onStartSyncing={onStartSyncing} onClickScan={onClickScan} />}

			{syncStatus.message.length > 0 && <div id='syncMessage' className={syncStatus.status === 'error' ? 'error' : 'success'}>{syncStatus.message}</div>}

			{beginSync === true && showScanner === false && <QRCodeDisplay uniqueId={uniqueId} onCancelSync={onCancelSync} />}

			{beginSync === false && showScanner === true && <QRCodeScanner onFinish={onFinishScanning} onCancel={onCancelScan} />}
		</StyledSyncSettings>
	);
}

export default SyncSettings;

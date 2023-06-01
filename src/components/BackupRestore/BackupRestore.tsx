import { useState } from "react";
import StyledBackupRestore from "./BackupRestore.style";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { today } from "@/utils/date.utils";

import Button from "../Button/Button";
import FileInput from "../FileInput/FileInput";

import { SettingsState, setSettings } from "@/redux/settingsSlice";
import { Account, setAccounts } from "@/redux/accountsSlice";
import { Category, setCategories } from "@/redux/categoriesSlice";
import { Fund, setFunds } from "@/redux/fundsSlice";
import { Transaction, setTransactions } from "@/redux/transactionsSlice";
import { convertOldData } from "./BackupRestore.utils";

export type BackupData = {
	settings: SettingsState,
	accounts: Account[],
	categories: Category[],
	funds: Fund[],
	transactions: Transaction[]
}

const BackupRestore = ({}) => {
	const dispatch = useAppDispatch();

	const [importData, setImportData] = useState<BackupData | null>(null);
	const [restoreMessage, setRestoreMessage] = useState('');

	const backupData = useAppSelector(state => {
        return {
			settings: state.settings,
            accounts: state.accounts,
            categories: state.categories,
            funds: state.funds,
            transactions: state.transactions.transactions
        };
    });

	const onClickBackup = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));

        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", `Budget Backup - ${today()}.json`);
        link.click();
	}

	const onFileChange = (obj: any) => {
		if (obj) {
			//check if importing data from old budget website
			if (obj.fundAdditions !== undefined || obj.budgets !== undefined || obj.general !== undefined) {
				let newObj = convertOldData(obj);
				setImportData(newObj);
			} else {
				let newObj = {} as BackupData;

				if (obj.settings !== undefined) newObj.settings = obj.settings;
				if (obj.accounts !== undefined) newObj.accounts = obj.accounts;
				if (obj.categories !== undefined) newObj.categories = obj.categories;
				if (obj.funds !== undefined) newObj.funds = obj.funds;
				if (obj.transactions !== undefined) newObj.transactions = obj.transactions;
				
				setImportData(newObj);
			}
		} else {
			setImportData(null);
		}
    }

    const onImportBackup = () => {
		if (!importData) {
			setRestoreMessage('Please choose a file.');
			setImportData(null);
			return;
		}

		//if no data, then display a message
		if (Object.keys(importData).length === 0) {
			setRestoreMessage('No valid data found.');
			setImportData(null);
			return;
		}

		//import data here
		if (importData.settings !== undefined) dispatch(setSettings(importData.settings));
		if (importData.accounts !== undefined) dispatch(setAccounts(importData.accounts));
		if (importData.categories !== undefined) dispatch(setCategories(importData.categories));
		if (importData.funds !== undefined) dispatch(setFunds(importData.funds));
		if (importData.transactions !== undefined) dispatch(setTransactions(importData.transactions));

        setImportData(null);
        setRestoreMessage('Data Restored.');
    }

	return (
		<StyledBackupRestore>
			<h4 className='centered'>Backup</h4>
			<p>This will download a backup of all data as a JSON file, and allow you to restore from a backup if needed.</p>
			<Button label='Download Backup' width='160px' onClick={onClickBackup}/>

			<h4 className='centered'>Restore</h4>
			<p>Use this to restore from a previously taken backup JSON file. This will overwrite any current data and replace it with the backup data, including on the server if logged in.</p>
			<p style={{color: '#0F0'}}>{restoreMessage}</p>
			<FileInput label='Import' onChange={onFileChange} onSubmit={onImportBackup}/>
		</StyledBackupRestore>
	);
}

export default BackupRestore;

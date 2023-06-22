import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import StyledSettings from "./Settings.style";

import { setSettings } from "@/redux/settingsSlice";
import { useResponsive } from "@/utils/customHooks.utils";

import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import BackupRestore from "@/components/BackupRestore/BackupRestore";
import ConfirmationContainer from "@/components/ConfirmationContainer/ConfirmationContainer";
import Button from "@/components/Button/Button";

const getStoragePercentage = () => {
	let total = 0;
	for (let x in localStorage) {
		if (!localStorage.hasOwnProperty(x)) continue;
		total += (localStorage[x].length + x.length) * 2;;
	}
	return (((total / 1024) / 5000) * 100).toFixed(1) + '%';
}

const clearData = () => {
	localStorage.removeItem('budget-app-2-state');
	window.location.reload();
}

const Settings = ({}) => {
	const dispatch = useAppDispatch();
	const { isMobile } = useResponsive();
	const settings = useAppSelector(state => state.settings);

	const labelWidth = '180px';

	const onChange = (key: string, value: string | number | boolean) => {
		let newSettings = {...settings, [key]: value};
		dispatch(setSettings(newSettings));
	}

	const onChangeBool = (key: string) => (val: string) => onChange(key, val === 'yes' ? true : false);
	const onChangeString = (key: string) => (val: string) => onChange(key, val);
	const onChangeNumber = (key: string) => (val: string) => onChange(key, parseInt(val));

	return (
		<StyledSettings>
			{ !isMobile && <h4 className='centered'>Settings</h4> }

			<div className='settingsContainer'>
				<Input type='date' label='Start Date' labelWidth={labelWidth} value={settings.startDate} onChange={onChangeString('startDate')}/>
				<Input type='text' label='Currency Symbol' labelWidth={labelWidth} value={settings.currencySymbol} onChange={onChangeString('currencySymbol')}/>
				<Dropdown label='Show Decimals' labelWidth={labelWidth} value={settings.showDecimals ? 'yes' : 'no'} onChange={onChangeBool('showDecimals')} options={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]}/>
				<Dropdown label='Pay Period' labelWidth={labelWidth} value={settings.payPeriodType} onChange={onChangeString('payPeriodType')} options={[{label: 'Monthly', value: 'monthly'}, {label: '4-Weekly', value: 'fourWeekly'}, {label: '2-Weekly', value: 'twoWeekly'}, {label: 'Weekly', value: 'weekly'}]}/>
				<Input type='number' label='Periods to Display' labelWidth={labelWidth} value={settings.periodsToDisplay} onChange={onChangeNumber('periodsToDisplay')}/>
				<Dropdown label='Swap Summaries' labelWidth={labelWidth} value={settings.swapSummaries ? 'yes' : 'no'} onChange={onChangeBool('swapSummaries')} options={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]}/>
				<Dropdown label='Display Months' labelWidth={labelWidth} value={settings.displayMonths ? 'yes' : 'no'} onChange={onChangeBool('displayMonths')} options={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]}/>
				<Dropdown label='Show Income Total' labelWidth={labelWidth} value={settings.displayIncomeTotal ? 'yes' : 'no'} onChange={onChangeBool('displayIncomeTotal')} options={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]}/>
				<Dropdown label='Show Expense Total' labelWidth={labelWidth} value={settings.displayExpenseTotal ? 'yes' : 'no'} onChange={onChangeBool('displayExpenseTotal')} options={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]}/>
				<Dropdown label='Show Pie Chart' labelWidth={labelWidth} value={settings.showChart ? 'yes' : 'no'} onChange={onChangeBool('showChart')} options={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]}/>
				<Dropdown label='Background Color' labelWidth={labelWidth} value={settings.colourScheme} onChange={onChangeString('colourScheme')} options={[{label: 'Dark', value: 'dark'}, {label: 'Black', value: 'black'}, {label: 'Light', value: 'light'}]}/>
			</div>

			<BackupRestore/>

			<h4>Local Storage</h4>
			<p>Your data is currently taking up {getStoragePercentage()}</p>
			<p>Use this to clear your data from local storage. It cannot be undone, so please make sure you have a backup.</p>
			<ConfirmationContainer onClick={clearData}>
				<Button label="Clear Data" onClick={()=>{}}/>
			</ConfirmationContainer>
			<br/>
		</StyledSettings>
	);
}

export default Settings;

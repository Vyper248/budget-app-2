import { useAppSelector } from "../../redux/hooks";
import { SpendTransaction, TransferTransaction, FundAddition } from "../../redux/transactionsSlice";

import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

import { LABEL_WIDTH } from "./TransactionForm.utils";

export const SpendForm = ({ obj, onComplete } : { obj?: SpendTransaction, onComplete: (obj: Partial<SpendTransaction>)=>void }) => {
	const accounts = useAppSelector(state => state.accounts.accounts);
	const funds = useAppSelector(state => state.funds.funds);
	const categories = useAppSelector(state => state.categories.categories);

	const [description, setDescription] = useState<string>(obj?.description || '');
	const [fund, setFund] = useState<number| undefined>(obj?.fund || undefined);

	const defaultCategory = obj?.category !== undefined ? obj.category : categories.length > 0 ? categories[0].id : undefined;
	const [category, setCategory] = useState<number | undefined>(defaultCategory);

	const defaultAccountObj = accounts.find(obj => obj.defaultAccount === true);
	const defaultAccount = defaultAccountObj ? defaultAccountObj.id : accounts.length > 0 ? accounts[0].id : undefined;
	const [account, setAccount] = useState<number | undefined>(obj?.account || defaultAccount);	

	const onChangeGroup = (value: string) => {
		let numVal = parseInt(value);
		const fund = funds.find(obj => obj.id === numVal);

		if (fund !== undefined) {
			setFund(numVal);
			setCategory(undefined);
		} else {
			setCategory(numVal);
			setFund(undefined);
		}
	}

	const groupValue = fund !== undefined ? fund : category !== undefined ? category : undefined;

	const onSave = () => {
		onComplete({
			description,
			account,
			fund,
			category,
		});
	}

	return (
		<>
			<Input label='Description' labelWidth={LABEL_WIDTH} value={description} onChange={(val) => setDescription(val)}/>
			<Dropdown label='Account' labelWidth={LABEL_WIDTH} value={account} onChange={(val) => setAccount(parseInt(val))} options={accounts.map(obj => ({value: obj.id, label: obj.name}))}/>
			<Dropdown label='Group' labelWidth={LABEL_WIDTH} value={groupValue} onChange={onChangeGroup} options={[
				{ label: 'Categories', value: 0, options: categories.map(obj => ({value: obj.id, label: obj.name}))},
				{ label: 'Funds', value: 0, options: funds.map(obj => ({value: obj.id, label: obj.name}))},
			]}/>
			<div style={{textAlign: 'center'}}>
				<Button label='Save' onClick={onSave}/>
			</div>
		</>
	)
}

export const TransferForm = ({ obj, onComplete } : { obj?: TransferTransaction, onComplete: (obj: Partial<TransferTransaction>)=>void }) => {
	const accounts = useAppSelector(state => state.accounts.accounts);

	const [from, setFrom] = useState<number | undefined>(obj?.from || undefined);	
	const [to, setTo] = useState<number | undefined>(obj?.to || undefined);	

	//if from is changed, reset to, to prevent using the same account twice
	useEffect(() => {
		if (from === to) setTo(undefined);
	}, [from]);

	const onSave = () => {
		onComplete({
			from,
			to
		});
	}

	const toAccounts = accounts.filter(obj => obj.id !== from);

	return (
		<>
			<Dropdown label='From' labelWidth={LABEL_WIDTH} value={from} onChange={(val) => setFrom(parseInt(val))} options={accounts.map(obj => ({value: obj.id, label: obj.name}))}/>
			<Dropdown label='To' labelWidth={LABEL_WIDTH} value={to} onChange={(val) => setTo(parseInt(val))} options={toAccounts.map(obj => ({value: obj.id, label: obj.name}))}/>
			<div style={{textAlign: 'center'}}>
				<Button label='Save' onClick={onSave}/>
			</div>
		</>
	)
}

export const AddFundForm = ({ obj, onComplete } : { obj?: FundAddition, onComplete: (obj: Partial<FundAddition>)=>void }) => {
	const funds = useAppSelector(state => state.funds.funds);

	const [description, setDescription] = useState<string>(obj?.description || '');
	const [fund, setFund] = useState<number | undefined>(obj?.fund || undefined);

	const onSave = () => {
		onComplete({
			description,
			fund,
		});
	}

	return (
		<>
			<Input label='Description' labelWidth={LABEL_WIDTH} value={description} onChange={(val) => setDescription(val)}/>
			<Dropdown label='Fund' labelWidth={LABEL_WIDTH} value={fund} onChange={(val) => setFund(parseInt(val))} options={funds.map(obj => ({value: obj.id, label: obj.name}))}/>
			<div style={{textAlign: 'center'}}>
				<Button label='Save' onClick={onSave}/>
			</div>
		</>
	)
}
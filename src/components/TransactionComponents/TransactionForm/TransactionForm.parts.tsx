import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FaPlus, FaMinus } from "react-icons/fa";

import { removeTransaction } from "@/redux/transactionsSlice";
import { selectAccounts } from "@/redux/accountsSlice";
import { selectCategories } from "@/redux/categoriesSlice";
import { selectFunds } from "@/redux/fundsSlice";

import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button/Button";
import ConfirmationContainer from "@/components/ConfirmationContainer/ConfirmationContainer";
import { useEffect, useState } from "react";

import type { SpendTransaction, TransferTransaction, FundTransaction } from "@/redux/transactionsSlice";

import { LABEL_WIDTH } from "./TransactionForm.utils";

const FormButtons = ({id, onSave}: {id?: number, onSave: ()=>void}) => {
	const dispatch = useAppDispatch();

	const onClickRemove = () => {
		if (id !== undefined) dispatch(removeTransaction(id));
	}

	return (
		<div style={{textAlign: 'center', display: 'flex', justifyContent: id !== undefined ? 'space-between' : 'space-around'}}>
			<Button label='Save' onClick={onSave} width='134px'/>
			{ id !== undefined && <ConfirmationContainer onClick={onClickRemove}>
					<Button label='Remove' onClick={()=>{}} width='134px'/>
				</ConfirmationContainer> }
		</div>
	);
}

export const SpendForm = ({ obj, onComplete } : { obj?: SpendTransaction, onComplete: (obj: Partial<SpendTransaction>)=>void }) => {
	const accounts = useAppSelector(selectAccounts);
	const funds = useAppSelector(selectFunds);
	const categories = useAppSelector(selectCategories);
	const currentPage = useAppSelector(state => state.general.currentPage);

	const [description, setDescription] = useState<string>(obj?.description || '');
	const [fund, setFund] = useState<number| undefined>(obj?.fund || undefined);

	let defaultCategory = obj?.category !== undefined ? obj.category : categories.length > 0 ? categories[0].id : undefined;
	
	const defaultAccountObj = accounts.find(obj => obj.defaultAccount === true);
	let defaultAccount = defaultAccountObj ? defaultAccountObj.id : accounts.length > 0 ? accounts[0].id : undefined;
	
	//If user has an account selected, then use that as the default
	const selectedItem = useAppSelector(state => state.general.selectedItem);
	if (selectedItem && currentPage === 'Accounts') defaultAccount = selectedItem;
	if (selectedItem && currentPage === 'Categories') defaultCategory = selectedItem;
	
	const [category, setCategory] = useState<number | undefined>(defaultCategory);
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

	const incomeCategories = categories.filter(cat => cat.type === 'income');
	const expenseCategories = categories.filter(cat => cat.type === 'expense');

	return (
		<>
			<Input label='Description' type='textarea' labelWidth={LABEL_WIDTH} value={description} onChange={(val) => setDescription(val)}/>
			<Dropdown label='Account' labelWidth={LABEL_WIDTH} value={account} onChange={(val) => setAccount(parseInt(val))} options={accounts.map(obj => ({value: obj.id, label: obj.name}))}/>
			<Dropdown label='Group' labelWidth={LABEL_WIDTH} value={groupValue} onChange={onChangeGroup} options={[
				{ label: 'Income Categories', value: 0, options: incomeCategories.map(obj => ({value: obj.id, label: obj.name}))},
				{ label: 'Expense Categories', value: 0, options: expenseCategories.map(obj => ({value: obj.id, label: obj.name}))},
				{ label: 'Funds', value: 0, options: funds.map(obj => ({value: obj.id, label: obj.name}))},
			]}/>
			<FormButtons id={obj?.id} onSave={onSave}/>
		</>
	)
}

export const TransferForm = ({ obj, onComplete } : { obj?: TransferTransaction, onComplete: (obj: Partial<TransferTransaction>)=>void }) => {
	const accounts = useAppSelector(selectAccounts);
	const currentPage = useAppSelector(state => state.general.currentPage);

	//If user has an account selected, then use that as the default for 'from'
	let defaultAccount = undefined;
	const selectedItem = useAppSelector(state => state.general.selectedItem);
	if (selectedItem && currentPage === 'Accounts') defaultAccount = selectedItem;

	const [from, setFrom] = useState<number | undefined>(obj?.from || defaultAccount);	
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
			<FormButtons id={obj?.id} onSave={onSave}/>
		</>
	)
}

export const AddFundForm = ({ obj, onComplete } : { obj?: FundTransaction, onComplete: (obj: Partial<FundTransaction>)=>void }) => {
	const funds = useAppSelector(selectFunds);
	const currentPage = useAppSelector(state => state.general.currentPage);

	//If user has an account selected, then use that as the default for 'from'
	let defaultFund = undefined;
	const selectedItem = useAppSelector(state => state.general.selectedItem);
	if (selectedItem && currentPage === 'Funds') defaultFund = selectedItem;

	const [description, setDescription] = useState<string>(obj?.description || '');
	const [fund, setFund] = useState<number | undefined>(obj?.fund || defaultFund);

	const onSave = () => {
		onComplete({
			description,
			fund,
		});
	}

	return (
		<>
			<Input label='Description' type='textarea' labelWidth={LABEL_WIDTH} value={description} onChange={(val) => setDescription(val)}/>
			<Dropdown label='Fund' labelWidth={LABEL_WIDTH} value={fund} onChange={(val) => setFund(parseInt(val))} options={funds.map(obj => ({value: obj.id, label: obj.name}))}/>
			<FormButtons id={obj?.id} onSave={onSave}/>
		</>
	)
}
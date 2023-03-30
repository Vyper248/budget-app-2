import StyledTransactionForm from "./TransactionForm.style";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Transaction, FundAddition, addTransaction, addFundAddition, setAddingTransaction, editTransaction, editFundAddition } from "../../redux/transactionsSlice";
import { today } from "../../utils/date.utils";
import { validateTransaction, LABEL_WIDTH } from "./TransactionForm.utils";

import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";

import { AddFundForm, SpendForm, TransferForm } from "./TransactionForm.parts";

type TransactionFormProps = {
	obj?: Transaction | FundAddition;
}

const TransactionForm = ({obj}: TransactionFormProps) => {
	const dispatch = useAppDispatch();
	const accounts = useAppSelector(state => state.accounts.accounts);

	const [error, setError] = useState('');

	const id = obj?.id || 0;
	const [type, setType] = useState<string>(obj?.type || "spend");
	const [amount, setAmount] = useState<number>(obj?.amount || 0);
	const [date, setDate] = useState(obj?.date || today());

	const editMode = obj === undefined ? false : true;

	const typeOptions = [
		{value: 'spend', label: 'Spend/Receive'},
		{value: 'fundAddition', label: 'Add to Fund'},
	];

	if (accounts.length > 1) typeOptions.push({value: 'transfer', label: 'Transfer'});

	const onChangeType = (value: string) => {
		setType(value);
	}

	const onChangeAmount = (val: string) => {
		setAmount(parseFloat(val));
	}

	const onChangeDate = (val: string | number) => {
		if (typeof val === 'string') setDate(val);
	}

	const onCompleteTransaction = (obj: Partial<Transaction>) => {
		let transaction = {id, type, amount: Number(amount), date, ...obj} as Transaction;
		let validCheck = validateTransaction(transaction);
		if (validCheck.valid) {
			if (editMode) dispatch(editTransaction(transaction));
			else dispatch(addTransaction(transaction));
			dispatch(setAddingTransaction(false));
		} else {
			setError(validCheck.error);
		}
	}

	const onCompleteAddToFund = (obj: Partial<FundAddition>) => {
		let fundAddition = {id, type, amount: Number(amount), date, ...obj} as FundAddition;
		let validCheck = validateTransaction(fundAddition);
		if (validCheck.valid) {
			if (editMode) dispatch(editFundAddition(fundAddition));
			else dispatch(addFundAddition(fundAddition));
			dispatch(setAddingTransaction(false));
		} else {
			setError(validCheck.error);
		}
	}

	return (
		<StyledTransactionForm>
			{ editMode ? null : <Dropdown label='Type' labelWidth={LABEL_WIDTH} value={type} onChange={onChangeType} options={typeOptions}/> }
			<Input label='Date' type='date' labelWidth={LABEL_WIDTH} value={date} onChange={onChangeDate}/>
			<Input label='Amount' type='number' labelWidth={LABEL_WIDTH} value={amount} onChange={onChangeAmount}/>
			{ type === 'spend' ? <SpendForm obj={obj !== undefined && obj.type ==='spend' ? obj : undefined} onComplete={onCompleteTransaction}/> : null }
			{ type === 'transfer' ? <TransferForm obj={obj !== undefined && obj.type ==='transfer' ? obj : undefined} onComplete={onCompleteTransaction}/> : null }
			{ type === 'fundAddition' ? <AddFundForm obj={obj !== undefined && obj.type ==='fundAddition' ? obj : undefined} onComplete={onCompleteAddToFund}/> : null }
			{ error.length > 0 ? <figure style={{color: 'var(--text-color-warning)', textAlign: 'center'}}>Error: {error}</figure> : null }
		</StyledTransactionForm>
	);
}

export default TransactionForm;

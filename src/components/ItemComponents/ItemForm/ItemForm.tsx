import { useState } from "react";
import StyledItemForm from "./ItemForm.style";

import { useAppDispatch } from "@/redux/hooks";
import { editAccount, addAccount } from "@/redux/accountsSlice";
import { editCategory, addCategory } from "@/redux/categoriesSlice";
import { editFund, addFund } from "@/redux/fundsSlice";

import Input from "@/components/Input/Input";
import Error from "@/components/styled/Error";
import ToggleInput from "@/components/ToggleInput/ToggleInput";
import { AccountsForm, CategoryForm, FundForm } from "./ItemForm.parts";

import type { Category } from "@/redux/categoriesSlice";
import type { Fund } from "@/redux/fundsSlice";
import type { Account } from "@/redux/accountsSlice";
import type { Item, ItemType } from "@/redux/generalSlice";

type ItemFormProps = {
	onFinish: ()=>void;
	item?: Item;
	type: ItemType;
}

const ItemForm = ({item, type, onFinish}: ItemFormProps) => {
	const dispatch = useAppDispatch();
	const [name, setName] = useState(item?.name || '');
	const [description, setDescription] = useState(item?.description || '');
	const [hidden, setHidden] = useState(item?.hidden || false);
	const [startingBalance, setStartingBalance] = useState(item?.startingBalance || 0);
	const [error, setError] = useState('');

	const onChangeName = (value: string) => setName(value);
	const onChangeDescription = (value: string) => setDescription(value);
	const onChangeHidden = (value: boolean) => setHidden(value);
	const onChangeStartingBalance = (value: string) => setStartingBalance(parseFloat(value));

	const onComplete = (partialObj: Partial<Item>) => {
		if (name.length === 0) {
			setError('Must have a name');
			return;
		}

		//correct to 0 if user clears input
		let startBalance = startingBalance || 0;

		let fullObj = {};
		if (item !== undefined) fullObj = {...item, name, description, hidden, startingBalance: startBalance, ...partialObj};
		else fullObj = {name, description, hidden, startingBalance, ...partialObj}

		if (item !== undefined) {
			if (type === 'account') dispatch(editAccount(fullObj as Account));
			else if (type === 'category') dispatch(editCategory(fullObj as Category));
			else if (type === 'fund') dispatch(editFund(fullObj as Fund));
		} else {
			if (type === 'account') dispatch(addAccount(fullObj as Account));
			else if (type === 'category') dispatch(addCategory(fullObj as Category));
			else if (type === 'fund') dispatch(addFund(fullObj as Fund));
		}

		onFinish();
	}

	const labelWidth = '140px';

	return (
		<StyledItemForm>
			<Input labelWidth={labelWidth} label='Name' value={name} onChange={onChangeName}/>
			<Input labelWidth={labelWidth} label='Description' value={description} onChange={onChangeDescription}/>
			<Input type='number' labelWidth={labelWidth} label='Starting Balance' value={startingBalance} onChange={onChangeStartingBalance}/>
			<ToggleInput labelWidth={labelWidth} label='Hidden' value={hidden} onChange={onChangeHidden}/>
			{ type === 'account' && <AccountsForm item={item as Account} onComplete={onComplete}/> }
			{ type === 'category' && <CategoryForm item={item as Category} onComplete={onComplete}/> }
			{ type === 'fund' && <FundForm item={item as Fund} onComplete={onComplete}/> }
			{ error.length > 0 && <Error>Error: {error}</Error> }
		</StyledItemForm>
	);
}

export default ItemForm;

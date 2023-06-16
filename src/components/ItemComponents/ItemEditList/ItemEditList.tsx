import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Account, reorderAccounts } from "@/redux/accountsSlice";
import { Category, reorderCategories } from "@/redux/categoriesSlice";
import { Fund, reorderFunds } from "@/redux/fundsSlice";
import { selectTransactions } from "@/redux/transactionsSlice";
import { getInUseObj, mapArrayToMoveableArray } from "./ItemEditList.utils";

import ItemDisplayObj from '@/components/ItemComponents/ItemDisplayObj/ItemDisplayObj';

import type { Item, ItemType } from "@/redux/generalSlice";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import ItemForm from "../ItemForm/ItemForm";

type ItemEditListProps = {
	array: Item[];
	type: ItemType;
	onFinish: ()=>void;
}

type MoveableItem = {
	id: number;
	item: Item;
	inUse: boolean;
}

const compareArrays = (arr1: Item[], arr2: Item[]) => {
	let arrString1 = arr1.map(item => item.id).join('-');
	let arrString2 = arr2.map(item => item.id).join('-');

	if (arrString1 !== arrString2) return false;

	return true;
}

const ItemEditList = ({array, type, onFinish}: ItemEditListProps) => {
	const dispatch = useAppDispatch();

	const [addingNew, setAddingNew] = useState(false);
	const [editObj, setEditObj] = useState<Item | undefined>(undefined);

	const transactions = useAppSelector(selectTransactions);
	const currentPage = useAppSelector(state => state.general.currentPage);
	const inUseObj = getInUseObj(transactions);

	const [moveableArray, setMoveableArray] = useState(mapArrayToMoveableArray(array, inUseObj));

	//if transactions change while viewing this list, need to update inUse variable (would only apply to adding a transaction, so only need to check length)
	useEffect(() => {
		setMoveableArray(mapArrayToMoveableArray(array, inUseObj));
	}, [transactions.length, array]);

	const setOrder = (newArr: MoveableItem[]) => {
		let itemArray = newArr.map(itemObj => itemObj.item);
		if (compareArrays(itemArray, array)) return;

		setMoveableArray(mapArrayToMoveableArray(itemArray, inUseObj));

		if (type === 'account') dispatch(reorderAccounts(itemArray as Account[]));
		else if (type === 'category') dispatch(reorderCategories(itemArray as Category[]));
		else if (type === 'fund') dispatch(reorderFunds(itemArray as Fund[]));
	}

	const onClickNew = () => {
		setAddingNew(true);
	}

	const onFinishAdding = () => {
		setAddingNew(false);
	}

	const onClickEdit = (item: Item) => {
		setEditObj(item);
	}

	const onFinishEdit = () => {
		setEditObj(undefined);
	}

	const addX = (window.innerWidth / 2) - 150;
	const addY = (window.innerHeight / 2) - 150;

	return (
		<div>
			<h3 className='centered'>Edit {currentPage}</h3>
			<div className='centered' style={{margin: '5px'}}>
				<Button label='Add New' onClick={onClickNew}/>&nbsp;
				{ array.length > 0 && <Button label='Finish Editing' onClick={onFinish}/> }
			</div>
			
			<ReactSortable list={moveableArray} setList={setOrder} handle=".drag-handle">
				{
					moveableArray.map(item => {
						return <ItemDisplayObj key={item.id} itemObj={item.item} type={type} inUse={item.inUse} onEdit={onClickEdit}/>
					})
				}
			</ReactSortable>

			{ addingNew && (
				<Modal heading='New' onClickClose={onFinishAdding} x={addX} y={addY}>
					<ItemForm type={type} onFinish={onFinishAdding}/>
				</Modal> ) }

			{ editObj !== undefined && (
				<Modal heading={`Edit ${editObj.name}`} onClickClose={onFinishEdit} x={addX} y={addY}>
					<ItemForm key={editObj.id} type={type} item={editObj} onFinish={onFinishEdit}/>
				</Modal> ) }

		</div>
	);
}

export default ItemEditList;

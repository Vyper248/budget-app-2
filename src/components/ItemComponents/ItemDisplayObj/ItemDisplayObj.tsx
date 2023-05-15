import StyledItemDisplayObj from "./ItemDisplayObj.style";

import { parseCurrency } from "@/components/Transaction/Transaction.utils";
import { useAppDispatch } from "@/redux/hooks";
import { removeAccount } from "@/redux/accountsSlice";
import { removeCategory } from "@/redux/categoriesSlice";
import { removeFund } from "@/redux/fundsSlice";

import { LabelledText, ItemTemplate } from "./ItemDisplayObj.parts";

import type { Item, ItemType } from "@/redux/generalSlice";
import type { Category } from "@/redux/categoriesSlice";
import type { Account } from "@/redux/accountsSlice";
import type { Fund } from "@/redux/fundsSlice";

type ItemDisplayObjProps = {
	itemObj: Item;
	inUse?: boolean;
	type: ItemType;
	onEdit: (item: Item)=>void;
}

const ItemDisplayObj = ({itemObj, inUse=false, type, onEdit}: ItemDisplayObjProps) => {
	const dispatch = useAppDispatch();

	const onClickDelete = () => {
		switch (type) {
			case 'account': dispatch(removeAccount(itemObj.id)); break;
			case 'category': dispatch(removeCategory(itemObj.id)); break;
			case 'fund': dispatch(removeFund(itemObj.id)); break;
		}
	}

	const onClickEdit = () => {
		onEdit(itemObj);
	}

	if (type === 'account') {
		itemObj = itemObj as Account;
		return (
			<>
				<StyledItemDisplayObj>
					<ItemTemplate name={itemObj.name} description={itemObj.description} inUse={inUse} onClickEdit={onClickEdit} onClickDelete={onClickDelete}/>
					<LabelledText label='Interest Rate' value={itemObj.interestRate+'%'}/>
					<LabelledText label='Starting Balance' value={parseCurrency(itemObj.startingBalance)}/>
					<LabelledText label='Extra Charges' value={parseCurrency(itemObj.extraCharges)}/>
					<LabelledText label='Default Account' value={itemObj.defaultAccount ? 'Yes' : 'No'}/>
					<LabelledText label='Hidden' value={itemObj.hidden ? 'Yes' : 'No'}/>
				</StyledItemDisplayObj>
			</>
		);	
	} else if (type === 'category') {
		itemObj = itemObj as Category;
		return (
			<>
				<StyledItemDisplayObj>
					<ItemTemplate name={itemObj.name} description={itemObj.description} inUse={inUse} onClickEdit={onClickEdit} onClickDelete={onClickDelete}/>
					<LabelledText label='Type' value={itemObj.type}/>
					<LabelledText label='Starting Balance' value={parseCurrency(itemObj.startingBalance)}/>
					<LabelledText label='Hidden' value={itemObj.hidden ? 'Yes' : 'No'}/>
				</StyledItemDisplayObj>
			</>
		);
	} else if (type === 'fund') {
		itemObj = itemObj as Fund;
		return (
			<>
				<StyledItemDisplayObj>
					<ItemTemplate name={itemObj.name} description={itemObj.description} inUse={inUse} onClickEdit={onClickEdit} onClickDelete={onClickDelete}/>
					<LabelledText label='Target' value={parseCurrency(itemObj.targetAmount)}/>
					<LabelledText label='Starting Balance' value={parseCurrency(itemObj.startingBalance)}/>
					<LabelledText label='Hidden' value={itemObj.hidden ? 'Yes' : 'No'}/>
				</StyledItemDisplayObj>
			</>
		);
	}

	//Should never be displayed
	return (<div>Error: Type in Invalid</div>);
}

export default ItemDisplayObj;

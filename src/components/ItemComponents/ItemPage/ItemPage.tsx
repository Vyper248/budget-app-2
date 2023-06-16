import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { Transaction, selectTransactions } from "@/redux/transactionsSlice";

import { organiseTransactions, addRunningBalances, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions, parseCurrency } from "@/utils/transactions.utils";
import { useItemObj } from "@/utils/customHooks.utils";

import ItemPageLayout from "@/components/styled/ItemPageLayout";
import ItemList from "@/components/ItemComponents/ItemList/ItemList";
import ItemPageTransactionContainer from "@/components/ItemComponents/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "@/components/TransactionComponents/TransactionGroups/TransactionGroups";
import ItemEditList from "@/components/ItemComponents/ItemEditList/ItemEditList";

import type { Item, ItemType } from "@/redux/generalSlice";
import { Category } from "@/redux/categoriesSlice";

type ItemPageProps = {
    heading: string;
    type: ItemType;
    items: Item[];
    trFilter: (tr: Transaction) => boolean;
    totalTextLabel: string;
    addRunningBalance?: boolean;
}

const ItemPage = ({ heading, items, type, trFilter, totalTextLabel, addRunningBalance=false }: ItemPageProps) => {
	const [search, setSearch] = useState('');
	const [editMode, setEditMode] = useState(items.length > 0 ? false : true);

	const transactions = useAppSelector(selectTransactions);
	const selectedItem = useAppSelector(state => state.general.selectedItem);
	if (editMode && selectedItem !== 0) setEditMode(false);

	const [itemObj, onSelectItem] = useItemObj(selectedItem, items) as [Item | undefined, (val: number) => void];

	//filter transactions based on search
	const searchedTransactions = getSearchedTransactions(transactions, search);

	//filter transactions for accounts and based on search
	const itemTransactions = searchedTransactions.filter(trFilter);

	//Search for accounts with filteredTransactions and add number to name for displaying
	const searchedItems = getItemsWithSearchValue(items, search, searchedTransactions, type);
	
	const onChangeSearch = (val: string) => {
		setSearch(val);
	}

	const onClickEdit = () => {
		setEditMode(true);
		onSelectItem(0);
	}

	//Dont show the starting balance if user is searching
	const startingBalance = search.length > 0 ? 0 : (itemObj?.startingBalance || 0);
	
	//get total
	const total = getTransactionTotal(itemTransactions, selectedItem) + startingBalance; 
	let totalText = `${totalTextLabel}: ${parseCurrency(total)}`;

    //if it's an expense category, then take the negative value
    if (itemObj) {
        let obj = itemObj as Category;
        if (obj.type === 'expense') {
            totalText = `${totalTextLabel}: ${parseCurrency(-total)}`;
        }
    }

	//organise transactions and add running balances
	let organised = organiseTransactions(itemTransactions);
	if (addRunningBalance) organised = addRunningBalances(organised, selectedItem, startingBalance);

    const onFinishEditing = () => {
        const firstItem = searchedItems.length > 0 ? searchedItems[0].id : 0;
        onSelectItem(firstItem);
        if (firstItem !== 0) setEditMode(false);        
    }

	return (
		<ItemPageLayout>
			<ItemList heading={heading} items={searchedItems} selectedItemId={selectedItem} onSelect={onSelectItem} onEdit={onClickEdit}/>
			{ editMode && <div><ItemEditList array={items} type={type} onFinish={onFinishEditing}/></div> }
			{ itemObj !== undefined && !editMode && (
				<ItemPageTransactionContainer heading={itemObj.name} startingBalance={startingBalance} search={search} totalText={totalText} onChangeSearch={onChangeSearch}>
					<TransactionGroups monthlyTransactions={organised}/>
				</ItemPageTransactionContainer>
			)}
			{ !editMode && itemObj === undefined && <div></div> }
		</ItemPageLayout>
	);
}

export default ItemPage;

import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { Category, selectCategories } from "@/redux/categoriesSlice";
import { selectTransactions } from "@/redux/transactionsSlice";

import { organiseTransactions, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions } from "@/utils/transactions.utils";
import { parseCurrency } from "@/components/Transaction/Transaction.utils";
import { useItemObj } from "@/utils/customHooks.utils";

import ItemPageLayout from "@/components/styled/ItemPageLayout";
import ItemList from "@/components/ItemComponents/ItemList/ItemList";
import ItemPageTransactionContainer from "@/components/ItemComponents/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "@/components/TransactionGroups/TransactionGroups";

import type { SpendTransaction } from "@/redux/transactionsSlice";
import ItemEditList from "@/components/ItemComponents/ItemEditList/ItemEditList";

const Categories = () => {
    const [search, setSearch] = useState('');
	const [editMode, setEditMode] = useState(false);

    const categories = useAppSelector(selectCategories);
    const transactions = useAppSelector(selectTransactions);
    const selectedItem = useAppSelector(state => state.general.selectedItem);
    if (editMode && selectedItem !== 0) setEditMode(false);
    
    const [categoryObj, onSelectItem] = useItemObj(selectedItem, categories) as [Category | undefined, (val: number) => void];

    //filter transactions based on search
    const searchedTransactions = getSearchedTransactions(transactions, search);

    //filter transactions for selected category
	const categoryTransactions = searchedTransactions.filter(tr => {
		if (tr.type === 'spend' && tr.category === selectedItem) return true;
		return false;
	}) as SpendTransaction[];

	//Search for categories with filteredTransactions and add number to name for displaying
    const searchedCategories = getItemsWithSearchValue(categories, search, searchedTransactions, 'category');
    
    const onChangeSearch = (val: string) => {
		setSearch(val);
	}

    const onClickEdit = () => {
		setEditMode(true);
		onSelectItem(0);
	}

    //get total
	const total = getTransactionTotal(categoryTransactions, selectedItem) + (categoryObj?.startingBalance || 0);
    let totalText = `Total Earned: ${parseCurrency(total)}`;
    if (categoryObj && categoryObj.type === 'expense') {
        totalText = `Total Spent: ${parseCurrency(-total)}`;
    }

    //organise transactions and add running balances
	const organised = organiseTransactions(categoryTransactions);

    return (
        <ItemPageLayout>
            <ItemList heading='Categories' items={searchedCategories} onSelect={onSelectItem} selectedItemId={selectedItem} onEdit={onClickEdit}/>
            { editMode && <div><ItemEditList array={categories} type='category'/></div> }
            { categoryObj !== undefined && !editMode && (
                <ItemPageTransactionContainer heading={categoryObj.name} startingBalance={categoryObj.startingBalance} search={search} onChangeSearch={onChangeSearch} totalText={totalText}>
                    <TransactionGroups monthlyTransactions={organised}/>
                </ItemPageTransactionContainer>
            ) }
            { !editMode && categoryObj === undefined && <div></div> }
        </ItemPageLayout>
    );
}

export default Categories;
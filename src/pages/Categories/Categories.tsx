import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectCategories } from "../../redux/categoriesSlice";
import { selectTransactions } from "../../redux/transactionsSlice";
import { setSelectedItem } from "../../redux/generalSlice";

import { organiseTransactions, addRunningBalances, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions } from "../../utils/transactions.utils";
import { parseCurrency } from "../../components/Transaction/Transaction.utils";

import ItemPageLayout from "../../components/styled/ItemPageLayout";
import ItemList from "../../components/ItemList/ItemList";
import ItemPageTransactionContainer from "../../components/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "../../components/TransactionGroups/TransactionGroups";

import type { SpendTransaction } from "../../redux/transactionsSlice";

const Categories = () => {
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');

    const categories = useAppSelector(selectCategories);
    const transactions = useAppSelector(selectTransactions);
    const selectedItem = useAppSelector(state => state.general.selectedItem);

    const categoryObj = categories.find(obj => obj.id === selectedItem);

    useEffect(() => {
		//make sure the first item is selected
		if (selectedItem === 0 && categories.length > 0) {
			dispatch(setSelectedItem(categories[0].id));
		}
	}, [selectedItem, categories]);

    const onSelectCategory = (id: number) => {
        dispatch(setSelectedItem(id));
    }

    //if no category selected, then just display the category list
	if (categoryObj === undefined) {
		return (
			<ItemPageLayout>
				<ItemList heading='Categories' items={categories} selectedItemId={selectedItem} onSelect={onSelectCategory}/>
				<div></div>
			</ItemPageLayout>
		);
	}

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

    //get total
	let total = getTransactionTotal(categoryTransactions, selectedItem); 
    let totalText = `Total Earned: ${parseCurrency(total)}`;
    if (categoryObj.type === 'expense') {
        totalText = `Total Spent: ${parseCurrency(-total)}`;
    }

    //organise transactions and add running balances
	let organised = organiseTransactions(categoryTransactions);
	let runningBalanceArray = addRunningBalances(organised, selectedItem);

    return (
        <ItemPageLayout>
            <ItemList heading='Categories' items={searchedCategories} onSelect={onSelectCategory} selectedItemId={selectedItem}/>
            <ItemPageTransactionContainer heading='Categories' startingBalance={categoryObj.startingBalance} search={search} onChangeSearch={onChangeSearch} totalText={totalText}>
                <TransactionGroups monthlyTransactions={runningBalanceArray}/>
            </ItemPageTransactionContainer>
        </ItemPageLayout>
    );
}

export default Categories;
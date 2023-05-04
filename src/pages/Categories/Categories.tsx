import { useState } from "react";

import { useAppSelector } from "../../redux/hooks";
import { Category, selectCategories } from "../../redux/categoriesSlice";
import { selectTransactions } from "../../redux/transactionsSlice";

import { organiseTransactions, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions } from "../../utils/transactions.utils";
import { parseCurrency } from "../../components/Transaction/Transaction.utils";
import { useItemObj } from "../../utils/customHooks.utils";

import ItemPageLayout from "../../components/styled/ItemPageLayout";
import ItemList from "../../components/ItemList/ItemList";
import ItemPageTransactionContainer from "../../components/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "../../components/TransactionGroups/TransactionGroups";

import type { SpendTransaction } from "../../redux/transactionsSlice";

const Categories = () => {
    const [search, setSearch] = useState('');

    const categories = useAppSelector(selectCategories);
    const transactions = useAppSelector(selectTransactions);
    const selectedItem = useAppSelector(state => state.general.selectedItem);

    const [categoryObj, onSelectItem] = useItemObj(selectedItem, categories) as [Category, (val: number) => void];

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
    if (categoryObj && categoryObj.type === 'expense') {
        totalText = `Total Spent: ${parseCurrency(-total)}`;
    }

    //organise transactions and add running balances
	let organised = organiseTransactions(categoryTransactions);

    return (
        <ItemPageLayout>
            <ItemList heading='Categories' items={searchedCategories} onSelect={onSelectItem} selectedItemId={selectedItem}/>
            { categoryObj === undefined ? <div></div> : (
                <ItemPageTransactionContainer heading='Categories' startingBalance={categoryObj.startingBalance} search={search} onChangeSearch={onChangeSearch} totalText={totalText}>
                    <TransactionGroups monthlyTransactions={organised}/>
                </ItemPageTransactionContainer>
            ) }
        </ItemPageLayout>
    );
}

export default Categories;
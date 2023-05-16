import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { Fund, selectFunds } from "@/redux/fundsSlice";
import { FundTransaction, selectTransactions } from "@/redux/transactionsSlice";

import { organiseTransactions, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions, parseCurrency } from "@/utils/transactions.utils";
import { useItemObj } from "@/utils/customHooks.utils";

import ItemPageLayout from "@/components/styled/ItemPageLayout";
import ItemList from "@/components/ItemComponents/ItemList/ItemList";
import ItemPageTransactionContainer from "@/components/ItemComponents/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "@/components/TransactionComponents/TransactionGroups/TransactionGroups";

import type { SpendTransaction } from "@/redux/transactionsSlice";
import ItemEditList from "@/components/ItemComponents/ItemEditList/ItemEditList";

const Funds = () => {
    const [search, setSearch] = useState('');
	const [editMode, setEditMode] = useState(false);

    const funds = useAppSelector(selectFunds);
    const transactions = useAppSelector(selectTransactions);
    const selectedItem = useAppSelector(state => state.general.selectedItem);
    if (editMode && selectedItem !== 0) setEditMode(false);

    const [fundObj, onSelectItem] = useItemObj(selectedItem, funds) as [Fund | undefined, (val: number) => void];

    //filter transactions based on search
    const searchedTransactions = getSearchedTransactions(transactions, search);

    //filter transactions for selected fund
	const fundTransactions = searchedTransactions.filter(tr => {
		if (tr.type === 'spend' && tr.fund === selectedItem) return true;
		if (tr.type === 'fundAddition' && tr.fund === selectedItem) return true;
		return false;
	}) as SpendTransaction[] | FundTransaction[];

	//Search for funds with filteredTransactions and add number to name for displaying
    const searchedFunds = getItemsWithSearchValue(funds, search, searchedTransactions, 'fund');
    
    const onChangeSearch = (val: string) => {
		setSearch(val);
	}

    const onClickEdit = () => {
		setEditMode(true);
		onSelectItem(0);
	}

    //get total
	const total = getTransactionTotal(fundTransactions, selectedItem) + (fundObj?.startingBalance || 0);
    const totalText = `Total Saved: ${parseCurrency(total)}`;

    //organise transactions and add running balances
	const organised = organiseTransactions(fundTransactions);

    return (
        <ItemPageLayout>
            <ItemList heading='Funds' items={searchedFunds} onSelect={onSelectItem} selectedItemId={selectedItem} onEdit={onClickEdit}/>
            { editMode && <div><ItemEditList array={funds} type='fund'/></div> }
            { fundObj !== undefined && !editMode && (
                <ItemPageTransactionContainer heading={fundObj.name} startingBalance={fundObj.startingBalance} search={search} onChangeSearch={onChangeSearch} totalText={totalText}>
                    <TransactionGroups monthlyTransactions={organised}/>
                </ItemPageTransactionContainer>
            ) }
            { !editMode && fundObj === undefined && <div></div> }
        </ItemPageLayout>
    );
}

export default Funds;
import { useState } from "react";

import { useAppSelector } from "../../redux/hooks";
import { Fund, selectFunds } from "../../redux/fundsSlice";
import { FundTransaction, selectTransactions } from "../../redux/transactionsSlice";

import { organiseTransactions, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions } from "../../utils/transactions.utils";
import { parseCurrency } from "../../components/Transaction/Transaction.utils";
import { useItemObj } from "../../utils/customHooks.utils";

import ItemPageLayout from "../../components/styled/ItemPageLayout";
import ItemList from "../../components/ItemList/ItemList";
import ItemPageTransactionContainer from "../../components/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "../../components/TransactionGroups/TransactionGroups";

import type { SpendTransaction } from "../../redux/transactionsSlice";

const Funds = () => {
    const [search, setSearch] = useState('');

    const funds = useAppSelector(selectFunds);
    const transactions = useAppSelector(selectTransactions);
    const selectedItem = useAppSelector(state => state.general.selectedItem);

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

    //get total
	const total = getTransactionTotal(fundTransactions, selectedItem); 
    const totalText = `Total Saved: ${parseCurrency(total)}`;

    //organise transactions and add running balances
	const organised = organiseTransactions(fundTransactions);

    return (
        <ItemPageLayout>
            <ItemList heading='Funds' items={searchedFunds} onSelect={onSelectItem} selectedItemId={selectedItem}/>
            { fundObj === undefined ? <div></div> : (
                <ItemPageTransactionContainer heading={fundObj.name} startingBalance={fundObj.startingBalance} search={search} onChangeSearch={onChangeSearch} totalText={totalText}>
                    <TransactionGroups monthlyTransactions={organised}/>
                </ItemPageTransactionContainer>
            ) }
        </ItemPageLayout>
    );
}

export default Funds;
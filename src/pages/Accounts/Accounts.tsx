import { useState } from "react";

import { useAppSelector } from "../../redux/hooks";
import { Account, selectAccounts } from "../../redux/accountsSlice";
import { selectTransactions } from "../../redux/transactionsSlice";

import { organiseTransactions, addRunningBalances, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions } from "../../utils/transactions.utils";
import { parseCurrency } from "../../components/Transaction/Transaction.utils";
import { useItemObj } from "../../utils/customHooks.utils";

import ItemPageLayout from "../../components/styled/ItemPageLayout";
import ItemList from "../../components/ItemList/ItemList";
import ItemPageTransactionContainer from "../../components/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "../../components/TransactionGroups/TransactionGroups";

import type { SpendTransaction, TransferTransaction } from "../../redux/transactionsSlice";

const Accounts = () => {
	const [search, setSearch] = useState('');

	const accounts = useAppSelector(selectAccounts);
	const transactions = useAppSelector(selectTransactions);
	const selectedItem = useAppSelector(state => state.general.selectedItem);

	const [accountObj, onSelectItem] = useItemObj(selectedItem, accounts) as [Account | undefined, (val: number) => void];;

	//filter transactions based on search
	const searchedTransactions = getSearchedTransactions(transactions, search);

	//filter transactions for accounts and based on search
	const accountTransactions = searchedTransactions.filter(tr => {
		if (tr.type === 'spend' && tr.account === selectedItem) return true;
		if (tr.type === 'transfer' && (tr.from === selectedItem || tr.to === selectedItem)) return true;
		return false;
	}) as SpendTransaction[] & TransferTransaction[];

	//Search for accounts with filteredTransactions and add number to name for displaying
	const searchedAccounts = getItemsWithSearchValue(accounts, search, searchedTransactions, 'account');
	
	const onChangeSearch = (val: string) => {
		setSearch(val);
	}
	
	//get total
	const total = getTransactionTotal(accountTransactions, selectedItem); 
	const totalText = `Balance: ${parseCurrency(total)}`;

	//organise transactions and add running balances
	const organised = organiseTransactions(accountTransactions);
	const runningBalanceArray = addRunningBalances(organised, selectedItem);

	return (
		<ItemPageLayout>
			<ItemList heading='Accounts' items={searchedAccounts} selectedItemId={selectedItem} onSelect={onSelectItem}/>
			{ accountObj === undefined ? <div></div> : (
				<ItemPageTransactionContainer heading={accountObj.name} startingBalance={accountObj.startingBalance} search={search} totalText={totalText} onChangeSearch={onChangeSearch}>
					<TransactionGroups monthlyTransactions={runningBalanceArray}/>
				</ItemPageTransactionContainer>
			) }
		</ItemPageLayout>
	);
}

export default Accounts;

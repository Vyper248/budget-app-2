import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { selectAccounts } from "@/redux/accountsSlice";
import { selectTransactions } from "@/redux/transactionsSlice";

import { organiseTransactions, addRunningBalances, getTransactionTotal, getItemsWithSearchValue, getSearchedTransactions } from "@/utils/transactions.utils";
import { parseCurrency } from "@/components/TransactionComponents/Transaction/Transaction.utils";
import { useItemObj } from "@/utils/customHooks.utils";

import ItemPageLayout from "@/components/styled/ItemPageLayout";
import ItemList from "@/components/ItemComponents/ItemList/ItemList";
import ItemPageTransactionContainer from "@/components/ItemComponents/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "@/components/TransactionComponents/TransactionGroups/TransactionGroups";
import ItemEditList from "@/components/ItemComponents/ItemEditList/ItemEditList";

import type { SpendTransaction, TransferTransaction } from "@/redux/transactionsSlice";
import type { Account } from "@/redux/accountsSlice";

const Accounts = () => {
	const [search, setSearch] = useState('');
	const [editMode, setEditMode] = useState(false);

	const accounts = useAppSelector(selectAccounts);
	const transactions = useAppSelector(selectTransactions);
	const selectedItem = useAppSelector(state => state.general.selectedItem);
	if (editMode && selectedItem !== 0) setEditMode(false);

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

	const onClickEdit = () => {
		setEditMode(true);
		onSelectItem(0);
	}
	
	//get total
	const total = getTransactionTotal(accountTransactions, selectedItem) + (accountObj?.startingBalance || 0); 
	const totalText = `Balance: ${parseCurrency(total)}`;

	//organise transactions and add running balances
	const organised = organiseTransactions(accountTransactions);
	const runningBalanceArray = addRunningBalances(organised, selectedItem, accountObj?.startingBalance || 0);

	return (
		<ItemPageLayout>
			<ItemList heading='Accounts' items={searchedAccounts} selectedItemId={selectedItem} onSelect={onSelectItem} onEdit={onClickEdit}/>
			{ editMode && <div><ItemEditList array={accounts} type='account'/></div> }
			{ accountObj !== undefined && !editMode && (
				<ItemPageTransactionContainer heading={accountObj.name} startingBalance={accountObj.startingBalance} search={search} totalText={totalText} onChangeSearch={onChangeSearch}>
					<TransactionGroups monthlyTransactions={runningBalanceArray}/>
				</ItemPageTransactionContainer>
			)}
			{ !editMode && accountObj === undefined && <div></div> }
		</ItemPageLayout>
	);
}

export default Accounts;

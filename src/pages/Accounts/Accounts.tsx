import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectAccounts } from "../../redux/accountsSlice";
import { selectTransactions } from "../../redux/transactionsSlice";
import { setSelectedItem } from "../../redux/generalSlice";

import { organiseTransactions, addRunningBalances, getTransactionTotal, checkSearch } from "../../utils/transactions.utils";
import { parseCurrency } from "../../components/Transaction/Transaction.utils";

import ItemPageLayout from "../../components/styled/ItemPageLayout";
import ItemList from "../../components/ItemList/ItemList";
import ItemPageTransactionContainer from "../../components/ItemPageTransactionContainer/ItemPageTransactionContainer";
import TransactionGroups from "../../components/TransactionGroups/TransactionGroups";

import type { SpendTransaction, TransferTransaction } from "../../redux/transactionsSlice";

const Accounts = () => {
	const dispatch = useAppDispatch();

	const [search, setSearch] = useState('');

	const accounts = useAppSelector(selectAccounts);
	const transactions = useAppSelector(selectTransactions);
	const selectedItem = useAppSelector(state => state.general.selectedItem);

	const accountObj = accounts.find(obj => obj.id === selectedItem);

	useEffect(() => {
		//make sure the first item is selected
		if (selectedItem === 0 && accounts.length > 0) {
			dispatch(setSelectedItem(accounts[0].id));
		}
	}, [selectedItem, accounts]);

	const onSelectAccount = (id: number) => {
		dispatch(setSelectedItem(id));
	}

	//if no account selected, then just display the account list
	if (accountObj === undefined) {
		return (
			<ItemPageLayout>
				<ItemList heading='Accounts' items={accounts} selectedItemId={selectedItem} onSelect={onSelectAccount}/>
				<div></div>
			</ItemPageLayout>
		);
	}

	//filter transactions for accounts and based on search
	const accountTransactions = transactions.filter(tr => {
		if (tr.type === 'spend' && tr.account === selectedItem && checkSearch(tr, search)) return true;
		if (tr.type === 'transfer' && (tr.from === selectedItem || tr.to === selectedItem) && checkSearch(tr, search)) return true;
		return false;
	}) as SpendTransaction[] & TransferTransaction[];

	//Search for accounts with filteredTransactions and add number to name for displaying
    const searchedAccounts = accounts.map(account => {
        if (search.length === 0) return account;

        let transactionArr = accountTransactions.filter(obj => obj.account === account.id);
        return {...account, name: account.name + ' - ' + transactionArr.length};
    });
	
	const onChangeSearch = (val: string) => {
		setSearch(val);
	}
	
	//get total
	let total = getTransactionTotal(accountTransactions, selectedItem); 

	//organise transactions and add running balances
	let organised = organiseTransactions(accountTransactions);
	let runningBalanceArray = addRunningBalances(organised, selectedItem);

	return (
		<ItemPageLayout>
			<ItemList heading='Accounts' items={searchedAccounts} selectedItemId={selectedItem} onSelect={onSelectAccount}/>
			<ItemPageTransactionContainer heading={accountObj.name} startingBalance={accountObj.startingBalance} search={search} totalText={`Balance: ${parseCurrency(total)}`} onChangeSearch={onChangeSearch}>
				<TransactionGroups monthlyTransactions={runningBalanceArray}/>
			</ItemPageTransactionContainer>
		</ItemPageLayout>
	);
}

export default Accounts;

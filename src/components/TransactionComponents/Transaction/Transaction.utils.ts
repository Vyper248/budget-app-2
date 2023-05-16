import { getObjectName, joinStrings } from "@/utils/general.utils";
import { store } from "@/redux/store";

import type { Transaction } from "@/redux/transactionsSlice";

export const getDescription = (transaction: Transaction, selectedAccount: number, currentPage: string) => {
    const state = store.getState();
    const { categories, funds, accounts } = state;

	let category = transaction.type === 'spend' ? getObjectName(transaction.category, categories) : '';
	let account = transaction.type === 'spend' ? getObjectName(transaction.account, accounts) : '';
	let fund = transaction.type === 'spend' || transaction.type === 'fundAddition' ? getObjectName(transaction.fund, funds, ' Fund') : '';
	let description = transaction.type === 'spend' || transaction.type === 'fundAddition' ? transaction.description : '';

	if (transaction.type === 'transfer') {
		const from = getObjectName(transaction.from, accounts);
		const to = getObjectName(transaction.to, accounts);

		if (transaction.from === selectedAccount) description = `Transferred to ${to}`;
		else if (transaction.to === selectedAccount) description = `Transferred from ${from}`;
		else description = `Transferred from ${from} to ${to}`;
	}

	if (currentPage === 'Categories') {
		category = '';
	}

	if (currentPage === 'Accounts') {
		account = '';
	}

	if (currentPage === 'Funds') {
		category = '';
		fund = '';
	}

	if (currentPage === 'Home') {
		category = '';
		fund = '';
	}

	return joinStrings(' - ', category, fund, account, description);
}
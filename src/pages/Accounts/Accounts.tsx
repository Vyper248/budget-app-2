import { memo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectAccounts } from "@/redux/accountsSlice";

import ItemPage from "@/components/ItemComponents/ItemPage/ItemPage";

import type { Transaction } from "@/redux/transactionsSlice";

const Accounts = () => {
	const accounts = useAppSelector(selectAccounts);
	const selectedItem = useAppSelector(state => state.general.selectedItem);

	const filter = (tr: Transaction) => {
		if (tr.type === 'spend' && tr.account === selectedItem) return true;
		if (tr.type === 'transfer' && (tr.from === selectedItem || tr.to === selectedItem)) return true;
		return false;
	}

	return (
		<ItemPage heading='Accounts' items={accounts} type='account' trFilter={filter} totalTextLabel="Balance" addRunningBalance={true}/>
	)
}

export default memo(Accounts);

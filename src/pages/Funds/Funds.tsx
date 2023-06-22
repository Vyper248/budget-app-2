import { memo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectFunds } from "@/redux/fundsSlice";

import ItemPage from "@/components/ItemComponents/ItemPage/ItemPage";

import type { Transaction } from "@/redux/transactionsSlice";

const Funds = () => {
    const funds = useAppSelector(selectFunds);
    const selectedItem = useAppSelector(state => state.general.selectedItem);

	const filter = (tr: Transaction) => {
		if (tr.type === 'spend' && tr.fund === selectedItem) return true;
		if (tr.type === 'fundAddition' && tr.fund === selectedItem) return true;
		return false;
	};

    return (
        <ItemPage heading='Funds' type='fund' items={funds} trFilter={filter} totalTextLabel='Total Saved'/>
    );
}

export default memo(Funds);
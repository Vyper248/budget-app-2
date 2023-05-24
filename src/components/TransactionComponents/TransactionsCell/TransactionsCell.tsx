import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";

import { setSelectedTotal } from "@/redux/generalSlice";
import { parseCurrency } from "@/utils/transactions.utils";
import StyledTransactionsCell from "./TransactionsCell.style";

import type { TransactionDisplay } from "@/utils/summary.utils";

type TransactionsCellProps = {
	displayObj: TransactionDisplay;
	date: string;
	itemId: number;
	type: string;
}

const TransactionsCell = ({displayObj, date, itemId, type}: TransactionsCellProps) => {
	const dispatch = useDispatch();
	const selectedTotal = useAppSelector(state => state.general.selectedTotal);

	let selected = false;
	if (selectedTotal && (date === selectedTotal.date && itemId === selectedTotal.itemId)) {
		selected = true;
	}

	const onClick = (e: React.MouseEvent<HTMLElement>) => {
		//get position of clicked cell and put modal next to it
		let leftPos = e.currentTarget.offsetLeft - 450;
        if (leftPos < 0) leftPos = e.currentTarget.offsetLeft + e.currentTarget.offsetWidth;
        let topPos = e.currentTarget.offsetTop;

		dispatch(setSelectedTotal({
			transactions: displayObj.transactions,
			date, type, itemId,
			x: leftPos,
			y: topPos
		}));
	}

	if (displayObj.total === 0) return <td key={`${date}-${itemId}`}>-</td>

	return (
		<StyledTransactionsCell onClick={onClick} className={selected ? 'summaryData selected' : 'summaryData'}>
			{ parseCurrency(type === 'expense' ? -displayObj.total : displayObj.total) }
		</StyledTransactionsCell>
	);
}

export default TransactionsCell;

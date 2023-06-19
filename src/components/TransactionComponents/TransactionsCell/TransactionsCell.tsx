import StyledTransactionsCell from "./TransactionsCell.style";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setSelectedTotal } from "@/redux/generalSlice";
import { parseCurrency } from "@/utils/transactions.utils";
import { useResponsive } from "@/utils/customHooks.utils";

import type { TransactionDisplay } from "@/utils/summary.utils";

type TransactionsCellProps = {
	displayObj: TransactionDisplay;
	date: string;
	itemId: number;
	type: string;
	showPositive?: boolean;
}

const TransactionsCell = ({displayObj, date, itemId, type, showPositive=false}: TransactionsCellProps) => {
	const dispatch = useAppDispatch();
	const { isMobile } = useResponsive();
	const selectedTotal = useAppSelector(state => state.general.selectedTotal);

	let selected = false;
	if (selectedTotal && (date === selectedTotal.date && itemId === selectedTotal.itemId)) {
		selected = true;
	}

	const onClick = (e: React.MouseEvent<HTMLElement>) => {
		//check scroll position of table within parent div
		let parentDiv = e.currentTarget.closest('div');
		let scrollLeft = (parentDiv?.scrollLeft || 0);
		
		//get position of clicked cell and put modal next to it (modal has a witdh of 450px)
		let leftPos = e.currentTarget.offsetLeft - 450 - scrollLeft;
        if (leftPos < 0) leftPos = e.currentTarget.offsetLeft + e.currentTarget.offsetWidth - scrollLeft;
        let topPos = e.currentTarget.offsetTop;

		if (isMobile) {
			leftPos = 15;
			topPos = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 1;
		}

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
			{ parseCurrency(type === 'expense' && !showPositive ? -displayObj.total : displayObj.total) }
		</StyledTransactionsCell>
	);
}

export default TransactionsCell;

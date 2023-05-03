import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import StyledTransaction from "./Transaction.style";

import { getDescription, getAmount, parseCurrency } from "./Transaction.utils";
import { formatDate } from "../../utils/date.utils";
import { selectTransaction } from "../../redux/transactionsSlice";

import type { Transaction } from "../../redux/transactionsSlice";

type TransactionProps = {
	obj: Transaction;
	runningBalance?: number;
}

const Transaction = ({obj, runningBalance}: TransactionProps) => {
	const dispatch = useAppDispatch();
	const { selectedAccount, currentPage } = useAppSelector(state => state.general);

	const fullDescription = getDescription(obj, selectedAccount, currentPage);
	const amount = getAmount(obj, false, selectedAccount) as number;

	const onClick = () => {
		dispatch(selectTransaction(obj));
	}

	let positive = true;
	if (amount.toString().includes('-')) positive = false;

	return (
		<StyledTransaction positive={positive} onClick={onClick}>
			<div className='descriptionDate'>
				<div className='description'>{fullDescription.length > 0 ? fullDescription : formatDate(obj.date)}</div>
				{ fullDescription.length > 0 ? <div className='date'>{formatDate(obj.date)}</div> : null }
			</div>
			<div className='amount'>{positive ? '+' : ''}{parseCurrency(amount)}</div>
			{ runningBalance !== undefined ? <div className='runningBalance'>{parseCurrency(runningBalance)}</div> : null }
		</StyledTransaction>
	);
}

export default Transaction;
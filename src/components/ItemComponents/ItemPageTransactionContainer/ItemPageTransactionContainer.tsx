import { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";

import { parseCurrency } from "@/utils/transactions.utils";

import CloseableContainer from "@/components/CloseableContainer/CloseableContainer";
import Grid from "@/components/styled/Grid";
import Input from "@/components/Input/Input";
import StyledTransaction from "@/components/TransactionComponents/Transaction/Transaction.style";

type ItemPageTransactionContainerProps = {
	heading: string;
	startingBalance: number;
	search: string;
	totalText: string;
	onChangeSearch: (val: string)=>void;
	children: ReactNode;
}

const ItemPageTransactionContainer = ({heading, startingBalance, search, onChangeSearch, totalText, children}: ItemPageTransactionContainerProps) => {
	const currentPage = useAppSelector(state => state.general.currentPage);

	return (
		<div>
			<h3 style={{textAlign: 'center'}}>{heading}</h3>
			<Grid template={'120px 1fr 120px'}>
				<div></div>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{totalText}</div>
				<div style={{display: 'flex', alignItems: 'center'}}><Input value={search} placeholder='Search' onChange={onChangeSearch} width='100%'/></div>
			</Grid>
			{ children }
			{ startingBalance > 0 && <CloseableContainer heading='Opening Balance'>
				<StyledTransaction positive={false}>
					<div className='descriptionDate'>Opening Balance</div>
					<div className='amount'>{parseCurrency(startingBalance)}</div>
					{ currentPage === 'Accounts' ? <div className='runningBalance'>{parseCurrency(startingBalance)}</div> : null }
				</StyledTransaction>
			</CloseableContainer> }
		</div>
	);
}

export default ItemPageTransactionContainer;
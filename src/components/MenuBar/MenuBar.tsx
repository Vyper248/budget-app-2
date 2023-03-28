import StyledMenuBar from "./MenuBar.style";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCurrentPage } from "../../redux/generalSlice";
import { setAddingTransaction } from "../../redux/transactionsSlice";

const selected = {
	backgroundColor: 'var(--menu-selected-bg-color)'
}

const MenuPageButton = ({ label }: { label:string }) => {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(state => state.general.currentPage);

	const onSelectPage = (page: string) => () => {
		dispatch(setCurrentPage(page));
	}

	return <a onClick={onSelectPage(label)} style={currentPage === label ? selected : {}}>{ label }</a>
}

const MenuBar = () => {
	const dispatch = useAppDispatch();
	const addingTransaction = useAppSelector(state => state.transactions.addingTransaction);

	const onToggleAddingTransaction = () => {
		dispatch(setAddingTransaction(!addingTransaction));
	}

	return (
		<StyledMenuBar>
			<div className='left'>
				<MenuPageButton label='Home'/>
				<MenuPageButton label='Categories'/>
				<MenuPageButton label='Funds'/>
				<MenuPageButton label='Accounts'/>
				<MenuPageButton label='Tools'/>
				<button name='Add Transaction' onClick={onToggleAddingTransaction} style={addingTransaction ? selected : {}}>Add Transaction</button>
			</div>
			<div className='spacer'></div>
			<div className='right'>
				<MenuPageButton label='Settings'/>
			</div>
		</StyledMenuBar>
	);
}

export default MenuBar;

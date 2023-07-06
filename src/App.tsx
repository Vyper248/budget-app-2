import './App.css'

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { setAddingTransaction, selectTransaction } from './redux/transactionsSlice';
import { SelectedTotal, setSelectedTotal } from './redux/generalSlice';
import { getHeadingColor } from './utils/summary.utils';

import MenuBar from './components/MenuBar/MenuBar';
import Home from './pages/Home/Home';
import Accounts from './pages/Accounts/Accounts';
import Categories from './pages/Categories/Categories';
import Funds from './pages/Funds/Funds';
import Tools from './pages/Tools/Tools';
import Settings from './pages/Settings/Settings';
import Modal from './components/Modal/Modal';
import TransactionForm from './components/TransactionComponents/TransactionForm/TransactionForm';
import TransactionList from './components/TransactionComponents/TransactionList/TransactionList';
import { useEffect } from 'react';
import { useResponsive } from './utils/customHooks.utils';
import PopoutMessage from './components/PopoutMessage/PopoutMessage';

const getSelectedTotalProps = (data: SelectedTotal, isMobile: boolean) => {
	return {
		key:`${data.itemId}-${data.date}`,
		width: isMobile ? 'calc(100% - 30px)' : '450px',
		x: data.x,
		y: data.y,
		headingColor: getHeadingColor(data.type),
		color: data.type === 'income' ? 'white' : 'black',
		center: !isMobile,
		reposition: isMobile
	}
}

function App() {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(state => state.general.currentPage);
	const { addingTransaction, selectedTransaction } = useAppSelector(state => state.transactions);
	const selectedTotal = useAppSelector(state => state.general.selectedTotal);
	const { isMobile } = useResponsive();

	useEffect(() => {
		window.scrollTo({top: 0});
		onCloseModal();
	}, [currentPage]);
	
	const onCloseModal = () => {
		dispatch(setAddingTransaction(false));
		dispatch(selectTransaction(null));
	}

	const onCloseTransactions = () => {
		dispatch(setSelectedTotal(null));
	}
	
	const scrollY = window.scrollY;
	const centerX = window.innerWidth/2;
	const centerY = window.innerHeight/2 + scrollY;

	return (
		<div className="App">
			<MenuBar/>
			<PopoutMessage/>
			<div id='mainContent'>
				{ currentPage === 'Home' ? <Home/> : null }
				{ currentPage === 'Categories' ? <Categories/> : null }
				{ currentPage === 'Funds' ? <Funds/> : null }
				{ currentPage === 'Accounts' ? <Accounts/> : null }
				{ currentPage === 'Tools' ? <Tools/> : null }
				{ currentPage === 'Settings' ? <Settings/> : null }
			</div>

			{ selectedTotal && selectedTotal.transactions.length > 0 && <Modal heading='Transactions' onClickClose={onCloseTransactions} {...getSelectedTotalProps(selectedTotal, isMobile)}>
							       <TransactionList list={selectedTotal.transactions.map(transaction => ({transaction}))} sort={true}/>
							   </Modal> }
			{ addingTransaction ? <Modal heading='Add Transaction' onClickClose={onCloseModal} x={isMobile ? centerX-150 : 285} y={isMobile ? 71+scrollY : 30+scrollY}><TransactionForm/></Modal> : null }
			{ selectedTransaction ? <Modal heading='Edit Transaction' onClickClose={onCloseModal} x={centerX-150} y={centerY-150}><TransactionForm key={selectedTransaction.id} obj={selectedTransaction}/></Modal> : null }
		</div>
	)
}

export default App

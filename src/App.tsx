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
import Settings from './pages/Settings/Settings';
import Modal from './components/Modal/Modal';
import TransactionForm from './components/TransactionComponents/TransactionForm/TransactionForm';
import TransactionList from './components/TransactionComponents/TransactionList/TransactionList';
import { useEffect } from 'react';

const getSelectedTotalProps = (data: SelectedTotal) => {
	return {
		key:`${data.x}-${data.y}`,
		width: '450px',
		x: data.x,
		y: data.y,
		headingColor: getHeadingColor(data.type),
		color: data.type === 'income' ? 'white' : 'black',
		center: true
	}
}

function App() {
	const currentPage = useAppSelector(state => state.general.currentPage);
	const dispatch = useAppDispatch();
	const { addingTransaction, selectedTransaction } = useAppSelector(state => state.transactions);
	const selectedTotal = useAppSelector(state => state.general.selectedTotal);

	useEffect(() => {
		onCloseModal();
	}, [currentPage]);
	
	const onCloseModal = () => {
		dispatch(setAddingTransaction(false));
		dispatch(selectTransaction(null));
	}

	const onCloseTransactions = () => {
		dispatch(setSelectedTotal(null));
	}

	const centerX = window.innerWidth/2;
	const centerY = window.innerHeight/2;

	return (
		<div className="App">
			<MenuBar/>
			{ currentPage === 'Home' ? <Home/> : null }
			{ currentPage === 'Categories' ? <Categories/> : null }
			{ currentPage === 'Funds' ? <Funds/> : null }
			{ currentPage === 'Accounts' ? <Accounts/> : null }
			{ currentPage === 'Settings' ? <Settings/> : null }

			{ selectedTotal && <Modal heading='Transactions' onClickClose={onCloseTransactions} {...getSelectedTotalProps(selectedTotal)}>
							       <TransactionList list={selectedTotal.transactions.map(transaction => ({transaction}))} sort={true}/>
							   </Modal> }
			{ addingTransaction ? <Modal heading='Add Transaction' onClickClose={onCloseModal}><TransactionForm/></Modal> : null }
			{ selectedTransaction ? <Modal heading='Edit Transaction' onClickClose={onCloseModal} x={centerX-150} y={centerY-150}><TransactionForm key={selectedTransaction.id} obj={selectedTransaction}/></Modal> : null }
		</div>
	)
}

export default App

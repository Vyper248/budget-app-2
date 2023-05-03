import './App.css'

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { setAddingTransaction, selectTransaction } from './redux/transactionsSlice';

import MenuBar from './components/MenuBar/MenuBar';
import Home from './pages/Home/Home';
import Accounts from './pages/Accounts/Accounts';
import Modal from './components/Modal/Modal';
import TransactionForm from './components/TransactionForm/TransactionForm';

function App() {
	const currentPage = useAppSelector(state => state.general.currentPage);
	const dispatch = useAppDispatch();
	const { addingTransaction, selectedTransaction } = useAppSelector(state => state.transactions);
	
	const onCloseModal = () => {
		dispatch(setAddingTransaction(false));
		dispatch(selectTransaction(null));
	}

	const centerX = window.innerWidth/2;
	const centerY = window.innerHeight/2;

	return (
		<div className="App">
			<MenuBar/>
			{ currentPage === 'Home' ? <Home/> : null }
			{ currentPage === 'Accounts' ? <Accounts/> : null }
			{ addingTransaction ? <Modal heading='Add Transaction' onClickClose={onCloseModal}><TransactionForm/></Modal> : null }
			{ selectedTransaction ? <Modal heading='Edit Transaction' onClickClose={onCloseModal} x={centerX-150} y={centerY-150}><TransactionForm key={selectedTransaction.id} obj={selectedTransaction}/></Modal> : null }
		</div>
	)
}

export default App

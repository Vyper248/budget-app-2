import StyledMenuBar from "./MenuBar.style";
import { FaHome, FaCog, FaPlus, FaPiggyBank, FaTools } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsBank } from 'react-icons/bs';
import { AiOutlineBank } from 'react-icons/ai';
import { RiBankLine } from 'react-icons/ri';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentPage } from "@/redux/generalSlice";
import { setAddingTransaction } from "@/redux/transactionsSlice";
import { useResponsive } from "@/utils/customHooks.utils";
import IconButton from "../IconButton/IconButton";

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
	const { isMobile } = useResponsive();
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(state => state.general.currentPage);
	const addingTransaction = useAppSelector(state => state.transactions.addingTransaction);

	const onToggleAddingTransaction = () => {
		dispatch(setAddingTransaction(!addingTransaction));
	}

	if (isMobile) return (
		<StyledMenuBar>
			<div className='full'>
				<IconButton Icon={FaHome} onClick={() => dispatch(setCurrentPage('Home'))} fontSize="1.5em" style={currentPage === 'Home' ? selected : {}}/>
				<IconButton Icon={MdCategory} onClick={() => dispatch(setCurrentPage('Categories'))} fontSize="1.5em" style={currentPage === 'Categories' ? selected : {}}/>
				<IconButton Icon={FaPiggyBank} onClick={() => dispatch(setCurrentPage('Funds'))} fontSize="1.5em" style={currentPage === 'Funds' ? selected : {}}/>
				<IconButton Icon={RiBankLine} onClick={() => dispatch(setCurrentPage('Accounts'))} fontSize="1.6em" style={currentPage === 'Accounts' ? selected : {}}/>
				<IconButton Icon={FaTools} onClick={() => dispatch(setCurrentPage('Tools'))} fontSize="1.2em" style={currentPage === 'Tools' ? selected : {}}/>
				<IconButton Icon={FaPlus} onClick={onToggleAddingTransaction} fontSize="1.5em" style={addingTransaction ? selected : {}}/>
				<IconButton Icon={FaCog} onClick={() => dispatch(setCurrentPage('Settings'))} fontSize="1.5em" style={currentPage === 'Settings' ? selected : {}}/>
			</div>
		</StyledMenuBar>
	);

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

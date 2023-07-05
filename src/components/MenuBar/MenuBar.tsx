import { memo } from "react";
import { IconType } from "react-icons";
import { FaHome, FaCog, FaPlus, FaPiggyBank, FaTools } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { RiBankLine } from 'react-icons/ri';

import StyledMenuBar, { StyledMenuHeading } from "./MenuBar.style";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentPage } from "@/redux/generalSlice";
import { setAddingTransaction } from "@/redux/transactionsSlice";
import { useResponsive } from "@/utils/customHooks.utils";

import IconButton from "../IconButton/IconButton";

const selected = {
	backgroundColor: 'var(--menu-selected-bg-color)'
}

const MenuPageButton = ({ label, Icon, iconSize='1.5em' }: { label:string, Icon?:IconType, iconSize?:string }) => {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(state => state.general.currentPage);

	const onSelectPage = (page: string) => () => {
		if (currentPage !== page) dispatch(setCurrentPage(page));
	}

	if (Icon) return <IconButton Icon={Icon} color='var(--menu-text-color)' onClick={onSelectPage(label)} fontSize={iconSize} style={currentPage === label ? selected : {}}/>
	else return <a onClick={onSelectPage(label)} style={currentPage === label ? selected : {}}>{ label }</a>
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
		<>
			<StyledMenuBar>
				<div className='full'>
					<MenuPageButton label='Home' Icon={FaHome}/>
					<MenuPageButton label='Categories' Icon={MdCategory}/>
					<MenuPageButton label='Funds' Icon={FaPiggyBank}/>
					<MenuPageButton label='Accounts' Icon={RiBankLine} iconSize='1.6em'/>
					<MenuPageButton label='Tools' Icon={FaTools} iconSize='1.2em'/>
					<IconButton Icon={FaPlus} color='var(--menu-text-color)' onClick={onToggleAddingTransaction} fontSize="1.5em" style={addingTransaction ? selected : {}}/>
					<MenuPageButton label='Settings' Icon={FaCog}/>
				</div>
			</StyledMenuBar>
			<StyledMenuHeading>{currentPage}</StyledMenuHeading>
		</>
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

export default memo(MenuBar);

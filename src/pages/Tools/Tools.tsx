import { useState } from "react";
import StyledTools from "./Tools.style";

import { useResponsive } from "@/utils/customHooks.utils";
import { useAppDispatch } from "@/redux/hooks";
import { setCurrentToolPage } from "@/redux/generalSlice";

import Button from "@/components/Button/Button";
import CategoryBreakdown from "./CategoryBreakdown/CategoryBreakdown";
import Interest from "./Interest/Interest";
import SavingsGoal from "./SavingsGoal/SavingsGoal";
import FundSpending from "./FundSpending/FundSpending";
import RecentTransactions from "./RecentTransactions/RecentTransactions";

const pages = [
	{ label: 'Category Breakdown', component: <CategoryBreakdown key='categoryBreakdown'/> },
	{ label: 'Fund Spending', component: <FundSpending key='fundSpending'/> },
	{ label: 'Interest', component: <Interest key='interest'/> },
	{ label: 'Savings Goal', component: <SavingsGoal key='savingsGoal'/> },
	{ label: 'Recent Transactions', component: <RecentTransactions key='recentTransactions'/> },
]

const Tools = ({}) => {
	const { isMobile } = useResponsive();
	const dispatch = useAppDispatch();
	const [subPage, setSubPage] = useState(pages[0].label);

	const onClickPage = (label: string) => () => {
		setSubPage(label);
		dispatch(setCurrentToolPage(label));

	}

	return (
		<StyledTools>
			{ !isMobile && <h4>Tools</h4> }
			<div id='pageButtons'>
				{
					pages.map(({label}) => <Button key={`category-${label}`} onClick={onClickPage(label)} label={label} selected={subPage === label}/>)
				}
			</div>
			{
				pages.map(page => subPage === page.label ? page.component : null)
			}
		</StyledTools>
	);
}

export default Tools;

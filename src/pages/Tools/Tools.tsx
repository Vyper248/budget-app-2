import { useState } from "react";
import StyledTools from "./Tools.style";

import Button from "@/components/Button/Button";
import CategoryBreakdown from "./CategoryBreakdown/CategoryBreakdown";
import Interest from "./Interest/Interest";
import SavingsGoal from "./SavingsGoal/SavingsGoal";

const pages = [
	{ label: 'Category Breakdown', component: <CategoryBreakdown key='categoryBreakdown'/> },
	{ label: 'Fund List', component: null },
	{ label: 'Income/Spendings', component: null },
	{ label: 'Interest', component: <Interest key='interest'/> },
	{ label: 'Savings Goal', component: <SavingsGoal key='savingsGoal'/> },
]

const Tools = ({}) => {
	const [subPage, setSubPage] = useState(pages[4].label);

	return (
		<StyledTools>
			<h4>Tools</h4>
			<div id='pageButtons'>
				{
					pages.map(({label}) => <Button key={`category-${label}`} onClick={() => setSubPage(label)} label={label} selected={subPage === label}/>)
				}
			</div>
			{
				pages.map(page => subPage === page.label ? page.component : null)
			}
		</StyledTools>
	);
}

export default Tools;

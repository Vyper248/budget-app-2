import StyledAmountCard from "./AmountCard.style";

import { parseCurrency } from "@/utils/transactions.utils";

type AmountCardProps = {
	label: string;
	amount: number;
	color?: string;
	textColor?: string;
	width?: string;
}

const AmountCard = ({label, amount, color='var(--table-heading-bg-color)', textColor='black', width='100%'}: AmountCardProps) => {
	return (
		<StyledAmountCard color={color} textColor={textColor} width={width}>
			<div className='label'>{label}</div>
			<div className='amount'>{parseCurrency(amount)}</div>
		</StyledAmountCard>
	);
}

export default AmountCard;

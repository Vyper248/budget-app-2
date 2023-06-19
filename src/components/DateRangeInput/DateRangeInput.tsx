import StyledDateRangeInput from "./DateRangeInput.style";

import Grid from "../styled/Grid";
import Input from "../Input/Input";
import Button from "../Button/Button";

import { getInvalidDateRangeMessage } from "@/utils/date.utils";
import { useResponsive } from "@/utils/customHooks.utils";

export type DateRange = {
	from: string;
	to: string;
}

type DateRangeInputProps = {
	dateRange: DateRange;
	onChange: (dateRange: DateRange)=>void;
	onClear?: ()=>void;
}

const DateRangeInput = ({dateRange, onChange, onClear}: DateRangeInputProps) => {
	const { isMobile } = useResponsive();

	const onChangeInput = (key: string) => (value: string) => {
		const newRange = {...dateRange, [key]: value };
		onChange(newRange);
	}

	let gridTemplate = 'auto auto';
	if (onClear) gridTemplate += ' 90px';

	let message = getInvalidDateRangeMessage(dateRange);

	const inputWidth = isMobile ? '125px' : '146px';
	const gridWidth = isMobile ? '360px' : '500px';

	return (
		<StyledDateRangeInput>
			<Grid width={gridWidth} template={gridTemplate}>
				<Input type='date' label='From' width={inputWidth} value={dateRange.from} onChange={onChangeInput('from')} max={dateRange.to} topLabel={isMobile}/>
				<Input type='date' label='To' width={inputWidth} value={dateRange.to} onChange={onChangeInput('to')} min={dateRange.from} topLabel={isMobile}/>
				{ onClear && <Button label='Clear' onClick={onClear} width='100%'/> }
			</Grid>
			<div style={{color: 'red', textAlign: 'center', marginTop: '3px'}}>{message}</div>
		</StyledDateRangeInput>
	);
}

export default DateRangeInput;

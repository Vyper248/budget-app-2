import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";
import compareAsc from "date-fns/compareAsc";

import Grid from "../styled/Grid";
import Input from "../Input/Input";
import Button from "../Button/Button";

import { getInvalidDateRangeMessage } from "@/utils/date.utils";

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
	const onChangeInput = (key: string) => (value: string) => {
		const newRange = {...dateRange, [key]: value };
		onChange(newRange);
	}

	let gridTemplate = 'auto auto';
	if (onClear) gridTemplate += ' 90px';

	let message = getInvalidDateRangeMessage(dateRange);

	return (
		<>
			<Grid width="500px" template={gridTemplate}>
				<Input type='date' label='From' value={dateRange.from} onChange={onChangeInput('from')} max={dateRange.to}/>
				<Input type='date' label='To' value={dateRange.to} onChange={onChangeInput('to')} min={dateRange.from}/>
				{ onClear && <Button label='Clear' onClick={onClear} width='80px'/> }
			</Grid>
			<div style={{color: 'red', textAlign: 'center', marginTop: '3px'}}>{message}</div>
		</>
	);
}

export default DateRangeInput;

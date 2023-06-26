import { useState } from "react";
import StyledDateRangeInput from "./DateRangeInput.style";
import { MdMenu, MdClear } from "react-icons/md";

import Grid from "../styled/Grid";
import Input from "../Input/Input";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";

import { getInvalidDateRangeMessage } from "@/utils/date.utils";
import { useResponsive, useClickOutside } from "@/utils/customHooks.utils";
import { getCurrentMonth, getCurrentTaxYear, getCurrentYear, getPreviousMonth, getPreviousTaxYear, getPreviousYear } from "./DateRangeInput.utils";

export type DateRange = {
	from: string;
	to: string;
}

type DateRangeInputProps = {
	dateRange: DateRange;
	onChange: (dateRange: DateRange)=>void;
	onClear?: ()=>void;
}

const SetDateMenu = ({onChange}: {onChange: (dateRange: DateRange)=>void}) => {
	const [ showMenu, setShowMenu ] = useState(false);
	const ref = useClickOutside(() => setShowMenu(false), showMenu);

	const onClickMenu = () => {
		setShowMenu(b => !b);
	}

	const onClickSetDate = (type: string) => () => {
		switch(type) {
			case 'currentYear': onChange(getCurrentYear()); break;
			case 'previousYear': onChange(getPreviousYear()); break;
			case 'currentTaxYear': onChange(getCurrentTaxYear()); break;
			case 'previousTaxYear': onChange(getPreviousTaxYear()); break;
			case 'currentMonth': onChange(getCurrentMonth()); break;
			case 'previousMonth': onChange(getPreviousMonth()); break;
			default: break;
		}

		setShowMenu(false);
	}

	return (
		<div ref={ref}>
			<IconButton Icon={MdMenu} onClick={onClickMenu} fontSize="1.2em" className='bordered'/>
			<div className={showMenu ? 'menu' : 'menu hidden'}>
				<Button label='Current Year' onClick={onClickSetDate('currentYear')}/>
				<Button label='Previous Year' onClick={onClickSetDate('previousYear')}/>
				<Button label='Current Tax Year' onClick={onClickSetDate('currentTaxYear')}/>
				<Button label='Previous Tax Year' onClick={onClickSetDate('previousTaxYear')}/>
				<Button label='Current Month' onClick={onClickSetDate('currentMonth')}/>
				<Button label='Previous Month' onClick={onClickSetDate('previousMonth')}/>
			</div>
		</div>
	);	
}

const DateRangeInput = ({dateRange, onChange, onClear}: DateRangeInputProps) => {
	const { isMobile } = useResponsive();

	const onChangeInput = (key: string) => (value: string) => {
		const newRange = {...dateRange, [key]: value };
		onChange(newRange);
	}

	let gridTemplate = 'auto auto 40px';
	if (onClear) gridTemplate += ' 40px';

	let message = getInvalidDateRangeMessage(dateRange);

	const inputWidth = isMobile ? '125px' : '146px';
	const gridWidth = isMobile ? '360px' : '500px';

	return (
		<StyledDateRangeInput>
			<Grid width={gridWidth} template={gridTemplate}>
				<Input type='date' label='From' width={inputWidth} value={dateRange.from} onChange={onChangeInput('from')} max={dateRange.to} topLabel={isMobile}/>
				<Input type='date' label='To' width={inputWidth} value={dateRange.to} onChange={onChangeInput('to')} min={dateRange.from} topLabel={isMobile}/>
				<SetDateMenu onChange={onChange}/>
				{ onClear && <IconButton Icon={MdClear} onClick={onClear} fontSize="1.2em" className='bordered'/> }
			</Grid>
			<div className='errorMessage'>{message}</div>
		</StyledDateRangeInput>
	);
}

export default DateRangeInput;

import { format, parseISO, isValid, compareAsc } from "date-fns"
import type { DateRange } from "@/components/DateRangeInput/DateRangeInput";

export const getDateNumber = () => {
    return Number(format(new Date(),'yyyyMMddHHmmssSSS'));
}

export const today = () => {
    return format(new Date(), 'yyyy-MM-dd');
}

export const formatDate = (date: string, formatMethod='MMM d, yyyy') => {
    if (date === undefined) return '';
    if (date.length === 0) return '';
    let formattedDate = 'Incorrect Date Format';

    try {
        let parsed = parseISO(date).toString() === 'Invalid Date' ? new Date() : parseISO(date);
        formattedDate = format(parsed, formatMethod);
    } catch (err) {
        console.log(err);
    }

    return formattedDate;
} 

export const isValidDateRange = (dateRange: DateRange) => {
	let fromValid = isValid(parseISO(dateRange.from)) && compareAsc(parseISO(dateRange.from), parseISO('1900-01-01')) > 0;
	let toValid = isValid(parseISO(dateRange.to)) && compareAsc(parseISO(dateRange.to), parseISO('1900-01-01')) > 0;
	if (!fromValid || !toValid) return false;

    if (compareAsc(parseISO(dateRange.from), parseISO(dateRange.to)) > 0) return false;

	return true;
}

export const getInvalidDateRangeMessage = (dateRange: DateRange) => {
    if (dateRange.from.length > 0 && dateRange.to.length > 0) {
		const fromDate = parseISO(dateRange.from);
		const toDate = parseISO(dateRange.to);

		let fromValid = isValid(fromDate) && compareAsc(fromDate, parseISO('1900-01-01')) > 0;
		let toValid = isValid(toDate) && compareAsc(toDate, parseISO('1900-01-01')) > 0;

		if (!fromValid) return 'Error: First date is not valid.';
		if (!toValid) return 'Error: Second date is not valid.';

		if (compareAsc(fromDate, toDate) > 0) return 'Error: Second date should be after first date.';
	}

    return '';
}
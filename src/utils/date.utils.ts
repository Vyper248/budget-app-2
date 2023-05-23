import { format, parseISO, isValid, compareAsc } from "date-fns"
import type { DateRange } from "./summary.utils";

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
	let fromValid = isValid(parseISO(dateRange.from));
	let toValid = isValid(parseISO(dateRange.to));
	if (!fromValid || !toValid) return false;

    if (compareAsc(parseISO(dateRange.from), parseISO(dateRange.to)) > 0) return false;

	return true;
}
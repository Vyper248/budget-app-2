import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import parseISO from "date-fns/parseISO";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import compareAsc from "date-fns/compareAsc";
import addMonths from "date-fns/addMonths";
import isValid from "date-fns/isValid";
import subDays from "date-fns/subDays";

import type { DateRange } from "@/components/DateRangeInput/DateRangeInput";
import type { PayPeriodType } from "@/redux/settingsSlice";

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

export const compareDates = (a: string, b: string) => {
	return compareAsc(parseISO(a), parseISO(b));
}

export const isWithinRange = (dateRange: DateRange, date: string) => {
	if (!isValidDateRange(dateRange)) return true;
	if (!isValid(parseISO(date))) return false;

	if (compareAsc(parseISO(date), parseISO(dateRange.from)) >= 0 && compareAsc(parseISO(date), parseISO(dateRange.to)) <= 0) return true;
	return false;
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

export const getDateArray = (dateRange: DateRange, startDate: string, payPeriodType: PayPeriodType, periodsToDisplay: number) => {
	const useableDateRange = isValidDateRange(dateRange) ? dateRange : undefined;
	let dates = getDates(startDate, payPeriodType, useableDateRange);
	if (isValidDateRange(dateRange) === false) dates = dates.slice(-periodsToDisplay);
	return dates;
}

export const getDates = (startDate: string, payPeriodType: PayPeriodType, dateRange?: DateRange) => {
	let dates = [] as string[];

	let date = parseISO(startDate);
    if (dateRange) date = parseISO(getDateValue(dateRange.from, startDate, payPeriodType));
	let dateTo = new Date();
    if (dateRange) dateTo = parseISO(getDateValue(dateRange.to, startDate, payPeriodType));

	const dateFormat = 'yyyy-MM-dd';

	if (payPeriodType === 'monthly') {
		while (compareAsc(dateTo, date) >= 0) {
			dates.push(format(date, dateFormat));
			date = addMonths(date, 1);
		}
	} else {
		let payPeriodDays = getDaysInPeriod(payPeriodType);
		while (compareAsc(dateTo, date) >= 0) {
			dates.push(format(date, dateFormat));
			date = addDays(date, payPeriodDays);
		}
	}

	return dates;
}

//returns the last pay period start date for a given date
export const getDateValue = (date: string, startDate: string, payPeriodType: PayPeriodType) => {
    if (payPeriodType === 'monthly') {
        const yearMonth = date.slice(0,7);
        const day = startDate.slice(8);
        return `${yearMonth}-${day}`;
    } else {
		if (compareAsc(parseISO(date), parseISO(startDate)) < 0) {
			let days = getDaysInPeriod(payPeriodType);
			let daysFromStart = differenceInCalendarDays(parseISO(startDate), parseISO(date));
			let payPeriod = Math.floor(daysFromStart/days);
			let payMonth = format(subDays(parseISO(startDate), payPeriod*days), 'yyyy-MM-dd');
			return payMonth;
		} else {
			let days = getDaysInPeriod(payPeriodType);
			let daysFromStart = differenceInCalendarDays(parseISO(date), parseISO(startDate));
			let payPeriod = Math.floor(daysFromStart/days);
			let payMonth = format(addDays(parseISO(startDate), payPeriod*days), 'yyyy-MM-dd');
			return payMonth;
		}
    }
}

export const getDaysInPeriod = (payPeriodType: PayPeriodType) => {
	switch(payPeriodType) {
		case 'fourWeekly': return 28;
		case 'twoWeekly': return 14;
		case 'weekly': return 7;
		default: return 0;
	}
}
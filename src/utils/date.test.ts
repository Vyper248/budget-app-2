import { vi } from "vitest";
import { formatDate, formatMonthYear, isValidDateRange, getInvalidDateRangeMessage, 
    getDateValue, getDaysInPeriod, getDates, getDateArray, isWithinRange, compareDates } from "./date.utils";

describe('Testing the formatDate function', () => {
    it('Formats a date string', () => {
        expect(formatDate('2020-01-01')).toBe('Jan 1, 2020');
        expect(formatDate('2023-12-26')).toBe('Dec 26, 2023');
    });
});

describe('Testing the formatMonthYear function', () => {
    it('Returns the correctly formatted date', () => {
        expect(formatMonthYear('2022-01-01')).toBe('January 2022');
        expect(formatMonthYear('2023-05-01')).toBe('May 2023');
    });
});

describe('Testing the isValidDateRange function', () => {
    it('Returns false when an incorrect date is provided', () => {
        expect(isValidDateRange({from: '', to: ''})).toBeFalsy();
        expect(isValidDateRange({from: '2023-01-01', to: ''})).toBeFalsy();
        expect(isValidDateRange({from: '', to: '2023-01-01'})).toBeFalsy();
        expect(isValidDateRange({from: '2023-01-01', to: '01-01'})).toBeFalsy();
        expect(isValidDateRange({from: '2023-01-01', to: '01-01-10'})).toBeFalsy();
        expect(isValidDateRange({from: '2020424325', to: 'ada290j9'})).toBeFalsy();
    });

    it('Returns false if "from" date is after "to" date', () => {
        expect(isValidDateRange({from: '2023-01-01', to: '2022-01-01'})).toBeFalsy();
        expect(isValidDateRange({from: '2023-01-02', to: '2023-01-01'})).toBeFalsy();
    });

    it('Returns true when a correct date range is provided', () => {
        expect(isValidDateRange({from: '2023-01-01', to: '2023-02-01'})).toBeTruthy();
    });
});

describe('Testing the getInvalidDateRangeMessage function', () => {
    it('Returns the correct messages', () => {
        expect(getInvalidDateRangeMessage({from: '1230-01-01', to: '2023-01-01'})).toBe('Error: First date is not valid.');
        expect(getInvalidDateRangeMessage({from: '2023-01-01', to: '1234-01-01'})).toBe('Error: Second date is not valid.');
        expect(getInvalidDateRangeMessage({from: '2023-02-01', to: '2023-01-01'})).toBe('Error: Second date should be after first date.');
    });

    it('Returns empty string if one of the dates is empty', () => {
        expect(getInvalidDateRangeMessage({from: '', to: '2023-01-01'})).toBe('');
        expect(getInvalidDateRangeMessage({from: '2023-01-01', to: ''})).toBe('');
    });
});

describe('Testing the getDates function', () => {
    it('Gives the correct array of dates when using a date range', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: '2023-02-01',
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'monthly', dateRange);

        expect(dates.length).toBe(2);
        expect(dates[0]).toBe('2023-02-01');
        expect(dates[1]).toBe('2023-03-01');
    });

    it('Gives the correct array of dates for a monthly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'monthly', dateRange);

        expect(dates.length).toBe(3);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-02-01');
        expect(dates[2]).toBe('2023-03-01');
    });

    it('Gives the correct array of dates for a 4 weekly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'fourWeekly', dateRange);

        expect(dates.length).toBe(3);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-01-29');
        expect(dates[2]).toBe('2023-02-26');
    });

    it('Gives the correct array of dates for a 2 weekly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'twoWeekly', dateRange);

        expect(dates.length).toBe(5);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-01-15');
        expect(dates[2]).toBe('2023-01-29');
        expect(dates[3]).toBe('2023-02-12');
        expect(dates[4]).toBe('2023-02-26');
    });

    it('Gives the correct array of dates for a weekly pay period', () => {
        const startDate = '2023-01-01';
        const dateRange = {
            from: startDate,
            to: '2023-03-01'
        }
        const dates = getDates(startDate, 'weekly', dateRange);

        expect(dates.length).toBe(9);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-01-08');
        expect(dates[2]).toBe('2023-01-15');
        expect(dates[3]).toBe('2023-01-22');
        expect(dates[4]).toBe('2023-01-29');
        expect(dates[5]).toBe('2023-02-05');
        expect(dates[6]).toBe('2023-02-12');
        expect(dates[7]).toBe('2023-02-19');
        expect(dates[8]).toBe('2023-02-26');
    });
});

describe('Testing the getDaysInPeriod function', () => {
    it('Returns the correct value', () => {
        expect(getDaysInPeriod('fourWeekly')).toBe(28);
        expect(getDaysInPeriod('twoWeekly')).toBe(14);
        expect(getDaysInPeriod('weekly')).toBe(7);
        expect(getDaysInPeriod('monthly')).toBe(0); //not used for monthly
    });
});

describe('Testing the getDateValue function', () => {
    it('Returns the correct date for a monthly pay period', () => {
        expect(getDateValue('2023-02-20', '2023-01-05', 'monthly')).toBe('2023-02-05');
        expect(getDateValue('2023-03-14', '2023-01-01', 'monthly')).toBe('2023-03-01');
        expect(getDateValue('2023-01-02', '2023-01-01', 'monthly')).toBe('2023-01-01');
    });

    it('Returns the correct date if date is before start date', () => {
        expect(getDateValue('2022-02-20', '2023-01-01', 'monthly')).toBe('2022-02-01');
        expect(getDateValue('2022-12-31', '2023-01-01', 'monthly')).toBe('2022-12-01');
        expect(getDateValue('2023-01-01', '2023-01-01', 'monthly')).toBe('2023-01-01');
    });

    it('Returns the correct date for a 4 weekly pay period', () => {
        expect(getDateValue('2023-01-15', '2023-01-01', 'fourWeekly')).toBe('2023-01-01');
        expect(getDateValue('2023-01-30', '2023-01-01', 'fourWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-10', '2023-01-01', 'fourWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-03-01', '2023-01-01', 'fourWeekly')).toBe('2023-02-26');
    });

    it('Returns the correct date for a 2 weekly pay period', () => {
        expect(getDateValue('2023-01-17', '2023-01-01', 'twoWeekly')).toBe('2023-01-15');
        expect(getDateValue('2023-01-30', '2023-01-01', 'twoWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-10', '2023-01-01', 'twoWeekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-20', '2023-01-01', 'twoWeekly')).toBe('2023-02-12');
        expect(getDateValue('2023-03-01', '2023-01-01', 'twoWeekly')).toBe('2023-02-26');
    });

    it('Returns the correct date for a weekly pay period', () => {
        expect(getDateValue('2023-01-17', '2023-01-01', 'weekly')).toBe('2023-01-15');
        expect(getDateValue('2023-01-30', '2023-01-01', 'weekly')).toBe('2023-01-29');
        expect(getDateValue('2023-02-10', '2023-01-01', 'weekly')).toBe('2023-02-05');
        expect(getDateValue('2023-02-20', '2023-01-01', 'weekly')).toBe('2023-02-19');
        expect(getDateValue('2023-03-01', '2023-01-01', 'weekly')).toBe('2023-02-26');
    });
});

describe('Testing the getDateValue function', () => {
    it('Returns a correct list of dates with a dateRange', () => {
        let dates = getDateArray({from: '2023-01-01', to: '2023-04-01'}, '2023-01-01', 'monthly', 5);
        expect(dates).toHaveLength(4);
        expect(dates[0]).toBe('2023-01-01');
        expect(dates[1]).toBe('2023-02-01');
        expect(dates[2]).toBe('2023-03-01');
        expect(dates[3]).toBe('2023-04-01');
    });

    it('Ignores the number of pay periods if a date range is provided', () => {
        let dates = getDateArray({from: '2023-01-12', to: '2023-07-01'}, '2023-01-01', 'monthly', 5);
        expect(dates).toHaveLength(7);
        expect(dates[0]).toBe('2023-01-01');
    });

    it('Returns the correct number of pay periods if no date range is given', () => {
        vi.setSystemTime(new Date('2023-06-01'));

        let dates = getDateArray({from: '', to: ''}, '2023-01-01', 'monthly', 3);
        expect(dates).toHaveLength(3);
        expect(dates[0]).toBe('2023-04-01');
        expect(dates[1]).toBe('2023-05-01');
        expect(dates[2]).toBe('2023-06-01');
    });
});

describe('Testing the isWithinRange function', () => {
    it('Returns true if range is invalid', () => {
        expect(isWithinRange({from: '', to: ''}, '2022-01-01')).toBe(true);
    })

    it('Returns false if date is invalid', () => {
        expect(isWithinRange({from: '2022-01-01', to: '2022-03-01'}, '')).toBe(false);
    });

    it('Returns true if date is within range', () => {
        expect(isWithinRange({from: '2022-01-01', to: '2022-03-01'}, '2022-02-01')).toBe(true);
    });

    it('Returns false if date is not within range', () => {
        expect(isWithinRange({from: '2022-01-01', to: '2022-03-01'}, '2022-05-01')).toBe(false);
        expect(isWithinRange({from: '2022-01-01', to: '2022-03-01'}, '2021-12-01')).toBe(false);
    });
});

describe('Testing the compareDates function', () => {
    it('Returns -1 if date1 is before date2', () => {
        expect(compareDates('2022-01-01', '2022-01-02')).toBe(-1);
    });

    it('Returns 0 if date1 is equal to date2', () => {
        expect(compareDates('2022-01-01', '2022-01-01')).toBe(0);
    });

    it('Returns 1 if date1 is after date2', () => {
        expect(compareDates('2022-02-01', '2022-01-01')).toBe(1);
    });

    it('Returns 0 if dates are invalid', () => {
        expect(compareDates('asd2ad2', '2022-01-01')).toBe(0);
        expect(compareDates('acbrdhsfd', 'asdawdawdwad')).toBe(0);
        expect(compareDates('2022-01-01', 'asdawdawdwad')).toBe(0);
    });
});
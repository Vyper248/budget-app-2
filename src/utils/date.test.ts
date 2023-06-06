import { formatDate, isValidDateRange, getInvalidDateRangeMessage } from "./date.utils";

describe('Testing the formatDate function', () => {
    it('Formats a date string', () => {
        expect(formatDate('2020-01-01')).toBe('Jan 1, 2020');
        expect(formatDate('2023-12-26')).toBe('Dec 26, 2023');
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
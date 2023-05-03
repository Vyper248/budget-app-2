import { formatDate } from "./date.utils";

describe('Testing the formatDate function', () => {
    it('Formats a date string', () => {
        expect(formatDate('2020-01-01')).toBe('Jan 1, 2020');
        expect(formatDate('2023-12-26')).toBe('Dec 26, 2023');
    });
});
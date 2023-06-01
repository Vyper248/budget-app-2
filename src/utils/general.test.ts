import { joinStrings, getObjectName, getStartingBalance } from "./general.utils";

import type { Category } from "@/redux/categoriesSlice";

describe('Testing the joinStrings function', () => {
    it('Should join any number of strings using any string provided', () => {
        expect(joinStrings('-', 'hello', 'world')).toBe('hello-world');
        expect(joinStrings(' ', 'hello', 'world')).toBe('hello world');
        expect(joinStrings('', 'hello', 'world')).toBe('helloworld');
        expect(joinStrings(' ', 'hello')).toBe('hello');
        expect(joinStrings('-', 'hello', 'world', 'again', 'test')).toBe('hello-world-again-test');
    });
});

describe('Testing the getObjectName function', () => {
    it('Should return the name of the object', () => {
        const mockObjects = [
            {
                id: 1,
                name: 'test1'
            },
            {
                id: 2,
                name: 'hello'
            },
            {
                id: 3,
                name: 'world'
            }
        ];

        expect(getObjectName(1, mockObjects)).toBe('test1');
        expect(getObjectName(2, mockObjects)).toBe('hello');
        expect(getObjectName(3, mockObjects)).toBe('world');
    });

    it('Should add a string to the name if provided', () => {
        const mockObjects = [
            {
                id: 1,
                name: 'test1'
            },
            {
                id: 2,
                name: 'hello'
            },
            {
                id: 3,
                name: 'world'
            }
        ];

        expect(getObjectName(1, mockObjects, '-test')).toBe('test1-test');
        expect(getObjectName(2, mockObjects, '-test')).toBe('hello-test');
        expect(getObjectName(3, mockObjects, '-test')).toBe('world-test');
    
    });
});

describe('Testing the getStartingBalance function', () => {
    it('Returns a negative value if category is an expense type', () => {
        let mockCategory = {type: 'expense', startingBalance: 100} as Category;
        expect(getStartingBalance(mockCategory)).toBe(-100);
    });

    it('Returns a normal value if category is an incom type', () => {
        let mockCategory = {type: 'income', startingBalance: 100} as Category;
        expect(getStartingBalance(mockCategory)).toBe(100);
    });
});
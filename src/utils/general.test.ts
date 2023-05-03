import { joinStrings, getObjectName } from "./general.utils";

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
import { mergeArrays } from "./sync.utils";

describe('Testing the mergeArrays function', () => {
    it('Returns an array of updated data', () => {
        const localData = [{id: 1, updated: 1}, {id: 2, updated: 1}];
        const serverData = [{id: 1, updated: 5}];

        const merged = mergeArrays(localData, serverData);

        expect(merged[0].updated).toBe(5);
        expect(merged[1].updated).toBe(1);
    });

    it('Returns an array of merged data if server added data', () => {
        const localData = [{id: 1, updated: 1}, {id: 2, updated: 1}];
        const serverData = [{id: 3, updated: 1}];

        const merged = mergeArrays(localData, serverData);

        expect(merged[0].updated).toBe(1);
        expect(merged[1].updated).toBe(1);
        expect(merged[2].updated).toBe(1);
    });

    it('Returns same array if empty array given as server data', () => {
        const localData = [{id: 1, updated: 1}, {id: 2, updated: 1}];
        const serverData = [] as {id: number, updated: number}[];

        const merged = mergeArrays(localData, serverData);

        expect(merged[0].updated).toBe(1);
        expect(merged[1].updated).toBe(1);
        expect(merged).toHaveLength(2);
    });
});
import {fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { getBasicMockState, render } from './test.utils';
import * as hooks from '@/redux/hooks';
import { vi } from 'vitest';

import { setSelectedItem, setSelectedTotal } from '@/redux/generalSlice';
import { useClickOutside, useItemObj, useTransactionUpdate } from "./customHooks.utils";

import type { Account } from '@/redux/accountsSlice';
import type { Transaction } from '@/redux/transactionsSlice';
import type { TransactionDisplay } from './summary.utils';

const mockAccount = {
    id: 2,
    name: 'Account'
} as Account

const mockAccount2 = {
    id: 1,
    name: 'Another'
} as Account

const MockComponent = ({selectedItem}: {selectedItem: number}) => {
    const [item, onSelectItem] = useItemObj(selectedItem, [mockAccount, mockAccount2]);

    const onClickButton = () => {
        onSelectItem(2);
    }

    return (
        <div>
            { item ? item.name : null }
            <button onClick={onClickButton}>Click</button>
        </div>
    );
}

it('Loads element without crashing', () => {
    render(<MockComponent selectedItem={1}/>);
});

it('Displays the correct item', () => {
    render(<MockComponent selectedItem={1}/>);

    let element = screen.getByText('Another');
    expect(element).toBeInTheDocument();
});

it('Returns a working function to select another item', () => {
    const mockFn = vi.fn();
    vi.spyOn(hooks, 'useAppDispatch').mockImplementation(() => mockFn);

    render(<MockComponent selectedItem={1}/>);

    let button = screen.getByRole('button');
    button.click();

    expect(mockFn).toHaveBeenCalledWith(setSelectedItem(2));
});

describe('Testing useClickOutside hook', () => {
    let mockCallback = vi.fn();

    const MockComponent2 = ({open}: {open: boolean}) => {
        const ref = useClickOutside(mockCallback, open);
    
        return (
            <div>
                <div ref={ref}>
                    Test
                </div>
                <div role='outside'>
                    Test 2
                </div>
            </div>
        )
    }
    
    beforeEach(() => {
        mockCallback.mockReset();
    });

    it('Allows user to click outside and run a callback', () => {
        render(<MockComponent2 open={true}/>);
        const outside = screen.getByRole('outside');
        expect(outside).toBeInTheDocument();
        fireEvent.click(outside);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        fireEvent.click(outside);
        expect(mockCallback).toHaveBeenCalledTimes(2);
    });
    
    it('Does not do anything when menu is not open', () => {
        render(<MockComponent2 open={false}/>);
        const outside = screen.getByRole('outside');
        expect(outside).toBeInTheDocument();
        fireEvent.click(outside);
        expect(mockCallback).not.toHaveBeenCalled();
    });
});

type BasicDataObj = {
    [key: string]: {
        [key: number]: TransactionDisplay
    }
}

describe('Testing useTransactionUpdate hook', () => {
    const mockTransactions = [
        {id: 1} as Transaction,
        {id: 2} as Transaction
    ];

    const mockTransactions2 = [
        {id: 1} as Transaction,
        {id: 2} as Transaction,
        {id: 3} as Transaction
    ];

    const mockDataObj = {
        'date': {
            1: {
                total: 0,
                transactions: [...mockTransactions]
            }
        }
    }

    const mockSelectedTotal = {
        transactions: [...mockTransactions], 
        date: 'date', 
        itemId: 1, 
        type: 'expense', 
        x: 0, 
        y: 0
    }

    const MockComponent2 = ({transactions}: {transactions: Transaction[]}) => {
        useTransactionUpdate(mockDataObj, transactions);
        return <div></div>
    }

    it('Dispatches data when transactions changes', () => {
        const mockDispatch = vi.fn();
        vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);
        const basicState = getBasicMockState({general: {selectedTotal: mockSelectedTotal}});

        //always called the first time
        const { rerender } = render(<MockComponent2 transactions={mockTransactions}/>, basicState);
        expect(mockDispatch).toBeCalledTimes(1);

        //same transactions, so not called again
        rerender(<MockComponent2 transactions={mockTransactions}/>);
        expect(mockDispatch).toBeCalledTimes(1);

        //new transactions, so called again, dispatching data from mockDataObj
        rerender(<MockComponent2 transactions={mockTransactions2}/>);
        expect(mockDispatch).toBeCalledTimes(2);
        expect(mockDispatch).toBeCalledWith(setSelectedTotal(mockSelectedTotal));
    });
});
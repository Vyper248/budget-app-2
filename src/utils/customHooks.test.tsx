import {fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { render } from './test.utils';
import * as hooks from '@/redux/hooks';
import { vi } from 'vitest';

import { useItemObj } from './customHooks.utils';
import { Account } from '@/redux/accountsSlice';
import { setSelectedItem } from '@/redux/generalSlice';
import { useClickOutside } from "./customHooks.utils";

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
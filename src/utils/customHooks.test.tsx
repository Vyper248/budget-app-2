import {screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { render } from './test.utils';
import * as hooks from '../redux/hooks';
import { vi } from 'vitest';

import { useItemObj } from './customHooks.utils';
import { Account } from '../redux/accountsSlice';
import { setSelectedItem } from '../redux/generalSlice';

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
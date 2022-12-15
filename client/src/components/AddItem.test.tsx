import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as api from '../utils/api';

import AddItem from './AddItem';

describe('<AddItem />', () => {
  jest.spyOn(api, 'submitItemToGroceryList').mockResolvedValue(Promise.resolve([]));
  it('should render the given text label', () => {
    render(
      <AddItem
        items={[]}
        setItems={() => {
        }}
      />);
    expect(screen.queryByPlaceholderText('Add Shopping Item')).toBeVisible();
  });
  it('should submit the item to the grocery list', () => {
    const setItems = jest.fn();
    render(
      <AddItem
        items={[]}
        setItems={setItems}
      />);
    const input = screen.getByPlaceholderText('Add Shopping Item') as HTMLInputElement;
    const button = screen.getByText('Add');
    input.value = 'test';
    button.click();
    expect(api.submitItemToGroceryList).toHaveBeenCalled();
  });
  it('should change input value when the user types a new value', async () => {
    const setItems = jest.fn();
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(
      <AddItem
        items={[]}
        setItems={setItems}
      />);

    await user.type(getByPlaceholderText('Add Shopping Item'), 'new value');

    await waitFor(() => {
      const input = getByPlaceholderText('Add Shopping Item') as HTMLInputElement;
      expect(input.value).toEqual('new value');
    });
  });
});
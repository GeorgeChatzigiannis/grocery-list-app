import { act, render, screen, waitFor } from '@testing-library/react';
import ShoppingList from './ShoppingList';
import userEvent from '@testing-library/user-event';
import * as api from '../utils/api';

describe('<ShoppingList />', () => {
  it('should render the component', () => {
    render(
      <ShoppingList
        items={[
          {
            id: 1,
            name: 'test',
            isEditMode: false,
            isComplete: false,
          }
        ]}
        setItems={() => {
        }}
      />);
    expect(screen.getByText('test')).toBeVisible();
  });
  it('should edit an item of the list and submit it', async () => {
    jest.spyOn(api, 'updateGroceryListItem').mockResolvedValue(Promise.resolve([]));
    const items = [
      {
        id: 0,
        name: 'test',
        isEditMode: false,
        isComplete: false,
      }
    ];
    const setItems = jest.fn().mockImplementation(() => {
      items[0].name = 'test2';
      return items;
    });
    render(
      <ShoppingList
        items={items}
        setItems={setItems}
      />);
    await act(async () => {
      await screen.getByTestId('edit-item-0').click();
    });
    const inputSet = screen.getByTestId('edit-input-0');
    const input = inputSet.children[0].children[0] as HTMLInputElement;
    await waitFor(async () => {
      await userEvent.type(input, '2');
    });
    await waitFor(async () => {
      const updatedInput = await screen.getByTestId('edit-input-0').children[0].children[0] as HTMLInputElement;
      expect(updatedInput.value).toEqual('test2');
    });
    await act(async () => {
      await screen.getByTestId('submit-value-0').click();
    });
    expect(api.updateGroceryListItem).toHaveBeenCalled();
  });
  it('should attempt to edit then cancel editing an item from the list', async () => {
    jest.spyOn(api, 'updateGroceryListItem').mockResolvedValue(Promise.resolve([]));
    const items = [
      {
        id: 0,
        name: 'test',
        isEditMode: false,
        isComplete: false,
      }
    ];
    const setItems = jest.fn()
      .mockImplementation((args) => {
        items[0].name = args[0].name;
        return items;
      });
    render(
      <ShoppingList
        items={items}
        setItems={setItems}
      />);
    await act(async () => {
      await screen.getByTestId('edit-item-0').click();
    });
    const inputSet = screen.getByTestId('edit-input-0');
    const input = inputSet.children[0].children[0] as HTMLInputElement;
    await waitFor(async () => {
      await userEvent.type(input, '2');
    });
    await act(async () => {
      await screen.getByTestId('close-input-0').click();
    });
    await waitFor(async () => {
      const updatedInput = await screen.getByTestId('edit-input-0').children[0].children[0] as HTMLInputElement;
      expect(updatedInput.value).toEqual('test');
    });
  });
  it('should delete an item of the list', async () => {
    const deleteSpy = jest.spyOn(api, 'deleteGroceryListItem').mockResolvedValue(Promise.resolve([]));
    const items = [
      {
        id: 0,
        name: 'test',
        isEditMode: false,
        isComplete: false,
      }
    ];
    const setItems = jest.fn();
    render(
      <ShoppingList
        items={items}
        setItems={setItems}
      />);
    await act(async () => {
      const deleteButton = screen.getByTestId('delete-item-0');
      deleteButton.click();
    });
    await waitFor(() => {
      expect(deleteSpy).toHaveBeenCalled();
    });
  });
  it('should mark an item as complete', async () => {
    const updateSpy = jest.spyOn(api, 'updateGroceryListItem').mockResolvedValue(Promise.resolve([]));
    const items = [
      {
        id: 0,
        name: 'test',
        isEditMode: false,
        isComplete: false,
      }
    ];
    const setItems = jest.fn();
    render(
      <ShoppingList
        items={items}
        setItems={setItems}
      />);
    await act(async () => {
      const completeCheckbox = screen.getByTestId('checkbox-0');
      completeCheckbox.click();
    });
    await waitFor(() => {
      expect(updateSpy).toHaveBeenCalledWith({
        id: 0,
        name: 'test',
        isComplete: true,
        isEditMode: false
      });
    });
  });
});
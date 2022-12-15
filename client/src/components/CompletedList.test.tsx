import { render, screen } from '@testing-library/react';
import CompletedList from './CompletedList';
import * as api from '../utils/api';

describe('<CompletedList />', () => {
  it('should render the component', () => {
    render(
      <CompletedList
        items={[
          {
            id: 1,
            name: 'test',
            isEditMode: false,
            isComplete: true,
          }
        ]}
        setItems={() => {}}
      />);
    expect(screen.getByText('test')).toBeVisible();
  });
  it('should delete an item from the completed list', async () => {
    jest.spyOn(api, 'deleteGroceryListItem').mockResolvedValue(Promise.resolve([]));
    const items = [
      {
        id: 0,
        name: 'test',
        isEditMode: false,
        isComplete: true,
      }
    ];
    const setItems = jest.fn().mockImplementation(() => {
      items.pop();
      return items;
    });
    render(
      <CompletedList
        items={items}
        setItems={setItems}
      />);
    await screen.getByTestId('delete-complete-0').click();
    expect(api.deleteGroceryListItem).toHaveBeenCalled();
  });
  it('should uncheck an item from the completed list', async () => {
    jest.spyOn(api, 'updateGroceryListItem').mockResolvedValue(Promise.resolve([]));
    const items = [
      {
        id: 0,
        name: 'test',
        isEditMode: false,
        isComplete: true,
      }
    ];
    const setItems = jest.fn().mockImplementation(() => {
      items[0].isComplete = false;
      return items;
    });
    render(
      <CompletedList
        items={items}
        setItems={setItems}
      />);
    await screen.getByTestId('completed-checkbox-0').click();
    expect(api.updateGroceryListItem).toHaveBeenCalledWith( {
      id: 0,
      name: 'test',
      isComplete: false,
      isEditMode: false
    });
  });
});
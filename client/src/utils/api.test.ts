import { GroceryListItem } from '../interfaces/GroceryListItem';
import { getGroceryList, submitItemToGroceryList, updateGroceryListItem, deleteGroceryListItem } from './api';

describe('api util', () => {
  const expected: GroceryListItem[] = [
    {
      id: 1,
      name: 'Milk',
      isComplete: false,
      isEditMode: false,
    },
    {
      id: 2,
      name: 'Eggs',
      isComplete: false,
      isEditMode: false,
    },
  ];
  describe('getGroceryList', () => {
    it('fetch data from the api', async () => {
      const fetchMock = global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(expected),
        } as Response);
      });
      const actual = await getGroceryList();
      expect(fetchMock).toHaveBeenCalled();
      expect(actual).toEqual(expected);
    });
  });
  describe('submitItemToGroceryList', () => {
    it('submit data to the api', async () => {
      const submittedItem = {
        id: 3,
        name: 'Bread',
        isComplete: false,
        isEditMode: false,
      };
      const fetchMock = global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve([...expected, submittedItem]),
        } as Response);
      });
      const updatedList = await submitItemToGroceryList(submittedItem);
      expect(fetchMock).toHaveBeenCalled();
      expect(updatedList).toEqual([...expected, submittedItem]);
    });
  });
  describe('updateGroceryListItem', () => {
    it('update data in the api', async () => {
      const updatedItem = {
        id: 2,
        name: 'Eggs',
        isComplete: true,
        isEditMode: false,
      };
      const fetchMock = global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve([expected[0], updatedItem]),
        } as Response);
      });
      const updatedList = await updateGroceryListItem(updatedItem);
      expect(fetchMock).toHaveBeenCalled();
      expect(updatedList).toEqual([expected[0], updatedItem]);
    });
  });
  describe('deleteGroceryListItem', () => {
    it('delete data from the api', async () => {
      const fetchMock = global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve([expected[0]]),
        } as Response);
      });
      const updatedList = await deleteGroceryListItem(2);
      expect(fetchMock).toHaveBeenCalled();
      expect(updatedList).toEqual([expected[0]]);
    });
  });
});
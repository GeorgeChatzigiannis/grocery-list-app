import itemUtils from './item-utils';
import { ListItem } from '../interfaces/ListItem';

describe('item-utils', () => {
  let items: ListItem[];
  beforeEach(() => {
    if (items?.length > 0) {
      items.map((item) => itemUtils.deleteItem(item.id.toString()));
    }
  });
  describe('getAll', () => {
    it('should return an empty array', () => {
      items = itemUtils.getAll();
      expect(items).toStrictEqual([]);
    });
  });
  describe('addItem', () => {
    it('should add an item to the array', () => {
      const item = {id: 1, name: 'item1', isComplete: false};
      itemUtils.addItem(item);
      items = itemUtils.getAll();
      expect(items).toStrictEqual([item]);
    });
  });
  describe('updateItem', () => {
    it('should update an item in the array', () => {
      const item = {id: 1, name: 'item1', isComplete: false};
      itemUtils.addItem(item);
      const updatedItem = {id: 1, name: 'item1', isComplete: true};
      itemUtils.updateItem(updatedItem);
      items = itemUtils.getAll();
      expect(items).toStrictEqual([updatedItem]);
    });
    it('should throw an error if the item is not found', () => {
      const item = {id: 1, name: 'item1', isComplete: false};
      expect(() => itemUtils.updateItem(item)).toThrowError('Item not found');
    });
  });
  describe('deleteItem', () => {
    it('should delete an item from the array', () => {
      const item = {id: 1, name: 'item1', isComplete: false};
      itemUtils.addItem(item);
      itemUtils.deleteItem('1');
      items = itemUtils.getAll();
      expect(items).toStrictEqual([]);
    });
    it('should throw an error if the item is not found', () => {
      expect(() => itemUtils.deleteItem('1')).toThrowError('Item not found');
    });
  });
});
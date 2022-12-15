import * as itemValidator from './item-validator';

describe('itemValidator', () => {
  describe('validateItem', () => {
    it('should return an empty array if there are no validation errors', () => {
      const item = {id: 1, name: 'item1', isComplete: false};
      const validationErrors = itemValidator.validateItem(item);
      expect(validationErrors).toStrictEqual([]);
    });
    it('should return an array of validation errors if there are validation errors', () => {
      const item = {id: 1, name: '', isComplete: false};
      const validationErrors = itemValidator.validateItem(item);
      expect(validationErrors).toStrictEqual(['No name provided']);
    });
  });
  describe('validateItemId', () => {
    it('should return an empty array if there are no validation errors', () => {
      const id = '1';
      const validationErrors = itemValidator.validateItemId(id);
      expect(validationErrors).toStrictEqual([]);
    });
    it('should return a validation error when no id is provided', () => {
      const id = '';
      const validationErrors = itemValidator.validateItemId(id);
      expect(validationErrors).toStrictEqual(['No id provided']);
    });
    it('should return a validation error when id is not a number', () => {
      const id = 'test';
      const validationErrors = itemValidator.validateItemId(id);
      expect(validationErrors).toStrictEqual(['Id is not a number']);
    });
  });
});
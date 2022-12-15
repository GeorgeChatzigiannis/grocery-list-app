import { ListItem } from '../interfaces/ListItem';

export const validateItem = (item: ListItem) => {
  const validationErrors: string[] = [];
  // if (!item || Object.keys(item).length === 0) {
  //   validationErrors.push('List item is empty or undefined');
  // }
  if (!item.name) {
    validationErrors.push('No name provided');
  }
  // if (item.isComplete === undefined || item.isComplete === null) {
  //   validationErrors.push('No isComplete flag provided');
  // }
  return validationErrors;
};

export const validateItemId = (id: string) => {
  const validationErrors: string[] = [];
  if (!id) {
    validationErrors.push('No id provided');
  }
  if (isNaN(Number(id))) {
    validationErrors.push('Id is not a number');
  }
  return validationErrors;
};

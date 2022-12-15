import { GroceryListItem } from '../interfaces/GroceryListItem';

const apiUrl = 'http://localhost:3000';

export const getGroceryList = async (): Promise<GroceryListItem[]> => {
  const response = await fetch(`${apiUrl}/api/items/all`);
  return response.json();
};

export const submitItemToGroceryList = async (newItem: GroceryListItem): Promise<GroceryListItem[]> => {
  // eslint-disable-next-line
  const { isEditMode, ...item } = newItem
  const response = await fetch(`${apiUrl}/api/items/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateGroceryListItem = async (updatedItem: GroceryListItem): Promise<GroceryListItem[]> => {
  // eslint-disable-next-line
  const { isEditMode, ...item } = updatedItem
  const response = await fetch(`${apiUrl}/api/items/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteGroceryListItem = async (itemId: number): Promise<GroceryListItem[]> => {
  const response = await fetch(`${apiUrl}/api/items/delete/${itemId}`, {
    method: 'DELETE',
  });
  return response.json();
};
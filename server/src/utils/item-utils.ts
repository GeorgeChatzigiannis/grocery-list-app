import { ListItem } from '../interfaces/ListItem';

const items: ListItem[] = [];

function getAll(): ListItem[] {
  return items;
}

function addItem(item: ListItem): void {
  items.push(item);
}

function updateItem(item: ListItem): void {
  const itemIndex = items.findIndex((i) => i.id === item.id);
  if (itemIndex === -1) {
    throw new Error('Item not found');
  }
  items[itemIndex] = item;
}

function deleteItem(itemId: string): void {
  const recordId = parseInt(itemId);
  const itemIndex = items.findIndex((i) => i.id === recordId);
  if (itemIndex === -1) {
    throw new Error('Item not found');
  }
  items.splice(itemIndex, 1);
}

export default {
  getAll,
  addItem,
  updateItem,
  deleteItem,
} as const;

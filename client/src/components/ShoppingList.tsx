import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { GroceryListItem } from '../interfaces/GroceryListItem';
import { StoredValue } from '../interfaces/StoredValue';
import { TextField } from '@mui/material';
import { deleteGroceryListItem, updateGroceryListItem } from '../utils/api';

interface CheckboxListProps {
  items: GroceryListItem[];
  // eslint-disable-next-line no-unused-vars
  setItems: (items: GroceryListItem[]) => void;
}

export default function ShoppingList({items, setItems}: CheckboxListProps) {
  const [storedValues, setStoredValues] = React.useState([] as StoredValue[]);
  const handleToggle = async (itemId: number) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;
    item.isComplete = true;
    await updateGroceryListItem(item);
    updateItems(items, item, itemId);
  };

  const toggleEdit = (itemId: number) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;
    setStoredValues([...storedValues, {id: item.id, name: item.name}]);
    item.isEditMode = true;
    updateItems(items, item, itemId);
  };

  const cancelEdit = (itemId: number) => {
    const storedValue = storedValues.find((val) => val.id === itemId);
    const item = items.find((item) => item.id === itemId);
    if (!storedValue || !item) return;
    item.isEditMode = false;
    item.name = storedValue.name;
    updateItems(items, item, itemId);
  };

  const handleEdit = (itemId: number, newValue: string) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;
    item.name = newValue;
    updateItems(items, item, itemId);
  };

  const submitNewValue = async (itemId: number) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;
    item.isEditMode = false;
    await updateGroceryListItem(item);
    updateItems(items, item, itemId);
    setStoredValues(items.map((item) => ({id: item.id, name: item.name})));
  };

  const deleteItem = async (itemId: number) => {
    const updatedList = items.filter((item) => item.id !== itemId);
    await deleteGroceryListItem(itemId);
    setItems  (updatedList);
    setStoredValues(updatedList.map((item) => ({id: item.id, name: item.name})));
  };

  const updateItems = (listItems: GroceryListItem[], updatedItem: GroceryListItem, updatedItemId: number) => {
    const itemsCopy = [...listItems];
    itemsCopy[updatedItemId] = updatedItem;
    setItems(itemsCopy);
  };

  const inCompleteItems = items.filter((item) => !item.isComplete);

  return (
    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
      {inCompleteItems?.length > 0 && inCompleteItems.map(({id, name, isEditMode}) => {
        const labelId = `checkbox-list-label-${name}`;
        return (
          <ListItem
            key={`item-${id}`}
            secondaryAction={
              <>
                {isEditMode ? (
                  <>
                    <IconButton edge="end" data-testid={`submit-value-${id}`} aria-label="check" onClick={() => submitNewValue(id)} style={{ marginRight: 0 }}>
                      <CheckIcon/>
                    </IconButton>
                    <IconButton edge="end" data-testid={`close-input-${id}`} aria-label="close" onClick={() => cancelEdit(id)}>
                      <CloseIcon/>
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton edge="end" data-testid={`edit-item-${id}`} aria-label="edit" onClick={() => toggleEdit(id)} style={{ marginRight: 0 }}>
                      <EditIcon/>
                    </IconButton>
                    <IconButton edge="end" data-testid={`delete-item-${id}`} aria-label="delete" onClick={() => deleteItem(id)}>
                      <DeleteIcon/>
                    </IconButton>
                  </>
                )}
              </>
            }
            disablePadding
          >
            <ListItemButton
              disableRipple
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  data-testid={`checkbox-${id}`}
                  tabIndex={-1}
                  disableRipple
                  onClick={() => handleToggle(id)}
                  inputProps={{'aria-labelledby': labelId}}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                data-testid={`list-item-text-${id}`}
                primary={isEditMode ?
                  <TextField
                    data-testid={`edit-input-${id}`}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {fontSize: 14},
                    }}
                    autoFocus
                    value={name}
                    onChange={(e) => {
                      handleEdit(id, e.target.value);
                    }}
                  /> : name}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

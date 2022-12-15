import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { GroceryListItem } from '../interfaces/GroceryListItem';
import { deleteGroceryListItem, updateGroceryListItem } from '../utils/api';

interface CheckboxListProps {
  items: GroceryListItem[];
  // eslint-disable-next-line no-unused-vars
  setItems: (items: GroceryListItem[]) => void;
}

export default function CompletedList({items, setItems}: CheckboxListProps) {
  const handleToggle = async (itemId: number) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;
    item.isComplete = false;
    await updateGroceryListItem(item);
    const itemsCopy = [...items];
    itemsCopy[itemId] = item;
    setItems(itemsCopy);
  };

  const deleteItem = async (itemId: number) => {
    const updatedList = items.filter((item) => item.id !== itemId);
    await deleteGroceryListItem(itemId);
    setItems(updatedList);
  };

  const completeItems = items.filter((item) => item.isComplete);

  return (
    <>
      {completeItems.length > 0 && <hr/>}
      <List sx={{width: '100%', bgcolor: 'background.paper'}}>
        {completeItems?.length > 0 && completeItems.map(({id, name}) => {
          const labelId = `checkbox-list-label-${name}`;
          return (
            <ListItem
              key={`item-${id}`}
              disablePadding
              secondaryAction={
                <>
                  <IconButton data-testid={`delete-complete-${id}`} edge="end" aria-label="comments" onClick={() => deleteItem(id)}>
                    <CloseIcon/>
                  </IconButton>
                </>
              }
            >
              <ListItemButton data-testid={`completed-checkbox-${id}`} onClick={() => handleToggle(id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked={true}
                    inputProps={{'aria-labelledby': labelId}}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  style={{textDecoration: 'line-through'}}
                  primary={name}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

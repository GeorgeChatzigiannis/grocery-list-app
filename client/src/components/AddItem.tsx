import * as React from 'react';
import { TextField, Paper, Button, Grid } from '@mui/material';
import { GroceryListItem } from '../interfaces/GroceryListItem';
import { submitItemToGroceryList } from '../utils/api';

interface Props {
  items: GroceryListItem[];
  // eslint-disable-next-line no-unused-vars
  setItems: (items: GroceryListItem[]) => void;
}

const AddItem = ({ items, setItems }: Props) => {
  const [itemToAdd, setItemToAdd] = React.useState('');
  const onButtonClick = async () => {
    const updatedList = await submitItemToGroceryList({
      id: items?.length || 0,
      name: itemToAdd,
      isComplete: false,
      isEditMode: false,
    });
    setItems(updatedList);
    setItemToAdd('');
  };
  const onTextFieldChange = (val: string) => {
    setItemToAdd(val);
  };

  return (
    <Paper style={{margin: 16, padding: 16}}>
      <Grid container>
        <Grid xs={9} md={11} item style={{paddingRight: 16}}>
          <TextField
            placeholder="Add Shopping Item"
            value={itemToAdd}
            onChange={(e) => onTextFieldChange(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid xs={3} md={1} item>
          <Button
            style={{height: '100%', color: '#1795d4'}}
            fullWidth
            variant="outlined"
            onClick={onButtonClick}
            disableRipple
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddItem;
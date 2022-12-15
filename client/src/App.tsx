import { useEffect, useState } from 'react';
import CompletedList from './components/CompletedList';
import ShoppingList from './components/ShoppingList';
import Layout from './components/Layout';
import AddItem from './components/AddItem';
import { getGroceryList } from './utils/api';
import { GroceryListItem } from './interfaces/GroceryListItem';

function App() {
  const [items, setItems] = useState([] as GroceryListItem[]);

  useEffect(() => {
    let ignore = false;
    const getItems = async () => await getGroceryList();
    getItems().then((items) => {
      if (!ignore) setItems(items);
    });
    return () => { ignore = true; };
  }, []);
  return (
    <Layout>
      <AddItem
        items={items}
        setItems={setItems}
      />
      <ShoppingList
        items={items}
        setItems={setItems}
      />
      <CompletedList
        items={items}
        setItems={setItems}
      />
    </Layout>
  );
}

export default App;

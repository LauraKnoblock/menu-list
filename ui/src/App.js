import React, {useState, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddItemForm from './components/AddItemForm';
import {Item} from "./components/Item";
import axios from "axios";
import { API_URL } from './utils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [items, setItems] = useState([]);

const fetchItems = async () => {
  try {
    const {data} = await axios.get(API_URL)

    setItems(data);
  } catch(err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchItems();
}, []);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddItemForm fetchItems={fetchItems} />
      {items.map((item) => <Item item={item} key = {item.id} fetchItems={fetchItems} />)}
    </ThemeProvider>
  );
}


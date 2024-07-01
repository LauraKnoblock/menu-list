import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import React, {useState} from 'react';
import Check from '@mui/icons-material/Check';
import axios from 'axios';

export const UpdateItemForm = ({ fetchItems, isDialogOpen, setIsDialogOpen, item}) => {
    const {id, vegan} = item;
    const {itemName, setItemName} = useState("");

    const handleUpdateItemName = async () => {
      try {
        await axios.put(`API_URL`, {
          id, 
          name: itemName,
          vegan
        });

        await fetchItems();
        setItemName("");
      } catch (err) {
        console.log(err);
      }
    }
  return <Dialog open = {isDialogOpen}>
  <DialogTitle>Edit Item</DialogTitle>
  <TextField 
    size ="small"
    label = "item"
    variat = "outline"
    onChange = {(e) => setItemName(e.target.value)} />
<Button
    variant = "contained"
    onClick = {async () => {
      await handleUpdateItemName();
      
      setIsDialogOpen(false);}}
    >
</Button>
  </Dialog>
}

export default UpdateItemForm

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { API_URL } from "../utils";

const AddItemForm = ({fetchItems}) => {
    const [newItem, setNewItem] = useState('');

    const addNewItem = async () => {
        try {
            await axios.post(API_URL, {
                name: newItem,
                vegan: false,
            });

            await fetchItems();

            setNewItem("");
        } catch (err){
            console.log(err);
        }
    }
  return (
    <div>
        <Typography variant = "h2" paddingTop={2} align = "center" paddingBottom={2}>
            Menu List
        </Typography>
        <div className = "addItemForm">
        <TextField 
            size="small" 
            label="Item" 
            variant="outlined" 
            value={newItem} 
            onChange = {(e) => setNewItem(e.target.value)} />
    <Button
        disabled = {!newItem.length}
        variant ="outlined"
        onClick={addNewItem}>
        <AddIcon />
    </Button>
        </div>
        
    </div>
  )
}

export default AddItemForm

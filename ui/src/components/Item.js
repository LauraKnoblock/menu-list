import { Button, Checkbox, Typography } from '@mui/material';
import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateItemForm from './UpdateItemForm';
import classnames from "classnames";
import axios from "axios";





export const Item = ({item, fetchItems}) => {
    const{ id, name, vegan } = item;
    const [isVegan, setIsVegan] = useState(vegan);
    const {isDialogOpen, setIsDialogOpen} = useState(false);
    const handleUpdateItemisVegan = async () => {
        try{
            await axios.put(`{API_URL}`, {
              id, name, vegan: !isVegan,  
            })
            setIsVegan((prev) => !prev);
        } catch (err) {
            console.log(err);
        }

        
    }

    const handleDeleteItem = async () => {
        try {

            await axios.delete(`{API_URL}/${item.id}`);
            await fetchItems();
        } catch (err) {
            console.log(err)
        }
    }
    return (
    <div className ="item">
        <div className = {classnames("flex",{done: isVegan} )}>
        <Checkbox 
        checked = {isVegan}
        onChange = {handleUpdateItemisVegan} />
        <Typography variant = "h4">{name}</Typography>
        </div>
        <div className="itemButtons">
        <Button variant="contained" onClick={()=>setIsDialogOpen(true)}>
            <EditIcon />
        </Button>
            
        <Button color = "error" variant="contained" onClick={handleDeleteItem}>
            <DeleteIcon />
        </Button>
        </div>
        <UpdateItemForm 
            fetchItems = {fetchItems}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            item={item}
            />

    </div>
  )
}

export default Item

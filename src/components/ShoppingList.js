import React, {useState} from "react";
import { Button, List, ListItem, ListItemText, IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './ShoppingList.scss';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const handleAddItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="shopping-list">
            <h3> Shopping List </h3>
            <div className="shopping-list-input">
                <TextField
                    label='Add Item'
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                    fullWidth
                />
                <Button onClick={handleAddItem} variant="contained" color="success">
                    Add
                </Button>
            </div>
            <List>
                {
                    items.map((item, index) => (
                        <ListItem key={index} secondaryAction={
                            <IconButton 
                                edge='end' 
                                aria-label='delete'
                                onClick={() => handleDeleteItem()} >
                                    <DeleteIcon/>
                            </IconButton>
                        }>
                            <ListItemText primary={item}/>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );
};

export default ShoppingList;
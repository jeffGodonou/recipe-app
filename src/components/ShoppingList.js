import React, {useEffect, useState} from "react";
import { Button, List, ListItem, ListItemText, IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './ShoppingList.scss';

const ShoppingList = ({ onAddShoppingList }) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        // make the shopping list appearing depending on if there is an items in the list or not
        setShowList(items.length > 0);
        console.log(items.length);
    }, [items]);
    
    const handleAddItem = () => {
        if (newItem.trim()) {
            setItems(prevList => [...prevList, newItem.trim()])
            setNewItem('');
        }
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSaveList = () => {
        if(items.length > 0) {
            onAddShoppingList({ items: items, createdAt: new Date().toLocaleDateString() });
            setItems([]);
        }
    }

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
            <Button onClick={handleSaveList} variant="contained" color="secondary">
                Save List
            </Button>
            {
                showList && 
                <List>
                {
                    items.map((item, index) => (
                        <ListItem key={index} secondaryAction={
                            <IconButton 
                                edge='end' 
                                aria-label='delete'
                                onClick={() => handleDeleteItem(index)} >
                                    <DeleteIcon/>
                            </IconButton>
                        }>
                            <ListItemText primary={item}/>
                        </ListItem>
                    ))
                }
                </List>
            }
        </div>
    );
};

export default ShoppingList;
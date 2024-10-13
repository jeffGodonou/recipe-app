import React, {useEffect, useState} from "react";
import { Button, Dialog, List, ListItem, ListItemText, IconButton, TextField, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './ShoppingList.scss';

const ShoppingList = ({ open, handleClose, onAddShoppingList }) => {
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
        <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{backgroundColor:'rgb(18, 26, 25)', color:'white', fontFamily:'Montserrat, sans-serif', fontStyle: 'italic'}}> Shopping List </DialogTitle>
            <DialogContent sx={{backgroundColor: 'rgb(249, 221, 128)'}}>
                <div className="shopping-list-input">
                    <TextField
                        label='Add Item'
                        value={newItem}
                        sx={{marginTop: '20px', marginBottom: '20px'}}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                        fullWidth />
                    <Button onClick={handleAddItem} variant="contained" sx={{backgroundColor: 'rgb(216, 120, 24)'}}>
                        Add
                    </Button>
                </div>
                {showList &&
                <List>
                    {items.map((item, index) => (
                        <ListItem key={index} secondaryAction={<IconButton
                            edge='end'
                            aria-label='delete'
                            onClick={() => handleDeleteItem(index)}>
                            <DeleteIcon />
                        </IconButton>}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>}
            </DialogContent>
            <DialogActions sx={{backgroundColor: 'rgb(249, 221, 128)'}}>
                <Button onClick={handleClose} variant="contained" sx={{backgroundColor: 'rgb(216, 120, 24)'}}>
                    Cancel
                </Button>
                <Button onClick={handleSaveList} variant="contained" sx={{backgroundColor: 'rgb(173, 51, 10)'}} autoFocus>
                    Save List
                </Button>
            </DialogActions>
        </Dialog></>
    );
};

export default ShoppingList;
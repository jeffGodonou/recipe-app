import React, {useState} from "react";
import ShoppingList from "./ShoppingList";
import { Button, Card, CardContent, IconButton, List, ListItem, ListItemText, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import emailjs from 'emailjs-com';
import './ShoppingListPage.scss';

const ShoppingListPage = ({shoppingLists, onAddShoppingList, onDeleteShoppingList }) => {
    const [open, setOpen] = useState(false);
    const [openMailBox, setOpenMailBox] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [email, setEmail] = useState('');

    const handleClickOpen = () => { setOpen(true) };

    const handleClickOpenMailBox = (list) => { 
        setSelectedList(list);
        setOpenMailBox(true); 
    };

    const handleClose = () => { setOpen(false) };

    const handleCloseMailBox = () => { 
        setOpenMailBox(false);
        setEmail('');
    };

    const sendEmail = () => {
        if(!selectedList) return;
        const formattedItems =  selectedList.items.map(item => `${item}`) ;
        console.log(formattedItems);
        const templateParams = {
            items: formattedItems,
            email: email,
            subject: 'Your shopping list',
        };

        emailjs.send('service_sifbatl', 'template_h54yvs5', templateParams, 'H7KVuvjhT3UJK7fHS')
                .then((response) => {
                    console.log('Email sent', response.status, response.text);
                    handleCloseMailBox();
                }, (error) => {
                    console.log('Email sending failed', error);
                });
    };

    return (
        <><div className="shopping-list-page">
            <div className="lists-container">
                <div className="header-bar">
                    <h2> Lists </h2>
                    <IconButton onClick={() => handleClickOpen()} color='error' className='add-button'>
                        <AddIcon />
                    </IconButton>
                    <ShoppingList open={open} handleClose={handleClose} onAddShoppingList={onAddShoppingList} />
                </div>

                {shoppingLists.length === 0 ? (
                    <Typography> No shopping lists saved </Typography>
                ) : (
                    <Grid container spacing={2}>
                        {shoppingLists.map(
                            list => (
                                <Grid item xs={12} sm={6} md={4} key={list.id}>
                                    <Card key={list.id} className="shopping-list-card">
                                        <CardContent>
                                            <Typography variant="h6">
                                                Shopping List
                                                <Typography variant="body2" color="textSecondary" style={{ float: 'right' }}> {list.createdAt} </Typography>
                                            </Typography>
                                            <List>
                                                {list.items.map((item, index) => (
                                                    <ListItem key={index}>
                                                        <ListItemText primary={item} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => onDeleteShoppingList(list.id)}
                                            >
                                                Delete List
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleClickOpenMailBox(list)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Send to email
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        )}
                    </Grid>
                )}
            </div>
        </div>
        <Dialog open={openMailBox} onClose={handleCloseMailBox} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> Email </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email to receive your shopping list
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseMailBox} color="primary"> Cancel </Button>
                <Button onClick={sendEmail} color="primary"> Send </Button>
            </DialogActions>
        </Dialog>
    </>
    );
};

export default ShoppingListPage;
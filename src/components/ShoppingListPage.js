import React, {useState} from "react";
import { Button, Card, CardContent, List, ListItem, ListItemText, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send"
import emailjs from 'emailjs-com';
import './ShoppingListPage.scss';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import Navbar from "./Navbar";
// import { getShoppingLists, updateShoppingList, deleteShoppingList } from "../api";

const ShoppingListPage = ({shoppingLists, onAddShoppingList, onDeleteShoppingList }) => {
    const [openMailBox, setOpenMailBox] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [email, setEmail] = useState('');
    const [state, setState] = useState({
        openMessage: false,
        vertical: 'bottom',
        horizontal: 'center',
        message: "Your shoppinglist was sent successfully"
    });
    const { openMessage, vertical, horizontal, message } = state;

    const handleClickOpenMailBox = (list) => { 
        setSelectedList(list);
        setOpenMailBox(true); 
    };

    const handleCloseMessage = () => {
        setState({...state, openMessage: false});
    };

    const handleCloseMailBox = () => { 
        setOpenMailBox(false);
        setEmail('');
    };

    const sendEmail = () => {
        if(!selectedList) return;
        const formattedItems =  selectedList.items.map(item => `${item}`);
        const templateParams = {
            items: formattedItems,
            email: email,
            subject: 'Your shopping list',
        };

        emailjs.send('service_sifbatl', 'template_h54yvs5', templateParams, 'H7KVuvjhT3UJK7fHS')
                .then((response) => {
                    console.log('Email sent', response.status, response.text);
                    handleCloseMailBox();
                    setState({ message: 'Your shopping list was sent successfully!', openMessage: true });
                }, (error) => {
                    console.log('Email sending failed', error);
                    setState({ message: 'There were an issue with your mail!', openMessage:true });
                });
    };

    return (
        <>
            <Navbar onAddShoppingList={onAddShoppingList}/>

            <div className="shopping-list-page">
                <div className="lists-container">
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
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleClickOpenMailBox(list)}
                                                style={{ marginLeft: '10px' }}
                                                endIcon={ <SendIcon /> }
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
            <DialogTitle id="form-dialog-title" sx={{backgroundColor:'green', color:'white', fontFamily:'Montserrat, sans-serif', fontStyle: 'italic'}}> Email </DialogTitle>
            <DialogContent>
                <DialogContentText margin="10px">
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
                    color='success'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseMailBox} color='error'> Cancel </Button>
                <Button onClick={sendEmail} color='success'> Send </Button>
            </DialogActions>
        </Dialog>
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={openMessage}
            autoHideDuration={5000}
            onClose={handleCloseMessage}
            key={vertical + horizontal}
        >
            <Alert onClose={handleCloseMessage} severity="success" variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </>
    );
};

export default ShoppingListPage;
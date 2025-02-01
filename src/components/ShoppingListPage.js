import React, {useState} from "react";
import { Button, Card, CardContent, List, ListItem, ListItemText, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send"
import emailjs from 'emailjs-com';
import './ShoppingListPage.scss';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import Navbar from "./Navbar";
import Checkbox from "@mui/material/Checkbox";

const ShoppingListPage = ({shoppingLists, onAddShoppingList, onEditShoppingList, onDeleteShoppingList, onDeleteMultipleShoppingLists }) => {
    const [openMailBox, setOpenMailBox] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [email, setEmail] = useState('');
    const [state, setState] = useState({
        openMessage: false,
        vertical: 'bottom',
        horizontal: 'center',
        message: "Your shoppinglist was sent successfully"
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editList, setEditList] = useState(null);
    const [selectedLists, setSelectedLists] = useState([]);
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

    const handleEditClick = (list) => {
        setIsEditing(true);
        setEditList(list);
    };

    const handleSaveEdit = async () => {
        if(editList.items.length > 0) { 
            try {
                await onEditShoppingList(editList);
                setIsEditing(false);
                setEditList(null);
            } catch (error) {
                console.error('Failed to edit shopping list:', error);
            }
        }
    };  

    const handleSelectList = (id) => {
        setSelectedLists((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((listId) => listId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDeleteSelectedLists = async () => {
        try {
            await onDeleteMultipleShoppingLists(selectedLists);
            setSelectedLists([]);
        } catch (error) {   
            console.error('Failed to delete shopping list:', error);
        }
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
                                            <Checkbox
                                                checked={selectedLists.includes(list.id)}
                                                onChange={() => handleSelectList(list.id)}
                                            />
                                            <Typography variant="h6">
                                                {list.name}
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
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEditClick(list)}   
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Edit
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        )}
                    </Grid>
                )}
            </div>
            <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteSelectedLists}
                    disabled={selectedLists.length === 0}
                >
                    Delete Selected
            </Button>
        </div>
        
        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
                <DialogTitle>Edit Shopping List</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={editList?.name || ''}
                        onChange={(e) => setEditList({ ...editList, name: e.target.value })}
                        fullWidth
                    />
                    <List>
                        {editList?.items.map((item, index) => (
                            <ListItem key={index}>
                                <TextField
                                    label={`Item ${index + 1}`}
                                    value={item}
                                    onChange={(e) => {
                                        const newItems = [...editList.items];
                                        newItems[index] = e.target.value;
                                        setEditList({ ...editList, items: newItems });
                                    }}
                                    fullWidth
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditing(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

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
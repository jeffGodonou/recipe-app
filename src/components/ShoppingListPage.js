import React, {useState} from "react";
import { Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, List, ListItem, ListItemText, Menu, MenuItem, Typography,  TextField, Tooltip } from "@mui/material";
import { Trash, EnvelopeSimple, PencilLine, Plus, DotsThreeVertical, CheckSquare, Envelope, TrashSimple, FloppyDiskBack, SelectionSlash, X } from 'phosphor-react';
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
    const [newItem, setNewItem] = useState('');
    const [selectedLists, setSelectedLists] = useState([]);
    const { openMessage, vertical, horizontal, message } = state;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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
            handleClose();
        } catch (error) {   
            console.error('Failed to delete shopping list:', error);
        }
    };

    const handleAddNewItem = () => {
        if (newItem.trim()) {
            setEditList((prevList) => ({
                ...prevList,
                items: [...prevList.items, newItem.trim()]
            }));
            setNewItem('');
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleSelectAll = () => {
        setSelectedLists(shoppingLists.map((list) => list.id));
    };

    const handleUnselectAll = () => {
        setSelectedLists([]);
    };

    const handleSendSelectedToEmail = () => {
        if(selectedLists.length === 0) return;
        const selectedListsData = shoppingLists.filter((list) => selectedLists.includes(list.id));  
        const formattedItems = selectedListsData.map((list) => {
            return { 
                name: list.name,
                items: list.items.map(item => `${item}`)
            };
        });

        const templateParams = {    
            lists: formattedItems,
            email: email,
            subject: 'Your shopping lists',
        };


        emailjs.send('service_sifbatl', 'template_h54yvs5', templateParams, 'H7KVuvjhT3UJK7fHS')
                .then((response) => {
                    console.log('Email sent', response.status, response.text);
                    handleCloseMailBox();
                    setState({ message: 'Your shopping lists were sent successfully!', openMessage: true });
                }, (error) => {
                    console.log('Email sending failed', error);
                    setState({ message: 'There were an issue with your mail!', openMessage:true });
                });
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Tooltip title='More Options' arrow>
                    <Button
                        color="inherit"
                        onClick={handleClick}
                        disabled={selectedLists.length === 0}
                        style={{ marginRight: '10px' }}
                    >
                        <DotsThreeVertical size={20}/>
                    </Button>
                </Tooltip>
                <Menu 
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleSelectAll}> 
                            <CheckSquare size="20" style={{marginRight: "10px"}}/> 
                            Select All 
                        </MenuItem>
                        <MenuItem onClick={handleUnselectAll}>
                            <SelectionSlash size="20" style={{marginRight: "10px"}}/> 
                            Unselect All
                        </MenuItem>
                        <MenuItem onClick={handleSendSelectedToEmail}>
                            <Envelope size="20" style={{marginRight: "10px"}}/> 
                            Send to Email
                        </MenuItem>
                        <MenuItem onClick={handleDeleteSelectedLists}>
                            <TrashSimple size="20" style={{marginRight: "10px"}}/>
                            Delete Selected
                        </MenuItem>
                    </Menu>
            </div>
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
                                            {isEditing && editList?.id === list.id ? (
                                                <>
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
                                                    <TextField
                                                        label="New Item ..."
                                                        value={newItem}
                                                        onChange={(e) => setNewItem(e.target.value)}
                                                        fullWidth
                                                    />

                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                        <Tooltip title='Add Item' arrow>
                                                            <Button color="inherit" onClick={handleAddNewItem}>
                                                                <Plus size="20"/>
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title='Save' arrow>
                                                            <Button color="inherit" onClick={handleSaveEdit}>
                                                                <FloppyDiskBack size={20} />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title='Cancel' arrow>
                                                            <Button color="inherit" onClick={() => setIsEditing(false)}>
                                                                <X size="20"/>
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </>
                                            ): (
                                                <>
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
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Tooltip title='Delete' arrow>
                                                            <Button color="inherit" onClick={() => onDeleteShoppingList(list.id)} >
                                                                <Trash size={20}/>
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title='Send Email' arrow>
                                                            <Button color="inherit" onClick={() => handleClickOpenMailBox(list)}>
                                                                <EnvelopeSimple size={20}/>
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title='Edit' arrow>
                                                            <Button color="inherit" onClick={() => handleEditClick(list)}>
                                                                <PencilLine size={20}/>
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </>
                                            )}
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
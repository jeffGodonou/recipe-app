import React from "react";
import ShoppingList from "./ShoppingList";
import { Button, Card, CardContent, List, ListItem, ListItemText, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import './ShoppingListPage.scss';

const ShoppingListPage = ({shoppingLists, onAddShoppingList, onDeleteShoppingList }) => {

    return (
        <div className="shopping-list-page">
            <div className="lists-container">
                <h2> Lists </h2>
                {
                    shoppingLists.length === 0 ? (
                        <Typography> No shopping lists saved </Typography>
                    ) : (
                        <Grid container spacing={2}> 
                            {
                                shoppingLists.map(
                                    list => (
                                        <Grid item xs={12} sm={6} md={4} key={list.id}>
                                            <Card key={list.id} className="shopping-list-card">
                                                <CardContent>
                                                    <Typography variant="h6"> 
                                                        Shopping List 
                                                        <Typography variant="body2" color="textSecondary" style={{ float: 'right'}}> {list.createdAt} </Typography>
                                                    </Typography>
                                                    <List>
                                                        {
                                                            list.items.map((item, index) => (
                                                                <ListItem key={index}>
                                                                    <ListItemText primary={item} />
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </List>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => onDeleteShoppingList(list.id)}
                                                    >
                                                        Delete List
                                                    </Button>
                                                </CardContent>
                                            </Card>                                    
                                        </Grid>
                                    )
                                )
                            }
                        </Grid>
                    )
                }
            </div>
            <ShoppingList onAddShoppingList={onAddShoppingList}/>
        </div>
    );
};

export default ShoppingListPage;
import React from "react";
import ShoppingList from "./ShoppingList";
import { Button, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import './ShoppingListPage.scss';

const ShoppingListPage = ({ shoppingLists, onAddShoppingList, onDeleteShoppingList }) => {

    return (
        <div className="shopping-list-page">
            <ShoppingList onAddShoppingList={onAddShoppingList}/>
            <div>
                <h2> Lists </h2>
                {
                    shoppingLists.length === 0 ? (
                        <Typography> No shopping lists saved </Typography>
                    ) : (
                        shoppingLists.map(
                            list => (
                                <Card key={list.id} className="shopping-list-card">
                                    <CardContent>
                                        <Typography variant="h6"> Shopping List </Typography>
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
                            )
                        )
                    )
                }
            </div>
        </div>
    );
};

export default ShoppingListPage;
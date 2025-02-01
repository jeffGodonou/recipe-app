const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const shoppingListsFilePath = path.join(__dirname, '../data/shoppingLists.json');

// helper function to read Shopping List file
const readShoppingLists = () => {
    if(!fs.existsSync(shoppingListsFilePath)) {
        fs.writeFileSync(shoppingListsFilePath, '[]');  // create the file if it doesn't exist
        return [];
    }
    
    const shoppingLists = fs.readFileSync(shoppingListsFilePath);
    try {
        return JSON.parse(shoppingLists);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
        return [];
    }
};

// helper function to write Shopping List file
const writeShoppingLists = (shoppingLists) => { 
    fs.writeFileSync(shoppingListsFilePath, JSON.stringify(shoppingLists, null, 2));
};

// Endpoint to get all shopping lists
router.get('/', (req, res) => {
    try {
        const shoppingLists = readShoppingLists();
        res.json(shoppingLists);
    } catch (error) {  
        console.error('Failed to retrieve shopping list data:', error);
    }
});

// Endpoint to add a new shopping list
router.post('/', (req, res) => {
    try {
        const shoppingLists = readShoppingLists();
        const { name, items, createdAt } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Invalid shopping list data' });
        }

        const newShoppingList = {
            id: Date.now().toString(),
            name: name || '',
            items: items || [],
            createdAt: createdAt || new Date().toLocaleDateString()
        };

        shoppingLists.push(newShoppingList);
        writeShoppingLists(shoppingLists);
        console.log('Created new shopping list:', newShoppingList);

        res.status(201).json(newShoppingList);
    } catch (error) {
        console.error('Received:', req.body);
        console.error('Failed to create shopping list:', error.message);
        res.status(500).json({ error: 'Failed to create shopping list' });
    }
});

// Endpoint to delete a shopping list
router.delete('/:id', (req, res) => {
    try {
        const shoppingLists = readShoppingLists();
        const shoppingListIndex = shoppingLists.findIndex(list => list.id === req.params.id);
        if(shoppingListIndex === -1) {
            res.status(404).json({ error: 'Shopping list not found' }); // return 404 Not Found if shopping list not found
            return;
        }

        shoppingLists.splice(shoppingListIndex, 1);
        writeShoppingLists(shoppingLists);
        res.status(204).send(); // return 204 No Content in case of success
    } catch (error) {
        console.error('Failed to delete shopping list:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update a shopping list
router.put('/:id', (req, res) => {
    try {
        const shoppingLists = readShoppingLists();
        const shoppingListIndex = shoppingLists.findIndex(list => list.id === req.params.id);
        console.log('Shopping list index:', shoppingListIndex);
        if(shoppingListIndex === -1) {
            res.status(404).json({ error: 'Shopping list not found' }); // return 404 Not Found if shopping list not found
            return;
        }

        // Destructure fields from body
        const { items, createdAt } = req.body;

        // Update any provided fields
        if (items !== undefined) shoppingLists[shoppingListIndex].items = items;
        if (createdAt !== undefined) shoppingLists[shoppingListIndex].createdAt = createdAt;
        
        writeShoppingLists(shoppingLists);
        res.json(shoppingLists[shoppingListIndex]);
    } catch (error) {
        console.error('Failed to update shopping list:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
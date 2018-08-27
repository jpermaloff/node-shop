"use strict";
// these two lines of code are required to set up the accessories route
const express = require("express");
const accessories = express.Router();
// accessoryList is the array of objects that is holding all of our data
const accessoryList = [
    {
        "brand": "Gucci", 
        "type": "watch",
        "material": ["tungsten", "silver", "radium"],
        "price": 200,
        "id": 0
    },
    {
        "brand": "Shinola", 
        "type": "watch",
        "material": ["gold-plating", "aluminum", "tin"],
        "price": 500,
        "id": 1        
    },
    {
        "brand": "Invicta", 
        "type": "Watch",
        "material": ["Gold", "Silver", "Obsidian", "Wood"],
        "price": 300,
        id: 2
    }        
];
// We are setting idCount equal to accessoryList.length so that each object is given a unique id that is larger than the 0, 1, and 2 used in the hard-coded data
// idCount is then incremented up each time the post function is run, ensuring each new item has a unique ID
let idCount = accessoryList.length;

// accessories.get is sending the accessoryList array to the Front-End component
accessories.get("/accessories", (req, res) => {
    res.send(accessoryList)    
})
// accessories.delete is running a loop that checks if the ID of an item in the array is equal to the ID that was passed into the url. If so, the item is spliced out
// count is used in the splice so that the actual index can be known, since items may have shifted since the ID was initially hard-coded in
// once the item is spliced, the new array is sent back to the Front-End as the response
accessories.delete("/accessories/:id", function(req, res){
    let count = 0;
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            accessoryList.splice(count, 1);
        }
        count++;        
    }
    res.send(accessoryList);                            
});
// accessories.post is pushing a new object to the array based on the keys defined through the input ng-models
accessories.post("/accessories", (req, res) => {
    accessoryList.push({
        brand: req.body.brand,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        id: idCount++                                                                                                                                                        
    });
    res.send(accessoryList);                
});
// accessories.put is taking whatever is typed into the inputs and resetting the values of those keys to the new values
accessories.put("/accessories/:id", function(req, res){
    let count = 0;
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            let updatedAccessory = {
                brand: req.body.brand,
                type: req.body.type,
                material: req.body.material,
                price: req.body.price
            }
            updatedAccessory.id = accessory.id;
            accessoryList.splice(count, 1, updatedAccessory);
        }
        count++;        
    }
    res.send(accessoryList);                            
});
// The last line of code is necessary to export all of the information in this route to the Front-End component
module.exports = accessories;
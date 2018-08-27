"use strict";
// these two lines of code are required to set up the clothes route
const express = require("express");
const clothes = express.Router();
// clothesList is the array of objects that is holding all of our data
const clothesList = [
    {
        "brand": "Lands End", 
        "type": "Sweater",
        "material": "wool",
        "price": 35,
        "id": 0
    },
    {
        "brand": "Old Navy", 
        "type": "T-Shirt",
        "material": "cotton",
        "price": 10,
        "id": 1        
    },
    {
        "brand": "Wrangler", 
        "type": "Blue Jeans",
        "material": "Denim",
        "price": 30,
        id: 2
    }        
];
// We are setting idCount equal to clothesList.length so that each object is given a unique id that is larger than the 0, 1, and 2 used in the hard-coded data
// idCount is then incremented up each time the post function is run, ensuring each new item has a unique ID
let idCount = clothesList.length;

// clothes.get is sending the clothesList array to the Front-End component
clothes.get("/clothes", (req, res) => {
    res.send(clothesList)    
})
// clothes.delete is running a loop that checks if the ID of an item in the array is equal to the ID that was passed into the url. If so, the item is spliced out
// count is used in the splice so that the actual index can be known, since items may have shifted since the ID was initially hard-coded in
// once the item is spliced, the new array is sent back to the Front-End component as the response
clothes.delete("/clothes/:id", function(req, res){
    let count = 0;
    for (let item of clothesList) {
        if (item.id == req.params.id) {
            clothesList.splice(count, 1);
        }
        count++;        
    }
    res.send(clothesList);                            
});
// clothes.post is pushing a new object to the array based on the keys defined through the input ng-models
clothes.post("/clothes", (req, res) => {
    clothesList.push({
        brand: req.body.brand,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        id: idCount++                                                                                                                                                        
    });
    res.send(clothesList);                
});
// clothes.put is taking whatever is typed into the inputs and resetting the values of those keys to the new values
clothes.put("/clothes/:id", function(req, res){
    let count = 0;
    for (let item of clothesList) {
        if (item.id == req.params.id) {
            let updatedItem = {
                brand: req.body.brand,
                type: req.body.type,
                material: req.body.material,
                price: req.body.price
            }
            updatedItem.id = item.id;
            clothesList.splice(count, 1, updatedItem);
        }
        count++;        
    }
    res.send(clothesList);                            
});
// The last line of code is necessary to export all of the information in this route to the Front-End component
module.exports = clothes;
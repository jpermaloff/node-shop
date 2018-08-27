"use strict";
const express = require("express");
const shoes = express.Router();

const shoeList = [{
    brand: "Nike",
    size: 10,
    color: ["White", "Red", "Blue"],
    price: 100,
    id: 0
}, {
    brand: "Nike",
    size: 10,
    color: ["Orange", "Red"],
    price: 100,
    id: 1
}];

let idCount = shoeList.length;

// PUT - params + body
// DELETE - params
// POST - body
// GET - params
shoes.get("/shoes", (req, res) => {
    res.send(shoeList);
});

shoes.post("/shoes", (req, res) => {
    shoeList.push({
        brand: req.body.brand,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        id: idCount++
    });
    res.send(shoeList);
});

shoes.put("/shoes/:id", (req, res) => {
    let count = 0;
    for (let shoe in shoeList) {
        if (shoe.id == req.params.id) {
            shoeList.splice(count, 1, req.body);
        }
        count++;
    }
    res.send(shoeList);
});

shoes.delete("/shoes/:id", (req, res) => {
    // req.params = the param added to the url
    let count = 0;
    for (let shoe of shoeList) {
        if (shoe.id == req.params.id) {
            shoeList.splice(count, 1);
        }
        count++;
    }
    res.send(shoeList);
});

module.exports = shoes;
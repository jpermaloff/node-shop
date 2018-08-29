"use strict";

const express = require("express");
const cart = express.Router();

const shoppingCart = [
    {
        product: "Milk",
        price: 3,
        quantity: 1,
        id: 0
    },
    {
        product: "Eggs",
        price: .25,
        quantity: 12,
        id: 1
    },
    {
        product: "Apple",
        price: .50,
        quantity: 3,
        id: 2
    }
];

let idCount = shoppingCart.length;

cart.get("/cart", (req, res) => {
    res.send(shoppingCart)
})

cart.delete("/cart/:id", function (req, res) {
    let count = 0;
    for (let item of shoppingCart) {
        if (item.id == req.params.id) {
            shoppingCart.splice(count, 1);
        }
        count++;
    }
    res.send(shoppingCart);
});

cart.post("/cart", (req, res) => {
    shoppingCart.push({
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
        id: idCount++
    });
    res.send(shoppingCart);
});

cart.put("/cart/:id", function (req, res) {
    let count = 0;
    for (let item of shoppingCart) {
        if (item.id == req.params.id) {
            let updatedItem = {
                product: req.body.product,
                price: req.body.price,
                quantity: req.body.quantity,
            }
            updatedItem.id = item.id;
            shoppingCart.splice(count, 1, updatedItem);
        }
        count++;
    }
    res.send(shoppingCart);
});

module.exports = cart;
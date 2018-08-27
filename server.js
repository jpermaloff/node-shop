"use strict";
const express = require("express");
const app = express();
const shoes = require("./routes/shoes");
const accessories = require("./routes/accessories");
const clothes = require("./routes/clothes");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/shop", shoes);
app.use("/api/shop", accessories);
app.use("/api/shop", clothes);

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
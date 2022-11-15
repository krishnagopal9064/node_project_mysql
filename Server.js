const express = require('express');
const app = express();
const ejs=require('ejs')
const path = require('path');
let mysql=require('./connection').con

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

const route=require("./Route/Route")
app.use(route)

port = process.env.PORT || 10874;

app.listen(port, () => {
    console.log("Database Connected...");
    console.log(`Server Running At http://localhost:${port}`);
})
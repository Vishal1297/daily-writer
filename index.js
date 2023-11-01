const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const port = process.env.PORT;

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

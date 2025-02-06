const express = require("express");
const router = require("./route/userRoutr");
const connectDB = require("./db/db");

const app = express();
const PORT = 1000;

connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

//SET templating Engine

app.set("view engine", "ejs");
app.use("/", router);
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

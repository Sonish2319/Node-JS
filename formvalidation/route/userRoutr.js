const express = require("express");
const router = express.Router();
const register = require("../controller/register");
const login = require("../controller/login");
const { urlencoded } = require("express");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Render the index page on GET request
router.get("/", (req, res) => res.render("index"));

// Render the register page on GET request
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.post("/register", register, urlencodedParser, (req, res) => {
  res.json(req.body);
});
// router.post("/register", urlencodedParser, (req, res) => {
//   res.json(req.body);
// });œ
router.post("/login", login);

module.exports = router;

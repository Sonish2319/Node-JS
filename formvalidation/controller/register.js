const user = require("../models/user");

const register = async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  await user.insertMany([data]);
  res.render("index");
};

module.exports = register;



const user = require("../models/user");

const login = async (req, res) => {
  const ckeckUser = await user.findOne({ username: req.body.username });

  if (!ckeckUser) {
    return res.status(400).render("login", { message: "User not found!" });
  }

  if (ckeckUser.password == req.body.password) {
    res.send("login successful");
    // res.render("index");
  } else {
    res.send("Wrong password");
    // res.render("login");
  }
};

module.exports = login;

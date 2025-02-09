// const express = require('express');

// const {downloadVideo} = require("../controllers/main");

// const router = express.Router();

// router.get("/download",downloadVideo);

// module.exports = router;

// routes/rout.js


// routes/rout.js

const express = require("express");
const router = express.Router();
const { downloadVideo } = require("../controllers/main");

// Handle the download request using POST and JSON body
router.post("/api/download", downloadVideo);

module.exports = router;
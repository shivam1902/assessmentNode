const express = require("express");
const router = express.Router();

const { createUser, signin } = require("./user");
const { imageUpload } = require("./imageupload");

router.post("/signup", createUser);
router.post("/signin", signin);
router.post("/upload", imageUpload);
module.exports = router;

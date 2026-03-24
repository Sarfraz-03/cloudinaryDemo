const express = require("express");
const router = express.Router();
const multer = require("multer");

const { createUser, getUsers } = require("../controllers/userController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), createUser);
router.get("/", getUsers);

module.exports = router;
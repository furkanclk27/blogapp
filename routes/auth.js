const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const csrf = require("../middlewares/csrf");

router.get("/register", csrf, authController.get_register);
router.post("/register", authController.post_register);

router.get("/login", csrf, authController.get_login);
router.post("/login", authController.post_login);

router.get("/logout", csrf, authController.get_logout);

module.exports = router;
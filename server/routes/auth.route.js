const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signin } = require("../controllers/auth.controller");

router.post(
  "/signin",
  [
    body("email").not().isEmpty().withMessage("Email is required").isEmail(),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  signin
);

module.exports = router;

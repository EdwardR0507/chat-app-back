/*
  path: api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const {
  createUser,
  loginUser,
  tokenRevalidation,
} = require("../controllers/auth");

// Middlewares
const { validateFields } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/jwtValidator");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.get("/revalidation", validateJWT, tokenRevalidation);

module.exports = router;

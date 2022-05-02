/*
  path: api/messages
*/

const { Router } = require("express");

// Controllers
const { getChat } = require("../controllers/messages");

// Middlewares
const { validateJWT } = require("../middlewares/jwtValidator");

const router = Router();

router.get("/:from", validateJWT, getChat);

module.exports = router;

const express = require("express");
const { signup } = require("../controllers/signupController");
const { login } = require("../controllers/loginController");
const { query, getQuery } = require("../controllers/queryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/query", query);
router.get("/query", getQuery);
router.get("/protected", authMiddleware, (req, res) => {
  res.send("This is a protected route");
});

module.exports = router;

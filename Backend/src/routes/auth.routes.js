const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

// signup route
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/me", protect, authController.getMe);

module.exports = router;

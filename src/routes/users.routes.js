// Import dependencies
const express = require("express");
const router = express.Router();

// Import validation and middleware
const userValidationRules = require("../validation/user.validation");
const userUpdateValidationRules = require("../validation/userUpdate.validation");

const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Import controller functions
const {
  loginUser,
  logoutUser,
  getUserProfile,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

/* =========================
   PUBLIC ROUTES
========================= */

// Login
router.post("/login", loginUser);

// Register User
router.post("/", userValidationRules(), validate, createUser);

/* =========================
   PROTECTED ROUTES
========================= */

router.get("/logout", authenticate, logoutUser);
router.get("/profile", authenticate, getUserProfile);

router.get("/", authenticate, authorize("Admin"), getAllUsers);
router.put(
  "/:id",
  authenticate,
  validateObjectId,
  userUpdateValidationRules(),
  validate,
  updateUser,
);
router.delete("/:id", authenticate, validateObjectId, deleteUser);

module.exports = router;

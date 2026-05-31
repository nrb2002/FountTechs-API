// Import dependencies
const express = require("express");
const router = express.Router();

// Import validation and middleware
const userValidationRules = require("../validation/user.validation"); // Import validation rules
const validate = require("../middleware/validate"); // Import validation middleware
const validateObjectId = require("../middleware/validateObjectId"); // Import ObjectId validator
const userUpdateValidationRules = require("../validation/userUpdate.validation"); // Import validation rules for updates
const authenticate = require("../middleware/authenticate"); // Import authentication middleware
const authorize = require("../middleware/authorize"); // Import authorization middleware

// Import controller functions
const {
  loginUser,
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

/* =========================
   PUBLIC ROUTES
========================= */

//Login
router.post("/login", loginUser);

// CREATE user
router.post("/", userValidationRules(), validate, createUser);

/* =========================
   PROTECTED ROUTES
========================= */

// GET all users
router.get("/", authenticate, authorize("admin"), getAllUsers);

// GET single user
router.get("/:id", authenticate, validateObjectId, getSingleUser);

// UPDATE user
router.put(
  "/:id",
  authenticate,
  validateObjectId,
  userUpdateValidationRules(),
  validate,
  updateUser,
);

// DELETE user
router.delete("/:id", authenticate, validateObjectId, deleteUser);

module.exports = router;

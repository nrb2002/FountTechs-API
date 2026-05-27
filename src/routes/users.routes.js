// Import dependencies
const express = require("express");
const router = express.Router();

// Import validation rules
const userValidationRules = require("../validation/user.validation");

// Import validation middleware
const validate = require("../middleware/validate");

// Import ObjectId validator
const validateObjectId = require("../middleware/validateObjectId");

// Import controller functions
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

/* =========================
   USER ROUTES
========================= */

// GET all users
router.get("/", getAllUsers);

// GET single user
router.get("/:id", validateObjectId, getSingleUser);

// CREATE user
router.post("/", userValidationRules(), validate, createUser);

// UPDATE user
router.put(
  "/:id",
  validateObjectId,
  userValidationRules(),
  validate,
  updateUser,
);

// DELETE user
router.delete("/:id", validateObjectId, deleteUser);

module.exports = router;

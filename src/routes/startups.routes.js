// Import dependencies
const express = require("express");
const router = express.Router();

// Import validation rules
const startupValidationRules = require("../validation/startup.validation");

// Import validation middleware
const validate = require("../middleware/validate");

// Import ObjectId validator
const validateObjectId = require("../middleware/validateObjectId");

// Import controller functions
const {
  getSingleStartup,
  getAllStartups,
  createStartup,
  updateStartup,
  deleteStartup,
} = require("../controllers/startups.controller");

/* =========================
   STARTUP ROUTES
========================= */

// GET all startups
router.get("/", getAllStartups);

// GET single startup
router.get("/:id", validateObjectId, getSingleStartup);

// CREATE startup
router.post("/", startupValidationRules(), validate, createStartup);

// UPDATE startup
router.put(
  "/:id",
  validateObjectId,
  startupValidationRules(),
  validate,
  updateStartup,
);

// DELETE startup
router.delete("/:id", validateObjectId, deleteStartup);

module.exports = router;

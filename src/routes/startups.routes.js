//Import dependencies
const express = require("express");
const router = express.Router();

//Import validation middlewares
const { startupValidationRules, validate } = require("../middleware/validate");

const validateObjectId = require("../middleware/validateObjectId");

//Import controller functions
const {
  getSingleStartup,
  getAllStartups,
  createStartup,
  updateStartup,
  deleteStartup,
} = require("../controllers/startups.controller");

//Build each Startup route

//Get startups Routes
router.get("/", getAllStartups);

router.get("/:id", validateObjectId, getSingleStartup);

//Create New Startup route
router.post("/", startupValidationRules(), validate, createStartup);

//Update Startup route
router.put(
  "/:id",
  validateObjectId,
  startupValidationRules(),
  validate,
  updateStartup,
);

//Delete Startup route
router.delete("/:id", validateObjectId, deleteStartup);

module.exports = router;

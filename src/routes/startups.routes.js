//Import dependencies
const express = require("express");
const router = express.Router();

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
router.get("/:id", getSingleStartup);

//Create New Startup route
router.post("/", createStartup);

//Update Startup route
router.put("/:id", updateStartup);

//Delete Startup route
router.delete("/:id", deleteStartup);

module.exports = router;

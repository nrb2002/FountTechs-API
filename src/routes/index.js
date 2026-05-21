const router = require("express").Router();
// const swaggerRoutes = require("./swagger.routes");

// router.use('/', require('./swaggerRoutes'));

router.get("/", (req, res) => {
  //#swagger.tags=['Home Page']
  res.send("Welcome to FountTech API!");
});

module.exports = router;

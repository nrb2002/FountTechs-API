const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  //#swagger.tags=['Home Page']
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
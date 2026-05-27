const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;

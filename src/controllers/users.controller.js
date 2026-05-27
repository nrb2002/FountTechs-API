const usersService = require("../services/users.service");

// GET all users
const getAllUsers = async (req, res, next) => {
  //#swagger.tags=["Users Endpoints"]
  //#swagger.summary="Get all users"
  //#swagger.description="Retrieve all users from the database."

  try {
    const users = await usersService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET single user
const getSingleUser = async (req, res, next) => {
  //#swagger.tags=["Users Endpoints"]
  //#swagger.summary="Get single user"
  //#swagger.description="Retrieve one user by ID."

  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
  } */

  try {
    const user = await usersService.getSingleUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// CREATE user
const createUser = async (req, res, next) => {
  //#swagger.tags=["Users Endpoints"]
  //#swagger.summary="Create a new user"
  //#swagger.description="Insert a new user into the database."

  /* #swagger.parameters["body"] = {
      in: "body",
      description: "New user data",
      required: true,
      schema: {
        firstName: "Baron",
        lastName: "Mobs",
        username: "barontech",
        email: "baron@founttech.com",
        password: "123456",
        role: "Founder",
        phone: "+243810000000",

        location: {
          city: "Kinshasa",
          province: "Kinshasa",
          country: "DR Congo"
        },

        profilePicture: "https://example.com/profile.jpg",

        bio: "Startup founder and software developer.",

        isVerified: false,

        isActive: true,

        startups: [
          "6650e7f97dbe9e00124a9abc"
        ]
      }
  } */

  try {
    const newUser = await usersService.createUser(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// UPDATE user
const updateUser = async (req, res, next) => {
  //#swagger.tags=["Users Endpoints"]
  //#swagger.summary="Update user information"
  //#swagger.description="Edit a specific user and save updates in the database."

  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
  } */

  /* #swagger.parameters["body"] = {
      in: "body",
      description: "Updated user data",
      required: true,
      schema: {
        firstName: "Baron",
        lastName: "Mobs",
        username: "barontech",
        email: "baron@founttech.com",
        password: "123456",
        role: "Founder",
        phone: "+243810000000",

        location: {
          city: "Kinshasa",
          province: "Kinshasa",
          country: "DR Congo"
        },

        profilePicture: "https://example.com/profile.jpg",

        bio: "Startup founder and software developer.",

        isVerified: true,

        isActive: true,

        startups: [
          "6650e7f97dbe9e00124a9abc"
        ]
      }
  } */

  try {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE user
const deleteUser = async (req, res, next) => {
  //#swagger.tags=["Users Endpoints"]
  //#swagger.summary="Delete user"
  //#swagger.description="Delete a selected user from the database."

  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
  } */

  try {
    const deletedUser = await usersService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};

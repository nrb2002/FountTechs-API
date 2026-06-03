//Import dependencies
const usersService = require("../services/users.service"); //Import the users service
const bcrypt = require("bcrypt"); //For password hashing
const jwt = require("jsonwebtoken"); //JWT for authentication


//USER LOGIN
const loginUser = async (req, res, next) => {
  //#swagger.tags=["Authentication"]
  //#swagger.summary="Sign in"
  //#swagger.description="Insert your email and password to log in and receive a JWT token for authenticated requests."
  /*#swagger.parameters["body"] = {
      in: "body",
      description: "User Login Data",
      required: true,
      schema: {
        email: "baron@congoempire.org",
        password: "123456"
      }
  } */
  /* #swagger.responses[200] = {
      description: "Login successful",
      schema: {
        success: true,
        token: "eyJhbGciOiJIUzI1NiIs...",
        user: {
          _id: "684...",
          firstName: "Baron",
          lastName: "Mobs",
          email: "baron@congoempire.org",
          role: "Admin"
        }
      }
  } */
  try {
    const user = await usersService.loginUser(
      req.body.email,
      req.body.password,
    );

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// USER LOGOUT
const logoutUser = async (req, res, next) => {
  //#swagger.tags=["Authentication"]
  //#swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Sign out"
  //#swagger.description="Sign out from your account."

  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy(() => {
        res.status(200).json({
          success: true,
          message: "Logged out successfully!",
        });
      });
    });
  } catch (error) {
    next(error);
  }
};


// GET all users
const getAllUsers = async (req, res, next) => {
  //#swagger.tags=["Users Endpoints"]
  //#swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Get all users (Admins only)"
  //#swagger.description="Retrieve all users from the database."

  try {
    const users = await usersService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET user profile
// GET USER PROFILE
const getUserProfile = async (req, res, next) => {
  //#swagger.tags=["Authentication"]
  //#swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Get current user profile"
  //#swagger.description="Retrieve the profile of the authenticated user."

  try {
    const user = await usersService.getUserProfile(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
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
  /*#swagger.parameters["body"] = {
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
        phone: "+243810000000"
      }
  } */

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user data object with hashed password
    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const newUser = await usersService.createUser(userData);
    const user = await usersService.getUserProfile(newUser._id);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// UPDATE user
const updateUser = async (req, res, next) => {
  //#swagger.tags=["Users Endpoints"]
  //#swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Update user information (Authenticated users)"
  //#swagger.description="Edit a specific user and save updates in the database."
  /*#swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
  } */

  /*#swagger.parameters["body"] = {
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

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await usersService.updateUser(
      req.params.id, 
      req.body
    );

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
  //#swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Delete user (Authenticated users)"
  //#swagger.description="Delete a selected user from the database."

  /*#swagger.parameters['id'] = {
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
  loginUser,
  logoutUser,
  getUserProfile,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

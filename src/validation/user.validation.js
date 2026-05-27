const { body } = require("express-validator");

const userValidationRules = () => {
  return [
    body("firstName").trim().notEmpty().withMessage("First name is required"),

    body("lastName").trim().notEmpty().withMessage("Last name is required"),

    body("username")
      .trim()
      .notEmpty()
      .isLength({
        min: 3,
        max: 30,
      })
      .withMessage("Username must be between 3 and 30 characters"),

    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("role")
      .optional()
      .isIn(["Founder", "Investor", "Developer", "Admin"])
      .withMessage("Invalid role"),
  ];
};

module.exports = userValidationRules;

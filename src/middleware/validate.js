const { body, validationResult } = require("express-validator");

const startupValidationRules = () => {
  return [
    // Required fields
    body("name")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("Startup name is required"),

    body("description")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("Description is required"),

    body("industry")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("Industry is required"),

    body("founders")
      .trim()
      .notEmpty()
      .isArray()
      .withMessage("Founders is required and must be an array"),

    body("founders.*")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("Each founder must be a string"),

    body("foundedYear")
      .trim()
      .notEmpty()
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Founded year must be a valid year"),

    // Optional fields
    body("website")
      .optional()
      .isURL()
      .withMessage("Website must be a valid URL"),

    body("email").optional().isEmail().withMessage("Email must be valid"),

    body("phone").optional().isString().withMessage("Phone must be a string"),

    // Location
    body("location")
      .optional()
      .isObject()
      .withMessage("Location must be an object"),

    body("location.ward").optional().isString(),

    body("location.stake").optional().isString(),

    body("location.commune").optional().isString(),

    body("location.city").optional().isString(),

    body("location.province").optional().isString(),

    body("location.country").optional().isString(),

    // Products
    body("products")
      .optional()
      .isArray()
      .withMessage("Products must be an array"),

    body("products.*")
      .optional()
      .isString()
      .withMessage("Each product must be a string"),

    // Services
    body("services")
      .optional()
      .isArray()
      .withMessage("Services must be an array"),

    body("services.*")
      .optional()
      .isString()
      .withMessage("Each service must be a string"),

    // Employees
    body("employees")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Employees must be a positive integer"),

    // Startup Stage
    body("startupStage")
      .optional()
      .isIn(["Idea", "MVP", "Revenue", "Growth", "Scale"])
      .withMessage(
        "Startup stage must be one of: Idea, MVP, Revenue, Growth, Scale",
      ),

    // Funding Stage
    body("fundingStage")
      .optional()
      .isIn([
        "Bootstrapped",
        "Pre-Seed",
        "Seed",
        "Series A",
        "Series B",
        "Series C+",
      ])
      .withMessage(
        "Funding stage must be one of: Bootstrapped, Pre-Seed, Seed, Series A, Series B, Series C+",
      ),

    // Turnover
    body("turnover")
      .optional()
      .isArray()
      .withMessage("Turnover must be an array"),

    body("turnover.*.year")
      .optional()
      .isInt({ min: 1900 })
      .withMessage("Turnover year must be valid"),

    body("turnover.*.amount")
      .optional()
      .isNumeric()
      .withMessage("Turnover amount must be numeric"),

    // Social Media
    body("socialMedia")
      .optional()
      .isObject()
      .withMessage("Social media must be an object"),

    body("socialMedia.linkedin")
      .optional()
      .isURL()
      .withMessage("LinkedIn URL is invalid"),

    body("socialMedia.x").optional().isURL().withMessage("X URL is invalid"),

    body("socialMedia.facebook")
      .optional()
      .isURL()
      .withMessage("Facebook URL is invalid"),

    body("socialMedia.instagram")
      .optional()
      .isURL()
      .withMessage("Instagram URL is invalid"),

    // Active Status
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be true or false"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  startupValidationRules,
  validate,
};

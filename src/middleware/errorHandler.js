const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid startup ID",
    });
  }

  // Duplicate key errors
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value entered",
      field: Object.keys(err.keyValue),
    });
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;

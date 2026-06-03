const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Default response values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  /* =========================
     MongoDB duplicate key
  ========================= */
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  /* =========================
     Mongoose validation error
  ========================= */
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  /* =========================
     Authentication errors
  ========================= */
  if (err.type === "INVALID_CREDENTIALS") {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  if (err.type === "MISSING_TOKEN" || err.type === "UNAUTHENTICATED") {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  /* =========================
     Authorization errors
  ========================= */
  if (err.type === "FORBIDDEN") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }

  /* =========================
     JWT errors
  ========================= */
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  /* =========================
     Fallback error response
  ========================= */
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
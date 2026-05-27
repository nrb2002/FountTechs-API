const express = require("express");
const cors = require("cors");
const path = require("path");

const defaultRoute = require("./routes/index");

const startupsRoutes = require("./routes/startups.routes");

const usersRoutes = require("./routes/users.routes");

const swaggerRoutes = require("./routes/swagger.routes");

// Error handler
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

/* =========================
   STATIC FILES
========================= */

app.use(express.static(path.join(__dirname, "../public")));

/* =========================
   ROUTES
========================= */

// Homepage route
app.use("/", defaultRoute);

// Startups API
app.use("/startups", startupsRoutes);

// Users API
app.use("/users", usersRoutes);

// Swagger Docs
app.use("/api-docs", swaggerRoutes);

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  // #swagger.ignore = true

  res.status(200).json({
    status: "online",
    uptime: process.uptime(),
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use(errorHandler);

module.exports = app;

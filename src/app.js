const express = require("express");
const cors = require("cors");

const path = require("path");
const defaultRoute = require("./routes/index");
const startupsRoutes = require("./routes/startups.routes");
const swaggerRoutes = require("./routes/swagger.routes");

//Import errorHandler and use it as the last middleware at the very bottom
const errorHandler = require("./middleware/errorHandler"); 

const app = express();

// Middleware
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

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Default route
app.use("/", defaultRoute);


// Other routes
app.use("/startups", startupsRoutes);
app.use("/api-docs", swaggerRoutes);









// Error Handler
app.use(errorHandler);

module.exports = app;

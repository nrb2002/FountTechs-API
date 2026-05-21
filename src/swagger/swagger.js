const swaggerAutogen = require("swagger-autogen")(); //import swagger package

//Build the documentation

const doc = {
  info: {
    title: "FountTech API Documentation",
    version: "1.0.0",
    description:
      "This is an API for storing and retrieving information about startups. These business data are to be stored in a MongoDB database and all interaction happen through the API. The API can be used by any frontend.",
    author: "Baron T.",
    "Last update": "2024-06-01",
  },

  /**
   * For production: uncomment the following lines and comment out the local testing lines. Make sure to update the host and schemes as needed for your production environment.
   */

  //For production
  host:
    process.env.NODE_ENV === "production"
      ? "https://founttech-api.onrender.com"
      : "localhost:8080",
  schemes: ["http", "https"],

  //For local testing
  // host: 'localhost:8080',
  // schemes: ['http']
};

const outputFile = "./swagger.json";
const endpointFiles = ["../app.js"]; //get all endpoint files via the server to avoid routes confusion

swaggerAutogen(outputFile, endpointFiles, doc); //Generates the documentation

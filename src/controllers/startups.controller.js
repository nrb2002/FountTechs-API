const startupsService = require("../services/startups.service");

// GET all startups
const getAllStartups = async (req, res) => {
  //#swagger.tags=["Startups CRUD Operations"]
  //#swagger.summary="Get All startups"
  //#swagger.description="Pull all startups from the database. "
  try {
    const startups = await startupsService.getAllStartups();

    //#swagger.tags=[if (startups.length === 0) { ]
    //#swagger.tags=[   return res.status(404).json({ message: "No startups found" }); ]
    //#swagger.tags=[ } ]

    //Return the startups
    res.status(200).json(startups);
    // #swagger.responses[200] = {
    //  description: 'Startup retrieved successfully'
    // }

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET single startup
const getSingleStartup = async (req, res) => {
  //#swagger.tags=["Startups CRUD Operations"]
  //#swagger.summary="Get single startup"
  //#swagger.description="Pull one startup by ID from the database. "
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'startup ID',
        required: true,
        type: 'string'
  } */
  try {
    const startup = await startupsService.getSingleStartup(req.params.id);

    if (!startup) {
      return res.status(404).json({
        // #swagger.responses[404] = {
        //   description: 'Startup not found'
        // }
        message: "Startup not found!",
      });
    }

    res.status(200).json(startup);
  } catch (error) {
    res.status(500).json({
      // #swagger.responses[500] = {
      //   description: 'Internal server error'
      // }
      message: error.message,
    });
  }
};

// CREATE startup
const createStartup = async (req, res) => {
  //#swagger.tags=["Startups CRUD Operations"]
  //#swagger.summary="Create New Startup"
  //#swagger.description="Insert new startup in the database. "
  
  /* #swagger.parameters["body"] = {
    in: "body",
    description: "New startup data",
    required: true,
    schema: {
      name: "KongoTech",
      description: "FinTech startup providing digital payment solutions",
      industry: "FinTech",
      foundedYear: 2022,
      founders: ["Baron Mobs"],
      website: "https://kongotech.com",
      email: "info@kongotech.com",
      phone: "+243810000000",
      location: {
        city: "Kinshasa",
        province: "Kinshasa",
        country: "DR Congo"
      },
      products: ["Mobile Wallet"],
      services: ["Payment Processing"],
      employees: 18,
      startupStage: "Growth",
      fundingStage: "Seed",
      turnover: [
        {
          year: 2024,
          amount: 65000
        }
      ]
    }
} */
  try {
    const newStartup = await startupsService.createStartup(req.body);

    res.status(201).json(newStartup);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE startup
const updateStartup = async (req, res) => {
  //#swagger.tags=["Startups CRUD Operations"]
  //#swagger.summary="Update Startup Info"
  //#swagger.description="Edit a specific startup and save update in database. "

  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Startup ID',
        required: true,
        type: 'string'
  } */

  /* #swagger.parameters["body"] = {
    in: "body",
    description: "Update startup data",
    required: true,
    schema: {
      name: "KongoTech",
      description: "FinTech startup providing digital payment solutions",
      industry: "FinTech",
      foundedYear: 2022,
      founders: ["Baron Mobs"],
      website: "https://kongotech.com",
      email: "info@kongotech.com",
      phone: "+243810000000",
      location: {
        city: "Kinshasa",
        province: "Kinshasa",
        country: "DR Congo"
      },
      products: ["Mobile Wallet"],
      services: ["Payment Processing"],
      employees: 18,
      startupStage: "Growth",
      fundingStage: "Seed",
      turnover: [
        {
          year: 2024,
          amount: 65000
        }
      ]
    }
} */
  try {
    const updatedStartup = await startupsService.updateStartup(
      req.params.id,
      req.body,
    );

    res.status(200).json(updatedStartup);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE startup
const deleteStartup = async (req, res) => {
  //#swagger.tags=["Startups CRUD Operations"]
  //#swagger.summary="Delete startup"
  //#swagger.description="Delete selected startup from the database."
  
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'startup ID',
        required: true,
        type: 'string'
  } */
  try {
    await startupsService.deleteStartup(req.params.id);

    res.status(200).json({
      message: "Startup deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllStartups,
  getSingleStartup,
  createStartup,
  updateStartup,
  deleteStartup,
};

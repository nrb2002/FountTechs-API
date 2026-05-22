const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  industry: {
    type: String,
    required: true
  },

  foundedYear: {
    type: Number
  },

  founders: [{
    type: String
  }],

  website: {
    type: String
  },

  email: {
    type: String
  },

  phone: {
    type: String
  },

  location: {
    ward: String,
    stake: String,
    commune: String,
    city: String,
    province: String,
    country: String
  },

  products: [{
    type: String
  }],

  services: [{
    type: String
  }],

  employees: {
    type: Number
  },

  startupStage: {
    type: String,
    enum: [
      "Idea",
      "MVP",
      "Revenue",
      "Growth",
      "Scale"
    ]
  },

  fundingStage: {
    type: String,
    enum: [
      "Bootstrapped",
      "Pre-Seed",
      "Seed",
      "Series A",
      "Series B",
      "Series C+"
    ]
  },

  turnover: [{
    year: Number,
    amount: Number
  }],

  socialMedia: {
    linkedin: String,
    x: String,
    facebook: String,
    instagram: String
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Startup", startupSchema);

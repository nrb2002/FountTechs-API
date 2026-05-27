const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Founder", "Investor", "Developer", "Admin"],
      default: "Founder",
    },

    phone: {
      type: String,
    },

    location: {
      city: String,
      province: String,
      country: String,
    },

    profilePicture: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    startups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);

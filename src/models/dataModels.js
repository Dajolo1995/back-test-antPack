const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    deletedAt: {
      type: Date,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dataSchema", dataSchema);

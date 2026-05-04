const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deck", deckSchema);
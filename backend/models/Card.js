const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    deckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deck",
      required: true,
    },
    front: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    
    nextReviewDate: {
      type: Date,
      default: Date.now,
    },
    repetitionCount: {
      type: Number,
      default: 0,
    },
    easeFactor: {
      type: Number,
      default: 2.5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
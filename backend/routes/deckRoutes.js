
const express = require("express");
const router = express.Router();

const Deck = require("../models/Deck");



router.post("/", async (req, res) => {
  try {
    const { userId, title, description, category } = req.body;

    const newDeck = new Deck({
      userId,
      title,
      description,
      category,
    });

    await newDeck.save();

    res.json(newDeck);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



router.get("/:userId", async (req, res) => {
  try {
    const decks = await Deck.find({ userId: req.params.userId });

    res.json(decks);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



router.delete("/:id", async (req, res) => {
  try {
    await Deck.findByIdAndDelete(req.params.id);

    res.json("Deck deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
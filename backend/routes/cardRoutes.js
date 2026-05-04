// routes/cardRoutes.js

const express = require("express");
const router = express.Router();

const Card = require("../models/Card");



router.post("/", async (req, res) => {
  try {
    const { deckId, front, back } = req.body;

    const newCard = new Card({
      deckId,
      front,
      back,
    });

    await newCard.save();

    res.json(newCard);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



router.get("/:deckId", async (req, res) => {
  try {
    const cards = await Card.find({ deckId: req.params.deckId });

    res.json(cards);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);

    res.json("Card deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});



router.post("/study/:id", async (req, res) => {
  try {
    const { difficulty } = req.body;

    const card = await Card.findById(req.params.id);

    let daysToAdd = 1;

    if (difficulty === "easy") daysToAdd = 5;
    if (difficulty === "medium") daysToAdd = 2;
    if (difficulty === "hard") daysToAdd = 1;

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysToAdd);

    card.difficulty = difficulty;
    card.nextReviewDate = nextDate;
    card.repetitionCount += 1;

    await card.save();

    res.json(card);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
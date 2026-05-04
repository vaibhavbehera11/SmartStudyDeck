const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});


app.get("/test-db", async (req, res) => {
  try {
    const Test = mongoose.model(
      "Test",
      new mongoose.Schema({ name: String })
    );

    const doc = await Test.create({ name: "Vaibhav" });

    res.json(doc);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const deckRoutes = require("./routes/deckRoutes");
app.use("/api/decks", deckRoutes);

const cardRoutes = require("./routes/cardRoutes");
app.use("/api/cards", cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

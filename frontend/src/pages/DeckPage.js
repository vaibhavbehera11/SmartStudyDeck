import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function DeckPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const fetchCards = useCallback(async () => {
  try {
    const res = await API.get(`/cards/${id}`);
    setCards(res.data);
  } catch (err) {
    console.log(err);
  }
}, [id]);

  useEffect(() => {
  fetchCards();
}, [fetchCards]);

  const addCard = async () => {
    if (!front || !back) return;

    await API.post("/cards", {
      deckId: id,
      front,
      back,
    });

    setFront("");
    setBack("");
    fetchCards();
  };

  const deleteCard = async (cardId) => {
    await API.delete(`/cards/${cardId}`);
    fetchCards();
  };

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header modern-header">
        <h2>📘 Deck</h2>

        <button
          className="button secondary"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>
      </div>

      {/* ADD CARD */}
      <div className="card modern-card">
        <h3>Add New Card</h3>

        <input
          className="input modern-input"
          placeholder="Front (Question)"
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />

        <input
          className="input modern-input"
          placeholder="Back (Answer)"
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />

        <button className="button primary full-btn" onClick={addCard}>
          Add Card
        </button>
      </div>

      {/* FLASHCARDS */}
      <h3 style={{ marginTop: "20px" }}>Flashcards</h3>

      <div className="card-grid centered-grid">
        {cards.length === 0 ? (
        <p>No cards yet</p>
        ) : (
        cards.map((card) => (
          <div className="flash-card big-card" key={card._id}>

          <div>
          <strong>{card.front}</strong>
          <p className="card-back">{card.back}</p>
        </div>

        <button
          className="button danger small-btn"
          onClick={() => deleteCard(card._id)}
        >
          Delete
        </button>

      </div>
    ))
  )}
</div>

      {/* STUDY BUTTON */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          className="button primary big-btn"
          onClick={() => navigate(`/study/${id}`)}
        >
          🚀 Start Study Session
        </button>
      </div>

    </div>
  );
}

export default DeckPage;
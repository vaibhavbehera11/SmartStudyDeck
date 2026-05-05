import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function StudyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

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

  const handleAnswer = async (difficulty) => {
    const currentCard = cards[currentIndex];

    await API.post(`/cards/study/${currentCard._id}`, {
      difficulty,
    });

    setShowBack(false);
    setCurrentIndex((prev) => prev + 1);
  };

  if (cards.length === 0) {
    return (
      <div className="study-container">
        <h2>No cards available</h2>
        <button className="button secondary" onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </div>
    );
  }

  if (currentIndex >= cards.length) {
    return (
      <div className="study-container">
        <h2>🎉 Study Completed</h2>
        <button className="button primary" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="study-container">

      {/* PROGRESS */}
      <p className="progress-text">
        Card {currentIndex + 1} of {cards.length}
      </p>

      {/* CARD */}
      <div
        className={`study-card ${showBack ? "flipped" : ""}`}
        onClick={() => setShowBack(!showBack)}
      >
        <div className="card-inner">
          <div className="card-front">
            {currentCard.front}
          </div>
          <div className="card-back-study">
            {currentCard.back}
          </div>
        </div>
      </div>

      <p className="flip-text">Click card to flip</p>

      {/* BUTTONS */}
      {showBack && (
        <div className="study-buttons">
          <button
            className="button easy"
            onClick={() => handleAnswer("easy")}
          >
            Easy
          </button>

          <button
            className="button medium"
            onClick={() => handleAnswer("medium")}
          >
            Medium
          </button>

          <button
            className="button hard"
            onClick={() => handleAnswer("hard")}
          >
            Hard
          </button>
        </div>
      )}

      {/* EXIT */}
      <button
        className="button secondary exit-btn"
        onClick={() => navigate("/dashboard")}
      >
        Exit
      </button>

    </div>
  );
}

export default StudyPage;
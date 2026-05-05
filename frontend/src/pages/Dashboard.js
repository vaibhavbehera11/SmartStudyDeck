import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const [decks, setDecks] = useState([]);
  const [title, setTitle] = useState("");

  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  // ✅ FETCH DECKS (CLEAN + SAFE)
  useEffect(() => {
    if (!userId) {
      console.log("No userId found in localStorage");
      return;
    }

    const fetchDecks = async () => {
      try {
        console.log("Fetching decks for:", userId);

        const res = await API.get(`/decks/${userId}`);

        console.log("Decks received:", res.data);

        setDecks(res.data);
      } catch (err) {
        console.log("Error fetching decks:", err);
      }
    };

    fetchDecks();
  }, [userId]);

  // ✅ CREATE DECK
  const createDeck = async () => {
    if (!title) return;

    try {
      await API.post("/decks", { userId, title });
      setTitle("");

      // refresh decks
      const res = await API.get(`/decks/${userId}`);
      setDecks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE DECK
  const deleteDeck = async (id) => {
    try {
      await API.delete(`/decks/${id}`);

      // refresh decks
      const res = await API.get(`/decks/${userId}`);
      setDecks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <div>
          <h2>📚 Smart Study Deck</h2>
          <p>Welcome back, {username}</p>
        </div>

        <button className="button danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* TOP SECTION */}
      <div className="top-section">

        {/* CREATE DECK */}
        <div className="card create-box">
          <h3>Create New Deck</h3>

          <input
            className="input"
            placeholder="Enter deck title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button className="button primary full-btn" onClick={createDeck}>
            Add Deck
          </button>
        </div>

        {/* INFO BOX */}
        <div className="card info-box">
          <h3>Your Progress</h3>
          <p>Total Decks: {decks.length}</p>
          <p>Keep learning 🚀</p>
        </div>

      </div>

      {/* DECK LIST */}
      <h3 style={{ marginTop: "25px" }}>Your Decks</h3>

      <div className="deck-grid">
        {decks.length === 0 ? (
          <p>No decks created yet</p>
        ) : (
          decks.map((deck) => (
            <div className="deck-card" key={deck._id}>
              <div
                className="deck-title"
                onClick={() => navigate(`/deck/${deck._id}`)}
              >
                {deck.title}
              </div>

              <button
                className="button danger small-btn"
                onClick={() => deleteDeck(deck._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;
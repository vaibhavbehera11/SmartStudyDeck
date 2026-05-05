import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DeckPage from "./pages/DeckPage";
import StudyPage from "./pages/StudyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deck/:id" element={<DeckPage />} />
        <Route path="/study/:id" element={<StudyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import { useState } from "react";
import { marked } from "marked";
import "./Mini.css";

// Updated to use environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function MiniLessons() {
  const [miniLesson, setMiniLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const handleGenerateAndView = async () => {
    if (!token) {
      setError("You need to log in to access mini lessons.");
      return;
    }

    setLoading(true);
    setError(null);
    setMiniLesson(null);

    try {
      // Step 1: Generate mini lesson - using correct endpoint
      const generateResponse = await fetch(
        `${API_BASE_URL}/generate-minilessons`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!generateResponse.ok) {
        throw new Error("Mini lesson generation failed.");
      }

      // Step 2: Fetch mini lesson - using same endpoint but GET method
      const fetchResponse = await fetch(
        `${API_BASE_URL}/generate-minilessons`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!fetchResponse.ok) {
        throw new Error("Failed to fetch mini lesson.");
      }

      const data = await fetchResponse.json();
      if (data.mini_lessons && data.mini_lessons.length > 0) {
        setMiniLesson(data.mini_lessons[0].content);
      } else {
        setMiniLesson("No mini lessons available yet.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mini-lessons-container">
      <div className="mini-lesson-header">
        <h1 className="mini-lessons-title">
          Great Job! Let's Strengthen Your Skills 💪
        </h1>
        <p className="mini-lessons-subtitle">
          This mini lesson is tailored just for you, based on today's chat.
        </p>
      </div>
      <div className="mini-buttons">
        <button onClick={handleGenerateAndView} disabled={loading}>
          {loading ? "Generating..." : "Start today's lesson"}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {miniLesson && (
        <div
          className="mini-lesson-content"
          dangerouslySetInnerHTML={{ __html: marked(miniLesson) }}
        />
      )}
    </div>
  );
}

export default MiniLessons;



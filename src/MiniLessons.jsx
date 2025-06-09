import { useState } from "react";
import { marked } from "marked"; // ✅ Step 1: Import marked
import "./Mini.css";
//using proxy:
const API_BASE_URL = "/api";

//changed to use full path:
//const API_BASE_URL = "https://englishlearningco.onrender.com/api";

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
      // Step 1: Generate mini lesson
      const generateResponse = await fetch(
        `${API_BASE_URL}/proxy-minilessons`,
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

      // Step 2: Fetch mini lesson
      const fetchResponse = await fetch(`${API_BASE_URL}/proxy-minilessons`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!fetchResponse.ok) {
        throw new Error("Failed to fetch mini lesson.");
      }

      const data = await fetchResponse.json();
      if (data.mini_lessons.length > 0) {
        setMiniLesson(data.mini_lessons[0].content);
      } else {
        setMiniLesson("No mini lessons available yet.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mini-lessons-container">
      <div className="mini-lesson-header">
        <h1 className="mini-lessons-title">
          {" "}
          Great Job! Let’s Strengthen Your Skills 💪
        </h1>
        <p className="mini-lessons-subtitle">
          This mini lesson is tailored just for you, based on today’s chat.
        </p>
      </div>
      <div className="mini-buttons">
        <button onClick={handleGenerateAndView} disabled={loading}>
          Start today's lesson
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* ✅ Step 2: Render markdown content as HTML */}
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

/*import { useState } from "react";
import "./Mini.css";

const API_BASE_URL = "/api";

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
      // Step 1: Generate mini lesson
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

      // Step 2: Fetch mini lesson
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
      if (data.mini_lessons.length > 0) {
        setMiniLesson(data.mini_lessons[0].content);
      } else {
        setMiniLesson("No mini lessons available yet.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mini-lessons-container">
      <h1 className="mini-lessons-title">Mini Lessons</h1>
      <div className="mini-buttons">
        <button onClick={handleGenerateAndView} disabled={loading}>
          View Mini-Lesson
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {miniLesson && <p className="mini-lesson-content">{miniLesson}</p>}
    </div>
  );
}

export default MiniLessons;

/*import { useState } from "react";
import "./Mini.css";

const API_BASE_URL = "/api";

function MiniLessons() {
  const [miniLesson, setMiniLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleGenerateAndView = async () => {
    if (!token) {
      setError("You need to log in to access mini lessons.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");
    setMiniLesson(null);

    try {
      // Step 1: Generate
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

      setSuccessMessage("Mini lesson generated successfully!");

      // Step 2: Fetch
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
      if (data.mini_lessons.length > 0) {
        setMiniLesson(data.mini_lessons[0].content);
      } else {
        setMiniLesson("No mini lessons available yet.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mini-lessons-container">
      <h1 className="mini-lessons-title">Mini Lessons</h1>
      <div className="mini-buttons">
        <button onClick={handleGenerateAndView} disabled={loading}>
          Generate & View Mini-Lesson
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}
      {miniLesson && <p className="mini-lesson-content">{miniLesson}</p>}
    </div>
  );
}

export default MiniLessons;

/*import { useState } from "react";
import "./Mini.css";

const API_BASE_URL = "/api";

function MiniLessons() {
  const [miniLesson, setMiniLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleGenerate = async () => {
    if (!token) {
      setError("You need to log in to generate a mini lesson.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/generate-minilessons`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Adjust if backend expects payload
      });

      if (!response.ok) {
        throw new Error("Failed to generate mini lesson.");
      }

      setSuccessMessage("Mini lesson generated successfully!");
    } catch (err) {
      setError("Error generating mini lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    if (!token) {
      setError("You need to log in to view mini lessons.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-minilessons`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch mini lesson");
      }

      const data = await response.json();
      if (data.mini_lessons.length > 0) {
        setMiniLesson(data.mini_lessons[0].content);
      } else {
        setMiniLesson("No mini lessons available yet. Try generating one.");
      }
    } catch (err) {
      setError("Error loading mini lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mini-lessons-container">
      <h1 className="mini-lessons-title">Mini Lessons</h1>
      <div className="mini-buttons">
        <button onClick={handleGenerate} disabled={loading}>
          Generate Mini-Lesson
        </button>
        <button onClick={handleView} disabled={loading}>
          View Mini-Lesson
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}
      {miniLesson && <p className="mini-lesson-content">{miniLesson}</p>}
    </div>
  );
}

export default MiniLessons;

//this is the first attempt the status is sucssesful but no lessons displayed
/*import { useState, useEffect } from "react";
import "./Mini.css";

const API_BASE_URL = "/api"; // Proxy will handle API requests

function MiniLessons() {
  const [miniLesson, setMiniLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMiniLesson = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to log in to view mini lessons.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/generate-minilessons`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch mini lesson");
        }

        const data = await response.json();
        if (data.mini_lessons.length > 0) {
          setMiniLesson(data.mini_lessons[0].content);
        } else {
          setMiniLesson("No mini lessons available yet. Try chatting more!");
        }
      } catch (err) {
        setError("Error loading mini lesson. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMiniLesson();
  }, []);

  return (
    <div className="mini-lessons-container">
      <h1 className="mini-lessons-title">Mini Lessons</h1>
      {loading && <p>Loading mini lesson...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <p className="mini-lesson-content">{miniLesson}</p>
      )}
    </div>
  );
}

export default MiniLessons;

/**old working mini lesson */
/*import "./Mini.css";
function MiniLessons() {
  return (
    <div>
      <h1>Third Page</h1>
      <p>Welcome to the MINI LESSONS!</p>
    </div>
  );
}

export default MiniLessons;*/

import { useState } from "react";
import PropTypes from "prop-types";
import "./styles/SignIn.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Use dynamic API base URL
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || '/api'}/proxy-register`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      onLogin();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin-container signin-page">
      <div className="signin-left">
        <h1 className="signin-title">Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="signin-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="signin-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <p>
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <div className="signin-right"></div>
    </div>
  );
};

SignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default SignIn;





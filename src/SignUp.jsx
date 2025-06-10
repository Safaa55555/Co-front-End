import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/SignUp.css";
import PropTypes from "prop-types";

const SignUp = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || '/api'}-auth/register`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
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
    <div className="signup-container">
      <div className="signup-left">
        <h1 className="signup-title">Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="signup-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-text">
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </div>
      <div className="signup-right"></div>
    </div>
  );
};

SignUp.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default SignUp;




/*import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/SignUp.css";
import PropTypes from "prop-types";
const SignUp = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Mock sign-up logic (you can replace this with API calls)
    alert(`Account created for: ${email}`);
    //new lines 2
    onLogin();
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-text">
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </div>
      <div className="signup-right"></div>
    </div>
  );
};
SignUp.propTypes = {
  onLogin: PropTypes.func.isRequired, // Ensure onLogin is passed and is a function
};

export default SignUp;*/

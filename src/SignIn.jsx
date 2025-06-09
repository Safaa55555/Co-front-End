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
      /** here i updated the http/orendo.com/api-auth/register   to   this down ,,,i only deltetd the http/orendo.. */
      const response = await fetch("/api-auth/login", {
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

export default SignIn; /*}

//here u added some class names
/*import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import "./styles/SignIn.css";
import { Link } from "react-router-dom";

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //this was handleSubmit ps: i will change the logic here
  const handleLogin = (e) => {
    e.preventDefault();
    // Validate email and password (mock validation for now)
    if (email === "e@e" && password === "p") {
      alert("Sign-in successful!");
      onLogin(); // Update the isLoggedIn state in the App component
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="signin-container signin-page">
      <div className="signin-left">
        <h1 className="signin-title">Sign In</h1>
        <form className="signin-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <div className="signin-right"></div> {/* Empty div for the image */
/*    </div>
  );
};

// Add prop validation
SignIn.propTypes = {
  onLogin: PropTypes.func.isRequired, // Ensure onLogin is passed and is a function
};

export default SignIn;*/

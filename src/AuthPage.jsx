//This is the basics of the Auth pages ,this is not the end result. some work is still left.
//it takes its styles from App.css
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Check if username and password are correct (for now, you can skip validation)
    if (username && password) {
      onLogin(); // This function will navigate to the main page
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// Prop validation
AuthPage.propTypes = {
  onLogin: PropTypes.func.isRequired, // Define the expected type for `onLogin`
};

export default AuthPage;

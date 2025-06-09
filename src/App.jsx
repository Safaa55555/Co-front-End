import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ChatPage from "./ChatPage";
import MiniLessons from "./MiniLessons";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* If user is not logged in, redirect them to SignIn */}
        <Route
          path="/"
          element={isLoggedIn ? <ChatPage /> : <SignIn onLogin={handleLogin} />}
        />
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        <Route path="/mini" element={<MiniLessons />} />
        <Route
          path="/chat"
          element={isLoggedIn ? <ChatPage /> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

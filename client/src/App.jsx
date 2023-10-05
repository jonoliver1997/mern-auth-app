import { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import "./App.css";
import UserContext from "./UserContext";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <UserContext.Provider value={{ email, setEmail }}>
        <Router>
          <Link to={"/"}>Home</Link> | <Link to={"/login"}>Login</Link> |{" "}
          <Link to={"/register"}>Register</Link>
          <Routes>
            <Route exact path={"/register"} element={<Register />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

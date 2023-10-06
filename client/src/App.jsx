import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import "./App.css";
import UserContext from "./UserContext";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3500/user", { withCredentials: true })
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  function logOut() {
    axios
      .post("http://localhost:3500/logout", {}, { withCredentials: true })
      .then(() => {
        setEmail("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <UserContext.Provider value={{ email, setEmail }}>
        <Router>
          <div>
            {email ? <p>Logged in as: {email}</p> : <p>Not logged in</p>}
            <button onClick={logOut}>Log Out</button>
          </div>
          <Link to={"/"}>Home</Link> | <Link to={"/login"}>Login</Link> |{" "}
          <Link to={"/register"}>Register</Link>
          <Routes>
            <Route exact path={"/register"} element={<Register />} />
            <Route exact path={"/login"} element={<Login />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

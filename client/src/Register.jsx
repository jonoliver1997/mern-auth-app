import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { email, password };
    axios
      .post("http://localhost:3500/register", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

import PocketBase from "pocketbase";
import React, { useState } from "react";

import "./register.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090/");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const data = {
      username,
      email,
      emailVisibility: true,
      password,
      passwordConfirm: passwordconfirm,
    };
    if (password !== passwordconfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const record = await pb.collection("users").create(data);
  };

  return (
    <div>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        E-mail:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        PasswordConfirm:
        <input
          type="password"
          value={passwordconfirm}
          onChange={(e) => setPasswordconfirm(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>회원가입</button>
    </div>
  );
}

export default App;

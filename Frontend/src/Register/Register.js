import PocketBase from "pocketbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./register.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090/");

  const navigate = useNavigate();

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

    const record = await pb
      .collection("users")
      .create(data)
      .then(async (authData) => {
        alert("회원가입이 완료되었습니다. 인증 메일을 확인해주세요.");
        // 이메일 인증 요청
        navigate("/");
        await pb.collection("users").requestVerification(data.email);
      })
      .catch((error) => {
        if (error.status === 400) {
          // 로그인 실패, 오류 메시지 표시
          alert(
            "이메일이 유효하지 않거나, 이미 사용중, 또는 비밀번호의 길이가 8자 미만입니다."
          );
        } else {
          console.error(error);
        }
      });
  };
  const handleHome = async () => {
    navigate("/");
  };

  return (
    <div className="register">
      <div className="register_box">
        <div className="registertitle">
          <h2>회원가입</h2>
        </div>
        <div className="register_input">
          <label>
            Username:
            <br></br>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <p className="space"></p>
          <label>
            E-mail:
            <br></br>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <p className="space"></p>
          <label>
            Password:
            <br></br>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="space"></p>
          <label>
            PasswordConfirm:
            <br></br>
            <input
              type="password"
              value={passwordconfirm}
              onChange={(e) => setPasswordconfirm(e.target.value)}
            />
          </label>
          <p className="space"></p>
        </div>
        <p className="space"></p>
        <button onClick={handleLogin} className="register_button">
          회원가입
        </button>
        <button onClick={handleHome} className="register_button_home">
          Home
        </button>
      </div>
    </div>
  );
}

export default App;

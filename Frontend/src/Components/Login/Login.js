import PocketBase from "pocketbase";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./login.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090/");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    pb.collection("users")
      .authWithPassword(data.email, data.password)
      .then((authData) => {
        if (authData.record) {
          // 로그인 성공, 사용자 이름 저장
          localStorage.setItem("username", authData.record.username);
          localStorage.setItem("verified", authData.record.verified);

          navigate("/");
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          // 로그인 실패, 오류 메시지 표시
          alert("로그인 정보를 확인한 후 다시 시도해주세요.");
        } else {
          console.error(error);
        }
      });
  };

  const handleHome = async () => {
    navigate("/");
  };

  return (
    <div className="Login">
      <div className="Login_box">
        <div className="Login_title">
          <h2>로그인</h2>
        </div>
        <div className="Login_input">
          <label>
            E-mail or Username:
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
        </div>
        <p className="space"></p>
        <br />
        <button onClick={handleLogin} className="Login_button">
          로그인
        </button>
        <button onClick={handleHome} className="login_button_home">
          Home
        </button>
      </div>
    </div>
  );
}

export default App;

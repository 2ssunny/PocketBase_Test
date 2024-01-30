import { Link } from "react-router-dom";
import React from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";

import "./home.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090/");
  const username = localStorage.getItem("username");
  const verified = localStorage.getItem("verified");

  const navigate = useNavigate();

  const handleLogout = () => {
    pb.authStore.clear();
    localStorage.removeItem("username");
    window.location.reload();
  };
  const handleVerifynavigate = () => {
    navigate("/verify");
  };

  return (
    <div>
      <div className="home">
        <div className="home_buttons">
          <div className="home_title">
            {username ? (
              <>
                <p>{username}님 환영합니다</p>
                {verified === "true" ? (
                  <p className="home_title_verified">
                    이메일 인증이 완료된 계정입니다.
                  </p>
                ) : (
                  <button onClick={handleVerifynavigate}>
                    이메일 인증하기
                  </button>
                )}
              </>
            ) : (
              <p>로그인을 해주세요</p>
            )}
          </div>
          <header>
            {username ? (
              <button onClick={handleLogout} className="Loginout_button">
                Logout
              </button>
            ) : (
              <Link to="Login">
                <button className="Loginout_button">Login</button>
              </Link>
            )}

            <p className="space"></p>
            <Link to="Register">
              <button className="Register_button">Register</button>
            </Link>

            <p className="space"></p>
            <Link to="Board">
              <button className="BoardLink_button">Board</button>
            </Link>
          </header>
        </div>
      </div>
    </div>
  );
}

export default App;

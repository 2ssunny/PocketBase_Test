import { Link } from "react-router-dom";
import React from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";

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
      {username ? (
        <>
          <p>{username}님 환영합니다</p>
          {verified == "true" ? (
            <p>이메일 인증이 완료된 계정입니다.</p>
          ) : (
            <button onClick={handleVerifynavigate}>이메일 인증하기</button>
          )}
        </>
      ) : (
        <p>로그인을 해주세요</p>
      )}
      <header>
        <Link to="Login">
          <button>Login</button>
        </Link>
        <br></br>
        <Link to="Register">
          <button>Register</button>
        </Link>
        <br></br>
        <Link to="Board">
          <button>Board</button>
        </Link>
      </header>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;

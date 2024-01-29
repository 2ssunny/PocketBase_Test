import { Link } from "react-router-dom";
import React from "react";
import PocketBase from "pocketbase";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090/");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    pb.authStore.clear();
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div>
      <header className="title-header">
        {username ? <p>{username}님 환영합니다</p> : <p>로그인을 해주세요</p>}
        <Link to="/" className="title-text">
          <span className="title-text2">Home</span>
        </Link>
        <br></br>
        <Link to="Login" className="title-text">
          <span className="title-text2">Login</span>
        </Link>
        <br></br>
        <Link to="Register" className="title-text">
          <span className="title-text2">Register</span>
        </Link>
        <br></br>
        <Link to="Board" className="title-text">
          <span className="title-text2">Board</span>
        </Link>
      </header>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;

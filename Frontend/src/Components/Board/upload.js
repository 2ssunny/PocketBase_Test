import PocketBase from "pocketbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./upload.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const navigate = useNavigate(); // navigate 객체 생성

  const username = localStorage.getItem("username");
  const verified = localStorage.getItem("verified");

  const [body, setBody] = useState("");

  const handlePostupload = async () => {
    const data = {
      Body: body,
      Title: username + "님의 게시글",
    };

    if (body !== "" && username !== null && verified == "true") {
      const record = await pb.collection("posts").create(data);
      alert("게시글이 등록되었습니다. 게시글 목록으로 돌아갑니다.");
      navigate("/Board");
    } else if (verified == "false") {
      alert("게시글을 등록하기 위해서는 이메일 인증이 필요합니다.");
      return;
    } else if (body == "") {
      alert("내용을 입력해주세요.");
      return;
    } else if (username == null) {
      alert("로그인을 한 후 이용해주세요.");
      return;
    }
  };
  const handleHome = async () => {
    navigate("/");
  };

  return (
    <div className="board">
      <button onClick={handleHome}>Home</button>
      <h2>Username: {username}</h2>
      <label>
        Body:
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handlePostupload}>Post</button>
    </div>
  );
}

export default App;

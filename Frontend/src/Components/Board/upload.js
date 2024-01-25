import PocketBase from "pocketbase";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./upload.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const navigate = useNavigate(); // navigate 객체 생성

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlePostupload = async () => {
    const data = {
      Body: body,
      Title: title,
    };

    if (title == "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (body == "") {
      alert("내용을 입력해주세요.");
      return;
    }
    const record = await pb.collection("posts").create(data);
    alert("게시글이 등록되었습니다. 게시글 목록으로 돌아갑니다.");
    navigate("/Board");
  };

  return (
    <div className="board">
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
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

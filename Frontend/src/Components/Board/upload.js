import PocketBase from "pocketbase";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./upload.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const verified = localStorage.getItem("verified");

  const [body, setBody] = useState("");
  const fileInput = useRef(null); // 파일 업로드를 위한 참조

  const handlePostupload = async () => {
    if (body !== "" && username !== null && verified === "true") {
      if (fileInput.current.files.length === 0) {
        alert("업로드할 파일을 선택해주세요.");
        return;
      }

      const formData = new FormData();
      for (let file of fileInput.current.files) {
        formData.append("documents", file, file.name);
      }

      formData.append("Body", body);
      formData.append("Title", username + "님의 게시글");

      await pb.collection("Posts").create(formData);
      alert("게시글이 등록되었습니다. 게시글 목록으로 돌아갑니다.");
      navigate("/Board");
    } else if (verified === "false") {
      alert("게시글을 등록하기 위해서는 이메일 인증이 필요합니다.");
      return;
    } else if (body === "") {
      alert("내용을 입력해주세요.");
      return;
    } else if (username === null) {
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
      <input type="file" ref={fileInput} multiple id="fileInput" />
      <button onClick={handlePostupload}>Post</button>
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

import "./board.css";
import { useNavigate } from "react-router-dom";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const records = await pb.collection("Posts").getFullList({
          sort: "-created",
        });
        if (!isCancelled) {
          console.log(records); // API 응답 로그 출력
          setPosts(records);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
        }
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleHome = async () => {
    navigate("/");
  };

  const handleUpload = async () => {
    navigate("/Board/Upload");
  };

  return (
    <div className="Board">
      <div>
        <div className="Board_button">
          <button onClick={handleHome} className="Board_button_home">
            Home
          </button>

          <button onClick={handleUpload} className="Board_button_upload">
            Upload
          </button>
          <div>
            {username ? (
              <p className="User_identify">{username}님, 환영합니다.</p>
            ) : (
              <p className="User_identify">
                게시글 작성을 위해 로그인해주세요.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="Board_contents">
        {posts.map((post, index) => {
          return (
            <div key={index} className="boardList">
              <div className="BoardList_contents">
                <p className="boardListTitle">{post.Title}</p>
                <p className="boardListBody">{post.Body}</p>
                <p className="boardListCreated">
                  Uploaded at {post.created.slice(0, 19)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

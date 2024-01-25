import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

import "./board.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [posts, setPosts] = useState([]);

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
  return (
    <div>
      <header className="title-header">
        <Link to="/" className="title-text">
          <span className="title-text2">Home</span>
        </Link>
        <br></br>
        <Link to="Upload" className="title-text">
          <span className="title-text2">Upload</span>
        </Link>
      </header>
      {posts.map((post, index) => {
        return (
          <div key={index} className="boardList">
            <b className="text-muted">Title:</b>
            <p>{post.Title}</p>
            <b className="text-muted">Body:</b>
            <p>{post.Body}</p>
            <b className="text-muted">AttachedPhoto:</b>
            <p>{post.Photo}</p>
            <b className="text-muted">PostingDate:</b>
            <p>{post.created}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;

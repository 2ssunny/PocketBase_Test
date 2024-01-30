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
            <p className="boardListTitle">{post.Title}</p>
            <p className="boardListBody">{post.Body}</p>
            {post.File &&
              post.File.map((filename, fileIndex) => {
                const fileUrl = `http://127.0.0.1:8090/api/files/${post.collectionName}/${post.id}/${filename}`;
                return (
                  <button
                    key={fileIndex}
                    onClick={() => window.open(fileUrl, "_blank")}
                  >
                    파일 {fileIndex + 1} 보기
                  </button>
                );
              })}
            <p className="boardListCreated">{post.created.slice(0, 19)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;

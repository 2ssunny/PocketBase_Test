import { Link } from "react-router-dom";
import React from "react";

function App() {
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
    </div>
  );
}

export default App;

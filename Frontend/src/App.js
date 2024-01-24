import Home from "./Components/home.js";
import Register from "./Register/Register.js";
import Board from "./Components/Board/Board.js";
import Upload from "./Components/Board/upload.js";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Register" element={<Register />} />
          <Route path="Board">
            <Route path="" element={<Board />} />
            <Route path="Upload" element={<Upload />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

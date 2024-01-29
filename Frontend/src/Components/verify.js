import PocketBase from "pocketbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./verify.css";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090/");

  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  //   const handleConfirmVerification = async (token) => {
  //     await pb.collection("users").confirmVerification(token);
  //     await pb.collection("users").authRefresh();
  //     alert("이메일이 전송되었습니다. 확인해주세요.");
  //     navigate("/");
  //   };
  const handleConfirmVerification = async () => {
    const data = {
      email: email,
    };
    await pb.collection("users").requestVerification(data.email);
    alert(
      "이메일이 전송되었습니다. 확인해주세요. 이메일 인증 후 다시 로그인해주세요."
    );
    navigate("/");
  };

  const handleHome = async () => {
    navigate("/");
  };

  return (
    <div className="verify">
      <div className="verify_box">
        <h1 className="verify_title">Verify</h1>

        <div className="verify_email_input">
          <label>
            E-mail:
            <br></br>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <span>회원가입시 사용한 이메일을 입력하여 이메일을 인증하세요.</span>
        <button onClick={handleConfirmVerification} className="verify_button">
          인증이메일 받기
        </button>
        <button onClick={handleHome} className="verify_button_home">
          Home
        </button>
      </div>
    </div>
  );
}

export default App;

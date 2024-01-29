import PocketBase from "pocketbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <div>
      <h1>Verify</h1>
      <label>
        E-mail:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <p>Verify your email</p>
      <button onClick={handleConfirmVerification}>인증이메일 받기</button>
    </div>
  );
}

export default App;

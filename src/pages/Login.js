import React, { useEffect, useState } from "react";
import "../css/component/User.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../hook/useFetch";

function Login() {
  const navigate = useNavigate();
  const { token } = useFetch();

  const [username, setUsername] = useState(""); //아이디 입력값 지정
  const [password, setPassword] = useState(""); //비밀번호 입력값 지정

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  //로그인
  const login = async (e) => {
    e.preventDefault();

    const loginData = { username, password }; //서버로 보낼 로그인 데이터

    try {
      await axios.post("http://localhost:5000/login", loginData).then((res) => {
        alert(res.data.message);
        const { token } = res.data;
        localStorage.setItem("token", token); //로컬 스토리지에 토큰 저장
      });
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div id="UserContainer">
      <h1>로그인</h1>
      <form id="UserForm" onSubmit={login}>
        <div className="inputDiv">
          <label>아이디</label>
          <input
            type="text"
            value={username}
            onChange={changeUsername}
            placeholder="아이디"
            required
          />
        </div>
        <div className="inputDiv">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={changePassword}
            placeholder="비밀번호"
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;

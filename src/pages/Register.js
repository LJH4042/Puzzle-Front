import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/component/User.css";
import useFetch from "../hook/useFetch";

function Register() {
  const navigate = useNavigate();
  const { token } = useFetch();

  const [username, setUsername] = useState(""); //아이디 입력값 지정
  const [password, setPassword] = useState(""); //비밀번호 입력값 지정
  const [password2, setPassword2] = useState(""); //비밀번호 확인 입력값 지정

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changePassword2 = (e) => setPassword2(e.target.value);

  //회원가입
  const register = async (e) => {
    e.preventDefault();

    const regiData = { username, password }; //서버로 보낼 회원가입 데이터

    //비밀번호가 다를 경우
    if (password !== password2) alert("비밀번호가 다릅니다.");
    //비밀번호가 같을 경우
    else {
      try {
        await axios
          .post("http://localhost:5000/register", regiData)
          .then((res) => alert(res.data.message));
        navigate("/Login");
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div id="UserContainer">
      <h1>회원가입</h1>
      <form id="UserForm" onSubmit={register}>
        <div class="inputDiv">
          <label>아이디</label>
          <input
            type="text"
            value={username}
            onChange={changeUsername}
            placeholder="아이디"
            required
          />
        </div>
        <div class="inputDiv">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={changePassword}
            placeholder="비밀번호"
            required
          />
        </div>
        <div class="inputDiv">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={password2}
            onChange={changePassword2}
            placeholder="비밀번호 확인"
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;

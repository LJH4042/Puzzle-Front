import React from "react";
import "../../css/component/Header.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";

function Header() {
  const navigate = useNavigate();
  const { username, score, token } = useFetch();

  //로그아웃
  const logout = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("token"); //accessToken 삭제
    navigate("/login"); //로그인 페이지로 이동
    window.location.reload();
  };

  return (
    <div id="headerContainer">
      <div id="header_1_Div">
        <h1 onClick={() => navigate("/")}>PUZZLE</h1>
      </div>
      <div id="header_2_Div">
        {token ? (
          <>
            <button id="mypageBtn">{`${username}(${score})`}</button>
            <button id="registerBtn" onClick={logout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button id="loginBtn" onClick={() => navigate("/Login")}>
              로그인
            </button>
            <button id="registerBtn" onClick={() => navigate("/Register")}>
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

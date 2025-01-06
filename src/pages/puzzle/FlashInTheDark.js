import React, { useEffect, useRef, useState } from "react";
import "../../css/puzzle/FlashInTheDark.css";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function FlashInTheDark() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const containerRef = useRef(null); //컨테이너 영역 참조
  const lightRef = useRef(null); //손전등 참조

  const [flashInput, setFlashInput] = useState(""); //정답 입력창 지정
  const handleFlashInput = (e) => setFlashInput(e.target.value);

  // 기호 랜덤 배치
  useEffect(() => {
    const randomPositions = () => {
      const numElements = containerRef.current.querySelectorAll(".num"); //기호 지정

      numElements.forEach((num) => {
        const randomTop = Math.floor(Math.random() * 350); //Y 좌표
        const randomLeft = Math.floor(Math.random() * 1700); //X 좌표

        num.style.position = "absolute";
        num.style.top = `${randomTop}px`; //Y 좌표 위치
        num.style.left = `${randomLeft}px`; //X 좌표 위치
      });
    };

    randomPositions();
  }, []);

  //손전등 다루기
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect(); //마우스 위치 정보

    const mouseX = e.clientX - rect.left; //컨테이너 내부 X 좌표
    const mouseY = e.clientY - rect.top; //컨테이너 내부 Y 좌표

    const light = lightRef.current; //손전등 지정
    light.style.left = `${mouseX}px`; //손전등 X 좌표 위치
    light.style.top = `${mouseY}px`; //손전등 Y 좌표 위치
    light.style.display = "block"; //컨테이너에 들어오면 손전등 보이기
  };

  // 컨테이너를 벗어나면 손전등 숨김
  const handleMouseLeave = () => (lightRef.current.style.display = "none");

  // 정답 확인
  const checkFlash = async () => {
    if (flashInput === "604") {
      addScore(5);
    } else {
      alert("오답입니다.");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div id="FlashInTheDark">
      <h1>
        -어둠 속에 숨은 6개의 기호들로 만들 수 있는 가장 큰 숫자를 입력하라-
      </h1>
      <div
        id="container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div id="dark">
          <div id="light" ref={lightRef}></div>
        </div>
        <div id="numDiv">
          <p className="num">4</p>
          <p className="num">5</p>
          <p className="num">7</p>
          <p className="num">8</p>
          <p className="num">+</p>
          <p className="num">x</p>
        </div>
      </div>
      <div id="checkDiv">
        <input
          id="checkValue"
          value={flashInput}
          onChange={handleFlashInput}
          autoComplete="off"
        />
        <button id="checkBtn" onClick={checkFlash}>
          확인
        </button>
      </div>
      <Canvas />
    </div>
  );
}

export default FlashInTheDark;

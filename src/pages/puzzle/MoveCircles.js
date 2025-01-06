import React, { useEffect, useRef, useState, useCallback } from "react";
import "../../css/puzzle/MoveCircles.css";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function MoveCircles() {
  const canvasRef = useRef(null); //캔버스를 참조
  const objsRef = useRef([]); //움직이는 공 배열 참조

  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const [redInput, setRedInput] = useState(""); //빨간 공 입력창 지정
  const [yellowInput, setYellowInput] = useState(""); //노란 공 입력창 지정
  const [greenInput, setGreenInput] = useState(""); //초록 공 입력창 지정
  const [blueInput, setBlueInput] = useState(""); //파랑 공 입력창 지정

  const handleRedInput = (e) => setRedInput(e.target.value);
  const handleYellowInput = (e) => setYellowInput(e.target.value);
  const handleGreenInput = (e) => setGreenInput(e.target.value);
  const handleBlueInput = (e) => setBlueInput(e.target.value);

  //Circles 객체 정의
  function Circles(x, y, radius, color) {
    this.x = x; //원점의 x 좌표
    this.y = y; //원점의 y 좌표
    this.radius = radius; //반지름
    this.color = color; //색깔

    this.dx = Math.floor(Math.random() * 10) + 1; //x축 속도
    this.dy = Math.floor(Math.random() * 10) + 1; //y축 속도

    //원 그리기
    this.draw = (ctx) => {
      ctx.beginPath(); //새로운 경로 시작
      ctx.fillStyle = this.color; //원 색깔 지정
      ctx.strokeStyle = "gray"; //테두리 색깔
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); //원 그리기 함수
      ctx.fill(); //원으로 채우기
      ctx.stroke(); //테두리 채우기
    };

    //공 애니메이션
    this.animate = (ctx, width, height) => {
      this.x += this.dx; //원점 x 바꾸기
      this.y += this.dy; //원점 y 바꾸기

      //x축 벽면에 부딪혔을 시 튕겨나가기
      if (this.x + this.radius > width || this.x - this.radius < 0)
        this.dx = -this.dx;
      //y축 벽면에 부딪혔을 시 튕겨나가기
      if (this.y + this.radius > height || this.y - this.radius < 0)
        this.dy = -this.dy;

      this.draw(ctx); //움직일 때 원 생성
    };
  }

  // 색깔별 공 생성
  const createBalls = useCallback((repeat, color) => {
    for (let i = 0; i < repeat; i++) {
      const radius = Math.floor(Math.random() * 40) + 10; //랜덤 반지름
      const x = Math.random() * (1000 - radius * 2) + radius; //랜덤 원점의 x 좌표
      const y = Math.random() * (500 - radius * 2) + radius; //랜덤 원점의 y 좌표

      objsRef.current.push(new Circles(x, y, radius, color)); //움직이는 공 배열에 저장
    }
  }, []);

  // 캔버스 애니메이션 실행
  const animateCanvas = useCallback(() => {
    const canvas = canvasRef.current; ///움직이는 공 구간 지정
    const ctx = canvas.getContext("2d"); //콘텍스트를 2d로 지정
    canvas.width = 1000; //움직이는 공 구간 넓이
    canvas.height = 500; //움직이는 공 구간 높이

    //공 움직이기
    const move = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화
      //배열에 저장된 공 객체들 움직이기
      objsRef.current.forEach((obj) =>
        obj.animate(ctx, canvas.width, canvas.height)
      );
      requestAnimationFrame(move); //move 함수를 반복해서 움직이는 효과
    };

    move(); //move 함수 실행
  }, []);

  //정답 확인
  const checkCanvas = async (e) => {
    e.preventDefault(); //폼의 기본 제출 동작을 막음

    if (
      redInput === "5" &&
      yellowInput === "8" &&
      greenInput === "3" &&
      blueInput === "9"
    ) {
      addScore(0);
    } else {
      alert("오답입니다.");
      window.location.reload();
    }
  };

  useEffect(() => {
    createBalls(5, "red"); //빨간 공
    createBalls(8, "yellow"); //노란 공
    createBalls(3, "green"); //초록 공
    createBalls(9, "blue"); //파란 공
    animateCanvas(); //애니메이션 시작
  }, [createBalls, animateCanvas]);

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div id="moveCircles">
      <h1>-각 색깔마다 원이 몇 개씩 있는 지 답하라-</h1>
      <canvas id="circleDiv" ref={canvasRef}></canvas>
      <form onSubmit={checkCanvas} autoComplete="off">
        <div id="checkInput">
          <input
            id="redInput"
            placeholder="Red"
            value={redInput}
            onChange={handleRedInput}
          />
          <input
            id="yellowInput"
            placeholder="Yellow"
            value={yellowInput}
            onChange={handleYellowInput}
          />
          <input
            id="greenInput"
            placeholder="Green"
            value={greenInput}
            onChange={handleGreenInput}
          />
          <input
            id="blueInput"
            placeholder="Blue"
            value={blueInput}
            onChange={handleBlueInput}
          />
        </div>
        <div>
          <button type="submit" id="checkCanvas">
            확인
          </button>
        </div>
      </form>
      <Canvas />
    </div>
  );
}

export default MoveCircles;

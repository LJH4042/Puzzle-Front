import React, { useEffect, useState } from "react";
import "../../css/puzzle/AllChangeZero.css";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function AllChangeZero() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const [numbers, setNumbers] = useState([6, 4, 9, 7]); //초기 숫자 값

  //숫자 계산 함수
  const sumCalc = (index1, index2, calcNum) => {
    setNumbers((num) => {
      const newNumbers = [...num];

      newNumbers[index1] = (newNumbers[index1] + calcNum) % 10;
      newNumbers[index2] = (newNumbers[index2] + calcNum) % 10;

      return newNumbers;
    });
  };

  const aClick = () => sumCalc(0, 2, 5); //A 버튼 클릭 함수
  const bClick = () => sumCalc(1, 3, 3); //B 버튼 클릭 함수
  const cClick = () => sumCalc(0, 1, 7); //C 버튼 클릭 함수
  const dClick = () => sumCalc(2, 3, 4); //D 버튼 클릭 함수

  //정답 확인
  const checkZero = async () => {
    if (numbers.every((num) => num === 0)) {
      addScore(3);
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
    <div id="AllChangeZero">
      <h1>-4개의 알파벳 버튼의 규칙을 찾아 숫자를 모두 0으로 만들어라-</h1>
      <div className="sumDiv">
        <div className="sumBtn" onClick={aClick}>
          A
        </div>
        <div className="sumBtn" onClick={bClick}>
          B
        </div>
        <div id="noneDiv"></div>
      </div>
      <div className="sumDiv">
        <div className="sumNum">{numbers[0]}</div>
        <div className="sumNum">{numbers[1]}</div>
        <div className="sumBtn" onClick={cClick}>
          C
        </div>
      </div>
      <div className="sumDiv">
        <div className="sumNum">{numbers[2]}</div>
        <div className="sumNum">{numbers[3]}</div>
        <div className="sumBtn" onClick={dClick}>
          D
        </div>
      </div>
      <button id="checkAnswer" onClick={checkZero}>
        확인
      </button>
      <Canvas />
    </div>
  );
}

export default AllChangeZero;

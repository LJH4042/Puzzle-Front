import React, { useEffect, useState } from "react";
import "../../css/puzzle/DifficultCalc.css";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function DifficultCalc() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const [string, setString] = useState(""); //표시할 수식
  const [numArr, setNumArr] = useState([]); //숫자와 기호를 저장할 배열
  const [result, setResult] = useState(0); //결과 초기 값
  const [disabledButtons, setDisabledButtons] = useState([]); //비활성화된 버튼을 저장할 배열

  const [calcInput, setCalcInput] = useState(""); //정답 입력창 지정
  const handlesetCalcInput = (e) => setCalcInput(e.target.value);

  //숫자 버튼 클릭
  const numClick = (value, label) => {
    setString((str) => str + label); //수식 업데이트
    setNumArr((arr) => [...arr, value]); //배열에 값 추가
    setDisabledButtons((btn) => [...btn, label]); //버튼 비활성화
  };

  //더하기 버튼
  const plusClick = () => {
    //이전 또는 바로 앞에 더하기가 없을 경우
    if (string !== "" && string[string.length - 1] !== "+") {
      setString((str) => str + "+"); //"+" 문자 추가
      setNumArr((arr) => [...arr, "+"]); //배열에 "+" 추가
    }
  };

  // 계산 버튼 클릭 핸들러
  const calcClick = () => {
    //배열이 비어있지 않거나, +가 포함되어 있거나, 마지막이 +가 아닐 경우
    if (
      numArr.length !== 0 &&
      numArr.includes("+") &&
      string[string.length - 1] !== "+"
    ) {
      const stringDiv = numArr.join("").split("+").map(Number); //"+"로 분리 후 숫자화
      const calcResult = stringDiv.reduce((total, num) => total + num, 0); //합산
      setResult(calcResult); // 결과 저장
    }
  };

  //리셋 버튼
  const resetClick = () => {
    setString(""); //문자열 리셋
    setNumArr([]); //배열 리셋
    setResult(0); //결과값 리셋
    setDisabledButtons([]); //모든 숫자 버튼 활성회
  };

  // 정답 확인 버튼 클릭 핸들러
  const checkCalc = async () => {
    if (calcInput === "") alert("답을 입력해주세요.");
    else if (calcInput === "B/F/G") {
      addScore(8);
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
    <div id="DifficultCalc">
      <h1>-A ~ I에서 5/8/6에 해당하는 알파벳을 순서대로 입력하라-</h1>
      <h3>※ 각 알파벳 버튼은 한번씩만 누를 수 있다 ※</h3>
      <div id="resultDiv">{result || string}</div>
      <div className="btnDiv">
        <button className="operBtn" onClick={plusClick}>
          +
        </button>
        <button className="operBtn" onClick={calcClick}>
          =
        </button>
        <button className="operBtn" onClick={resetClick}>
          ←
        </button>
      </div>
      <div className="btnDiv">
        {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((label, index) => {
          const value = [4, 5, 2, 3, 9, 8, 6, 7, 1][index];
          return (
            <button
              key={index}
              className="numBtn"
              value={value}
              onClick={() => numClick(value, label)}
              disabled={disabledButtons.includes(label)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div id="checkDiv">
        <input
          id="checkValue"
          placeholder="ex) A/B/C"
          value={calcInput}
          onChange={handlesetCalcInput}
          autoComplete="off"
        />
        <button id="checkBtn" onClick={checkCalc}>
          확인
        </button>
      </div>
      <Canvas />
    </div>
  );
}

export default DifficultCalc;

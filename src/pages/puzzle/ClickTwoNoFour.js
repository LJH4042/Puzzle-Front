import React, { useEffect, useState } from "react";
import "../../css/puzzle/ClickTwoNoFour.css";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function ClickTwoNoFour() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const correntPad = [1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15]; //정답
  let resultPad = 0; //정답 판별 값

  const [answerPad, setAnswerPad] = useState([]); //제출한 답 초기 배열

  //키패드를 클릭했을 경우
  const clickKeyPad = (num) => {
    //배열에 클릭한 키패드 값이 있을 경우
    if (answerPad.includes(num))
      setAnswerPad(
        answerPad.filter((item) => item !== num) //배열에서 값을 삭제
      );
    //배열에 클릭한 키패드 값이 없을 경우
    else setAnswerPad([...answerPad, num]); //배열에서 값을 삽입
  };

  //정답 확인
  const checkKeyPad = async () => {
    const sortAnswerArray = answerPad.sort((a, b) => a - b); //제출한 배열 값을 오름차순으로 정렬

    for (let i = 0; i < correntPad.length; i++)
      for (let j = 0; j < sortAnswerArray.length; j++)
        if (correntPad[i] === sortAnswerArray[j]) resultPad++; //정답과 제출한 배열 값이 같으면 1 추가

    if (resultPad === 11) {
      addScore(6);
    } else {
      alert("오답입니다."); //오답일 경우
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [token, navigate]);

  //테이블
  const KeyPad = ({ num1, num2, num3 }) => {
    return (
      <>
        {[num1, num2, num3].map((num, index) => (
          <td
            key={index}
            className={`keyPad ${
              answerPad.includes(num) ? "clickPadCheck" : ""
            }`}
            onClick={() => clickKeyPad(num)}
          >
            {num}
          </td>
        ))}
      </>
    );
  };

  return (
    <div id="clickTwoNoFour">
      <h1>-2를 누르되 4는 누르지 말아라-</h1>
      <table>
        <tbody>
          <tr>
            <KeyPad num1={1} num2={2} num3={3} />
          </tr>
          <tr>
            <KeyPad num1={4} num2={5} num3={6} />
          </tr>
          <tr>
            <KeyPad num1={7} num2={8} num3={9} />
          </tr>
          <tr>
            <KeyPad num1={10} num2={11} num3={12} />
          </tr>
          <tr>
            <KeyPad num1={13} num2={14} num3={15} />
          </tr>
        </tbody>
      </table>
      <button id="checkTwoFour" onClick={checkKeyPad}>
        확인
      </button>
      <Canvas />
    </div>
  );
}

export default ClickTwoNoFour;

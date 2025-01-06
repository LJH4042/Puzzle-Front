import React, { useEffect, useState } from "react";
import "../../css/puzzle/TimeBomb.css";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function TimeBomb() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const [n, setNumArray] = useState([]); //전체 숫자 배열
  const [correntBomb, setCorrentBomb] = useState([]); //정답 배열
  const [answerBomb, setAnswerBomb] = useState([]); //제출한 답 초기 배열

  const [timer, setTimer] = useState(20); // 타이머 초기값
  const [timerColor, setTimerColor] = useState("blue"); //타이머 표시 색깔
  const [gameOver, setGameOver] = useState(false); //게임 오버

  let result = 0; //정답 판별 값

  // 키패드를 클릭했을 경우
  const clickBomb = (num) => {
    setAnswerBomb((prevAnswer) => {
      // 배열에 클릭한 키패드 값이 있을 경우
      if (prevAnswer.includes(num)) {
        return prevAnswer.filter((item) => item !== num); // 배열에서 값을 삭제
      }
      // 배열에 클릭한 키패드 값이 없을 경우
      return [...prevAnswer, num]; // 배열에 값을 삽입
    });
  };

  //정답 확인
  const checkBomb = async () => {
    const sortCorrentArray = correntBomb.sort((a, b) => a - b); //정답 배열 값을 오름차순으로 정렬
    const sortAnswerArray = answerBomb.sort((a, b) => a - b); //제출한 배열 값을 오름차순으로 정렬

    for (let i = 0; i < sortCorrentArray.length; i++)
      for (let j = 0; j < sortAnswerArray.length; j++)
        if (
          sortCorrentArray.length === sortAnswerArray.length &&
          correntBomb[i] === sortAnswerArray[j]
        )
          result++; //정답과 제출한 배열 값이 같으면 1 추가

    if (sortCorrentArray.length === result) {
      addScore(9);
    } else {
      alert("해체에 실패하셨습니다."); //실패했을 경우
      setGameOver(true);
    }
  };

  // 초기 랜덤 숫자 설정
  useEffect(() => {
    const usedNumbers = []; //이미 사용된 숫자를 넣는 배열
    const randomValue = []; //랜덤 숫자 배열
    const evenValue = []; //짝수 숫자 배열

    //랜덤 숫자 25개 생성
    while (randomValue.length < 25) {
      const randomNum = Math.floor(Math.random() * 99 + 1); //1부터 99까지 랜덤 숫자

      //중복된 숫자일 경우
      if (!usedNumbers.includes(randomNum)) {
        usedNumbers.push(randomNum); //이미 사용한 숫자 배열에 값 저장
        randomValue.push(randomNum); //랜덤 숫자를 랜덤 숫자 배열에 저장
        if (randomNum % 2 === 0) evenValue.push(randomNum); //짝수인 값만 짝수 숫자 배열에 저장
      }
    }

    setNumArray(randomValue);
    setCorrentBomb(evenValue); //랜덤 숫자 배열을 정답 배열에 삽입
  }, []);

  //타이머
  useEffect(() => {
    //타이머 실행
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1); //1씩 감소
    }, 1000);

    //타이머가 종료되었을 경우
    if (timer <= 0) {
      alert("해체에 실패하셨습니다.");
      clearInterval(interval); //타이머 종료
      setGameOver(true); //게임 오버 화면 보여줌
    }

    if (timer < 11) setTimerColor("orange");
    if (timer < 5) setTimerColor("red");

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 종료
  }, [timer]);

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [token, navigate]);

  //테이블
  const KeyPad = ({ a, b, c, d, e }) => {
    return (
      <>
        {[a, b, c, d, e].map((num, index) => (
          <td
            key={index}
            className={`disbandBtn ${
              answerBomb.includes(num) ? "clickBombCheck" : ""
            }`}
            onClick={() => clickBomb(num)}
          >
            {num}
          </td>
        ))}
      </>
    );
  };

  return (
    <>
      {gameOver ? (
        <div id="failDiv">
          <h1>{gameOver && "해체에 실패하셨습니다.."}</h1>
          {gameOver && (
            <button
              id="restartBombBtn"
              onClick={() => window.location.reload()}
            >
              재도전
            </button>
          )}
        </div>
      ) : (
        <div id="timeBomb">
          <h1>-20초 안에 짝수만 눌러 폭탄을 해체하라-</h1>
          <h3>※ 2번 이상 눌러야 하는 함정 버튼이 있을 수 있다 ※</h3>
          <table>
            <tbody>
              <tr>
                <KeyPad a={n[0]} b={n[1]} c={n[2]} d={n[3]} e={n[4]} />
              </tr>
              <tr>
                <KeyPad a={n[5]} b={n[6]} c={n[7]} d={n[8]} e={n[9]} />
              </tr>
              <tr>
                <KeyPad a={n[10]} b={n[11]} c={n[12]} d={n[13]} e={n[14]} />
              </tr>
              <tr>
                <KeyPad a={n[15]} b={n[16]} c={n[17]} d={n[18]} e={n[19]} />
              </tr>
              <tr>
                <KeyPad a={n[20]} b={n[21]} c={n[22]} d={n[23]} e={n[24]} />
              </tr>
            </tbody>
          </table>
          <button id="checkBomb" onClick={checkBomb}>
            해체
          </button>
          <div id="timerContainer">
            <div
              id="timerDiv"
              style={{
                width: `${timer * 5}%`,
                backgroundColor: timerColor,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}

export default TimeBomb;

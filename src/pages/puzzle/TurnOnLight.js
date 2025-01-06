import React, { useEffect, useState } from "react";
import "../../css/puzzle/TurnOnLight.css";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function TurnOnLight() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const [lights, setLights] = useState([false, false, false, false, false]); //각 전구 초기값

  //전구 ON/OFF 함수
  const toggleLight = (a, b, c) => {
    setLights((light) => {
      const newLightArray = [...light]; //배열에 저장된 전구 값 가져오기

      newLightArray[a] = !newLightArray[a]; //이전 전구 변환
      newLightArray[b] = !newLightArray[b]; //해당 전구 변환
      newLightArray[c] = !newLightArray[c]; //다음 전구 변환

      return newLightArray; //변환한 배열 반환
    });
  };

  //정답 확인
  const checkLight = async () => {
    if (
      lights[0] === true &&
      lights[1] === false &&
      lights[2] === true &&
      lights[3] === false &&
      lights[4] === true
    ) {
      addScore(4);
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

  return (
    <div id="turnOnLight">
      <h1>-1, 3, 5번 째 전구만 켜라-</h1>
      <div id="lightDiv">
        {lights.map((isOn, index) => {
          return (
            <div
              className={`light ${isOn ? "turnLight" : ""}`}
              key={index}
            ></div>
          );
        })}
      </div>
      <div id="btnDiv">
        <div className="lightBtn" onClick={() => toggleLight(0, 1, 4)}></div>
        <div className="lightBtn" onClick={() => toggleLight(0, 1, 2)}></div>
        <div className="lightBtn" onClick={() => toggleLight(1, 2, 3)}></div>
        <div className="lightBtn" onClick={() => toggleLight(2, 3, 4)}></div>
        <div className="lightBtn" onClick={() => toggleLight(0, 3, 4)}></div>
      </div>
      <button id="checkLight" onClick={checkLight}>
        확인
      </button>
      <Canvas />
    </div>
  );
}

export default TurnOnLight;

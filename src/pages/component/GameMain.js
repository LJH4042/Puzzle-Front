import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/component/Main.css";
import KeyPic from "../../images/key.png";
import useFetch from "../../hook/useFetch";

function GameMain() {
  const navigate = useNavigate();
  const { score, loading } = useFetch();

  // 로딩 중일 때 로딩 상태 표시 (예: "로딩중..." 또는 아무 것도 표시 안 함)
  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div>
      <div className="GameMainDiv">
        {/*1단계*/}
        {score >= 0 ? (
          <button onClick={() => navigate("/MoveCircles")}>
            {score >= 1 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 1<p />
                움직이는 원{" "}
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*2단계*/}
        {score >= 1 ? (
          <button onClick={() => navigate("/PassedTimePic")}>
            {score >= 2 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 2<p />
                사진의 순서
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*3단계*/}
        {score >= 2 ? (
          <button onClick={() => navigate("/CardArray")}>
            {score >= 3 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 3<p />
                카드의 규칙
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*4단계*/}
        {score >= 3 ? (
          <button onClick={() => navigate("/AllChangeZero")}>
            {score >= 4 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 4<p />
                모두 0으로
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*5단계*/}
        {score >= 4 ? (
          <button onClick={() => navigate("/TurnOnLight")}>
            {score >= 5 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 5<p />
                5개의 전구
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
      </div>
      <div className="GameMainDiv">
        {/*6단계*/}
        {score >= 5 ? (
          <button onClick={() => navigate("/FlashInTheDark")}>
            {score >= 6 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 6<p />
                어둠 속에서
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*7단계*/}
        {score >= 6 ? (
          <button onClick={() => navigate("/ClickTwoNoFour")}>
            {score >= 7 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 7<p />
                이상한 키패드
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*8단계*/}
        {score >= 7 ? (
          <button onClick={() => navigate("/DrageDropTile")}>
            {score >= 8 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 8<p />
                타일 맞추기
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*9단계*/}
        {score >= 8 ? (
          <button onClick={() => navigate("/DifficultCalc")}>
            {score >= 9 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 9<p />
                난해한 계산기
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
        {/*10단계*/}
        {score >= 9 ? (
          <button onClick={() => navigate("/TimeBomb")}>
            {score >= 10 ? (
              "COMPLETE"
            ) : (
              <>
                Lv. 10
                <p />
                시한폭탄 해체
              </>
            )}
          </button>
        ) : (
          <img src={KeyPic} alt="key" />
        )}
      </div>
    </div>
  );
}

export default GameMain;

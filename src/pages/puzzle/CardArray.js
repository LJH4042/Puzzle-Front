import React, { useEffect, useState } from "react";
import "../../css/puzzle/CardArray.css";
import spade from "../../images/CardArray/spade.png";
import clover from "../../images/CardArray/clover.png";
import heart from "../../images/CardArray/heart.png";
import diamond from "../../images/CardArray/diamond.png";
import joker from "../../images/CardArray/joker.png";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function CardArray() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const cards = ["", spade, clover, heart, diamond, joker]; //카드 목록

  const correntCard = [4, 5, 3, 2, 1]; //정답
  const [cardIndex, setCardIndex] = useState([0, 0, 0, 0, 0]); //각 인덱스를 배열 초기화

  let result = 0; //확인 초기값

  //카드 변경 함수
  const changeCard = (direction, index) => {
    setCardIndex((card) =>
      card.map((value, i) => {
        //현재 카드의 인덱스(i)가 클릭된 카드의 인덱스(index)와 일치
        if (i === index) {
          //이전 버튼을 눌렀을 시, 1씩 감소 or 0보다 적으면 가장 큰 수로 변환
          if (direction === "prev")
            return value === 0 ? cards.length - 1 : value - 1;
          //다음 버튼을 눌렀을 시, 1씩 증가 or 가장 큰 수면 0으로 변환
          else if (direction === "next")
            return value === cards.length - 1 ? 0 : value + 1;
        }
        return value; //클릭된 카드의 인덱스(index)가 아니라면, 원래의 값(value) 유지.
      })
    );
  };

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [token, navigate]);

  //정답 확인
  const checkCard = async () => {
    for (let i = 0; i < correntCard.length; i++)
      if (correntCard[i] === cardIndex[i]) result++; //값이 일치하면 1 증가

    if (result === 5) {
      addScore(2);
    } else {
      alert("오답입니다.");
      window.location.reload();
    }
  };

  return (
    <div id="cardArray">
      <h1>-조건에 따라 카드를 나열하라-</h1>
      <h4>1. 클로버는 하트의 바로 오른쪽에 있다</h4>
      <h4>2. 다이아몬드와 조커는 스페이드 옆에 있지 않다.</h4>
      <h4>3. 조커와 다이아몬드는 클로버의 옆에 있지 않다.</h4>
      <h4>4. 다이아몬드와 스페이드는 하트의 옆에 있지 않다.</h4>
      <div id="rowCardDiv">
        {cardIndex.map((_, index) => (
          <div className="selectCardDiv" key={index}>
            <span className="nextBtn" onClick={() => changeCard("next", index)}>
              &and;
            </span>
            <div
              className="cardDiv"
              style={{
                backgroundImage: `url(${cards[cardIndex[index]]})`,
              }}
            ></div>
            <span className="prevBtn" onClick={() => changeCard("prev", index)}>
              &or;
            </span>
          </div>
        ))}
      </div>
      <button id="checkCard" onClick={checkCard}>
        확인
      </button>
      <Canvas />
    </div>
  );
}

export default CardArray;

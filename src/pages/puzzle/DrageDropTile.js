import React, { useState, useRef, useEffect } from "react";
import "../../css/puzzle/DrageDropTile.css";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function DrageDropTile() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const dragTileIndex = useRef(null); //현재 드래그 중인 타일 인덱스 참조

  const [draggingIndex, setDraggingIndex] = useState(null); //드래그 중인 타일 인덱스
  const [dragEnterIndex, setDragEnterIndex] = useState(null); //드래그된 위치 인덱스

  const initialTiles = ["N", "Y", "M", "D", "A", "O"]; //초기 타일
  const [tiles, setTiles] = useState(initialTiles); //타일 배열
  const [count, setCount] = useState(3); //이동 가능 횟수

  //드래그 시작 이벤트
  const handleDragStart = (index) => {
    dragTileIndex.current = index; //드래그 중인 타일의 인덱스 저장
    setDraggingIndex(index); //드래그 중인 타일 인덱스 업데이트
  };

  //드래그 종료 이벤트
  const handleDragEnd = () => {
    setDraggingIndex(null); //드래그 중인 타일 인덱스 상태 초기화
    setDragEnterIndex(null); //드래그된 위치 인덱스 상태 초기화
  };

  //드래그 엔터 이벤트
  const handleDragEnter = (index) => setDragEnterIndex(index); //드래그된 위치 인덱스 업데이트

  //드래그 중 이벤트 (기본 동작 방지)
  const handleDragOver = (e) => e.preventDefault();

  //드롭 이벤트
  const handleDrop = (index) => {
    //움직임 가능 횟수가 남아있을 경우
    if (count > 0) {
      const currentIndex = dragTileIndex.current; //드래그한 타일 인덱스 지정

      if (currentIndex === index) return; //같은 위치에 드롭하는 경우 무시

      const updatedTiles = [...tiles]; //기존 배열 복사
      const [movedTile] = updatedTiles.splice(currentIndex, 1); //드래그한 타일 제거
      updatedTiles.splice(index, 0, movedTile); //새로운 위치에 삽입

      setTiles(updatedTiles); //타일 업데이트
      setCount((prev) => prev - 1); //이동 가능 횟수 감소
    } else alert("더 이상 움직일 수 없습니다.");

    handleDragEnd(); //드래그 종료 처리
  };

  // 정답 확인
  const checkTile = async () => {
    const joinTiles = tiles.join(""); //배열을 문자열로 합치기

    if (joinTiles === "MONDAY") {
      addScore(7);
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
    <div id="DrageDropTile">
      <h1>-타일을 3번만 움직여 몇요일인지 나타내라-</h1>
      <h3 id="countDiv">※ 이동 가능 횟수 : {count} ※</h3>
      <ul id="tileList">
        {tiles.map((tile, index) => (
          <li
            key={index}
            className={`tile 
              ${draggingIndex === index ? "drag" : ""} 
              ${dragEnterIndex === index ? "enter" : ""}`}
            draggable="true"
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
          >
            {tile}
          </li>
        ))}
      </ul>
      <button id="checkTile" onClick={checkTile}>
        확인
      </button>
      <Canvas />
    </div>
  );
}

export default DrageDropTile;

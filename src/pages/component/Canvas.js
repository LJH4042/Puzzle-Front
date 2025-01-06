import React, { useRef, useState } from "react";
import "../../css/component/Canvas.css";

function Canvas() {
  const canvasRef = useRef(null); //캔버스 참조
  const canvasDiv = useRef(null); //캔버스 구역 참조
  const openDiv = useRef(null); //메모장 열기 버튼 구역 참조

  const [isDrawing, setIsDrawing] = useState(false); //드로잉 상태
  const [lineColor, setLineColor] = useState("#000"); //선 색상 상태
  const [lineWidth, setLineWidth] = useState(1); //선 굵기 상태

  //마우스를 캔버스 위에서 눌렸을 때
  const startDrawing = (e) => {
    const canvas = canvasRef.current; //캔버스 구간 지정
    const ctx = canvas.getContext("2d"); //콘텍스트를 2d로 지정

    const rect = canvas.getBoundingClientRect(); //클릭한 부분의 위치 정보 가져옴
    const startX = e.clientX - rect.left; //드로잉 시작 위치의 X 좌표
    const startY = e.clientY - rect.top; //드로잉 시작 위치의 Y 좌표

    ctx.beginPath(); //새로운 경로 시작
    ctx.moveTo(startX, startY); //경로 시작 위치 이동

    setIsDrawing(true); //드로잉 상태 활성화
  };

  //마우스로 캔버스 위를 움직였을 때
  const draw = (e) => {
    if (!isDrawing) return; //드로잉 상태가 아니면 종료

    const canvas = canvasRef.current; //캔버스 구간 지정
    const ctx = canvas.getContext("2d"); //콘텍스트를 2d로 지정

    const rect = canvas.getBoundingClientRect(); //드로잉하는 부분의 위치 정보 가져옴
    const currentX = e.clientX - rect.left; //드로잉 위치의 X 좌표
    const currentY = e.clientY - rect.top; //드로잉 위치의 Y 좌표

    ctx.lineCap = "round"; //선 끝부분을 둥글게 지정
    ctx.lineTo(currentX, currentY); //선 그리기
    ctx.stroke(); //선 표시
  };

  //마우스 클릭을 뗐을 때
  const stopDrawing = () => setIsDrawing(false); //드로잉 비활성화

  // 선 색깔 변경
  const handleColorChange = (e) => {
    const canvas = canvasRef.current; //캔버스 구간 지정
    const ctx = canvas.getContext("2d"); //콘텍스트를 2d로 지정

    setLineColor(e.target.value); //색상 값 변경
    ctx.strokeStyle = e.target.value;
  };

  // 선 굵기 변경
  const handleWidthChange = (e) => {
    const canvas = canvasRef.current; //캔버스 구간 지정
    const ctx = canvas.getContext("2d"); //콘텍스트를 2d로 지정

    setLineWidth(e.target.value); //굵기 값 변경
    ctx.lineWidth = e.target.value;
  };

  //캔버스 초기화
  const clearCanvas = () => {
    const canvas = canvasRef.current; //캔버스 구간 지정
    const ctx = canvas.getContext("2d"); //콘텍스트를 2d로 지정

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  //캔버스 열기
  const openCanvas = () => {
    openDiv.current.style.display = "none";
    canvasDiv.current.classList.add("active");
  };

  //캔버스 닫기
  const closeCanvas = () => {
    openDiv.current.style.display = "block";
    canvasDiv.current.classList.remove("active");
  };

  return (
    <>
      <div id="openDiv" ref={openDiv}>
        <button id="open" onClick={openCanvas}>
          메모장 열기
        </button>
      </div>

      <div id="canvasDiv" ref={canvasDiv}>
        <div id="toolbar">
          <button id="close" onClick={closeCanvas}>
            메모장 닫기
          </button>
          <div>
            <label>색상</label>
            <input
              type="color"
              id="lineColor"
              value={lineColor}
              onChange={handleColorChange}
            />
            <label>선 굵기</label>
            <input
              type="number"
              id="lineWidth"
              value={lineWidth}
              min="1"
              max="10"
              onChange={handleWidthChange}
            />
          </div>
          <button id="reset" onClick={clearCanvas}>
            지우기
          </button>
        </div>
        <canvas
          id="draw"
          ref={canvasRef}
          width="575"
          height="800"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing} // 마우스가 캔버스를 벗어날 때 드로잉 중지
        ></canvas>
      </div>
    </>
  );
}

export default Canvas;

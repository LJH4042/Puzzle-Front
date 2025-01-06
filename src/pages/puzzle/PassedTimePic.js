import React, { useEffect, useState } from "react";
import "../../css/puzzle/PassedTimePic.css";
import A from "../../images/PassedTimePic/1.png";
import B from "../../images/PassedTimePic/2.png";
import C from "../../images/PassedTimePic/3.png";
import D from "../../images/PassedTimePic/4.png";
import Canvas from "../component/Canvas";
import useScore from "../../hook/useScore";
import { useNavigate } from "react-router-dom";

function PassedTimePic() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기
  const { addScore } = useScore();
  const navigate = useNavigate();

  const [modalImg, setModalImg] = useState(null); //모달에 표시할 이미지
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 상태 지정
  const [imagesLoaded, setImagesLoaded] = useState(false); //이미지 로드 상태 관리

  const [modalInput, setModalInput] = useState(""); ///정답 입력창 지정
  const handleModalInput = (e) => setModalInput(e.target.value);

  //각 이미지모달 창 띄우기
  const openModal = (img) => {
    setModalImg(img); //모달에 들어갈 이미지 지정
    setIsModalOpen(true); //모달 열기
  };

  //모달 창 닫기
  const closeModal = () => setIsModalOpen(false); //모달 닫기

  //정답 확인
  const checkModal = async () => {
    if (modalInput === "3-4-2-1") {
      addScore(1);
    } else {
      alert("오답입니다.");
      window.location.reload();
    }
  };

  // 이미지가 로드되었는지 확인하고 상태 업데이트
  useEffect(() => {
    const preloadImages = [A, B, C, D];
    const promises = preloadImages.map(
      (image) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
        })
    );
    // 모든 이미지가 로드되었을 때 상태 업데이트
    Promise.all(promises).then(() => setImagesLoaded(true));
  }, []);

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div id="passedTimePic">
      <h1>-4장의 사진을 시간 순서대로 입력하라-</h1>
      <h3>※ 각 사진을 클릭하면 확대할 수 있다 ※</h3>
      {imagesLoaded && (
        <>
          <div className="imageDiv">
            <span>1</span>
            <img className="pic" src={A} alt="1" onClick={() => openModal(A)} />
            <img className="pic" src={B} alt="2" onClick={() => openModal(B)} />
            <span>2</span>
          </div>
          <div className="imageDiv">
            <span>3</span>
            <img className="pic" src={C} alt="3" onClick={() => openModal(C)} />
            <img className="pic" src={D} alt="4" onClick={() => openModal(D)} />
            <span>4</span>
          </div>
        </>
      )}
      <div id="checkDiv">
        <input
          id="checkValue"
          placeholder="ex) 1-2-3-4"
          value={modalInput}
          onChange={handleModalInput}
          autoComplete="off"
        />
        <button id="checkModal" onClick={checkModal}>
          확인
        </button>
      </div>
      {isModalOpen && (
        <div id="modalDiv" style={{ display: "block" }}>
          <span id="modalDelete" onClick={closeModal}>
            X
          </span>
          <img src={modalImg} alt="modal" id="modalImg" />
        </div>
      )}
      <Canvas />
    </div>
  );
}

export default PassedTimePic;

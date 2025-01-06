import React from "react";
import KeyPic from "../../images/key.png";
import "../../css/component/Main.css";

function KeyMain() {
  return (
    <>
      <div className="KeyMainDiv">
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
      </div>
      <div className="KeyMainDiv">
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
        <img src={KeyPic} alt="key" />
      </div>
    </>
  );
}

export default KeyMain;

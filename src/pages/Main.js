import React from "react";
import KeyMain from "./component/KeyMain";
import GameMain from "./component/GameMain";

function Main() {
  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기

  return <div>{token ? <GameMain /> : <KeyMain />}</div>;
}

export default Main;

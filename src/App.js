import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./pages/component/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClickTwoNoFour from "./pages/puzzle/ClickTwoNoFour";
import TurnOnLight from "./pages/puzzle/TurnOnLight";
import TimeBomb from "./pages/puzzle/TimeBomb";
import CardArray from "./pages/puzzle/CardArray";
import DifficultCalc from "./pages/puzzle/DifficultCalc";
import PassedTimePic from "./pages/puzzle/PassedTimePic";
import MoveCircles from "./pages/puzzle/MoveCircles";
import DrageDropTile from "./pages/puzzle/DrageDropTile";
import FlashInTheDark from "./pages/puzzle/FlashInTheDark";
import AllChangeZero from "./pages/puzzle/AllChangeZero";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ClickTwoNoFour" element={<ClickTwoNoFour />} />
          <Route path="/TurnOnLight" element={<TurnOnLight />} />
          <Route path="/TimeBomb" element={<TimeBomb />} />
          <Route path="/CardArray" element={<CardArray />} />
          <Route path="/DifficultCalc" element={<DifficultCalc />} />
          <Route path="/PassedTimePic" element={<PassedTimePic />} />
          <Route path="/MoveCircles" element={<MoveCircles />} />
          <Route path="/DrageDropTile" element={<DrageDropTile />} />
          <Route path="/FlashInTheDark" element={<FlashInTheDark />} />
          <Route path="/AllChangeZero" element={<AllChangeZero />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

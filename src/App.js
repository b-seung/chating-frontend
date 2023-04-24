import "./App.css";
import Header from "./components/common/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import JoinMember from "./components/JoinMember";
import LostMain from "./components/lostPassword/LostMain";

function App() {
  const [menu, setMenu] = useState(false);

  const onMenu = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <Header onMenu={onMenu}></Header>
      <Routes>
        <Route path="/" element={<Home menu={menu}></Home>}></Route>
        <Route path="/login" element={<Login menu={menu}></Login>}></Route>
        <Route
          path="/join"
          element={<JoinMember menu={menu}></JoinMember>}
        ></Route>
        <Route
          path="/lost/*"
          element={<LostMain menu={menu}></LostMain>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

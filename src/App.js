import "./App.css";
import Header from "./components/common/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import JoinMember from "./components/JoinMember";
import LostMain from "./components/lostPassword/LostMain";
import Menu from "./components/common/Menu";
import MyPage from "./components/menu/MyPage";
import AddFriend from "./components/menu/AddFriend";
import UserUpdate from "./components/menu/UserUpdate";
import PasswordUpdate from "./components/menu/PasswordUpdate";
import Secession from "./components/menu/Secession";

const App = () => {
  const [menu, setMenu] = useState(false);

  const onMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Header onMenu={onMenu}></Header>
      <div className="bodyPart">
        <Menu className="menuTop" menu={menu} openMenu={onMenu} />
        <Routes className="routeTop">
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/join" element={<JoinMember></JoinMember>} />
          <Route path="/lost/*" element={<LostMain></LostMain>} />
          <Route path="/mypage" element={<MyPage></MyPage>} />
          <Route path="/addfriend" element={<AddFriend></AddFriend>} />
          <Route path="/userupdate" element={<UserUpdate></UserUpdate>} />
          <Route path="/pwreset" element={<PasswordUpdate></PasswordUpdate>} />
          <Route path="/secession" element={<Secession></Secession>} />
        </Routes>
      </div>
    </>
  );
};

export default App;

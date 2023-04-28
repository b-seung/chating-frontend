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
import FriendModal from "./components/FriendModal";
import FriendManagement from "./components/FriendManagement";
import Search from "./components/common/Search";
import Chating from "./components/Chating";

const App = () => {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [modal, setModal] = useState(false);

  const onMenu = () => {
    setMenu(!menu);
    if (modal) setModal(false);
    if (search) setSearch(false);
  };

  const onSearch = () => {
    setSearch(!search);
    if (modal) setModal(false);
    if (menu) setMenu(false);
  };

  const onModal = () => {
    setModal(!modal);
    if (menu) setMenu(false);
    if (search) setSearch(false);
  };

  return (
    <>
      <Header
        menu={menu}
        search={search}
        onMenu={onMenu}
        onSearch={onSearch}
      ></Header>
      <div className="bodyPart">
        <Menu className="menuTop" menu={menu} openMenu={onMenu} />
        <Search className="searchTop" search={search} openSearch={onSearch} />
        <FriendModal
          menu={menu}
          modal={modal}
          openModal={onModal}
        ></FriendModal>
        <Routes className="routeTop">
          <Route path="/" element={<Home openModal={onModal}></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/join" element={<JoinMember></JoinMember>} />
          <Route path="/lost/*" element={<LostMain></LostMain>} />
          <Route path="/mypage" element={<MyPage></MyPage>} />
          <Route path="/addfriend" element={<AddFriend></AddFriend>} />
          <Route path="/userupdate" element={<UserUpdate></UserUpdate>} />
          <Route path="/pwreset" element={<PasswordUpdate></PasswordUpdate>} />
          <Route path="/secession" element={<Secession></Secession>} />
          <Route
            path="/management"
            element={<FriendManagement></FriendManagement>}
          />
          <Route path="/chat" element={<Chating></Chating>} />
        </Routes>
      </div>
    </>
  );
};

export default App;

import "./App.css";
import { connect } from "react-redux";
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
import FriendModal from "./components/common/FriendModal";
import FriendManagement from "./components/FriendManagement";
import Search from "./components/common/Search";
import Chating from "./components/Chating";
import Loading from "./components/common/Loading";
import SocketProvider from "./socket/SocketProvider";

const App = ({ loadingState }) => {
  return (
    <SocketProvider>
      {loadingState && <Loading></Loading>}
      <Header></Header>
      <div className="bodyPart">
        <Menu className="menuTop" />
        <Search className="searchTop" />
        <FriendModal></FriendModal>
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
          <Route path="/management" element={<FriendManagement></FriendManagement>} />
          <Route path="/chat" element={<Chating></Chating>} />
        </Routes>
      </div>
    </SocketProvider>
  );
};

export default connect(({ loading }) => ({ loadingState: loading.loadingState }), {})(App);

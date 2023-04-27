import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LostCheck from "./LostCheck";
import LostReset from "./LostReset";
import "../../css/Form.scss";

const LostMain = ({ menu }) => {
  const [isOk, setOk] = useState(false);

  return (
    <div className="lostMain">
      <div className="title">パスワード再設定</div>
      <Routes>
        <Route exact path="/" element={<LostCheck setOk={setOk}></LostCheck>} />
        <Route path="/reset" element={<LostReset isOk={isOk}></LostReset>} />
      </Routes>
      <div>{menu ? "true" : "false"}</div>
    </div>
  );
};

export default LostMain;

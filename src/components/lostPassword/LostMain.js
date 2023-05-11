import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LostCheck from "./LostCheck";
import LostReset from "./LostReset";
import { connect } from "react-redux";
import { changeLoadingState } from "../../modules/loading";
import "../../css/Form.scss";

const LostMain = ({ changeLoadingState }) => {
  const [isOk, setOk] = useState(false);

  return (
    <div className="lostMain">
      <div className="title">パスワード再設定</div>
      <Routes>
        <Route exact path="/" element={<LostCheck setOk={setOk} changeLoadingState={changeLoadingState}></LostCheck>} />
        <Route path="/reset" element={<LostReset isOk={isOk} changeLoadingState={changeLoadingState}></LostReset>} />
      </Routes>
    </div>
  );
};

export default connect(({}) => ({}), { changeLoadingState })(LostMain);

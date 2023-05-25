import "../../css/MyPage.scss";
import PreButton from "../common/PreButton";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getJson } from "../../api/api";
import { changeLoadingState } from "../../modules/loading";
import { isError } from "../../modules/common";
import { useNavigate } from "react-router-dom";

const MyPage = ({ changeLoadingState, friendList }) => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    changeLoadingState(true);
    getJson("/member/check").then((result) => {
      changeLoadingState(false);

      isError(navigate, result["error"]);

      setId(result["id"]);
      setNickname(result["nickname"]);
      setBirthday(result["birthday"]);
    });
  }, []);

  const allDelete = () => {};

  return (
    <div className="myPage">
      <PreButton />
      <div className="title">マイページ</div>
      <div className="body">
        <div className="seeData">
          <div className="box">
            <div className="subtitle">ログインID</div>
            <div className="content">{id}</div>
          </div>
          <div className="box">
            <div className="subtitle">ニックネーム</div>
            <div className="content">{nickname}</div>
          </div>
          <div className="box">
            <div className="subtitle">生年月日</div>
            <div className="content">{birthday}</div>
          </div>
          <div className="box">
            <div className="subtitle">友達数</div>
            <div className="content">{`${friendList === undefined ? 0 : friendList.length}명`}</div>
          </div>
        </div>
        <div className="removeData" onClick={allDelete}>
          すべてのデータを削除する
        </div>
      </div>
    </div>
  );
};

export default connect((database) => ({ friendList: database.friendList }), { changeLoadingState })(MyPage);

import {
  MdClear,
  MdOutlinePermContactCalendar,
  MdPersonAddAlt1,
  MdDescription,
  MdKey,
  MdOutlineLogin,
} from "react-icons/md";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLoginState } from "../../modules/login";
import { changeMenu } from "../../modules/header";
import { getJson, getText } from "../../api/api";
import "../../css/Menu.scss";
import { useEffect } from "react";

const Menu = ({ menu, changeMenu, loginState, setLoginState }) => {
  const navigate = useNavigate();

  const clickMenu = () => {
    if (!loginState) {
      alert("ログインからしてください。");
      navigate("/login");
    }
    changeMenu();
  };

  const clickLogout = () => {
    setLoginState(false);
    getText("/member/logout").then((result) => changeMenu());
  };

  return (
    <div className={`menuPage ${menu ? "open" : "close"}`}>
      <div className="exitBox">
        <MdClear className="exit" onClick={changeMenu} />
      </div>
      <div className="menuBar" onClick={clickMenu}>
        <MdOutlinePermContactCalendar />
        <Link to={loginState ? "/mypage" : "/login"}>マイページ </Link>
      </div>

      <div className="menuBar" onClick={clickMenu}>
        <MdPersonAddAlt1 />
        <Link to={loginState ? "/addfriend" : "/login"}>友達追加 </Link>
      </div>

      <div className="menuBar" onClick={clickMenu}>
        <MdDescription />
        <Link to={loginState ? "/userupdate" : "/login"}>登録情報修正 </Link>
      </div>

      <div className="menuBar" onClick={clickMenu}>
        <MdKey />
        <Link to={loginState ? "/pwreset" : "/login"}>パスワード再設定</Link>
      </div>

      <div className="menuBar" onClick={clickMenu}>
        <MdOutlineLogin />
        <Link to={loginState ? "/secession" : "/login"}>会員退会</Link>
      </div>
      {loginState && (
        <div className="logoutBox">
          <Link to="/login">
            <div className="logout" onClick={clickLogout}>
              ログアウト
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default connect(({ header, login }) => ({ menu: header.menu, loginState: login.loginState }), {
  changeMenu,
  setLoginState,
})(Menu);

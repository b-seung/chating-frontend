import {
  MdClear,
  MdOutlinePermContactCalendar,
  MdPersonAddAlt1,
  MdDescription,
  MdKey,
  MdOutlineLogin,
} from "react-icons/md";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setLoginState } from "../../modules/login";
import { changeMenu } from "../../modules/header";
import { getText } from "../../api/api";
import "../../css/Menu.scss";

const Menu = ({ menu, changeMenu, setLoginState }) => {
  const clickLogout = () => {
    setLoginState(false);
    getText("/member/logout").then((result) => changeMenu());
  };

  return (
    <div className={`menuPage ${menu ? "open" : "close"}`}>
      <div className="exitBox">
        <MdClear className="exit" onClick={changeMenu} />
      </div>
      <div className="menuBar" onClick={changeMenu}>
        <MdOutlinePermContactCalendar />
        <Link to="/mypage">マイページ </Link>
      </div>

      <div className="menuBar" onClick={changeMenu}>
        <MdPersonAddAlt1 />
        <Link to="/addfriend">友達追加 </Link>
      </div>

      <div className="menuBar" onClick={changeMenu}>
        <MdDescription />
        <Link to="/userupdate">登録情報修正 </Link>
      </div>

      <div className="menuBar" onClick={changeMenu}>
        <MdKey />
        <Link to="/pwreset">パスワード再設定</Link>
      </div>

      <div className="menuBar" onClick={changeMenu}>
        <MdOutlineLogin />
        <Link to="/secession">会員退会</Link>
      </div>
      <div className="logoutBox">
        <Link to="/login">
          <div className="logout" onClick={clickLogout}>
            ログアウト
          </div>
        </Link>
      </div>
    </div>
  );
};

export default connect(({ header, login }) => ({ menu: header.menu, loginState: login.loginState }), {
  changeMenu,
  setLoginState,
})(Menu);

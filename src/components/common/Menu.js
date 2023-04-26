import {
  MdClear,
  MdOutlinePermContactCalendar,
  MdPersonAddAlt1,
  MdDescription,
  MdKey,
  MdOutlineLogin,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../../css/Menu.scss";

const Menu = ({ menu, openMenu }) => {
  return (
    <div className={`menuPage ${menu ? "open" : "close"}`}>
      <div className="exitBox">
        <MdClear className="exit" onClick={openMenu} />
      </div>
      <div className="menuBar" onClick={openMenu}>
        <MdOutlinePermContactCalendar />
        <Link to="/mypage">マイページ </Link>
      </div>

      <div className="menuBar" onClick={openMenu}>
        <MdPersonAddAlt1 />
        <Link to="/addfriend">友達追加 </Link>
      </div>

      <div className="menuBar" onClick={openMenu}>
        <MdDescription />
        <Link to="/userupdate">登録情報修正 </Link>
      </div>

      <div className="menuBar" onClick={openMenu}>
        <MdKey />
        <Link to="/passwordreset">パスワード再設定</Link>
      </div>

      <div className="menuBar">
        <MdOutlineLogin />
        <Link to="/secession">会員退会</Link>
      </div>
    </div>
  );
};

export default Menu;

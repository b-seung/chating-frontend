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
import { changeMenu } from "../../modules/header";
import "../../css/Menu.scss";

const Menu = ({ menu, changeMenu }) => {
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
    </div>
  );
};

export default connect(({ header }) => ({ menu: header.menu }), { changeMenu })(Menu);

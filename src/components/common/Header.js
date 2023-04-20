import { MdViewHeadline, MdSearch } from "react-icons/md";
import "../../css/Header.scss";

const Header = ({ onMenu }) => {
  return (
    <header className="header">
      <button className="menu" onClick={onMenu}>
        <MdViewHeadline />
      </button>
      <div className="title">
        <p className="logo">LOGO</p>
      </div>
      <button className="search">
        <MdSearch />
      </button>
    </header>
  );
};

export default Header;

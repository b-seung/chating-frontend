import { MdViewHeadline, MdSearch } from "react-icons/md";
import "../../css/Header.scss";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenu }) => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <button className="menu" onClick={onMenu}>
        <MdViewHeadline />
      </button>
      <div className="title">
        <p className="logo" onClick={onLogoClick}>
          LOGO
        </p>
      </div>
      <button className="search">
        <MdSearch />
      </button>
    </header>
  );
};

export default Header;

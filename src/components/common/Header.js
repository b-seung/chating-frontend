import { MdViewHeadline, MdSearch } from "react-icons/md";
import "../../css/Header.scss";
import { useNavigate } from "react-router-dom";

const Header = ({ menu, search, onMenu, onSearch }) => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    if (menu) onMenu();
    if (search) onSearch();
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
      <button className="search" onClick={onSearch}>
        <MdSearch />
      </button>
    </header>
  );
};

export default Header;

import { MdViewHeadline, MdSearch } from "react-icons/md";
import "../../css/Header.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { changeMenu, changeSearch } from "../../modules/header";

const Header = ({ menu, search, changeMenu, changeSearch }) => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    if (menu) changeMenu();
    if (search) changeSearch();
    navigate("/");
  };

  return (
    <header className="header">
      <button className="menu" onClick={changeMenu}>
        <MdViewHeadline />
      </button>
      <div className="title">
        <p className="logo" onClick={onLogoClick}>
          LOGO
        </p>
      </div>
      <button className="search" onClick={changeSearch}>
        <MdSearch />
      </button>
    </header>
  );
};

export default connect(
  ({ header }) => ({
    menu: header.menu,
    search: header.search,
  }),
  { changeMenu, changeSearch }
)(Header);

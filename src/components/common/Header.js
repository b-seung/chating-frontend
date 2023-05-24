import { MdViewHeadline, MdSearch } from "react-icons/md";
import "../../css/Header.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { changeMenu, changeSearch } from "../../modules/header";
import { setLoginState } from "../../modules/login";
import { isError } from "../../modules/common";
import { getJson } from "../../api/api";
import { useState } from "react";

const Header = ({ menu, search, changeMenu, changeSearch, setLoginState }) => {
  const navigate = useNavigate();

  const onClickMenu = () => {
    if (!menu) {
      getJson("/member/check").then((result) => {
        if (!result["error"]) setLoginState(true);
      });
    }
    changeMenu();
  };

  const onLogoClick = () => {
    if (menu) changeMenu();
    if (search) changeSearch();
    navigate("/");
  };

  const onClickSearch = () => {
    getJson("/member/check").then((result) => {
      isError(navigate, result["error"]);
      if (!result["error"]) changeSearch();
    });
  };

  return (
    <header className="header">
      <button className="menu" onClick={onClickMenu}>
        <MdViewHeadline />
      </button>
      <div className="title">
        <p className="logo" onClick={onLogoClick}>
          LOGO
        </p>
      </div>
      <button className="search" onClick={onClickSearch}>
        <MdSearch />
      </button>
    </header>
  );
};

export default connect(
  ({ header, login }) => ({
    menu: header.menu,
    search: header.search,
  }),
  { changeMenu, changeSearch, setLoginState }
)(Header);

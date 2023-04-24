import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

const Home = ({ loginId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loginId === null) {
      if (!alert("ログインしてください。")) document.location = "/login";
    }
  });

  const onClick = () => {
    navigate("./login");
  };
  return <div onClick={onClick}>home</div>;
};

export default connect(({ login }) => ({ loginId: login.id }))(Home);

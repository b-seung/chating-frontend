import { MdNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PreButton = () => {
  const style = {
    position: "absolute",
    top: "0",
    left: "0",
    padding: "10px",
    fontSize: "30px",
    cursor: "pointer",
  };

  const navigate = useNavigate();

  const onPreBtn = () => {
    navigate(-1);
  };

  return <MdNavigateBefore style={style} onClick={onPreBtn} />;
};

export default PreButton;

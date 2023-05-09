import { useEffect, useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginTableTest } from "../../api/test";

const LostReset = ({ isOk }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activate, setActivate] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    if (!isOk || searchParams.get("id") === null) {
      alert("正常な接続ではありません。");
      navigate("/lost");
    }
  });

  useEffect(() => {
    if (password !== "" && rePassword !== "") setActivate(true);
    else setActivate(false);
  }, [password, rePassword]);

  const onPasswordChange = (e) => setPassword(e.target.value);

  const onRePasswordChange = (e) => setRePassword(e.target.value);

  const onPreClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!activate) return;

    if (password === "" || rePassword === "") {
      alert("新しいパスワード、または新しいパスワード確認を入力してください。");
      return;
    }

    if (password !== rePassword) {
      alert("パスワードが一致しません。");
      return;
    }

    loginTableTest.resetPassword(searchParams.get("id"), password);
    alert("パスワードの変更が完了しました。");

    navigate("/login");
  };

  return (
    <div className="lostReset">
      <div className="subtitle">
        <p>新しいパスワードを入力いただき、</p>
        <p>パスワードを再設定してください。</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <div className={`key`}>新しいパスワード</div>
          <input onChange={onPasswordChange} />
        </div>
        <div className="inputBox">
          <div className={`key`}>新しいパスワード確認</div>
          <input onChange={onRePasswordChange} />
        </div>
        <div className="btnBox">
          <button className="preBtn" onClick={onPreClick}>
            戻る
          </button>
          <button className={`nextBtn ${!activate && "noActivate"}`}>
            <p>次に</p>
            <MdOutlineArrowCircleRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LostReset;

import "../../css/MyPage.scss";
import PreButton from "../common/PreButton";

const MyPage = () => {
  return (
    <div className="myPage">
      <PreButton />
      <div className="title">マイページ</div>
      <div className="body">
        <div className="seeData">
          <div className="box">
            <div className="subtitle">ログインID</div>
            <div className="content">id</div>
          </div>
          <div className="box">
            <div className="subtitle">ニックネーム</div>
            <div className="content">id</div>
          </div>
          <div className="box">
            <div className="subtitle">生年月日</div>
            <div className="content">id</div>
          </div>
          <div className="box">
            <div className="subtitle">友達数</div>
            <div className="content">id</div>
          </div>
        </div>
        <div className="removeData">すべてのデータを削除する</div>
      </div>
    </div>
  );
};

export default MyPage;

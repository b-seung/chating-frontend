import "../../css/Loading.scss";

const Loading = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "absolute", background: "#00000022", zIndex: "10" }}>
      <div className="animation"></div>
    </div>
  );
};

export default Loading;

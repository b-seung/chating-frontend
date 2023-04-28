import PreButton from "./common/PreButton";
import { useSearchParams } from "react-router-dom";
import "../css/Chating.scss";

const DateItem = ({ date }) => {
  return <div className="date">{date}</div>;
};
const SendItem = () => {
  return (
    <div className="send">
      <div className="time">MM:ss</div>
      <div className="text">test</div>
    </div>
  );
};
const ReceiveItem = () => {
  return (
    <div className="receive">
      <div className="image" />
      <div className="text">test</div>
      <div className="time">MM:ss</div>
    </div>
  );
};
const Chating = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="chatPage">
      <PreButton />
      <div className="title">{id}</div>
      <div className="content">
        <DateItem date="2023-04-28" />
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
      </div>
    </div>
  );
};

export default Chating;

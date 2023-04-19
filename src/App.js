import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./page/common/Header";

function App() {
  const [message, setMessage] = useState();

  // useEffect(() => {
  //   axios
  //     .get("/api/hello")
  //     .then((res) => {
  //       console.log(res);
  //       return res.data;
  //     })
  //     .then((data) => setMessage(data));
  // });

  return (
    <div className="App">
      <Header></Header>
      <a>{message}</a>
    </div>
  );
}

export default App;

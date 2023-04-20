import "./App.css";
import Header from "./components/common/Header";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [menu, setMenu] = useState(false);

  const onMenu = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <Header onMenu={onMenu}></Header>
      <Routes>
        <Route path="/" element={<Login menu={menu}></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;

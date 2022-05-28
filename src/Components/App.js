import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../assets/images/globalStyle";
import Cadastro from "./Cadastro";
import Hoje from "./Hoje";
import Habitos from "./Habitos";
import Historico from "./Historico";
import UserContext from "./Context/UserContext";
import { useState, useEffect } from "react";
import Login from "./Login";

function App() {
  const [login, setLogin] = useState({});

  const contextValue = { login, setLogin };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/cadastro" element={<Cadastro />} />
            <Route exact path="/hoje" element={<Hoje />} />
            <Route exact path="/habitos" element={<Habitos />} />
            <Route exact path="/historico" element={<Historico />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

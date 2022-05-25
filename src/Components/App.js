
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import Cadastro from './Cadastro';
import Hoje from './Hoje'
import UserContext from "./UserContext";
import { useState } from "react";
import Login from './Login';
function App() {
  const [login, setLogin] = useState([]);

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
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
          </>
        );
}

export default App;

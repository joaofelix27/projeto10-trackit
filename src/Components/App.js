
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import Cadastro from './Cadastro';
import Hoje from './Hoje'

import Login from './Login';
    function App() {
      
        return (
          <>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/cadastro" element={<Cadastro />} />
              <Route exact path="/hoje" element={<Hoje />} />
            </Routes>
          </BrowserRouter>
          </>
        );
      }
      
      export default App;
     
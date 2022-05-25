
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from './globalStyle';
import Cadastro from './Cadastro';

import Login from './Login';
    function App() {
        const [reserva, setReserva] = useState(null);
      
        return (
          <>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/cadastro" element={<Cadastro />} />
            </Routes>
          </BrowserRouter>
          </>
        );
      }
      
      export default App;
     
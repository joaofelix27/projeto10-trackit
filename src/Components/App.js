
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
    function App() {
        const [reserva, setReserva] = useState(null);
      
        return (
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        );
      }
      
      export default App;
     
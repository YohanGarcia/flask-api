import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import ClienteForm from './components/ClienteForm';
import Home from './components/Home';
import PiesaForm from './components/PiesaForm';
import CocheCliente from './components/CocheCliente';
import Coche from './components/Coche';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Routes >
          
          <Route path="/" element={<Home />}/>
          <Route path="/newcoche" element={<Coche />} />
          <Route path="/newpiesa" element={<PiesaForm />} />
          <Route path="/newcliente" element={<ClienteForm />} />
          <Route path="/coche-cliente" element={<CocheCliente />} />
        
        </Routes >
      </div>
    </Router>
  );
}

export default App;

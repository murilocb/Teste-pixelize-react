import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import PropertyForm from './components/PropertyForm';
import PropertyTable from './components/PropertyTable';
import ContractForm from './components/ContractForm';
import ContractTable from './components/ContractTable';

function App() {
  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 p-4 shadow-lg mb-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300 font-semibold">Home</Link>
            </li>
            <li>
              <Link to="/cadastro-propriedade" className="text-white hover:text-gray-300 font-semibold">Cadastrar Propriedade</Link>
            </li>
            <li>
              <Link to="/propriedades-cadastradas" className="text-white hover:text-gray-300 font-semibold">Ver Propriedades</Link>
            </li>
            <li>
              <Link to="/cadastro-contrato" className="text-white hover:text-gray-300 font-semibold">Cadastrar Contrato</Link>
            </li>
            <li>
              <Link to="/contratos-cadastrados" className="text-white hover:text-gray-300 font-semibold">Ver Contratos</Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro-propriedade" element={<PropertyForm />} />
            <Route path="/propriedades-cadastradas" element={<PropertyTable />} />
            <Route path="/cadastro-contrato" element={<ContractForm />} />
            <Route path="/contratos-cadastrados" element={<ContractTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

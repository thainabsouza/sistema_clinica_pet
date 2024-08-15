import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ListarClientes from './pages/ListarClientes';
import CadastroCliente from './pages/CadastroCliente';
import EditarCliente from './pages/EditarCliente';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ListarClientes />} />
                    <Route path="/cadastro" element={<CadastroCliente />} />
                    <Route path="/editar/:id" element={<EditarCliente />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
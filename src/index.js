import React from 'react';
import ReactDOM from 'react-dom/client'; // A partir do React 18
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

// Cria o elemento raiz onde o React vai renderizar a aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro do elemento raiz
root.render(
    <React.StrictMode>
        <App />

    </React.StrictMode>
);
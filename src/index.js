// Archivo principal de la aplicacion. 
// React se conecta con el HTML y se monta la app
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// importamos  cositas de bootstrap para usar sus estilos y componentes en la app
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // conectamos con el dom
root.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register(); // activa modo PWA (Progressibe Web App) para que la app funcione offline y se instale en el dispositivo del usuario.
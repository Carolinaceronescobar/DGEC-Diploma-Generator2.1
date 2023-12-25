import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route
import TopBar from '../../components/TopBar.tsx';
import Footer from '../../components/Footer.tsx';
import './App.css'; // Ruta correcta al archivo de estilo CSS
import { AuthProvider } from '../login/AuthContext.tsx';

function obtenerSolicitudes() {
  return [
    {
      id: 1,
      fecha: '2023-01-01',
      programa: 'Programa 1',
      departamento: 'Departamento 1',
      campus: 'Campus 1',
      estado: 'Pendiente',
      revisionDGEC: false,
      revisionDIREST: false,
      revisionFINANZAS: false,
    },
  ];
}

const App = () => {
  const handleLogin = (token: string) => {
    // Implementa tu lógica de login
    console.log('Login:', token);
  };

  const handleLogout = () => {
    // Implementa tu lógica de logout
    console.log('Logout');
  };

  return (
    <Router>
      <AuthProvider login={handleLogin} logout={handleLogout}>
        <div>
          <TopBar />
          {/* Define tus rutas usando Routes y Route */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

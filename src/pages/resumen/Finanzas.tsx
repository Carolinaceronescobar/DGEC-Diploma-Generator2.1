import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route
import TopBar from '../../components/TopBar.tsx';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper.tsx';
import Footer from '../../components/Footer.tsx';
import './App.css'; // Ruta correcta al archivo de estilo CSS
//import { PrivateRoute } from './auth/PrivateRoute';
import { AuthProvider } from '../login/AuthContext.tsx';
import SolicitudesTabla from './SolicitudesTabla';


function obtenerSolicitudes (){
  return  [{
    id: 1,
    fecha: '2023-01-01',
    programa: 'Programa 1',
    departamento: 'Departamento 1',
    campus: 'Campus 1',
    estado: 'Pendiente',
    revisionDGEC: false,
    revisionDIREST: false,
    revisionFINANZAS: false,
}];
}

const SolicitudCreacionPrograma = () => {
    const solicitudesData = obtenerSolicitudes();
    return (
      <div className="container">
        <h1>Solicitud Creación de Programa</h1>
        <HorizontalLinearStepper />
        {/* Utiliza SolicitudesTabla y pasa los datos como propiedades */}
        <SolicitudesTabla solicitudes={solicitudesData} />
      </div>
    );
  };

const App = () => {
    const handleLogin = (token:string) => {
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
          <Routes>
            <Route path="/" element={<SolicitudCreacionPrograma />} />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
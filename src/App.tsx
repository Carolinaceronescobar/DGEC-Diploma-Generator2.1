// App.tsx
import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar.tsx';
import HorizontalLinearStepper from './components/HorizontalLinearStepper.tsx';
import Footer from './components/Footer.tsx';

// import AppRoutes from './Routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/pages/login/AuthContext';
import LoginScreen from './pages/login/LoginScreen.tsx';
//import { PrivateRoute } from './auth/PrivateRoute';
import SideBar from './components/SideBar.tsx';
import UsoInternoFinanzas from './pages/usointfinanzas/UsointernoFinanzasForm';
import UsoInternoDGEC from './pages/usointdgec/UsointernoDGEC';
import UsointernoDireccionEstudios from './pages/usointdireccionestudios/UsointernoDireccionEstudios';
import Formulario from './components/Form.tsx';
import { setupAxiosInterceptors } from './pages/login/axiosConfig.ts';

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  
  const handleLogin = (token:any) => {
    setIsAuthenticated(true);
    //Store token securely (e.g., in-memory)
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setupAxiosInterceptors(handleLogout);
  }, []);

    return (
      
        <AuthProvider login={handleLogin} logout={handleLogout}>
          {isAuthenticated && <SideBar />}
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<SideBar/>} />
          <Route path="/formulario" element={<Formulario/>} />

          <Route path="/finanzas" element={<UsoInternoFinanzas />} />
          <Route path="/Dgec" element={<UsoInternoDGEC />} />
          <Route path="/DireccionEstudios" element={<UsointernoDireccionEstudios/>} /> 
       </Routes>
       </AuthProvider>   
      
    );
  };

export default App;



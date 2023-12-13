// TODO Eliminar código comentado
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/pages/login/AuthContext';
import SideBar from './components/Dashboard.tsx';
import { ProgramRequestForm } from './components/ProgramRequestForm.tsx';
import { setupAxiosInterceptors } from './pages/login/axiosConfig.ts';

// import LoginScreen from './pages/login/LoginScreen.tsx';
// import TopBar from './components/TopBar.tsx';
// import Footer from './components/Footer.tsx';

// import { PrivateRoute } from './auth/PrivateRoute';
// import UsoInternoFinanzas from './pages/usointfinanzas/UsointernoFinanzasForm';
// import UsoInternoDGEC from './pages/usointdgec/UsointernoDGEC';
// import UsointernoDireccionEstudios from './pages/usointdireccionestudios/UsointernoDireccionEstudios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token: string) => {
    console.log(token);
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
      <BrowserRouter>
        <Routes>
          {/* FIXME Cambiar nomber de componente */}
          <Route path="/" element={<SideBar />} />
          <Route path="/formulario" element={<ProgramRequestForm />} />

          {/* TODO Corregir rutas faltantes */}
          {/* 
              <Route path="/" element={<LoginScreen />} />
              <Route path="/finanzas" element={<UsoInternoFinanzas />} />
              <Route path="/Dgec" element={<UsoInternoDGEC />} />
              <Route path="/DireccionEstudios" element={<UsointernoDireccionEstudios/>} /> 
          */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

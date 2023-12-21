//App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { setupAxiosInterceptors } from './pages/login/axiosConfig.ts';
import LoginScreen from './pages/login/LoginScreen.tsx';
import UsoInternoFinanzas from './pages/usointfinanzas/UsointernoFinanzasForm.tsx';
import UsoInternoDGEC from './pages/usointdgec/UsointernoDGEC';
import UsointernoDireccionEstudios from './pages/usointdireccionestudios/UsointernoDireccionEstudios';

import { AuthProvider } from '../src/pages/login/AuthContext';
import { ProgramRequestForm } from './components/ProgramRequestForm.tsx';
import Dashboard from './components/Dashboard.tsx';

// import { PrivateRoute } from './auth/PrivateRoute';

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
      {isAuthenticated && <Dashboard />}
      <BrowserRouter>
        <Routes>
          {/* FIXME Cambiar nomber de componente */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/formulario" element={<ProgramRequestForm />} />
          <Route path="/formulario/:id" element={<ProgramRequestForm />} />
          <Route path="/dgec" element={<UsoInternoDGEC />} />
          <Route path="/finanzas" element={<UsoInternoFinanzas />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/direccionestudios"
            element={<UsointernoDireccionEstudios />}
          />
          <Route path="/dgec" element={<UsoInternoDGEC />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

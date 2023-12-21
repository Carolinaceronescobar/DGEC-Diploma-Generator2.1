//App.tsx
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { setupAxiosInterceptors } from './pages/login/axiosConfig.ts';
import LoginScreen from './pages/login/LoginScreen.tsx';
import UsoInternoFinanzas from './pages/usointfinanzas/UsointernoFinanzasForm.tsx';
import UsoInternoDGEC from './pages/usointdgec/UsointernoDGEC';
import UsointernoDireccionEstudios from './pages/usointdireccionestudios/UsointernoDireccionEstudios';
import { AuthProvider } from '../src/pages/login/AuthContext';

import { ProgramRequestForm } from './components/ProgramRequestForm.tsx';
import Dashboard from './components/Dashboard.tsx';
import { HeaderApp } from './components/HeaderApp.tsx';
import Footer from './components/Footer.tsx';

const defaultTheme = createTheme();

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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <HeaderApp />

      <Box
        component="main"
        sx={{
          marginY: '90px',
          paddingX: '20px',
          minHeight: '70vh',
        }}
      >
        {/* Auth Provider */}
        <AuthProvider login={handleLogin} logout={handleLogout}>
          {/* Router  */}
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
        </AuthProvider>
      </Box>

      <Footer />
    </ThemeProvider>
  );
}

export default App;

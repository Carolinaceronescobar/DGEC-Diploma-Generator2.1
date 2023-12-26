import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { setupAxiosInterceptors } from './pages/login/axiosConfig.ts';
import LoginScreen from './pages/login/LoginScreen.tsx';
import UsoInternoFinanzas from '../src/pages/usointfinanzas/UsointernoFinanzasForm.tsx';
import UsoInternoDGEC from '../src/pages/usointdgec/UsointernoDGEC.tsx';

import { AuthProvider } from '../src/pages/login/AuthContext';

import Dashboard from './components/Dashboard.tsx';
import { HeaderApp } from '../src/components/HeaderApp.tsx';
import Footer from './components/Footer.tsx';
import Sidebar from '../src/components/SideBar.tsx';
import { ProgramRequestForm } from './components/ProgramRequestForm.tsx';
import UsoInternoDireccionEstudios from './pages/usointdireccionestudios/UsoInternoDireccionEstudios';

const defaultTheme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (token: string) => {
    console.log(token);
    setIsAuthenticated(true);
    // Store token securely (e.g., in-memory)
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setupAxiosInterceptors(handleLogout);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
        <HeaderApp onToggleSidebar={toggleSidebar} />
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                marginY: '90px',
                paddingX: '20px',
                minHeight: '70vh',
              }}
            >
              <AuthProvider login={handleLogin} logout={handleLogout}>
                <Routes>
                  <Route path="/index" element={<Dashboard />} />
                  <Route path="/formulario" element={<ProgramRequestForm />} />
                  <Route
                    path="/formulario/:id"
                    element={<ProgramRequestForm />}
                  />
                  <Route path="/dgec" element={<UsoInternoDGEC />} />
                  <Route path="/finanzas" element={<UsoInternoFinanzas />} />
                  <Route
                    path="/direccionestudios"
                    element={<UsoInternoDireccionEstudios />}
                  />
                  <Route path="/" element={<LoginScreen />} />
                </Routes>
              </AuthProvider>
            </Box>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;

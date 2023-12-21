//DGEC-DIPLOMA-GENERATOR2/ui/components/Dashboard.tsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import { Link } from 'react-router-dom';
import { HeaderApp } from './HeaderApp.tsx';
import Footer from './Footer.tsx';

// TODO remove, this demo shouldn't need to reset the theme.
// import { get_form } from '../utils/formulario.ts';

const defaultTheme = createTheme();

const Dashboard: React.FC = () => {
  // TODO: Solicitar los datos parece que dentro del useEffect()
  // Datos de ejemplo para SolicitudesTabla
  // const programs = get_form();

  // TODO: Parece que permite listar los programas dependiendo del permiso del usuario.
  // Esto es mejor gestionarlo desde el App, por lo que es probable que pueda eliminarse

  // const mainListItemsFx = () => {
  //   try {
  //     let usuario = JSON.parse(localStorage.getItem('user'))?.profile.type;
  //     // setAnchorEl(null); .filter(x=> x.user.) mainListItems.filter((x) => x.user.includes(usuario.profile.type));
  //     const respuesta = mainListItems.filter(
  //       (x) => x.user == undefined || x.user?.includes(usuario)
  //     );
  //     console.log('sale mainListItem');
  //     return respuesta;
  //   } catch (ex) {
  //     console.log(`error -> ${ex}`);
  //     return mainListItems;
  //   }
  // };

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
        {/* Section para los CTAs */}
        <Box
          component="section"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>{/* contenido opcional */}</Box>
          <Box>
            <Link
              to="/formulario"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ backgroundColor: '#004B85' }}
              >
                Nuevo formulario
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Section para el listado de programas */}
        <Box
          component="section"
          sx={{
            padding: '20px',
          }}
        >
          {/* Integra SolicitudesTabla con los datos */}
          {/* <SolicitudesTabla solicitudes={solicitudesData} /> */}
          <p> TODO: Aquí va el listado de componentes</p>
        </Box>
      </Box>

      <Footer />
    </ThemeProvider>
  );
};

export default Dashboard;

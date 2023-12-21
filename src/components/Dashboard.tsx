//DGEC-DIPLOMA-GENERATOR2/ui/components/Dashboard.tsx
import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import {
  Box,
  Toolbar,
  IconButton,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

import SolicitudesTabla from '../pages/resumen/SolicitudesTabla.tsx';
import MuiDrawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import {
  mainListItems,
  secondaryListItems,
} from '../pages/resumen/listItems.ts';
import { HeaderApp } from './HeaderApp.tsx';
import Footer from './Footer.tsx';
import ModalComponent from './ModalComponent.tsx';
// import DataTa  ble from 'react-data-table-component';
// import { get_form } from '../utils/formulario.ts';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Dashboard: React.FC = () => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Datos de ejemplo para SolicitudesTabla
  // const solicitudesData = get_form();

  // useEffect(() => {
  //   // Esta función se ejecutará cada vez que se inicialice el HTML
  //   console.log('La página se ha inicializado');
  // }, []);

  const mainListItemsFx = () => {
    try {
      let usuario = JSON.parse(localStorage.getItem('user'))?.profile.type;
      // setAnchorEl(null); .filter(x=> x.user.) mainListItems.filter((x) => x.user.includes(usuario.profile.type));
      const respuesta = mainListItems.filter(
        (x) => x.user == undefined || x.user?.includes(usuario)
      );
      console.log('sale mainListItem');
      return respuesta;
    } catch (ex) {
      console.log(`error -> ${ex}`);
      return mainListItems;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <HeaderApp />

      <Box
        component="main"
        sx={{
          marginY: '90px',
          paddingX: '20px',
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

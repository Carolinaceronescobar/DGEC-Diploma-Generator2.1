//DGEC-DIPLOMA-GENERATOR2/ui/components/Dashboard.tsx
import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import SolicitudesTabla from '../pages/resumen/SolicitudesTabla.tsx';
import {
  mainListItems,
  secondaryListItems,
} from '../pages/resumen/listItems.ts';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from './Footer.tsx';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ModalComponent from './ModalComponent.tsx';
import DataTable from 'react-data-table-component';
import { get_form } from '../utils/formulario.ts';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes implementar la lógica para cerrar sesión
    // Por ejemplo, redirigir al usuario a la página de inicio de sesión
    console.log('Cerrar Sesión');
    handleClose();
    navigate('/login'); // Cierra el menú después de hacer clic en "Cerrar Sesión"
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  // Datos de ejemplo para SolicitudesTabla
  const solicitudesData = get_form();

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };
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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ backgroundColor: '#004B85' }}
        >
          {/*Logotipo de la Universidad */}
          <img
            alt="logo"
            src="./src/assets/logo-usm_blanco-min.png"
            style={{
              width: 150,
              height: 25,
              marginTop: 30,
              marginLeft: 30,
            }}
          />

          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/* Reemplaza NotificationsIcon con AccountCircleIcon o el icono de perfil que prefieras */}

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Direccion General de Estudios Continuos
            </Typography>
            <IconButton color="inherit" onClick={handleOpenProfileMenu}>
              <Badge color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>

            {/* Menú de perfil */}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={handleClose}>Perfil Administrador</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            {mainListItemsFx().map((item) => (
              <ListItem
                key={item.id}
                button
                onClick={() => navigate(item.route)}
              >
                {/* Tu contenido individual del elemento de la lista */}
                <ListItemText primary={item.text} />
                {/* ... otros componentes de elementos de lista según sea necesario */}
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          <List component="nav">
            {secondaryListItems.map((item) => (
              <ListItem key={item.id}>
                {/* Tu contenido individual del elemento de la lista */}
                <ListItemText primary={item.text} />
                {/* ... otros componentes de elementos de lista según sea necesario */}
              </ListItem>
            ))}

            <ListItem>
              <ModalComponent />
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Grid
                container
                direction="row-reverse"
                justifyContent="flex-start"
                spacing={2}
              >
                <Grid item>
                  <Paper className="p-2" sx={{ margin: '25px' }}>
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
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                {/* primer  row */}
                <Grid item xs={12} style={{ marginTop: '3vh' }}>
                  {/* Integra SolicitudesTabla con los datos */}
                  <SolicitudesTabla solicitudes={solicitudesData} />
                </Grid>
              </Grid>
            </Paper>
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;

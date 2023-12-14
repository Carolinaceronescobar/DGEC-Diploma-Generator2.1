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
  Typography,
  Badge,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  // ListItemButton,
  Divider,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  // Menu as MenuIcon,
  // Notifications as NotificationsIcon,
} from '@mui/icons-material';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
//import Content from './RoutesData.tsx';
//import Table from './Table.tsx';
//import RoutesData from '../RoutesData.tsx';
import SolicitudesTabla from '../pages/resumen/SolicitudesTabla.tsx';
import {
  mainListItems,
  secondaryListItems,
} from '../pages/resumen/listItems.ts';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from './Footer.tsx';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Creación Programa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Datos de ejemplo para SolicitudesTabla
  const solicitudesData = [
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
    // Agrega más datos según sea necesario
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
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
              DGEC
            </Typography>
            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
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
            {mainListItems.map((item) => (
              <ListItem key={item.id} button component={Link} to={item.route}>
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
                  <Paper className="p-2">
                    <Link to="/formulario" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
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

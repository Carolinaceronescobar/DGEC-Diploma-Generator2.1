import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  Switch,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// import Dashboard from './components/Dashboard.tsx';

import Footer from './components/Footer.tsx';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import React from 'react';
import { ProgramRequestForm } from './components/ProgramRequestForm.tsx';
import UsoInternoDGEC from './pages/usointdgec/UsoInternoDGEC.tsx';
import Dashboard from './components/Dashboard.tsx';
import UsoInternoFinanzas from './pages/usointfinanzas/UsoInternoFinanzasForm.tsx';
import UsoInternoDireccionEstudios from './pages/usointdireccionestudios/UsoInternoDireccionEstudios.tsx';
import LoginScreen from './pages/login/LoginScreen.tsx';
import { HeaderApp } from './components/HeaderApp.tsx';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
const drawerWidth: number = 240;

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

const Drawer_ = styled(MuiDrawer, {
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

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#004B85',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', height: '90vh' }}>
          <CssBaseline />

          <HeaderApp onToggleSidebar={toggleDrawer} />

          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                backgroundColor: '#004B85',
                color: 'white',
                padding: '1rem',
                textAlign: 'center',
                fontSize: '0.8rem',
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <nav>
              <List>
                <ListItemButton component={NavLink} to="/index">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/formulario">
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Formulario" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/finanzas">
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Finanzas" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/direst">
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dirección Estudios" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/dgec">
                  <ListItemIcon>
                    <HistoryEduIcon />
                  </ListItemIcon>
                  <ListItemText primary="DGEC" />
                </ListItemButton>
              </List>
            </nav>
          </Drawer>

          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 10, mb: 4, ml: 20 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
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
                    path="/direst"
                    element={<UsoInternoDireccionEstudios />}
                  />
                  <Route path="/login" element={<LoginScreen />} />
                </Routes>
              </Grid>
              {/* Recent Deposits */}

              {/* Recent Orders */}
            </Grid>
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default App;

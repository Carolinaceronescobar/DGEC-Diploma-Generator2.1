//App.tsx
// import * as React from 'react';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// import Dashboard from './components/Dashboard.tsx';

import { setupAxiosInterceptors } from './pages/login/axiosConfig.ts';
import LoginScreen from './pages/login/LoginScreen.tsx';
import UsoInternoDGEC from './pages/usointdgec/UsointernoDGEC';
import { AuthProvider } from '../src/pages/login/AuthContext';

import { ProgramRequestForm } from './components/ProgramRequestForm.tsx';
import Footer from './components/Footer.tsx';
import Sidebar from './components/SideBar.tsx';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { HeaderApp } from './components/HeaderApp.tsx';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import UsoInternoFinanzas from './pages/usointfinanzas/UsoInternoFinanzasForm.tsx';
import { maxHeight } from '@mui/system';

// import { PrivateRoute } from './auth/PrivateRoute';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleLogin = (token: string) => {
//     console.log(token);
//     setIsAuthenticated(true);
//     //Store token securely (e.g., in-memory)
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   useEffect(() => {
//     setupAxiosInterceptors(handleLogout);
//   }, []);

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <CssBaseline />

//       {/* Contenedor principal */}
//       <Container>
//         {/* Header */}
//         <HeaderApp />

//         {/* Contenido Principal */}
//         <Grid container spacing={0}>
//           {/* SideBar */}
//           <Grid item xs={2}>
//             <Sidebar />
//           </Grid>

//           {/* Contenido principal */}
//           <Grid item xs={10}>
//             <Box
//               sx={{
//                 marginY: '90px',
//                 paddingX: '20px',
//                 minHeight: '70vh',
//               }}
//             >
//               {/* Auth Provider */}
//               <AuthProvider login={handleLogin} logout={handleLogout}>
//                 {/* Router  */}
//                 <Routes>
//                   {/* FIXME Cambiar nomber de componente */}
//                   <Route path="/" element={<Dashboard />} />
//                   <Route path="/formulario" element={<ProgramRequestForm />} />
//                   <Route
//                     path="/formulario/:id"
//                     element={<ProgramRequestForm />}
//                   />
//                   <Route path="/dgec" element={<UsoInternoDGEC />} />
//                   <Route path="/finanzas" element={<UsoInternoFinanzas />} />
//                   <Route path="/login" element={<LoginScreen />} />
//                   <Route
//                     path="/direccionestudios"
//                     element={<UsointernoDireccionEstudios />}
//                   />
//                   <Route path="/dgec" element={<UsoInternoDGEC />} />
//                 </Routes>
//               </AuthProvider>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Footer */}
//         <Footer />
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default App;


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [datos, setDatos] = useState(Boolean);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Box style={{
            maxHeight:'70px',
            backgroundColor: '#004B85',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            ml:'24px'
          }}>
            <HeaderApp />

          </Box>
        </AppBar>
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
            <img
            onClick={toggleDrawer}
              alt="logo"
              src="./src/assets/logo-min.png"
              style={{
                width: '150px',
                height: '65px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
              }}
            />
          </Toolbar>
          <Divider />
          <List component="nav">

            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={Link} to="/formulario">
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Formulario" />
            </ListItemButton>

            <ListItemButton component="a" href="/finanzas">
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Finanzas" />
            </ListItemButton>

            <ListItemButton component="a" href="/direst">
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Dirección Estudios" />
            </ListItemButton>

            <ListItemButton component="a" href="/dgec">
              <ListItemIcon>
                <HistoryEduIcon />
              </ListItemIcon>
              <ListItemText primary="DGEC" />
            </ListItemButton>



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
            overflow: 'auto',
          }}
        >
          <Toolbar />


          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  
                </Paper>
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

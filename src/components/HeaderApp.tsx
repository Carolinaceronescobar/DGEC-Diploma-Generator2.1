import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';


export const HeaderApp = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Aquí puedes implementar la lógica para cerrar sesión
    // Por ejemplo, redirigir al usuario a la página de inicio de sesión
    console.log('Cerrar Sesión');
    handleClose();
    navigate('/login'); // Cierra el menú después de hacer clic en "Cerrar Sesión"
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#004B85',
      }}
    >
      <Toolbar>
        {/* Reemplaza NotificationsIcon con AccountCircleIcon o el icono de perfil que prefieras */}

        {/*Logotipo de la Universidad */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
          }}
        >
          <div style={{ marginRight: '20px' }}>
            <img
              alt="logo"
              src="./src/assets/logo-usm_blanco-min.png"
              style={{
                width: '150px',
                height: '25px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
              }}
            />
          </div>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, margin: '4px' }}
          >
            Direccion General de Estudios Continuos
          </Typography>
        </Box>

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
  );
};

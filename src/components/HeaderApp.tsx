import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

export const HeaderApp = ({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) => {
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
 
      <Toolbar sx={{  justifyContent: 'space-between'}}>
        {/* Nuevo botón para abrir/cerrar el menú lateral en pantallas pequeñas */}
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        {/*Logotipo de la Universidad */}
        <Box
          sx={{
          
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
          }}
        >
          {/* Utilizando Box para el margen derecho */}
          <Box sx={{ marginRight: '20px' }}>
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
          </Box>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, margin: '4px' }}
          >
            DGEC
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
  );
};

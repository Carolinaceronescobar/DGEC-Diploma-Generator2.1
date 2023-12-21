import React from 'react';
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  anchorEl: null | HTMLElement;
  handleOpenProfileMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseProfileMenu: () => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  handleOpenProfileMenu,
  anchorEl,
  handleCloseProfileMenu,
  handleLogout,
}) => {
  return (
    <AppBar position="absolute" sx={{ backgroundColor: '#004B85' }}>
      <img
        alt="logo"
        src="./src/assets/logo-usm_blanco-min.png"
        style={{ width: 150, height: 25, marginTop: 30, marginLeft: 30 }}
      />
      <Toolbar sx={{ pr: '24px' }}>
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
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseProfileMenu}
        >
          <MenuItem onClick={handleCloseProfileMenu}>
            Perfil Administrador
          </MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

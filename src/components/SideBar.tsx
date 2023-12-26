import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const Sidebar = () => {
  return (
    <List
      component="nav"
      sx={{
        height: '100vh', // 100% de la altura de la ventana
        width: '100%', // Ajusta el ancho según tus necesidades
        backgroundColor: '#004B85', // Cambia al color deseado
        color: 'white', // Cambia al color deseado
        textAlign: 'center',
        paddingTop: '10rem', // Espaciado superior
      }}
    >
      <ListItemButton component={Link} to="/">
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
      <ListItemButton component={Link} to="/finanzas">
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Finanzas" />
      </ListItemButton>
      <ListItemButton component={Link} to="/direccionestudios">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Dirección Estudios" />
      </ListItemButton>
      <ListItemButton component={Link} to="/dgec">
        <ListItemIcon>
          <HistoryEduIcon />
        </ListItemIcon>
        <ListItemText primary="DGEC" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;

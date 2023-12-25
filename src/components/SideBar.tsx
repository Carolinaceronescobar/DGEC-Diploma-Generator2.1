import { useState } from 'react';
import {
  Drawer,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import ModalComponent from './ModalComponent';
import { mainListItems, secondaryListItems } from '../pages/resumen/listItems';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

const drawerWidth = 220;

// Crear un nuevo componente para la barra lateral
const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onOpen }) => {
  const navigate = (route: string) => {
    console.log(`Navigating to: ${route}`);
    // Aquí puedes agregar la lógica de navegación a la ruta deseada
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#081627',
          color: 'rgba(255, 255, 255, 0.87)',
          boxShadow: 'none',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <List component="nav">
        {mainListItems.map((item) => (
          <ListItem key={item.id} button onClick={() => navigate(item.route)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <List component="nav">
        {secondaryListItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem>
          <ModalComponent />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

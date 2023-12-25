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

// Crear un nuevo componente para la barra lateral
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = (route: string) => {
    console.log('Navigate to:', route);
    // Aquí puedes agregar la lógica de navegación a la ruta deseada
  };

  return (
    <>
      {/* Mostrar el Drawer solo en pantallas grandes */}
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: '240px', // Ancho del drawer
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              backgroundColor: '#081627', // Color de fondo del drawer
              color: 'rgba(255, 255, 255, 0.87)', // Color del texto
              boxShadow: 'none', // Eliminar sombra
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
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            {mainListItems.map((item) => (
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
      </Hidden>

      {/* Mostrar el Drawer solo en pantallas pequeñas */}
      <Hidden lgUp>
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Mejora la velocidad de apertura en dispositivos móviles.
          }}
          sx={{
            width: '240px',
            '& .MuiDrawer-paper': {
              backgroundColor: '#081627',
              color: 'rgba(255, 255, 255, 0.87)',
              boxShadow: 'none',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {/* Contenido del Drawer */}
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
              <ListItem
                key={item.id}
                button
                onClick={() => navigate(item.route)}
              >
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
      </Hidden>
    </>
  );
};

export default Sidebar;

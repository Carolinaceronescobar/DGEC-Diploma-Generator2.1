import {
  Drawer,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import ModalComponent from './ModalComponent';

// Crear un nuevo componente para la barra lateral
const Sidebar = () => {
  return (
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
          <ListItem key={item.id} button onClick={() => navigate(item.route)}>
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
  );
};

export default Sidebar;

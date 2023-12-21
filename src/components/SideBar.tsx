import React from 'react';
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
import { useNavigate } from 'react-router-dom';
import { mainListItems } from './../pages/resumen/listItems';

interface SidebarProps {
  secondaryListItems: { id: number; text: string; route: string }[];
  toggleDrawer: () => void;
  open: boolean;
}
// Crear un nuevo componente para la barra lateral
const Sidebar: React.FC<SidebarProps> = ({
  secondaryListItems,
  toggleDrawer,
  open,
}) => {
  const navigate = useNavigate();
  const mainListItemsFx = () => mainListItems;

  return (
    <>
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
          {/* Lista de elementos en la barra lateral */}
          {mainListItemsFx().map((item) => (
            <ListItem key={item.id} button onClick={() => navigate(item.route)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <List component="nav">
          {/* Otros elementos de la barra lateral, como el ModalComponent */}
          {secondaryListItems.map((item) => (
            <ListItem key={item.id} button onClick={() => navigate(item.route)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import Button from '@mui/material/Button';
//import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { obtenerInformacionUsuario } from '../utils/api'; //importa la función desde api.tsx
import { Typography } from '@mui/material';

const TopBar: React.FC = () => {
  // La dependencia está vacía porque solo queremos que se ejecute una vez al montar el componente

  return (
    <AppBar position="static" style={{ backgroundColor: '#004B85' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/*Logotipo de la Universidad */}
          <img
            alt="logo"
            src="./src/assets/logo-usm_blanco-min.png"
            style={{
              width: 250,
              height: 50,
              marginTop: 30,
              marginLeft: 30,
            }}
          />

          {/* Texto "progra" al lado del logotipo */}
          <Typography variant="h6" style={{ marginLeft: 10, color: 'white' }}>
            Creacion de Programa
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

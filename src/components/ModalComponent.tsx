// ModalComponent.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import UsoInternoFinanzas from '../pages/usointfinanzas/UsointernoFinanzasForm';

const ModalComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Agregar el botón que abrirá la ventana modal */}
      <Button variant="text" color="inherit" onClick={handleOpenModal}>
        Uso Interno Finanzas
      </Button>

      {/* Agregar la lógica de la ventana modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Finanzas</DialogTitle>
        <DialogContent>
          {/* Contenido del modal */}
          {/* Agregar aquí el contenido de la ventana modal */}
          <UsoInternoFinanzas />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalComponent;

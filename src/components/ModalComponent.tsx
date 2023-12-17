// ModalComponent.tsx
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import UsoInternoFinanzas from '../pages/usointfinanzas/UsointernoFinanzasForm';

const ModalComponent: React.FC = ({}) => {
  // Código del componente...
  // const someValue = UsoInternoFinanzas.handleOpenModal();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Isra er que mierda es esta variable
  let resumen: any;
  // Llama a someFunction dentro de un useEffect
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const someValue = await UsoInternoFinanzas.someFunction();
  //     // Haz algo con someValue si es necesario
  //   };

  //   fetchData();
  // }, []); // Asegúrate de proporcionar las dependencias adecuadas

  return (
    <>
      {/* Agregar el botón que abrirá la ventana modal */}
      <Button variant="text" color="inherit" onClick={handleOpenModal}>
        Uso Interno Finanzas
      </Button>

      {/* Agregar la lógica de la ventana modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Finanzas</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#004B85', color: 'white' }}>
          {/* Contenido del modal */}
          {/* Agregar aquí el contenido de la ventana modal */}
          {resumen}
          {/* <UsoInternoFinanzas /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalComponent;

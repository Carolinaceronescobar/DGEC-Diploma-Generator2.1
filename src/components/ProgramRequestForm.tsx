import React, { useEffect } from 'react';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';

// En el archivo que contiene SolicitudesTabla
interface Solicitud {
  id: number;
  fecha: string;
  programa: string;
  departamento: string;
  campus: string;
  estado: string;
  revisionDGEC: boolean;
  revisionDIREST: boolean;
  revisionFINANZAS: boolean;
}

// FIXME Cambiar nombre de este archivo y de todas importaciones
const ProgramRequestForm: React.FC = () => {
  let { id } = useParams(); // Aqu
  useEffect(() => {
    id = id == undefined ? '0' : id;
  }, []);
  return (
    <Container  maxWidth="md" sx={{ mb: 4 }}>
      <Typography component="h1" variant="h4" align="center">
          Solicitud Creación de Programas
          </Typography>
      <Box component="section" sx={{ padding: '50px' }}>
        <HorizontalLinearStepper />
      </Box>
    </Container>
  );
};

export { ProgramRequestForm };
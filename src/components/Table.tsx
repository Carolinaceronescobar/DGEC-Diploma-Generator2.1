import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import SolicitudesTabla from "@/components/dashboard/SolicitudesForm"; 
import SolicitudesTabla from '../pages/resumen/SolicitudesTabla';

 
type TableProps = {
  solicitudes: any[]; // Ajusta el tipo de solicitudes según tus necesidades
};

const Table: React.FC<TableProps> = ({ solicitudes }) => {
  const theme = useTheme();
  
  return (
    <React.Fragment>
      <Typography variant="h6">Tabla de Solicitudes</Typography>
      <SolicitudesTabla solicitudes={solicitudes} />
    </React.Fragment>
  );
};

export default Table;
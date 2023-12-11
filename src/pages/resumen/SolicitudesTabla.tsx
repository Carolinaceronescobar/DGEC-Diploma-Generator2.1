// SolicitudesForm.tsx

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import DGECForm from './Form/DGECForm';
// import RegistroCurricularForm from './Form/RegistroCurricularForm';
// import AdmisionForm from './Form/AdmisionForm';
// import FinanzasForm from './Form/FinanzasForm';
import Checkbox from '@mui/material/Checkbox';

// Define el tipo de datos para las solicitudes
type Solicitud = {
  id: number;
  fecha: string;
  programa: string;
  departamento: string;
  campus: string;
  estado: string;
  revisionDGEC: boolean;
  revisionDIREST: boolean;
  revisionFINANZAS: boolean;
};

type SolicitudesTablaProps = {
  solicitudes: Solicitud[];
};

const solicitudesData = [
  {
    id: 1,
    fecha: '2023-01-01',
    programa: 'Programa 1',
    departamento: 'Departamento 1',
    campus: 'Campus 1',
    estado: 'Pendiente',
    revisionDGEC: false,
    revisionDIREST: false,
    revisionFINANZAS: false,
  },
  // Agrega más datos según sea necesario
];

const SolicitudesTabla: React.FC<SolicitudesTablaProps> = ({ solicitudes }) => {

  return (  
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Programa</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Campus</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Revisión DGEC</TableCell>
            <TableCell>Revisión DIREST</TableCell>
            <TableCell>Revisión FINANZAS</TableCell>
            <TableCell>editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solicitudes.map((solicitud) => (
            <TableRow key={solicitud.id}>
              <TableCell>{solicitud.id}</TableCell>
              <TableCell>{solicitud.fecha}</TableCell>
              <TableCell>{solicitud.programa}</TableCell>
              <TableCell>{solicitud.departamento}</TableCell>
              <TableCell>{solicitud.campus}</TableCell>
              <TableCell>{solicitud.estado}</TableCell>
              <TableCell>
              <Checkbox checked={solicitud.revisionDGEC} disabled />
              </TableCell>
              <TableCell>
              <Checkbox checked={solicitud.revisionDIREST} disabled />
              </TableCell>
              <TableCell>
              <Checkbox checked={solicitud.revisionFINANZAS} disabled />
              </TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SolicitudesTabla;
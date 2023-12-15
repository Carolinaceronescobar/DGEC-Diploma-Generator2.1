// SolicitudesTabla.tsx

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
// import DGECForm from './Form/DGECForm';
// import RegistroCurricularForm from './Form/RegistroCurricularForm';
// import AdmisionForm from './Form/AdmisionForm';
// import FinanzasForm from './Form/FinanzasForm';
import Checkbox from '@mui/material/Checkbox';
import { get_form } from '../../utils/formulario';

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
let algo = await get_form();

const solicitudesData = [
  {
    id: 1,
    fecha: '2023-12-14',
    programa: 'Curso de Gestión de Activos',
    departamento: 'Departamento bbdd Nombre1',
    campus: 'Sede Nombre2',
    estado: 'Pendiente',
    revisionDGEC: true,
    revisionDIREST: false,
    revisionFINANZAS: false,
  },

  // Agrega más datos según sea necesario
];
const SolicitudesTabla: React.FC<SolicitudesTablaProps> = ({ solicitudes }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <>
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
              {algo.map((solicitud) => (
                <TableRow key={solicitud.id}>
                  <TableCell>{solicitud.id}</TableCell>
                  <TableCell>{solicitud.value}</TableCell>
                  <TableCell>{solicitud.nombrePrograma}</TableCell>
                  <TableCell>{solicitud.departamento}</TableCell>
                  <TableCell>{solicitud.sede}</TableCell>
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
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={algo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    </Paper>
  );
};

export default SolicitudesTabla;

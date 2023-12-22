// SolicitudesTabla.tsx

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import DGECForm from './Form/DGECForm';
// import RegistroCurricularForm from './Form/RegistroCurricularForm';
// import AdmisionForm from './Form/AdmisionForm';
// import FinanzasForm from './Form/FinanzasForm';
import Checkbox from '@mui/material/Checkbox';
// import { get_form } from '../../utils/formulario';
import { useNavigate } from 'react-router-dom';
import { ProgramItem } from '../../components/ProgramItem';
import DataTable from 'react-data-table-component';

//TODO: cambiar por importacion real o eliminar
import { programs } from '../../utils/data';

// Define el tipo de datos para las solicitudes
export type Solicitud = {
  id: number;
  programa: string;
  fecha: string;
  departamento: string;
  campus: string;
  aprobacion: boolean;
};

type SolicitudesTablaProps = {
  solicitudes: Solicitud[];
};
// let solicitudes_ = await get_form();

// const [data, setData] = useState([]);
// let data = await get_form();

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const SolicitudesTabla: React.FC<SolicitudesTablaProps> = ({ solicitudes }) => {
  const navigate = useNavigate();

  const handleDgecAprovedUpdate = (event: React.ChangeEvent) => {
    console.log(
      'handleDgecAprovedUpdate',
      event.target.parentElement?.getAttribute('itemId')
    );

    const programId = event.target.parentElement?.getAttribute('itemId');
    const programIndex = programs.findIndex((program) => {
      return program.id == Number(programId);
    });

    programs[programIndex].isDgecAproved =
      !programs[programIndex].isDgecAproved;

    console.log(programs[programIndex].isDgecAproved);

    // TODO: Obtner el program del listado a partir del itemId
    // TODO: Update del programa en la BBDD. Llama al API
    // TODO: Si todo anda ok actualizar el esto del check
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> SIGA </TableCell>
                <TableCell> NOMBRE </TableCell>
                <TableCell> Fecha Inicio </TableCell>
                <TableCell> Departamento </TableCell>
                <TableCell> Campus </TableCell>
                <TableCell> APROBACIÓN </TableCell>
                <TableCell> Acciones </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {programs.map((program, index) => {
                return <ProgramItem program={program} key={index} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Paper>
  );
};

export default SolicitudesTabla;

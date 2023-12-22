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

  const updateDocument = (solicitud: any) => {
    console.log('acaa');
    console.log(solicitud);
    navigate(`/formulario/${solicitud.id}`);
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
              <ProgramItem />
              <ProgramItem />
              <ProgramItem />
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Paper>
  );
};

export default SolicitudesTabla;

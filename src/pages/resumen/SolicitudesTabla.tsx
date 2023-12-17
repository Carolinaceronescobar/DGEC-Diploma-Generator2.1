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
import { get_form } from '../../utils/formulario';
import { useNavigate } from 'react-router-dom';

import DataTable from 'react-data-table-component';

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
let solicitudes_ = await get_form();

// const [data, setData] = useState([]);
let data = await get_form();

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
              {solicitudes_.map((solicitud) => (
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
                  <TableCell>
                    <Link to={`/formulario/${solicitud.id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#004B85' }}
                      >
                        Gestión
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Paper>
  );
};

export default SolicitudesTabla;

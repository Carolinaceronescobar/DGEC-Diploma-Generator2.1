// SolicitudesTabla.tsx

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProgramItem } from '../../components/ProgramItem';

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
  const [programas, setProgramas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/solicitudes-tabla/'
      ); // Reemplaza 'tu_puerto' con el puerto real de tu servidor backend
      if (!response.ok) {
        throw new Error('Error al obtener tablas');
      }
      const data = await response.json();
      console.log('Datos de las tablas:', data);
      setProgramas(data);
    } catch (error) {
      console.error('Error al obtener tablas:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

    console.log('acaaaaaaaassss ');

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

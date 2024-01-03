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
  Checkbox,
  Button,
  Box,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProgramItem } from '../../components/ProgramItem';

//TODO: cambiar por importacion real o eliminar
// import { programs } from '../../utils/data';

// Define el tipo de datos para las solicitudes
type Solicitud = {
  id: number;
  name: string;
  fecha: string;
  departamento: string;
  campus: string;
  aprobacion: boolean;
  isDgecAprobed: boolean;
  isDirestAprobed: boolean;
  isFinanzaAprobed: boolean;
};

type SolicitudesTablaProps = {
  solicitudes: Solicitud[];
};

// let solicitudes_ = await get_form();

// const [data, setData] = useState([]);
// let data = await get_form();

// const paginationComponentOptions = {
//   rowsPerPageText: 'Filas por página',
//   rangeSeparatorText: 'de',
//   selectAllRowsItem: true,
//   selectAllRowsItemText: 'Todos',
// };

const SolicitudesTabla: React.FC<SolicitudesTablaProps> = ({ solicitudes }) => {
  const navigate = useNavigate();
  const [programas, setProgramas] = useState<Solicitud[]>([]);

  //Llamado a la API
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/formulario/'); // Reemplaza 'tu_puerto' con el puerto real de tu servidor backend
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

  //Aprobación de DGEC
  const handleDgecAprovedUpdate = (programId: number) => {
    setProgramas((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === programId
          ? { ...program, isDgecAprobed: !program.isDgecAprobed }
          : program
      )
    );
  };

  //Aprobacion Direccion de Estudios
  const handleDirestAprovedUpdate = (programId: number) => {
    setProgramas((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === programId
          ? { ...program, isDirestAprobed: !program.isDirestAprobed }
          : program
      )
    );
    console.log('Actualización de aprobación Direst');
    // TODO: Realizar la actualización en la base de datos usando API
  };

  //Aprobacion Finanzas
  const handleFinanzaAprovedUpdate = (programId: number) => {
    setProgramas((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === programId
          ? { ...program, isFinanzaAprobed: !program.isFinanzaAprobed }
          : program
      )
    );
  };

  // Elimina la fila correspondiente del array de programas
  const handleEliminarClick = (programId: number) => {
    // Actualiza el estado o realiza cualquier acción necesaria
    setProgramas((prevPrograms) =>
      prevPrograms.filter((program) => program.id !== programId)
    );
    // Puedes tener un estado local o utilizar algún otro método
    // para gestionar los datos de la tabla.
  };

  // Llamado editado de validaciones
  // const programIndex = programs.findIndex((program) => {
  //   return program.id == Number(programId);
  // });

  // programs[programIndex].isDgecAproved =
  //   !programs[programIndex].isDgecAproved;

  // console.log('acaaaaaaaassss ');

  // TODO: Obtner el program del listado a partir del itemId
  // TODO: Update del programa en la BBDD. Llama al API
  // TODO: Si todo anda ok actualizar el esto del check

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: 'lightgrey',
                  fontWeight: 'bold',
                }}
              >
                <TableCell>Cod. SIGA</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Campus</TableCell>
                <TableCell>Validaciones</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {programas.map((program, index) => (
                <ProgramItem
                  key={program.id}
                  program={program}
                  onDgecAprovedUpdate={() =>
                    handleDgecAprovedUpdate(program.id)
                  }
                  onDirestAprovedUpdate={() =>
                    handleDirestAprovedUpdate(program.id)
                  }
                  onFinanzaAprovedUpdate={() =>
                    handleFinanzaAprovedUpdate(program.id)
                  }
                  onVerRespuestaClick={() => program.id}
                  onEliminarClick={() => handleEliminarClick(program.id)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Paper>
  );
};

export default SolicitudesTabla;

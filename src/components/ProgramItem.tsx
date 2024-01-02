import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TableCell,
  TableRow,
} from '@mui/material';
import { useState } from 'react';

interface ProgramItemProps {
  program: {
    id: number;
    programa_mumero: string;
    programaSeleccionado: string;
    duracion_fecha_inicio: string;
    departamento: string;
    sede: string;
    isDgecAproved: boolean;
    isDirestAproved: boolean;
    isFinanceAproved: boolean;
  };
  onDgecAprovedUpdate: () => void;
  onVerRespuestaClick: () => void;
}

export const ProgramItem: React.FC<ProgramItemProps> = ({
  program,
  onDgecAprovedUpdate,
  onVerRespuestaClick,
}) => {
  const handleAprovedUpdate = (aproveType: string) => {
    // TODO: Llama al API para actualizar el estado de aprobación
    // TODO: Actualiza el estado local si la llamada al API es exitosa
    onDgecAprovedUpdate();
  };

  // export const ProgramItem: React.FC<ProgramItemProps> = ({
  //   program,
  //   onDgecAprovedUpdate,
  // }) => {
  //   const [isDgecChecked, setIsDgecChecked] = useState(program.isDgecAproved);
  //   const [isDirestChecked, setIsDirestChecked] = useState(
  //     program.isDirestAproved
  //   );
  //   const [isFinanceChecked, setIsFinanceChecked] = useState(
  //     program.isFinanceAproved
  //   );

  //   const handleDgec = () => {
  //     // TODO: Update del programa en la BBDD. Llama al API
  //     // TODO: Si todo anda ok actualizar el estado del check
  //     setIsDgecChecked(!isDgecChecked);
  //     onDgecAprovedUpdate();
  //   };

  //   const handleDirest = () => {
  //     // TODO: Update del programa en la BBDD. Llama al API
  //     // TODO: Si todo anda ok actualizar el estado del check
  //     setIsDirestChecked(!isDirestChecked);
  //   };

  //   const handleFinance = () => {
  //     // TODO: Update del programa en la BBDD. Llama al API
  //     // TODO: Si todo anda ok actualizar el estado del check
  //     setIsFinanceChecked(!isFinanceChecked);
  //   };

  // export const ProgramItem = (props: ProgramItemProps) => {
  //   const [isDgecChecked, setIsDgecChecked] = useState(
  //     props.program.isDgecAproved
  //   );
  //   const [isDirestChecked, setIsDirestChecked] = useState(
  //     props.program.isDirestAproved
  //   );
  //   const [isFinanceChecked, setIsFinanceChecked] = useState(
  //     props.program.isFinanceAproved
  //   );

  //   const handleDgec = (event: React.ChangeEvent) => {
  //     // TODO: Update del programa en la BBDD. Llama al API
  //     // TODO: Si todo anda ok actualizar el esto del check
  //     setIsDgecChecked(!isDgecChecked);
  //   };

  //   const handleDirest = (event: React.ChangeEvent) => {
  //     // TODO: Update del programa en la BBDD. Llama al API
  //     // TODO: Si todo anda ok actualizar el esto del check
  //     setIsDirestChecked(!isDgecChecked);
  //   };

  //   const handleFinance = (event: React.ChangeEvent) => {
  //     // TODO: Update del programa en la BBDD. Llama al API
  //     // TODO: Si todo anda ok actualizar el esto del check
  //     setIsFinanceChecked(!isDgecChecked);
  //   };

  return (
    <TableRow>
      <TableCell> {program.programa_numero} </TableCell>
      <TableCell> {program.programaSeleccionado} </TableCell>
      <TableCell> {program.duracion_fecha_inicio} </TableCell>
      <TableCell> {program.departamento} </TableCell>
      <TableCell> {program.sede} </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            label="DGEC"
            control={
              <Checkbox
                checked={program.isDgecAproved}
                onChange={() => handleAprovedUpdate('DGEC')}
              />
            }
          />

          <FormControlLabel
            label="DIREST"
            control={
              <Checkbox
                checked={program.isDirestAproved}
                onChange={() => handleAprovedUpdate('DIREST')}
              />
            }
          />

          <FormControlLabel
            label="FINANZAS"
            control={
              <Checkbox
                checked={program.isFinanceAproved}
                onChange={() => handleAprovedUpdate('FINANZAS')}
              />
            }
          />
        </Box>
      </TableCell>

      <TableCell>
        <Link href={`#`}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#004B85',
                fontSize: '10px',
                padding: '5px 10px',
                mb: '5px',
              }}
              onClick={onVerRespuestaClick}
            >
              Ver Respuesta
            </Button>

            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#004B85',
                fontSize: '10px',
                padding: '5px 10px',
                mb: '5px',
              }}
            >
              Editar
            </Button>

            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#004B85',
                fontSize: '10px',
                padding: '5px 10px',
                mb: '5px',
              }}
            >
              Eliminar
            </Button>
          </Box>
        </Link>
      </TableCell>
    </TableRow>
  );
};

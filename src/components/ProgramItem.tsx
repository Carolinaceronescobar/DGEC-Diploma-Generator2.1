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

interface ProgramType {
  id: number;
  codSiga: string;
  name: string;
  date: string;
  departament: string;
  campus: string;
  isDgecAproved: boolean;
  isDirestAproved: boolean;
  isFinanceAproved: boolean;
}

interface ProgramItemProps {
  program: ProgramType;
}

export const ProgramItem = (props: ProgramItemProps) => {
  const [isDgecChecked, setIsDgecChecked] = useState(
    props.program.isDgecAproved
  );
  const [isDirestChecked, setIsDirestChecked] = useState(
    props.program.isDirestAproved
  );
  const [isFinanceChecked, setIsFinanceChecked] = useState(
    props.program.isFinanceAproved
  );

  const handleDgec = (event: React.ChangeEvent) => {
    // TODO: Update del programa en la BBDD. Llama al API
    // TODO: Si todo anda ok actualizar el esto del check
    setIsDgecChecked(!isDgecChecked);
  };

  const handleDirest = (event: React.ChangeEvent) => {
    // TODO: Update del programa en la BBDD. Llama al API
    // TODO: Si todo anda ok actualizar el esto del check
    setIsDirestChecked(!isDgecChecked);
  };

  const handleFinance = (event: React.ChangeEvent) => {
    // TODO: Update del programa en la BBDD. Llama al API
    // TODO: Si todo anda ok actualizar el esto del check
    setIsFinanceChecked(!isDgecChecked);
  };

  return (
    <TableRow>
      <TableCell> {props.program.codSiga} </TableCell>
      <TableCell> {props.program.name} </TableCell>
      <TableCell> {props.program.date} </TableCell>
      <TableCell> {props.program.departament} </TableCell>
      <TableCell> {props.program.campus} </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            label="DGEC"
            control={<Checkbox checked={isDgecChecked} onChange={handleDgec} />}
          />

          <FormControlLabel
            label="DIREST"
            control={
              <Checkbox checked={isDirestChecked} onChange={handleDirest} />
            }
          />

          <FormControlLabel
            label="FINANZAS"
            control={
              <Checkbox checked={isFinanceChecked} onChange={handleFinance} />
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

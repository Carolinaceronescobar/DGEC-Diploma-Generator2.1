import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TableCell,
  TableRow,
} from '@mui/material';
import { flexRender } from 'material-react-table';

export const ProgramItem = () => {
  return (
    <TableRow>
      <TableCell> MAT-024 </TableCell>
      <TableCell> Diplomado de Matemáticas, Analíticas y Geométricas</TableCell>
      <TableCell> 20/05/2024 </TableCell>
      <TableCell> Departamento de Matemáticas </TableCell>
      <TableCell> Valparaíso</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            label="DGEC"
            control={<Checkbox checked={false} onChange={() => {}} />}
          />

          <FormControlLabel
            label="DIREST"
            control={<Checkbox checked={false} onChange={() => {}} />}
          />

          <FormControlLabel
            label="FINANZAS"
            control={<Checkbox checked={false} onChange={() => {}} />}
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

// UsoInternoDireccionEstudios.tsx
import React, { useState, useEffect } from 'react';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Container,
} from '@mui/material';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';

interface UsoInternoDireccionEstudiosProps {
  campos: { campo1: string; campo2: string }; // Ajusta según sea necesario
  setCampos: React.Dispatch<
    React.SetStateAction<{ campo1: string; campo2: string }>
  >;
  departamento: string;
  setDepartamento: React.Dispatch<React.SetStateAction<string>>;
  readOnly: boolean;
  onGuardar: () => void;
  onEnviar: () => void;
  mostrar: boolean;
  onMostrarToggle: () => void;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'SIGA', width: 90 },
  {
    field: 'sct',
    headerName: 'Créditos SCT',
    width: 150,
    editable: true,
  },
  {
    field: 'nivel_plan',
    headerName: 'NIVEL PLAN',
    width: 150,
    editable: true,
  },

  {
    field: 'Datos_modulos',
    headerName: 'Cursos /Modulos',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.module || ''} ${params.row.module || ''}`,
  },

  {
    field: 'datos_hour',
    headerName: 'Horas',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.module || ''} ${params.row.module || ''}`,
  },
];

const rows = [
  { id: 1, siga: 1, sct: 'SCT125', nivel_plan: '001' },
  { id: 2, siga: 2, sct: 'SCT123', nivel_plan: '005' },
  { id: 3, siga: 3, sct: 'SCT235', nivel_plan: '006' },
  { id: 4, siga: 4, sct: 'SCT325', nivel_plan: '008' },
  { id: 5, siga: 5, sct: 'SCT451', nivel_plan: '009' },
  { id: 6, siga: 6, sct: 'SCT100', nivel_plan: '002' },
  { id: 7, siga: 7, sct: 'SCT001', nivel_plan: '010' },
  { id: 8, siga: 8, sct: 'SCT201', nivel_plan: '015' },
  { id: 9, siga: 9, sct: 'SCT005', nivel_plan: '100' },
];

const UsoInternoDireccionEstudios: React.FC<
  UsoInternoDireccionEstudiosProps
> = ({
  campos,
  setCampos,
  departamento,
  setDepartamento,
  readOnly,
  onGuardar,
  onEnviar,
}) => {
  return (
    <Container>
      <Box>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          {' '}
          Uso interno Dirección de Estudios
        </Typography>
        <hr />
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <Typography> INTERNO - Código del Programa (SIGA) </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <FormControl fullWidth>
          <Select
            label="INTERNO - Código del Programa (SIGA)"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value as string)}
            // disabled={readOnly}
          ></Select>
        </FormControl>
      </Box>

      <Typography>
        {' '}
        INTERNO - Periodo académico en que se impartirá (SIGA){' '}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <FormControl fullWidth>
          <Select
            label="INTERNO - Periodo académico en que se impartirá (SIGA)"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value as string)}
            // disabled={readOnly}
          >
            <MenuItem key="Tiempo1">2024- 1</MenuItem>
            <MenuItem key="Tiempo2">2023- 2</MenuItem>
            <MenuItem key="Tiempo3">2023- 1</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={onGuardar}
          //  disabled={readOnly}
        >
          Guardar
        </Button>
        <Button
          variant="outlined"
          onClick={onEnviar}
          // disabled={readOnly}
        >
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default UsoInternoDireccionEstudios;

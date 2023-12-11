// UsoInternoDireccionEstudios.tsx

import React from 'react';
import { Typography, TextField, FormControl, Select, MenuItem, Button, Box } from '@mui/material';

interface UsoInternoDireccionEstudiosProps {
  campos: { campo1: string; campo2: string }; // Ajusta según sea necesario
  setCampos: React.Dispatch<React.SetStateAction<{ campo1: string; campo2: string }>>;
  departamento: string;
  setDepartamento: React.Dispatch<React.SetStateAction<string>>;
  readOnly: boolean;
  onGuardar: () => void;
  onEnviar: () => void;
  mostrar: boolean;
  onMostrarToggle:() => void;
}

const UsointernoDireccionEstudios: React.FC<UsoInternoDireccionEstudiosProps> = ({
  campos: 
  setCampos,
  departamento,
  setDepartamento,
  readOnly,
  onGuardar,
  onEnviar,
  mostrar,
  onMostrarToggle
}) => {
  return (
    <Box style={{ display: mostrar ? 'block' : 'none'}}>
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}> Uso interno Dirección de Estudios</Typography>
      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <FormControl fullWidth> 
        <Select
          label="INTERNO - Código del Programa (SIGA)"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value as string)}
          disabled={readOnly}
          >
            
          </Select>
          </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <FormControl fullWidth>
          <Select
            label="INTERNO - Periodo académico en que se impartirá (SIGA)"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value as string)}
            disabled={readOnly}
          >
            <MenuItem key="Tiempo1">2024- 1</MenuItem>
            <MenuItem key="Tiempo2">2023- 2</MenuItem>
            <MenuItem key="Tiempo3">2023- 1</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={onGuardar} disabled={readOnly}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={onEnviar} disabled={readOnly}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default UsointernoDireccionEstudios;

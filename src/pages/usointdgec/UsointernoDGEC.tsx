// UsoInternoDGEC.tsx

import React from 'react';
import {
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { makeUsoInternoDGECData, UsoInternoDGECData } from './makeData';

interface UsointernoDGECProps {
  campos: UsoInternoDGECData['campo1'];
  setCampos: React.Dispatch<React.SetStateAction<UsoInternoDGECData['campo1']>>;
  departamento: UsoInternoDGECData['departamento'];
  setDepartamento: React.Dispatch<
    React.SetStateAction<UsoInternoDGECData['departamento']>
  >;
  readOnly: UsoInternoDGECData['readOnly'];
  onGuardar: () => void;
  onEnviar: () => void;
}

const UsoInternoDGEC: React.FC<UsointernoDGECProps> = ({
  campos,
  setCampos,
  departamento,
  setDepartamento,
  readOnly,
  onGuardar,
  onEnviar,
}) => {
  // Utiliza makeUsoInternoDGECData para obtener datos ficticios
  const initialData = makeUsoInternoDGECData();

  // Usa initialData para establecer valores predeterminados si es necesario
  React.useEffect(() => {
    setCampos(initialData.campo1);
    setDepartamento(initialData.departamento);
  }, []);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        Uso interno DGEC
      </Typography>
      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <TextField
          fullWidth
          label="INTERNO - Código interno DGEC"
          value={campos}
          onChange={(e) => setCampos(e.target.value)}
          variant="outlined"
          InputProps={{ readOnly: readOnly }}
          sx={{ mr: 2 }}
        />
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

export default UsoInternoDGEC;

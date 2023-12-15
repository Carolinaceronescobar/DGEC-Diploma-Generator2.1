//UsoInternoFinanzasForm.tsx
import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// Define los tipos de campos y departamento según tus necesidades
type TipoDeCampos = {
  fin_valoraraprog: string;
  fin_valormatprog: string;
  fin_valordescprog: {
    fin_valordescprog_1: { checked: boolean; porcentaje: number };
    fin_valordescprog_2: { checked: boolean; porcentaje: number };
    fin_valordescprog_3: { checked: boolean; porcentaje: number };
    fin_valordescprog_4: { checked: boolean; porcentaje: number };
    fin_valordescprog_5: { checked: boolean; porcentaje: number };
    fin_valordescprog_6: { checked: boolean; porcentaje: number };
  };
};

type TipoDeDepartamento = string;

interface UsoInternoFinanzasProps {
  campos: TipoDeCampos;
  setCampos: React.Dispatch<React.SetStateAction<TipoDeCampos>>;
  departamento: TipoDeDepartamento;
  setDepartamento: React.Dispatch<React.SetStateAction<TipoDeDepartamento>>;
  readOnly: boolean;
  onGuardar: () => void;
  onEnviar: () => void;
}

const UsoInternoFinanzas: React.FC<UsoInternoFinanzasProps> = ({
  campos,
  setCampos,
  departamento,
  setDepartamento,
  readOnly,
  onGuardar,
  onEnviar,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        Uso interno Finanzas
      </Typography>
      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <TextField
          fullWidth
          label="INTERNO - Código de la Organización (Banner) "
          value={campos?.fin_valoraraprog || ''} /* Corregido aquí */
          onChange={(e) =>
            setCampos((prevCampos) => ({
              ...prevCampos,
              fin_valoraraprog: e.target.value,
            }))
          }
          variant="outlined"
          InputProps={{ readOnly: readOnly }}
          sx={{ mr: 2 }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <TextField
          fullWidth
          label="INTERNO - Código de Detalle (Banner) "
          value={campos?.fin_valormatprog || ''} /* Corregido aquí */
          onChange={(e) =>
            setCampos((prevCampos) => ({
              ...prevCampos,
              fin_valormatprog: e.target.value,
            }))
          }
          variant="outlined"
          InputProps={{ readOnly: readOnly }}
          sx={{ mr: 2 }}
        />
      </Box>

      <Box mt={3}>
        <Typography
          variant="body1"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          {' '}
          INTERNO - Distribución Presupuestaria del Código de Detalle{' '}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="haDictadoPrograma"
            name="haDictadoPrograma"
            value={
              campos?.fin_valordescprog?.fin_valordescprog_2.checked || false
            } /* Corregido aquí */
            onChange={(e) =>
              setCampos((prevCampos) => ({
                ...prevCampos,
                fin_valordescprog: {
                  ...prevCampos.fin_valordescprog,
                  fin_valordescprog_2: {
                    ...prevCampos.fin_valordescprog.fin_valordescprog_2,
                    checked: e.target.checked,
                  },
                },
              }))
            }
          >
            <FormControlLabel value="80/20" control={<Radio />} label="80/20" />
            <FormControlLabel value="100/0" control={<Radio />} label="100/0" />
          </RadioGroup>
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

export default UsoInternoFinanzas;

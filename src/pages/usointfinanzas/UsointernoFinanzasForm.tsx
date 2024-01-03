import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<FinanzaOptionType>();

const UsoInternoFinanzas = ({
  onGuardar = null,
  onEnviar = null,
  readOnly = null,
}) => {
  const [value, setValue] = React.useState<FinanzaOptionType | null>(null);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        Uso interno Finanzas
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Interno - Código de Organización (Banner)
      </Typography>

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              finanzaCode: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              finanzaCode: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.finanzaCode
          );
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              finanzaCode: inputValue,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={topFinanzas}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.finanzaCode;
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.finanzaCode}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Interno - Código de Organización (Banner)"
          />
        )}
      />

      <Typography variant="subtitle1" gutterBottom>
        Interno - Código de Detalle (Banner)
      </Typography>

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              finanzaCode: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              finanzaCode: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.finanzaCode
          );
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              finanzaCode: inputValue,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={topFinanzas}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.finanzaCode;
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.finanzaCode}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Interno - Código de Detalle (Banner)" />
        )}
      />

      <FormControl component="fieldset">
        <Typography
          variant="body1"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          INTERNO - Distribución Presupuestaria del Código de Detalle
        </Typography>
        <RadioGroup row aria-label="haDictadoPrograma" name="haDictadoPrograma">
          <FormControlLabel value="80/20" control={<Radio />} label="80/20" />
          <FormControlLabel value="100/0" control={<Radio />} label="100/0" />
        </RadioGroup>
      </FormControl>

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

interface FinanzaOptionType {
  inputValue?: string;
  finanzaCode: string;
}

const topFinanzas: readonly FinanzaOptionType[] = [
  { finanzaCode: 'finanza123' },
  { finanzaCode: 'finanza4000' },
  { finanzaCode: 'finanza3456' },
  { finanzaCode: 'finanza3454' },
];

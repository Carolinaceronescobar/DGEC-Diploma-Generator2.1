// Se importa React y los componentes de Material-UI que necesito para construir el formulario.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Button,
  Box,
  Divider,
  Input,
  ButtonGroup,
} from '@mui/material';
import {
  guardarFormulario,
  obtenerdetalleProgramasporID,
  obtenerProgramasDesdeBD,
} from '../../utils/api';
import { save_form } from '../../utils/formulario';

// Define un componente funcional llamado FormularioDGEC.
const FormularioDGEC: React.FC = () => {
  // Estados locales para manejar diferentes partes del formulario.
  const [haDictadoPrograma, setHaDictadoPrograma] = useState<number>('');
  const [programaSeleccionado, setProgramaSeleccionado] = useState<string>('');
  const [memoAdjunto, setMemoAdjunto] = useState<File | null>(null);
  const [programas, setProgramas] = useState<string[]>([]);

  // Maneja cambios en la opción "Sí" o "No" para la pregunta "¿Se ha dictado este programa académico en periodos anteriores?"
  const handleHaDictadoProgramaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHaDictadoPrograma(event.target.value);
  };

  // Maneja cambios en la selección del programa académico.
  const handleProgramaSeleccionadoChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProgramaSeleccionado(event.target.value as string);
  };

  // Maneja cambios en la selección del archivo adjunto.
  const handleMemoAdjuntoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Así se obtiene el archivo adjunto, pero este código puede necesitar ajustes según el componente de archivo que estés utilizando.
    const file = event.target.files && event.target.files[0];
    setMemoAdjunto(file);
  };

  //Maneja la carga de programas desde la base de datos al montar el componente
  useEffect(() => {
    const cargarProgramas = async () => {
      const programasDesdeBD = await obtenerProgramasDesdeBD();
      setProgramas(programasDesdeBD);
    };

    cargarProgramas();
  }, []); //el segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente

  // Maneja el clic en el botón "Guardar sin enviar".
  const handleGuardarClick = async () => {
    try {
      const datoJson = JSON.stringify({
        haDictadoPrograma,
        programaSeleccionado,
        memoAdjunto,
        handleProgramaSeleccionadoChange,
        handleGuardarClick,
      });
      console.log(datoJson);

      save_form({
        haDictadoPrograma,
        programaSeleccionado,
        memoAdjunto,
        handleProgramaSeleccionadoChange,
        handleGuardarClick,
      });
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  // Renderiza el formulario con Material-UI.
  return (
    <Container>
      <Typography
        variant="h5"
        align="center"
        mt={2}
        mb={1}
        sx={{ marginTop: 5, marginBottom: 2, fontWeight: 'bold' }}
      >
        {' '}
        Autorización
      </Typography>

      {/* Sección "Programa" */}
      <Box mt={3}>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          Programa
        </Typography>
        {/*Pregunta adicional*/}
        <Typography
          variant="body1"
          style={{ marginTop: '16px', marginBottom: '16px' }}
        >
          {' '}
          ¿Se ha dictado este programa académico en periodos anteriores? *{' '}
        </Typography>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            onClick={() => setHaDictadoPrograma('1')}
            style={{
              backgroundColor:
                haDictadoPrograma === '1' ? '#004B85' : 'inherit',
              color: haDictadoPrograma === '1' ? 'white' : 'inherit',
            }}
          >
            Si
          </Button>
          <Button
            onClick={() => setHaDictadoPrograma('0')}
            style={{
              backgroundColor:
                haDictadoPrograma === '0' ? '#004B85' : 'inherit',
              color: haDictadoPrograma === '0' ? 'white' : 'inherit',
            }}
          >
            No
          </Button>
        </ButtonGroup>
      </Box>

      {/* Pregunta adicional si la respuesta es "Sí" */}
      {haDictadoPrograma === '1' && (
        <Box mt={3}>
          <Typography
            variant="subtitle1"
            style={{ marginTop: '16px', marginBottom: '16px' }}
          >
            {' '}
            Seleccione el programa académico
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="programa-academico-label"
              id="programa-academico"
              value={programaSeleccionado}
              onChange={handleProgramaSeleccionadoChange}
            >
              {programas.map((programa) => (
                <MenuItem key={programa} value={programa}>
                  {programa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Línea divisoria entre secciones */}
      <Divider component="li" variant="inset" style={{ margin: '16px 0' }} />

      {/* Sección "Documento de Autorización" */}
      {/* Utiliza un componente Input y Button para crear un botón de carga de archivos personalizado */}
      {haDictadoPrograma === '0' && (
        <Box mt={2}>
          <Typography
            variant="h6"
            style={{
              marginTop: '16px',
              marginBottom: '16px',
              fontWeight: 'bold',
            }}
          >
            {' '}
            Documento de Autorización{' '}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ marginTop: '16px', marginBottom: '16px' }}
          >
            Adjunte el memo de autorización de la DGEC para impartir el programa
          </Typography>
          <Input
            type="file"
            id="memo-adjunto"
            onChange={handleMemoAdjuntoChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="memo-adjunto">
            <Button variant="outlined" component="span">
              Adjuntar archivo
            </Button>
          </label>

          {/* Límite de archivo */}
          <Typography variant="body2" mt={2}>
            Límite de archivo: 5 MB
          </Typography>
        </Box>
      )}

      {/* Botón de "Guardar sin enviar" */}
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGuardarClick}
        >
          Guardar sin enviar
        </Button>
      </Box>
    </Container>
  );
};

// Exporta el componente FormularioDGEC para que pueda ser utilizado en otras partes de la aplicación.
export default FormularioDGEC;

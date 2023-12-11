// Se importa React y los componentes de Material-UI que necesito para construir el formulario.
import React, { useState, useEffect } from 'react';
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
import { guardarFormulario, obtenerdetalleProgramasporID, obtenerProgramasDesdeBD } from '../../utils/api';

// Define un componente funcional llamado FormularioDGEC.
const FormularioDGEC: React.FC = () => {
  // Estados locales para manejar diferentes partes del formulario.
  const [haDictadoPrograma, setHaDictadoPrograma] = useState<string>('');
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
  const cargarProgramas =async () => {
    const programasDesdeBD = await obtenerProgramasDesdeBD ();
    setProgramas(programasDesdeBD);
  };

  cargarProgramas();
}, []); //el segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente

  // Maneja el clic en el botón "Guardar sin enviar".
  const handleGuardarClick = async () => {
    try {
      // Realiza una solicitud POST a un endpoint de tu servidor con los datos del formulario.
      const response = await fetch('/api/guardarFormulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          haDictadoPrograma,
          programaSeleccionado,
          memoAdjunto,
          handleProgramaSeleccionadoChange,
          handleGuardarClick
        }),
      });

      // Verifica si la solicitud fue exitosa y muestra mensajes en la consola.
      if (response.ok) {
        console.log('Formulario guardado exitosamente');
      } else {
        console.error('Error al guardar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  // Renderiza el formulario con Material-UI.
  return (
    <Container>
      <Typography variant="h5" align="center" mt={2} mb={1} sx={{ marginTop: 5, marginBottom: 2, fontWeight: 'bold' }}> Autorización</Typography>

      {/* Sección "Programa" */}
      <Box mt={3}>
        <Typography variant="h6"sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}>Programa</Typography>
        {/*Pregunta adicional*/}
        <Typography variant="body1" style={{ marginTop: '16px', marginBottom: '16px' }}> ¿Se ha dictado este programa académico en periodos anteriores? * </Typography >
        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
>
            <Button onClick={() => setHaDictadoPrograma('si')}
            style={{ backgroundColor: haDictadoPrograma === 'si' ? '#004B85' : 'inherit', color: haDictadoPrograma === 'si' ? 'white' : 'inherit'}}>
              Si</Button>
            <Button onClick={() => setHaDictadoPrograma('no')}
            style={{ backgroundColor: haDictadoPrograma === 'no' ? '#004B85' : 'inherit', color: haDictadoPrograma === 'no' ? 'white' : 'inherit'}}>
              No</Button>
        </ButtonGroup>
      </Box>
      
      {/* Pregunta adicional si la respuesta es "Sí" */}
      {haDictadoPrograma === 'si' && (
        <Box mt={3}>
          <Typography variant="subtitle1" style={{ marginTop: '16px', marginBottom: '16px' }}> Seleccione el programa académico</Typography>
          <FormControl fullWidth>
            <Select
              labelId="programa-academico-label"
              id="programa-academico"
              value= {programaSeleccionado}
              onChange = {handleProgramaSeleccionadoChange}
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
      {haDictadoPrograma === 'no' && (
      <Box mt={2}>
      <Typography variant="h6" style={{ marginTop: '16px', marginBottom: '16px', fontWeight: 'bold' }}> Documento de Autorización </Typography>
        <Typography variant="subtitle1" style={{ marginTop: '16px', marginBottom: '16px' }}>
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
        <Button variant="contained" color="primary" onClick={handleGuardarClick}>
          Guardar sin enviar
        </Button>
      </Box>

    </Container>
  );
};

// Exporta el componente FormularioDGEC para que pueda ser utilizado en otras partes de la aplicación.
export default FormularioDGEC;

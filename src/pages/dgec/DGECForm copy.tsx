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
  Input,
  ButtonGroup,
  SelectChangeEvent,
} from '@mui/material';
import { obtenerProgramasDesdeBD } from '../../utils/api';
import { useParams } from 'react-router-dom';
import {
  find_form,
  get_object_localstore,
  save_form,
} from '../../utils/formulario';
let documentoForm = {
  id: null,
  haDictadoPrograma: false,
  programaSeleccionado: '',
  memoAdjunto: null,
};
const FormularioDGEC: React.FC = () => {
  const [haDictadoPrograma, setHaDictadoPrograma] = useState<Boolean>(
    documentoForm?.haDictadoPrograma ?? false
  );

  const [programaSeleccionado, setProgramaSeleccionado] = useState<string>(
    documentoForm?.programaSeleccionado ?? ''
  );
  const [memoAdjunto, setMemoAdjunto] = useState<File | null>(
    documentoForm?.memoAdjunto
  );
  const [programas, setProgramas] = useState<string[]>([]);

  // Maneja cambios en la selección del programa académico.
  const handleProgramaSeleccionadoChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
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

  let { id } = useParams();

  //Maneja la carga de programas desde la base de datos al montar el componente
  useEffect(() => {
    const cargarProgramas = async () => {
      const programasDesdeBD = await obtenerProgramasDesdeBD();
      setProgramas(programasDesdeBD);
    };
    const cargarDataDocumento = async () => {
      try {
        let buscar = false;
        documentoForm = get_object_localstore();
        if (
          id != null &&
          (documentoForm == null || documentoForm?.id == null)
        ) {
          buscar = true;
        } else if (documentoForm != null && documentoForm.id != id) {
          buscar = true;
        } else if (documentoForm != null) {
          getData(documentoForm);
        }
        if (buscar) {
          getData(await find_form(id ?? ''));
          console.log('ya cargo!');
        }
      } catch (error) {
        console.log('Error al obtener los datos del formulario:', error);
        // Manejar el error de alguna manera
      }
    };
    console.log('cargando datos');
    if (id != null) {
      cargarDataDocumento();
    }
    cargarProgramas();
  }, []); //el segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente
  function getData(param: any) {
    if (param) {
      setHaDictadoPrograma(param?.haDictadoPrograma);
      setProgramaSeleccionado(param?.programaSeleccionado);
      setMemoAdjunto(param?.memoAdjunto);
      documentoForm = param;
    }
  }
  // Maneja el clic en el botón "Guardar sin enviar".
  const handleGuardarClick = async () => {
    try {
      const formularioObjeto = {
        haDictadoPrograma,
        programaSeleccionado,
        memoAdjunto,
      };
      save_form(formularioObjeto);
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
        <div>
          <pre>{JSON.stringify(documentoForm, null, 2)}</pre>
        </div>
      </Box>
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
            onClick={() => setHaDictadoPrograma(true)}
            style={{
              backgroundColor: haDictadoPrograma ? '#004B85' : 'inherit',
              color: haDictadoPrograma ? 'white' : 'inherit',
            }}
          >
            Si
          </Button>
          <Button
            onClick={() => setHaDictadoPrograma(false)}
            style={{
              backgroundColor: !haDictadoPrograma ? '#004B85' : 'inherit',
              color: !haDictadoPrograma ? 'white' : 'inherit',
            }}
          >
            No
          </Button>
        </ButtonGroup>
      </Box>

      {/* Pregunta adicional si la respuesta es "Sí" */}
      {haDictadoPrograma && (
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

      {/* Sección "Documento de Autorización" */}
      {/* Utiliza un componente Input y Button para crear un botón de carga de archivos personalizado */}
      {!haDictadoPrograma && (
        <Box mt={2}>
          <Typography
            variant="h6"
            style={{
              marginTop: '16px',
              marginBottom: '16px',
              fontWeight: 'bold',
            }}
          >
            {/* {' '} */}
            {/* Documento de Autorización{' '} */}
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

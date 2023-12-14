// Importa las dependencias necesarias de React y Material-UI
import React, { useState } from 'react';

import {
  Autocomplete,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Stack,
  Grid,
} from '@mui/material';
import Box from '@mui/system/Box';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import { guardarFormulario } from '../../utils/api';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { save_form } from '../../utils/formulario';
// Definición del componente funcional AdmisionForm
const AdmisionForm: React.FC = () => {
  // Estado local para almacenar el formulario y la foto adjunta
  const [formData, setFormData] = useState({
    descprog: '',
    reqprog: {
      cedula: true,
      licencia: false,
      curriculum: false,
      otro: false,
    },
    vacprog: '',
    matrminprog: '',
    linkedin: '',
    modulos: '',
    staffProfesores: '',
  });

  // Estado local para almacenar la foto adjunta
  const [FotoAdjunta, setFotoAdjunta] = useState<File | null>(null);

  const [descripcionPrograma, setdescripcionPrograma] = useState(''); // Estado local para el nombre del programa
  const handleDescripcionProgramaChange = (event) => {
    setdescripcionPrograma(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [objetivoPrograma, setobjetivoPrograma] = useState(''); // Estado local para el nombre del programa
  const handleObjetivoProgramaChange = (event) => {
    setobjetivoPrograma(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [reseniaPrograma, setReseniaProgramaChange] = useState(''); // Estado local para el nombre del programa
  const handleReseniaProgramaChange = (event) => {
    setReseniaProgramaChange(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [enlaceLinkedin, setEnlaceLinkedinChange] = useState(''); // Estado local para el nombre del programa
  const handleEnlaceLinkedinChange = (event) => {
    setEnlaceLinkedinChange(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [requisitosPostulante, setSelectedJornadaOptions] = useState({
    cedula: false,
    licenciaMedia: false,
    curriculum: false,
    otra: false,
  });

  const requisitosPostulanteHandleCheckboxChange = (event) => {
    setSelectedJornadaOptions({
      ...requisitosPostulante,
      [event.target.name]: event.target.checked,
    });
  };

  const [numeroEstudianteMaximo, setNumeroEstudianteMaximoChange] =
    useState(''); // Estado local para el nombre del programa
  const handleNumeroEstudianteMaximoChange = (event) => {
    setNumeroEstudianteMaximoChange(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [numeroEstudianteMinimo, setNumeroEstudianteMinimoChange] =
    useState(''); // Estado local para el nombre del programa
  const handleNumeroEstudianteMinimoChange = (event) => {
    setNumeroEstudianteMinimoChange(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [staffProfesores, sethandlestaffProfesoresChange] = useState(''); // Estado local para el nombre del programa
  const handlestaffProfesoresChange = (event) => {
    sethandlestaffProfesoresChange(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  // Función para manejar cambios en los campos de texto
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar cambios en la selección de la foto adjunta
  const handleFotoAdjuntaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    setFotoAdjunta(file);
  };

  // Función para manejar cambios en los campos de checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      reqprog: {
        ...formData.reqprog,
        [name]: checked,
      },
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      const response = await guardarFormulario(formData);
      console.log('Respuesta del servidor:', response.data);
    } catch (error: any) {
      console.error('Error al enviar el formulario:', error.message || error);
    }
  };

  // Maneja el clic en el botón "Guardar sin enviar".
  //Isra
  const handleGuardarClick = async () => {
    let formularioObjeto = {
      programa_descripcion: descripcionPrograma,
      programa_objetivo: objetivoPrograma,
      programa_resenia: reseniaPrograma,
      linkedin: enlaceLinkedin,
      ...requisitosPostulante,
      cupo_maximo: numeroEstudianteMaximo,
      cupo_minimo: numeroEstudianteMinimo,
      modulos: tableData,
      profesores: staffProfesores,
    };
    save_form(formularioObjeto);
  };

  // Lista Modulo programas
  const [hours, setHours] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleAdd = () => {
    setTableData([...tableData, { module: inputModuleValue, hour: hours }]);
    setHours('');
  };

  const handleEdit = (index) => {
    agregarNuevoValor(tableData[index].module);
    setHours(tableData[index].hour);
    handleDelete(index);
    // Aquí puedes implementar la lógica para editar la fila seleccionada
  };
  const handleDelete = (index) => {
    // tableData[index].module);
    tableData.splice(index, 1);
    setTableData([...tableData]);
    // Aquí puedes implementar la lógica para editar la fila seleccionada
  };

  const [departamentoDireccionEstudios, setDepartamentoDireccionEstudios] =
    useState([]);

  // Lista Modulo Select
  const [optionsModule, setOptions] = useState([
    'Opción 1',
    'Opción 2',
    'Opción 3',
  ]);
  const [inputModuleValue, setinputModuleValue] = useState('');
  const [inputAutocomplete, setinputAutocompleteModuleValue] = useState('');

  const handleInputModuleChange = (event, newinputModuleValue) => {
    console.log('newinputModuleValue->' + newinputModuleValue);
    setinputModuleValue(newinputModuleValue);
  };
  const handleInputAutoCompleteChange = (event) => {
    const newValue = event.target.value;
    console.log(newValue);
    setinputAutocompleteModuleValue(newValue);
  };
  function agregarNuevoValor(valor) {
    if (!optionsModule.includes(valor)) {
      setOptions([...optionsModule, valor]);
    }
    setinputModuleValue(valor);
  }
  const handleKeyPress = (event) => {
    if (
      event.key === 'Enter' &&
      inputAutocomplete.trim() !== '' &&
      !optionsModule.includes(inputAutocomplete)
    ) {
      agregarNuevoValor(inputAutocomplete);
    }
  };

  // Renderización del componente
  return (
    <Container>
      <Box>
        {/* Sección: Información General del Programa */}
        <Typography
          variant="h6"
          align="center"
          mt={2}
          mb={1}
          sx={{ marginTop: 5, marginBottom: 2, fontWeight: 'bold' }}
        >
          Información General del Programa
        </Typography>
      </Box>

      <Box>
        {/* Sección: Descripción del Programa */}
        <div>
          <Typography
            variant="h6"
            sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
          >
            Información
          </Typography>
        </div>
        <hr />

        <div>
          {/* Campo de texto para la descripción del programa */}
          <FormGroup>
            <TextField
              fullWidth
              label="Descripción del programa"
              name="descprog"
              id="adm_descprog"
              multiline
              rows={2}
              variant="outlined"
              value={descripcionPrograma}
              onChange={handleDescripcionProgramaChange}
            />
          </FormGroup>
        </div>
      </Box>

      {/* Sección: Objetivo del Programa */}
      <Box>
        <div>
          <Typography
            variant="h6"
            sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
          >
            Objetivo del Programa
          </Typography>
          <hr />

          <div>
            {/* Campo de texto para Objetivo del programa */}
            <FormGroup>
              <TextField
                fullWidth
                label="Objetivo del programa"
                name="descprog"
                id="adm_descprog"
                multiline
                rows={2}
                variant="outlined"
                value={objetivoPrograma}
                onChange={handleObjetivoProgramaChange}
              />
            </FormGroup>
          </div>
        </div>
      </Box>

      {/* Sección: Reseña del Director */}
      <Box>
        <div>
          <Typography
            variant="h6"
            sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
          >
            Reseña del Director
          </Typography>
          <hr />

          <div>
            {/* Campo de texto para la reseña del Director */}
            <FormGroup>
              <TextField
                fullWidth
                label="Reseña del Director"
                name="descprog"
                id="adm_descprog"
                multiline
                rows={2}
                variant="outlined"
                value={reseniaPrograma}
                onChange={handleReseniaProgramaChange}
              />
            </FormGroup>
          </div>
        </div>
      </Box>

      <Box>
        <Stack direction="row" spacing={2}>
          {/*Sección: Adjuntar Foto*/}
          <Input
            type="file"
            id="FotoAdjunta"
            onChange={handleFotoAdjuntaChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="FotoAdjunta">
            <Button variant="outlined" component="span" sx={{ marginTop: 2 }}>
              Adjuntar Foto
            </Button>
          </label>

          {/* Campo de entrada de texto para el enlace de LinkedIn */}
          <FormGroup sx={{ mt: 2, marginBottom: 2 }}>
            <TextField
              sx={{ marginTop: 2, justifyContent: 'right' }}
              fullWidth
              label="Enlace de LinkedIn"
              name="linkedin"
              id="adm_linkedin"
              variant="outlined"
              value={enlaceLinkedin}
              onChange={handleEnlaceLinkedinChange}
            />
          </FormGroup>
        </Stack>
      </Box>

      {/* Sección: Requisitos para el postulante*/}
      <FormGroup sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}>
        <label htmlFor="adm_reqprog" className="form-label">
          Requisitos para el postulante o documentación solicitada
        </label>

        <FormControl>
          <FormGroup>
            {/* Campos de checkbox para los requisitos */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={requisitosPostulante.cedula}
                  onChange={requisitosPostulanteHandleCheckboxChange}
                  name="cedula"
                />
              }
              label="Cédula de Identidad (o DNI o Pasaporte)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={requisitosPostulante.licenciaMedia}
                  onChange={requisitosPostulanteHandleCheckboxChange}
                  name="licenciaMedia"
                />
              }
              label="Licencia de Educación Media"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={requisitosPostulante.curriculum}
                  onChange={requisitosPostulanteHandleCheckboxChange}
                  name="curriculum"
                />
              }
              label="Curriculum Vitae (CV)"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={requisitosPostulante.otra}
                  onChange={requisitosPostulanteHandleCheckboxChange}
                  name="otra"
                />
              }
              label="Otro"
            />
          </FormGroup>
        </FormControl>
      </FormGroup>

      {/* Sección: Cupos */}
      <div>
        <Typography
          variant="h5"
          className="titulo"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          Cupos
        </Typography>
        <hr />

        <FormGroup>
          {/* Campos de texto para los cupos */}
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Número de cupos máximo (vacantes)"
            name="vacprog"
            id="adm_vacprog"
            variant="outlined"
            value={numeroEstudianteMaximo}
            onChange={handleNumeroEstudianteMaximoChange}
          />
        </FormGroup>

        <FormGroup>
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Número de estudiantes matriculados mínimos para impartir el programa"
            name="matrminprog"
            id="adm_matrminprog"
            variant="outlined"
            value={numeroEstudianteMinimo}
            onChange={handleNumeroEstudianteMinimoChange}
          />
        </FormGroup>
      </div>

      {/* Sección: Módulos del Programa */}
      <Box>
        <div>
          <Typography
            variant="h6"
            sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
          >
            {' '}
            Liste Módulos del Programa
          </Typography>
          <hr />
          <div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  value={inputModuleValue}
                  options={optionsModule}
                  onChange={handleInputModuleChange}
                  onKeyDown={handleKeyPress}
                  renderInput={(params) => (
                    <TextField
                      onChange={handleInputAutoCompleteChange}
                      {...params}
                      label="Módulo"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  label="Horas"
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className="float-left"
                  onClick={handleAdd}
                  sx={{ marginTop: 2 }}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Módulo</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((data, index) => (
                    <TableRow>
                      <TableCell>{data.module}</TableCell>
                      <TableCell>{data.hour}</TableCell>
                      <TableCell>
                        <button onClick={() => handleEdit(index)}>
                          Editar
                        </button>
                        <button onClick={() => handleDelete(index)}>
                          Eliminar
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>

      {/* Sección: Staff de Profesores */}
      <Box>
        <div>
          <Typography
            variant="h6"
            sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
          >
            Liste el Staff de Profesores
          </Typography>
          <hr />

          <div>
            {/* Campo de texto para Staff de Profesores */}
            <FormGroup>
              <TextField
                fullWidth
                label="Staff de Profesores"
                name="descprog"
                id="adm_descprog"
                multiline
                rows={2}
                variant="outlined"
                value={staffProfesores}
                onChange={handlestaffProfesoresChange}
              />
            </FormGroup>
          </div>
        </div>
      </Box>

      {/* Sección: Botón de Guardar */}
      <Box>
        <div className="row">
          <div className="col-6">
            {/* Botón para guardar el formulario */}
            <Button
              variant="outlined"
              color="secondary"
              className="float-left"
              onClick={handleGuardarClick}
              sx={{ marginTop: 2 }}
            >
              Guardar sin enviar
            </Button>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default AdmisionForm;

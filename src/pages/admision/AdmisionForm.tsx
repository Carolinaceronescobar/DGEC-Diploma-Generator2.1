// Importa las dependencias necesarias de React y Material-UI
import React, { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Stack,
} from '@mui/material';
import Box from '@mui/system/Box';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import { guardarFormulario } from '../../utils/api';

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
  const handleGuardarClick = async () => {
    try {
      const response = await fetch('/api/guardarFormulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          FotoAdjunta,
        }),
      });
      console.log('Formulario guardado correctamente');
    } catch (e) {
      console.error('Error al guardar el formulario:', e);
    }
  };

  // Renderización del componente
  return (
    <Container>
      <Box>
        {/* Sección: Información General del Programa */}
        <Typography
          variant="h5"
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
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
                  checked={formData.reqprog.cedula}
                  onChange={handleCheckboxChange}
                  name="cedula"
                />
              }
              label="Cédula de Identidad (o DNI o Pasaporte)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.reqprog.licencia}
                  onChange={handleCheckboxChange}
                  name="licencia"
                />
              }
              label="Licencia de Educación Media"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.reqprog.curriculum}
                  onChange={handleCheckboxChange}
                  name="curriculum"
                />
              }
              label="Curriculum Vitae (CV)"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.reqprog.otro}
                  onChange={handleCheckboxChange}
                  name="otro"
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            {/* Campo de texto para Modulos del Programa */}
            <FormGroup>
              <TextField
                fullWidth
                label="Módulos del Programa"
                name="descprog"
                id="adm_descprog"
                multiline
                rows={2}
                variant="outlined"
                onChange={handleChange}
              />
            </FormGroup>
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
                onChange={handleChange}
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

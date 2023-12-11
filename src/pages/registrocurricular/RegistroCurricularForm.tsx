import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Box from '@mui/system/Box';
import UsoInternoDGEC from '../usointdgec/UsointernoDGEC';
import UsointernoDireccionEstudios from '../usointdireccionestudios/UsointernoDireccionEstudios';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import api from '../../../utils/api';


const RegistroCurricularForm: React.FC = () => {
//validar funciones
const validateRequired = (value:string) => !!value.length;
const validateEmail = (email:string) =>
!!email.length &&
email.toLowerCase()
.match(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const [FormularioPrincipalCompleto, setFormularioPrincipalCompleto] = useState<boolean>(false);
  
   //Estado para mostrar Uso Interno DGEC y Dirección de Estudios
  const [mostrarUsoInternoDGEC, setMostrarUsoInternoDGEC] = useState<boolean>(false);
  const [mostrarUsoInternoDireccionEstudios, setMostrarUsoInternoDireccionEstudios] = useState<boolean>(false);
  
   //Estado para fechas
  const [value,setValue] = useState<dayjs.Dayjs | null>(dayjs('2023-11-28'));

  //Estado para departamentos
  const [departamentoDGEC, setDepartamentoDGEC] =useState<Departamento[]>([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState<number | string>('');
  const [departamentoDireccionEstudios, setDepartamentoDireccionEstudios] =useState([]);
  
function departamentoDump(){
const depto = [
  { "id": 1, "name": "departamento Nombre1" },
  { "id": 2, "name": "departamento Nombre2" },
  { "id": 3, "name": "departamento Nombre3" }
]

setDepartamentoDGEC(depto);
}

  useEffect(() => {
    departamentoDump();
    // Realizar la solicitud al backend para obtener los datos de los departamentos
    fetch('../../utils/api/departamentos')  // Reemplaza 'departamentos' con la ruta correcta a tu endpoint de departamentos
      .then(response => response.json())
      .then(data => {
        setDepartamentoDGEC(data);
        setDepartamentoDireccionEstudios(data);
      })
      .catch(error => console.error('Error al obtener departamentos:', error));
  }, []);

  // Estado para sedes
  const [sedes, setSedes] = useState<Sedes[]> ([]);
  
  function sedesDump(){
    const sedes = [
      { "id": 1, "name": "sede Nombre1" },
      { "id": 2, "name": "sede Nombre2" },
      { "id": 3, "name": "sede Nombre3" }
    ]
    setSedes(sedes);
    }
  useEffect(() => {
    sedesDump();
    // Realiza una solicitud al backend para obtener los datos de las sedes
    fetch('../../utils/api/sedes')  // Reemplaza 'sedes' con la ruta correcta a tu endpoint de sedes
      .then(response => response.json())
      .then(data => setSedes(data))
      .catch(error => console.error('Error al obtener sedes:', error));
  }, []);
  

// Interfaces para props de Uso Interno
interface UsoInternoProps {
  campos: { campo1: string; campo2: string };
  setCampos: React.Dispatch<React.SetStateAction<{ campo1: string; campo2: string }>>;
  departamento: Departamento[];
  setDepartamento: React.Dispatch<React.SetStateAction<Departamento[]>>;
  readOnly: boolean;
  onGuardar: () => void;
  onEnviar: () => void;
}

interface Departamento {
  id: number;
  name: string;
}

interface Sedes {
  id: number;
  name: string;
}
//Actualizar el EstadoFormulario principal para indicar que está completo
  const handleFormularioCompleto =() => {
  setFormularioPrincipalCompleto(true);
    };

  // En tu componente principal
  // const handleMostrarUsoInternoDGEC = () => {
  // setMostrarUsoInternoDGEC(!mostrarUsoInternoDGEC);
  // };
  // const handleMostrarUsoInternoDireccionEstudios = () => {
  //   setMostrarUsoInternoDireccionEstudios(!mostrarUsoInternoDireccionEstudios);
  // };

//Manejo de clic para DGEC
  const handleGuardarDGEC = async () => {
};

  const handleEnviarDGEC = async () => {
  try {
    //llamada a la ruta de backend para enviar a DGEC
    await fetch('/api/enviarDGEC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UsoInternoDGEC}),
    });
    console.log('Enviado a DGEC:' , UsoInternoDGEC);
  } catch (error) {
    console.error('Error al enviar a DGEC', error);
  }
  };

// Manejadores de clic para Direccion de Estudios
  const handleGuardarDireccionEstudios = async () => {
};
  const handleEnviarDireccionEstudios = async () => {
  try {
    //Llamada a la ruta de backend para enviar a Direccion de Estudios
    await fetch ('/api/enviarDireccionEstudios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mostrarUsoInternoDireccionEstudios}),
    });
  console.log ('Enviado en Direccion de Estudios', mostrarUsoInternoDireccionEstudios);
  } catch (error) {
    console.log('Error al enviar a Direccion de Estudios', error);
  }
 };

 //Maneja el clic en el botón 'Guardar sin enviar'
 const handleGuardarClick = async () => {
  try {
    //Solicitud POST a un endpoint del servidor con los datos del formulario.
    const response = await fetch('/api/guardarFormulario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        handleGuardarClick,
        handleGuardarDGEC,
        handleGuardarDireccionEstudios,
        handleEnviarDGEC,
        handleEnviarDireccionEstudios,
        UsoInternoDGEC,
        mostrarUsoInternoDireccionEstudios,
      }),
    });
  // Lógica para Guardar el Formulario
  console.log('Formulario guardado', response);
  //Lógica para el error al guardar formulario
  } catch (error: any) {
    console.error('Error al guardar el formulario', error.message || error)
  }
};

  return (
    <Container>
      {/* Sección: Información relevante para Registro Curricular */}
      <Typography variant="h5" align="center" mt={2} mb={1} sx={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>
        Información relevante para Registro Curricular
      </Typography>

      {/* Sección: Programa */}
      <Box>
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold'}}>Programa</Typography>
        <hr />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {/* Nivel de programa académico */}
          <FormControl component="fieldset">
            <Typography variant="subtitle1">Nivel de programa académico</Typography>
            <RadioGroup row id="regcur_nivel">
              <FormControlLabel
                value="Curso"
                control={<Radio />}
                label="Curso"
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
              />
              <FormControlLabel
                value="Diploma"
                control={<Radio />}
                label="Diploma"
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
              />
            </RadioGroup>
          </FormControl>

          {/* Tipo de programa académico */}
          <FormControl component="fieldset">
            <Typography variant="subtitle1">Tipo de programa académico</Typography>
            <RadioGroup row id="regcur_tipoprog">
              <FormControlLabel
                value="Cerrado (Corporativo)"
                control={<Radio />}
                label="Cerrado (Corporativo)"
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
              />
              <FormControlLabel
                value="Programa Abierto"
                control={<Radio />}
                label="Programa Abierto"
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Nombre y director del programa */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <TextField fullWidth id="regcur_nomprog" label="Nombre del Programa *" variant="outlined" sx={{ mr: 2 }} />
          <TextField fullWidth id="regcur_dirprog" label="Director del Programa *" variant="outlined" />
        </Box>

        {/* Sección: Donde se imparte el Programa */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      {/* Departamento o Unidad */}
      <FormControl fullWidth>
        <Typography variant="subtitle1">Departamento</Typography>
      <Select
          id="regcur_depprog"
          label="Departamento o Unidad"
          variant="outlined"
          sx={{ mr: 2 }}
          value={selectedDepartamento}
          onChange={(e) => setSelectedDepartamento(e.target.value as number)}
      >
          {departamentoDGEC.map((departamento) => (
            <MenuItem key={departamento.id} value={departamento.id}>
              {departamento.name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
    </Box>
  

      {/* Emplazamiento */}
      <FormControl fullWidth>
        <Typography variant="subtitle1">Emplazamiento</Typography>
        <Select id="regcur_sedeprog" label="Emplazamiento" variant="outlined" sx={{ mr: 2 }}>
          {sedes.map((sede) => (
            <MenuItem key={sede.id} value={sede.id}>
              {sede.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
      

          {/* Jornada y Modalidad */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            {/* Jornada */}
            <FormControl component="fieldset">
              <Typography variant="subtitle1">Jornada</Typography>
              <RadioGroup row id="regcur_jorprog">
                <FormControlLabel
                  value="Diurna"
                  control={<Radio />}
                  label="Diurna"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                />
                <FormControlLabel
                  value="Vespertina"
                  control={<Radio />}
                  label="Vespertina"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                />
                <FormControlLabel
                  value="A Distancia"
                  control={<Radio />}
                  label="A Distancia"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                />
                <FormControlLabel
                  value="Otra"
                  control={<Radio />}
                  label="Otra"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                />
              </RadioGroup>
            </FormControl>

            {/* Línea divisoria entre secciones */}
            <Divider component="div" variant="fullWidth" role="presentation" style={{ marginInline: '30px', border: '1px solid #808080' }} />

            {/* Modalidad */}
            <FormControl component="fieldset">
              <Typography variant="subtitle1">Modalidad</Typography>
              <RadioGroup row id="regcur_modprog">
                <FormControlLabel
                  value="Presencial"
                  control={<Radio />}
                  label="Presencial"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                />
                <FormControlLabel
                  value="Online"
                  control={<Radio />}
                  label="Online"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                />
                <FormControlLabel
                  value="Híbrida"
                  control={<Radio />}
                  label="Híbrida"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
  

      {/* Sección: Duración */}
      <Box>
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}>Duración</Typography>
        <hr />

        {/* Fechas de inicio y término */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
           <DatePicker label="Fecha de Inicio" defaultValue={dayjs('2023-11-28')} />
            <DatePicker
            label="Fecha de Finalización"
            value={value}
            onChange={(newValue) => setValue(newValue)}
        />
          </DemoContainer>
        </LocalizationProvider>

        {/* Duración del programa y Número de versión */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <TextField
            fullWidth
            id="regcur_durprog"
            label="Duración del programa (horas) *"
            variant="outlined"
            type="number"  // Establece el tipo de entrada como número
            InputProps={{
              inputProps: {
                min: 1  // Establece un valor mínimo, si es necesario
              },
            }}
            sx={{ mr: 2 }}
          />
          <TextField fullWidth id="regcur_verprog" label="Número de versión del programa *" variant="outlined" />
        </Box>
      </Box>

       {/*Sección Fecha Convocatoria*/}
      <Box>
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}>Fecha Convocatoria</Typography>
        <hr />

        {/* Fechas de inicio y término */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker label="Fecha de Inicio" defaultValue={dayjs('2023-11-28')} />
          <DatePicker
          label="Fecha de Finalización"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
        </LocalizationProvider>
      </Box>


      {/* Sección: Uso Interno Departamentos */}
      {/* <Typography variant="h6" align="center" mt={4} mb={5} sx={{ marginTop: 10, marginBottom: 2, fontWeight: 'bold' }}>
        USO INTERNO DEPARTAMENTOS
      </Typography> */}

      {/* Componente para Uso interno DGEC */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button variant="outlined" color="primary" className="float-left" onClick={handleMostrarUsoInternoDGEC}>
        Mostrar/Ocultar Uso Interno DGEC
      </Button> */}
        
          {/*Mostrar/Ocultar Uso Interno DGEC*/}
        
          {/* <Button variant="outlined" color="primary" className="float-left" onClick={handleMostrarUsoInternoDireccionEstudios}>
        Mostrar/Ocultar Uso Interno Direccion Estudios
      </Button>
       */}
      {/*Mostrar/Ocultar Uso Interno Dirección de Estudios*/}
      {/* </Box> */}

      {/* Secciones de Uso Interno */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" color="primary" className="float-left" onClick={handleMostrarUsoInternoDGEC}>
          Mostrar/Ocultar Uso Interno DGEC
        </Button>

        <Button
          variant="outlined"
          color="primary"
          className="float-left"
          onClick={handleMostrarUsoInternoDireccionEstudios}
        >
          Mostrar/Ocultar Uso Interno Direccion Estudios
        </Button>
      </Box> */}
      
    {/* Botón para marcar el formulario como completo */}
{/* <Button variant="outlined" color="primary" className="float-left" onClick={handleFormularioCompleto}>
        Marcar como completo
      </Button> */}

    {/* Botón para guardar sin enviar */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button variant="outlined" color="primary" className="float-left" onClick={handleGuardarClick}>
        Guardar sin enviar
      </Button>
    </Box>
  </Container>
);
};

export default RegistroCurricularForm;

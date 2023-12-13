import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { save_form } from '../../utils/formulario';
// import { DatePicker } from '@mui/x-date-pickers';
//import api from '../../../utils/api';
import DesktopDatePicker from '@mui/x-date-pickers/DesktopDatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const RegistroCurricularForm: React.FC = () => {
  //validar funciones
  const validateRequired = (value: string) => !!value.length;
  const validateEmail = (email: string) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const [FormularioPrincipalCompleto, setFormularioPrincipalCompleto] =
    useState<boolean>(false);

  //Estado para mostrar Uso Interno DGEC y Dirección de Estudios
  const [mostrarUsoInternoDGEC, setMostrarUsoInternoDGEC] =
    useState<boolean>(false);
  const [
    mostrarUsoInternoDireccionEstudios,
    setMostrarUsoInternoDireccionEstudios,
  ] = useState<boolean>(false);

  //Estado para fechas
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs('2023-11-28'));

  //Estado para departamentos
  const [departamentoDGEC, setDepartamentoDGEC] = useState<Departamento[]>([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState<
    number | string
  >('');
  const [departamentoDireccionEstudios, setDepartamentoDireccionEstudios] =
    useState([]);

  function departamentoDump() {
    axios
      .get('http://127.0.0.1:8000/api/departamento/')
      .then((response) => {
        setDepartamentoDGEC(response.data);
      })
      .catch((error) => {
        setDepartamentoDGEC([]);
      });

    // const depto = [
    //   { id: 1, name: 'departamento Nombre1' },
    //   { id: 2, name: 'departamento Nombre2' },
    //   { id: 3, name: 'departamento Nombre3' },
    // ];
  }

  useEffect(() => {
    departamentoDump();
    // Realizar la solicitud al backend para obtener los datos de los departamentos
    fetch('../../utils/api/departamentos') // Reemplaza 'departamentos' con la ruta correcta a tu endpoint de departamentos
      .then((response) => response.json())
      .then((data) => {
        setDepartamentoDGEC(data);
        setDepartamentoDireccionEstudios(data);
      })
      .catch((error) =>
        console.error('Error al obtener departamentos:', error)
      );
  }, []);

  // Estado para sedes
  const [sedes, setSedes] = useState<Sedes[]>([]);

  function sedesDump() {
    axios
      .get('http://127.0.0.1:8000/api/sede/')
      .then((response) => {
        setSedes(response.data);
      })
      .catch((error) => {
        setSedes([]);
      });

    const sedes = [
      { id: 1, name: 'sede Nombre1' },
      { id: 2, name: 'sede Nombre2' },
      { id: 3, name: 'sede Nombre3' },
    ];
    sedes;
  }
  useEffect(() => {
    sedesDump();
    // Realiza una solicitud al backend para obtener los datos de las sedes
    fetch('../../utils/api/sedes') // Reemplaza 'sedes' con la ruta correcta a tu endpoint de sedes
      .then((response) => response.json())
      .then((data) => setSedes(data))
      .catch((error) => console.error('Error al obtener sedes:', error));
  }, []);

  // Interfaces para props de Uso Interno
  interface UsoInternoProps {
    campos: { campo1: string; campo2: string };
    setCampos: React.Dispatch<
      React.SetStateAction<{ campo1: string; campo2: string }>
    >;
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
  const handleFormularioCompleto = () => {
    setFormularioPrincipalCompleto(true);
  };

  // En tu componente principal
  // const handleMostrarUsoInternoDGEC = () => {
  // setMostrarUsoInternoDGEC(!mostrarUsoInternoDGEC);
  // };
  // const handleMostrarUsoInternoDireccionEstudios = () => {
  //   setMostrarUsoInternoDireccionEstudios(!mostrarUsoInternoDireccionEstudios);
  // };

  //Manejo de clic para DGEC ----****CAMBIO*****------
  const handleGuardarDGEC = async () => {
    try {
      console.log('Enviado a DGEC:', UsoInternoDGEC);
      await axios.post('/api/enviarDGEC', { UsoInternoDGEC });
      console.log('Enviado a DGEC:', UsoInternoDGEC);
    } catch (error) {
      console.error('Error al enviar a DGEC', error);
    }
  };
  //   const handleGuardarDGEC = async () => {};
  //   try {
  //     console.log('Enviado a DGEC:', UsoInternoDGEC);
  //     await axios.post('/api/enviarDGEC', { UsoInternoDGEC });
  //     console.log('Enviado a DGEC:', UsoInternoDGEC);
  //   } catch (error) {
  //     console.error('Error al enviar a DGEC', error);
  //   }
  // };

  const handleEnviarDGEC = async () => {
    try {
      console.log('Enviado a DGEC:', UsoInternoDGEC);

      //llamada a la ruta de backend para enviar a DGEC
      await fetch('/api/enviarDGEC', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UsoInternoDGEC }),
      });
      console.log('Enviado a DGEC:', UsoInternoDGEC);
    } catch (error) {
      console.error('Error al enviar a DGEC', error);
    }
  };

  // Manejadores de clic para Direccion de Estudios
  const handleGuardarDireccionEstudios = async () => {};

  //*-------------*****CAMBIO--------------******
  const handleEnviarDireccionEstudios = async () => {
    try {
      //Llamada a la ruta de backend para enviar a Direccion de Estudios
      await fetch('/api/enviarDireccionEstudios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mostrarUsoInternoDireccionEstudios }),
      });
      console.log(
        'Enviado en Direccion de Estudios',
        mostrarUsoInternoDireccionEstudios
      );
    } catch (error) {
      console.log('Error al enviar a Direccion de Estudios', error);
    }
  };
  // const handleEnviarDireccionEstudios = async () => {
  //   try {
  //     //Llamada a la ruta de backend para enviar a Direccion de Estudios
  //     await fetch('/api/enviarDireccionEstudios', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ mostrarUsoInternoDireccionEstudios }),
  //     });
  //     console.log(
  //       'Enviado en Direccion de Estudios',
  //       mostrarUsoInternoDireccionEstudios
  //     );
  //   } catch (error) {
  //     console.log('Error al enviar a Direccion de Estudios', error);
  //   }
  // };

  //Maneja el clic en el botón 'Guardar sin enviar'
  const handleGuardarClick = async () => {
    try {
      //Solicitud POST a un endpoint del servidor con los datos del formulario.
      // const response = await fetch('/api/guardarFormulario', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     handleGuardarClick,
      //     handleGuardarDGEC,
      //     handleGuardarDireccionEstudios,
      //     handleEnviarDGEC,
      //     handleEnviarDireccionEstudios,
      //     UsoInternoDGEC,
      //     mostrarUsoInternoDireccionEstudios,
      //   }),
      // });
      save_form({
        handleGuardarClick,
        handleGuardarDGEC,
        handleGuardarDireccionEstudios,
        handleEnviarDGEC,
        handleEnviarDireccionEstudios,
        UsoInternoDGEC,
        mostrarUsoInternoDireccionEstudios,
        nombrePrograma,
        directorPrograma,
        FormularioPrincipalCompleto,
        nivelProgramaAcademicoSeleccionado,
        tipoProgramaAcademicoSeleccionado,
        departamento,
        emplazamiento,
        ...selectedOptions,
        value,
      });
      // Lógica para Guardar el Formulario
      console.log('Formulario guardado', response);
      //Lógica para el error al guardar formulario
    } catch (error: any) {
      console.error('Error al guardar el formulario', error.message || error);
    }
  };

  const [nivelProgramaAcademicoSeleccionado, setValorSeleccionado] =
    useState('');
  const handleNivelProgramaAcademicoChange = (event) => {
    setValorSeleccionado(event.target.value); // Actualizar el estado con el valor seleccionado
  };

  const [
    tipoProgramaAcademicoSeleccionado,
    settipoProgramaAcademicoSeleccionado,
  ] = useState('');
  const handletipoProgramaAcademicoChange = (event) => {
    settipoProgramaAcademicoSeleccionado(event.target.value); // Actualizar el estado con el valor seleccionado
  };
  const [nombrePrograma, setNombrePrograma] = useState(''); // Estado local para el nombre del programa
  const [directorPrograma, setDirectorPrograma] = useState(''); // Estado local para el director del programa

  const handleNombreProgramaChange = (event) => {
    setNombrePrograma(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const handleDirectorProgramaChange = (event) => {
    setDirectorPrograma(event.target.value); // Actualizar el estado con el valor del director del programa
  };
  const [departamento, setDepartamento] = useState(''); // Estado local para el departamento seleccionado

  const handleDepartamentoChange = (event) => {
    setDepartamento(event.target.value); // Actualizar el estado con el valor del departamento seleccionado
  };
  const [emplazamiento, setEmplazamiento] = useState(''); // Estado local para el emplazamiento seleccionado

  const handleEmplazamientoChange = (event) => {
    setEmplazamiento(event.target.value); // Actualizar el estado con el valor del emplazamiento seleccionado

    const [selectedOptions, setSelectedOptions] = useState({
      Diurna: false,
      Vespertina: false,
      ADistancia: false,
      Otra: false,
    });

    const handleCheckboxChange = (event) => {
      setSelectedOptions({
        ...selectedOptions,
        [event.target.name]: event.target.checked,
      });
    };
  };

  const [selectedOptions, setSelectedOptions] = useState({
    Presencial: false,
    Online: false,
    Hibrida: false,
    Otra: false,
  });

  const handleCheckboxChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const [startDate, setStartDate] = useState(dayjs('2023-11-28'));
  const [endDate, setEndDate] = useState(null);

  return (
    <Container>
      {/* Sección: Información relevante para Registro Curricular */}
      <Typography
        variant="h5"
        align="center"
        mt={2}
        mb={1}
        sx={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}
      >
        Información relevante para Registro Curricular
      </Typography>

      {/* Sección: Programa */}
      <Box>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          Programa
        </Typography>
        <hr />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {/* Nivel de programa académico */}
          <FormControl component="fieldset">
            <Typography variant="subtitle1">
              Nivel de programa académico
            </Typography>
            <RadioGroup
              row
              id="regcur_nivel"
              value={nivelProgramaAcademicoSeleccionado}
              onChange={handleNivelProgramaAcademicoChange}
            >
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
            <Typography variant="subtitle1">
              Tipo de programa académico
            </Typography>
            <RadioGroup
              row
              id="regcur_tipoprog"
              value={tipoProgramaAcademicoSeleccionado}
              onChange={handletipoProgramaAcademicoChange}
            >
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
          <TextField
            fullWidth
            id="regcur_nomprog"
            label="Nombre del Programa *"
            variant="outlined"
            sx={{ mr: 2 }}
            value={nombrePrograma}
            onChange={handleNombreProgramaChange}
          />
          <TextField
            fullWidth
            id="regcur_dirprog"
            label="Director del Programa *"
            variant="outlined"
            value={directorPrograma}
            onChange={handleDirectorProgramaChange}
          />
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
              value={departamento}
              onChange={handleDepartamentoChange}
              // value={selectedDepartamento}
              // onChange={(e) =>
              //   setSelectedDepartamento(e.target.value as number)
              // }
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
          <Select
            id="regcur_sedeprog"
            label="Emplazamiento"
            variant="outlined"
            sx={{ mr: 2 }}
            value={emplazamiento}
            onChange={handleEmplazamientoChange}
          >
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
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.Diurna}
                  onChange={handleCheckboxChange}
                  name="Diurna"
                />
              }
              label="Diurna"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.Vespertina}
                  onChange={handleCheckboxChange}
                  name="Vespertina"
                />
              }
              label="Vespertina"
            />{' '}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.ADistancia}
                  onChange={handleCheckboxChange}
                  name="ADistancia"
                />
              }
              label="A Distancia"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.Otra}
                  onChange={handleCheckboxChange}
                  name="Otra"
                />
              }
              label="Otra"
            />
          </FormGroup>
        </FormControl>

        {/* Línea divisoria entre secciones */}
        <Divider
          component="div"
          variant="fullWidth"
          role="presentation"
          style={{ marginInline: '30px', border: '1px solid #808080' }}
        />

        {/* Modalidad */}

        <FormControl component="fieldset">
          <Typography variant="subtitle1">Modalidad</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.Presencial}
                  onChange={handleCheckboxChange}
                  name="Presencial"
                />
              }
              label="Presencial"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.Online}
                  onChange={handleCheckboxChange}
                  name="Online"
                />
              }
              label="Online"
            />{' '}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.Hibrida}
                  onChange={handleCheckboxChange}
                  name="Hibrida"
                />
              }
              label="Híbrida"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.Otra}
                  onChange={handleCheckboxChange}
                  name="OtraModalidad"
                />
              }
              label="Otra"
            />
          </FormGroup>
        </FormControl>
      </Box>

      {/* Sección: Duración */}
      <Box>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          Duración
        </Typography>
        <hr />

        {/* Fechas de inicio y término */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Fecha de Inicio"
              defaultValue={dayjs('2023-11-28')}
            />
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
            type="number" // Establece el tipo de entrada como número
            InputProps={{
              inputProps: {
                min: 1, // Establece un valor mínimo, si es necesario
              },
            }}
            sx={{ mr: 2 }}
          />
          <TextField
            fullWidth
            id="regcur_verprog"
            label="Número de versión del programa *"
            variant="outlined"
          />
        </Box>
      </Box>

      {/*Sección Fecha Convocatoria*/}
      <Box>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          Fecha Convocatoria
        </Typography>
        <hr />

        {/* Fechas de inicio y término */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Fecha de Inicio"
              defaultValue={dayjs('2023-11-28')}
            />
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
        <Button
          variant="outlined"
          color="primary"
          className="float-left"
          onClick={handleGuardarClick}
        >
          Guardar sin enviar
        </Button>
      </Box>
    </Container>
  );
};

export default RegistroCurricularForm;

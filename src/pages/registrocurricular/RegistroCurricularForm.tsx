import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
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
  Grid,
} from '@mui/material';
import Box from '@mui/system/Box';
import UsoInternoDGEC from '../usointdgec/UsoInternoDGEC';
import UsointernoDireccionEstudios from '../usointdireccionestudios/UsoInternoDireccionEstudios';
import dayjs from 'dayjs';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { save_form } from '../../utils/formulario';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { esES } from '@mui/x-date-pickers/locales';
import { mainListRegistro } from './makeData';

/*
//CARO
0°   let { id } = useParams();
1° creo documentoForm, poner todas las variables
2° creo el useEffect(()  -> dentro tiene el cargarDataDocumento
3° creo el cargarDataDocumento -> dentro tiene el getData
4° creo el getData -> dentro tiene todos los setAlgo
4.1° el getData debe tener todos los select que usa las variables
4.2 el tipo de variable depende de la bbdd



*/
let documentoForm = {
  id: null,
  nivelProgramaAcademicoSeleccionado: null,
  tipoProgramaAcademicoSeleccionado: null,
};
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

  // Obtener la fecha actual
  const fechaActual = dayjs();
  //Estado para fechas
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs(fechaActual));

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
  const handleGuardarDireccionEstudios = async () => { };

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

  //Maneja el clic en el botón 'Guardar sin enviar'
  const handleGuardarClick = async () => {
    try {


      const objetoFormularioDocumento = {
        programa_nivel: nivelProgramaAcademicoSeleccionado,
        programa_tipo: tipoProgramaAcademicoSeleccionado,
        programa_nombre: nombrePrograma,
        programa_director: directorPrograma,
        departamento: departamento,
        emplazamiento: emplazamiento,
        ...jornadaOptions,
        ...modalidadOptions,
        duracion_fecha_inicio: format(
          new Date(duracionFechaInicio?.toString() ?? ''),
          'dd-MM-yyyy'
        ),
        duracion_fecha_termino: format(
          new Date(duracionFechaTermino ?? ''),
          'dd-MM-yyyy'
        ),
        programa_duracion: duracionPrograma,
        programa_numero: numeroPrograma,
        convocatoria_fecha_inicio: format(
          new Date(convocatoriaFInicio?.toString() ?? ''),
          'dd-MM-yyyy'
        ),
        convocatoria_fecha_termino: format(
          new Date(convocatoriaFTermino ?? ''),
          'dd-MM-yyyy'
        ),
      };
      console.log(JSON.stringify(objetoFormularioDocumento));
      save_form(objetoFormularioDocumento);
      console.log('Formulario guardado');
      //Lógica para el error al guardar formulario
    } catch (error: any) {
      console.error('Error al guardar el formulario', error.message || error);
    }
  };

  const [nivelProgramaAcademicoSeleccionado, setValorSeleccionado] =
    useState('');
  const handleNivelProgramaAcademicoChange = (event: any) => {
    setValorSeleccionado(event.target.value); // Actualizar el estado con el valor seleccionado
  };
  const [
    tipoProgramaAcademicoSeleccionado,
    settipoProgramaAcademicoSeleccionado,
  ] = useState('');
  const handletipoProgramaAcademicoChange = (event: any) => {
    settipoProgramaAcademicoSeleccionado(event.target.value); // Actualizar el estado con el valor seleccionado
  };

  const [nombrePrograma, setNombrePrograma] = useState(''); // Estado local para el nombre del programa
  const handleProgramaSeleccionadoChange = (event) => {
    const programaSeleccionado = event.target.value;

    // Encuentra el objeto programa que coincide con el valor seleccionado
    const programaElegido = programas.find(
      (programa) => programa.nombre === programaSeleccionado
    );

    // Actualiza el estado nombrePrograma con el nombre del programa seleccionado
    setNombrePrograma(programaElegido ? programaElegido.nombre : '');
  };

  const [directorPrograma, setDirectorPrograma] = useState(''); // Estado local para el director del programa
  const handleDirectorProgramaChange = (event: any) => {
    setDirectorPrograma(event.target.value); // Actualizar el estado con el valor del director del programa
  };
  const [departamento, setDepartamento] = useState(''); // Estado local para el departamento seleccionado

  const handleDepartamentoChange = (event: any) => {
    setDepartamento(event.target.value); // Actualizar el estado con el valor del departamento seleccionado
  };
  const [emplazamiento, setEmplazamiento] = useState(''); // Estado local para el emplazamiento seleccionado

  const handleEmplazamientoChange = (event: any) => {
    setEmplazamiento(event.target.value); // Actualizar el estado con el valor del emplazamiento seleccionado

    const [selectedOptions, setSelectedOptions] = useState({
      Diurna: false,
      Vespertina: false,
      ADistancia: false,
      Otra: false,
    });

    const handleCheckboxChange = (event: any) => {
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
    Adistancia: false,
  });

  const handleCheckboxChange = (event: any) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const [modalidadOptions, setSelectedModalidadOptions] = useState({
    presencial: false,
    online: false,
    hibrida: false,
    otra: false,
    aDistancia: false,
  });

  const modalidadHandleCheckboxChange = (event: any) => {
    setSelectedModalidadOptions({
      ...modalidadOptions,
      [event.target.name]: event.target.checked,
    });
  };
  const [jornadaOptions, setSelectedJornadaOptions] = useState({
    diurna: false,
    vespertina: false,
    aDistancia: false,
    otra: false,
  });

  const jornadaHandleCheckboxChange = (event: any) => {
    setSelectedJornadaOptions({
      ...jornadaOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const [startDate, setStartDate] = useState(dayjs(fechaActual));
  const [endDate, setEndDate] = useState(null);

  const [duracionFechaInicio, setduracionFechaInicio] =
    React.useState<Dayjs | null>(dayjs('2022-04-17'));

  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const [duracionFechaTermino, setduracionFechaTermino] =
    React.useState<Date | null>(null);

  const [duracionPrograma, setDuracionPrograma] = useState(''); // Estado local para el nombre del programa
  const handleDuracionProgramaChange = (event: any) => {
    setDuracionPrograma(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [numeroPrograma, setNumeroPrograma] = useState(''); // Estado local para el nombre del programa
  const handleNumeroProgramaChange = (event: any) => {
    setNumeroPrograma(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const [convocatoriaFechaInicio, setconvocatoriaFechaInicio] =
    useState<dayjs.Dayjs | null>(dayjs(fechaActual));

  const [convocatoriaFInicio, setconvocatoriaFInicio] =
    React.useState<dayjs.Dayjs | null>(dayjs(fechaActual));

  const [convocatoriaFechaFinalizacion, setconvocatoriaFechaFinalizacion] =
    useState<dayjs.Dayjs | null>(dayjs(fechaActual));
  const [convocatoriaFTermino, setconvocatoriaFFinalizacion] =
    React.useState<Date | null>(null);

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
      <Box sx={{ width: 'calc(100% - 8px)', mr: 2 }}>
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

        {/* Nombre y director del programa: ARREGLAR ESTA SECCION NO ELIGE */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <FormControl fullWidth>
            <Select
              labelId="programa-academico-label"
              id="programa-academico"
              value={handleProgramaSeleccionadoChange}
              onChange={handleProgramaSeleccionadoChange}
            >
              {mainListRegistro.map((programa) => (
                <MenuItem
                  key={programa.Program_Id}
                  value={programa.ProgramName}
                >
                  {programa.ProgramName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ width: 'calc(100% - 8px)', mr: 2 }}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>


          <Grid container spacing={0} sx={{ width: 'calc(100% - 8px)', pl: 10 }} >
            {/* SideBar */}
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">Jornada</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.diurna}
                        onChange={jornadaHandleCheckboxChange}
                        name="diurna"
                      />
                    }
                    label="Diurna"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.vespertina}
                        onChange={jornadaHandleCheckboxChange}
                        name="vespertina"
                      />
                    }
                    label="Vespertina"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.aDistancia}
                        onChange={jornadaHandleCheckboxChange}
                        name="aDistancia"
                      />
                    }
                    label="A Distancia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.otra}
                        onChange={jornadaHandleCheckboxChange}
                        name="otra"
                      />
                    }
                    label="Otra"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

          </Grid>
          <Divider
            component="div"
            variant="fullWidth"
            role="presentation"
            style={{ marginInline: '10px', border: '0.5px solid #808080' }}
          />
          <Grid container spacing={0} sx={{ width: 'calc(100% - 8px)', pl: 10 }} >
            {/* SideBar */}
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">Jornada</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.diurna}
                        onChange={jornadaHandleCheckboxChange}
                        name="diurna"
                      />
                    }
                    label="Diurna"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.vespertina}
                        onChange={jornadaHandleCheckboxChange}
                        name="vespertina"
                      />
                    }
                    label="Vespertina"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.aDistancia}
                        onChange={jornadaHandleCheckboxChange}
                        name="aDistancia"
                      />
                    }
                    label="A Distancia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jornadaOptions.otra}
                        onChange={jornadaHandleCheckboxChange}
                        name="otra"
                      />
                    }
                    label="Otra"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

          </Grid>
        </Box>

        {/* Jornada y Modalidad */}

      </Box>
      {/* Sección: Duración */}
      <Box sx={{ width: 'calc(100% - 8px)', mr: 2 }}>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          Duración
        </Typography>
        <hr />

        {/* Fechas de inicio y término */}
        <LocalizationProvider dateAdapter={AdapterDayjs}
          localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>

            <DatePicker
              format="DD-MM-YYYY"
              sx={{ width: 'calc(100% - 8px)', mr: 2 }}
              label="Fecha Inicio"
              defaultValue={dayjs()}
              value={duracionFechaInicio}
              onChange={(newValue) => {
                setduracionFechaInicio(newValue);
              }}

            />
            <DatePicker
              format="DD-MM-YYYY"
              sx={{ width: 'calc(100% - 8px)', mr: 2 }}
              label="Fecha Termino"
              value={duracionFechaTermino}
              onChange={(newValue) => {
                setduracionFechaTermino(newValue);
              }}

            />
          </Box>
        </LocalizationProvider>


        {/* Duración del programa y Número de versión */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <TextField
            sx={{ width: 'calc(100% - 8px)', mr: 2 }}
            id="regcur_durprog"
            label="Duración del programa (horas) *"
            variant="outlined"
            type="number" // Establece el tipo de entrada como número
            InputProps={{
              inputProps: {
                min: 1, // Establece un valor mínimo, si es necesario
              },
            }}
            value={duracionPrograma}
            onChange={handleDuracionProgramaChange}
          />
          <TextField
            sx={{ width: 'calc(100% - 8px)', mr: 2 }}
            fullWidth
            id="regcur_verprog"
            label="Número de versión del programa *"
            variant="outlined"
            value={numeroPrograma}
            onChange={handleNumeroProgramaChange}
          />
        </Box>
      </Box>

      {/*Sección Fecha Convocatoria*/}
      <Box sx={{ width: 'calc(100% - 8px)', mr: 2 }}>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          Fecha Convocatoria
        </Typography>
        <hr />

        {/* Fechas de inicio y término */}
        <LocalizationProvider dateAdapter={AdapterDayjs}
          localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} >

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <DatePicker
              format="DD-MM-YYYY"
              label="Fecha de Inicio"
              defaultValue={dayjs()}
              sx={{ width: 'calc(100% - 8px)', mr: 2 }}
              value={convocatoriaFechaInicio}
              onChange={(newValue) => {
                setconvocatoriaFInicio(newValue);
              }}

            />
            <DatePicker
              format="DD-MM-YYYY"
              label="Fecha de Finalización"
              sx={{ width: 'calc(100% - 8px)', mr: 2 }}
              value={convocatoriaFechaFinalizacion}
              onChange={(newValue) => {
                setconvocatoriaFInicio(newValue);
              }}

            />
          </Box>
        </LocalizationProvider>
      </Box>

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

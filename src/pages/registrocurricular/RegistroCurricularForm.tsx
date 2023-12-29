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
import { get_object_localstore, save_form } from '../../utils/formulario';
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
let documentoForm: any;
// let documentoForm = {
//   id: null,
//   nivelProgramaAcademicoSeleccionado: null,
//   tipoProgramaAcademicoSeleccionado: null,
//   programaSeleccionado:null,
//   programa_tipo:null,
// };
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

    const cargarProgramas = async () => {
      //Leo la "variable local" formulario (se modifica al momento de dar "Guardar sin enviar") -> 3ra Linea hacia abajo
      //ASigno el valor de la "variable local" a documentoForm-> 4ra linea hacia abajo
      //Leo documentoForm y asigno valor a la variable "programa_value"-> 4 linea hacia abajo
      const objetoDesdeSesion = get_object_localstore();
      if (objetoDesdeSesion && objetoDesdeSesion?.id !== null) {
        documentoForm = objetoDesdeSesion;
        console.log(documentoForm);
        handlePrograma_value(documentoForm?.programaSeleccionado);
        handleNivelProgramaAcademicoOncharge(documentoForm?.programa_nivel);
        handletipoProgramaAcademicoOncharge(documentoForm?.programa_tipo);
        handleDepartamentoOnChange(documentoForm?.departamento_int);
        handleEmplazamientoOnChange(documentoForm?.emplazamiento_int);
        jornadaHandleCheckboxOnChange(documentoForm);
        modalidadHandleCheckboxOnChange(documentoForm);
        if (documentoForm.duracion_fecha_inicio)
          setduracionFechaInicio(
            dayjs(documentoForm.duracion_fecha_inicio, 'DD-MM-YYYY')
          );
        if (documentoForm.duracion_fecha_termino)
          setduracionFechaTermino(
            dayjs(documentoForm.duracion_fecha_termino, 'DD-MM-YYYY')
          );
        if (documentoForm.convocatoria_fecha_inicio)
          setconvocatoriaFInicio(
            dayjs(documentoForm.convocatoria_fecha_inicio, 'DD-MM-YYYY')
          );
        if (documentoForm.convocatoria_fecha_termino)
          setconvocatoriaFTermino(
            dayjs(documentoForm.convocatoria_fecha_termino, 'DD-MM-YYYY')
          );
        setDirectorPrograma(documentoForm?.programa_director ?? '');

        setDuracionPrograma(documentoForm?.programa_duracion ?? '0');
        setNumeroPrograma(documentoForm?.programa_numero ?? '');
        setNumeroPrograma(documentoForm?.programa_numero ?? '');
      }
    };
    cargarProgramas();
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

  //Maneja el clic en el botón 'Guardar sin enviar'
  const handleGuardarClick = async () => {
    try {
      console.log(duracionFechaInicio);
      console.log(duracionFechaTermino);
      console.log(convocatoriaFInicio);
      console.log(convocatoriaFTermino);
      const objetoFormularioDocumento = {
        programa_nivel: nivelProgramaAcademicoSeleccionado,
        programa_tipo: tipoProgramaAcademicoSeleccionado,
        programa_nombre: nombrePrograma,
        programa_director: directorPrograma,
        otrosNombres: setOtrosNombres,
        departamento_int: departamento,
        emplazamiento_int: emplazamiento,
        ...jornadaOptions,
        ...modalidadOptions,
        duracion_fecha_inicio: format(
          new Date(duracionFechaInicio?.toString() ?? ''),
          'dd-MM-yyyy'
        ),
        duracion_fecha_termino: format(
          new Date(duracionFechaTermino?.toString() ?? ''),
          'dd-MM-yyyy'
        ),
        programa_duracion: duracionPrograma,
        programa_numero: numeroPrograma,
        convocatoria_fecha_inicio: format(
          new Date(convocatoriaFInicio?.toString() ?? ''),
          'dd-MM-yyyy'
        ),
        convocatoria_fecha_termino: format(
          new Date(convocatoriaFTermino?.toString() ?? ''),
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
  const handleNivelProgramaAcademicoOncharge = (event: any) => {
    setValorSeleccionado(event); // Actualizar el estado con el valor seleccionado
  };

  const [touchedDatePicker, setTouchedDatePicker] = useState(false);

  const [
    tipoProgramaAcademicoSeleccionado,
    settipoProgramaAcademicoSeleccionado,
  ] = useState('');
  const handletipoProgramaAcademicoChange = (event: any) => {
    settipoProgramaAcademicoSeleccionado(event.target.value); // Actualizar el estado con el valor seleccionado
  };
  const handletipoProgramaAcademicoOncharge = (event: any) => {
    settipoProgramaAcademicoSeleccionado(event); // Actualizar el estado con el valor seleccionado
  };

  const [programa_value, setprograma_value] = useState('');
  const handlePrograma_value = (event: any) => {
    setprograma_value(event); // Actualizar el estado con el valor del director del programa
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
  const [otrosNombres, setOtrosNombres] = useState(['']);

  const handleDirectorProgramaChange = (event: any) => {
    setDirectorPrograma(event.target.value); // Actualizar el estado con el valor del director del programa
  };

  const handleOtrosNombresChange = (index, value) => {
    const nuevosNombres = [...otrosNombres];
    nuevosNombres[index] = value;
    setOtrosNombres(nuevosNombres);
  };

  const agregarNombre = () => {
    setOtrosNombres([...otrosNombres, '']);
  };
  const [departamento, setDepartamento] = useState(''); // Estado local para el departamento seleccionado

  const handleDepartamentoChange = (event: any) => {
    setDepartamento(event.target.value); // Actualizar el estado con el valor del departamento seleccionado
  };
  const handleDepartamentoOnChange = (event: any) => {
    setDepartamento(event); // Actualizar el estado con el valor del departamento seleccionado
  };

  const [emplazamiento, setEmplazamiento] = useState(''); // Estado local para el emplazamiento seleccionado

  const handleEmplazamientoChange = (event: any) => {
    setEmplazamiento(event.target.value); // Actualizar el estado con el valor del emplazamiento seleccionado
  };
  const handleEmplazamientoOnChange = (event: any) => {
    setEmplazamiento(event); // Actualizar el estado con el valor del emplazamiento seleccionado
  };

  // const [selectedOptions, setSelectedOptions] = useState({
  //   Diurna: false,
  //   Vespertina: false,
  //   ADistancia: false,
  //   Otra: false,
  // });

  // const handleCheckboxChange = (event: any) => {
  //   setSelectedOptions({
  //     ...selectedOptions,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  // const [selectedOptions, setSelectedOptions] = useState({
  //   Presencial: false,
  //   Online: false,
  //   Hibrida: false,
  //   Otra: false,
  //   Adistancia: false,
  // });

  // const handleCheckboxChange = (event: any) => {
  //   setSelectedOptions({
  //     ...selectedOptions,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const [modalidadOptions, setSelectedModalidadOptions] = useState({
    modalidad_presencial: false,
    modalidad_online: false,
    modalidad_hibrida: false,
    modalidad_otra: false,
  });

  const modalidadHandleCheckboxChange = (event: any) => {
    setSelectedModalidadOptions({
      ...modalidadOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const modalidadHandleCheckboxOnChange = (event: any) => {
    console.log('modalidadHandleCheckboxOnChange');
    modalidadHandleCheckboxChange({
      target: {
        name: 'modalidad_presencial',
        checked: documentoForm?.modalidad_presencial ?? false,
      },
    });
    modalidadHandleCheckboxChange({
      target: {
        name: 'modalidad_online',
        checked: documentoForm?.modalidad_online ?? false,
      },
    });
    modalidadHandleCheckboxChange({
      target: {
        name: 'modalidad_hibrida',
        checked: documentoForm?.modalidad_hibrida ?? false,
      },
    });
    modalidadHandleCheckboxChange({
      target: {
        name: 'modalidad_otra',
        checked: documentoForm?.modalidad_otra ?? false,
      },
    });
  };

  const [jornadaOptions, setSelectedJornadaOptions] = useState({
    jornada_diurna: false,
    jornada_vespertina: false,
    jornada_aDistancia: false,
    jornada_otra: false,
  });

  const jornadaHandleCheckboxChange = (event: any) => {
    setSelectedJornadaOptions({
      ...jornadaOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const jornadaHandleCheckboxOnChange = (event: any) => {
    jornadaHandleCheckboxChange({
      target: {
        name: 'jornada_diurna',
        checked: documentoForm?.jornada_diurna ?? false,
      },
    });
    jornadaHandleCheckboxChange({
      target: {
        name: 'jornada_vespertina',
        checked: documentoForm?.jornada_vespertina ?? false,
      },
    });
    jornadaHandleCheckboxChange({
      target: {
        name: 'jornada_aDistancia',
        checked: documentoForm?.jornada_aDistancia ?? false,
      },
    });
    jornadaHandleCheckboxChange({
      target: {
        name: 'jornada_otra',
        checked: documentoForm?.jornada_otra ?? false,
      },
    });
  };

  const [startDate, setStartDate] = useState(dayjs(fechaActual));
  const [endDate, setEndDate] = useState(null);

  const [errorMensaje, setErrorMensaje] = useState('');

  const [duracionFechaInicio, setduracionFechaInicio] =
    React.useState<Dayjs | null>(dayjs());

  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const [duracionFechaTermino, setduracionFechaTermino] =
    React.useState<Dayjs | null>(dayjs());

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
    React.useState<dayjs.Dayjs | null>(dayjs());
  const [convocatoriaFTermino, setconvocatoriaFTermino] =
    React.useState<dayjs.Dayjs | null>(dayjs());

  const [convocatoriaFechaFinalizacion, setconvocatoriaFechaFinalizacion] =
    useState<dayjs.Dayjs | null>(dayjs(fechaActual));
  // const [convocatoriaFTermino, setconvocatoriaFFinalizacion] =
  //   React.useState<Date | null>(null);

  return (
    <>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              sx={{ width: 'calc(100% - 8px)' }}
              id="regcur_dirprog"
              label="Programa Academico"
              variant="outlined"
              value={programa_value}
              onChange={(e) => setprograma_value(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              sx={{ width: 'calc(100% - 8px)' }}
              id="regcur_dirprog"
              label="Director del Programa *"
              variant="outlined"
              value={directorPrograma}
              onChange={handleDirectorProgramaChange}
            />
          </FormControl>

          {/* Sección para otros nombres y apellidos */}
          {otrosNombres.map((nombre, index) => (
            <FormControl fullWidth key={index} sx={{ mb: 2 }}>
              <TextField
                sx={{ width: 'calc(100% - 8px)', mr: 15 }}
                id={`otro_nombre_${index}`}
                label={'Otro Director Programa'}
                variant="outlined"
                value={nombre}
                onChange={(e) =>
                  handleOtrosNombresChange(index, e.target.value)
                }
              />
            </FormControl>
          ))}

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
            <Grid
              container
              spacing={0}
              sx={{ width: 'calc(100% - 8px)', pl: 10 }}
            >
              {/* SideBar */}
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1">Jornada</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jornadaOptions.jornada_diurna}
                          onChange={jornadaHandleCheckboxChange}
                          name="jornada_diurna"
                        />
                      }
                      label="Diurna"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jornadaOptions.jornada_vespertina}
                          onChange={jornadaHandleCheckboxChange}
                          name="jornada_vespertina"
                        />
                      }
                      label="Vespertina"
                    />{' '}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jornadaOptions.jornada_aDistancia}
                          onChange={jornadaHandleCheckboxChange}
                          name="jornada_aDistancia"
                        />
                      }
                      label="A Distancia"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jornadaOptions.jornada_otra}
                          onChange={jornadaHandleCheckboxChange}
                          name="jornada_otra"
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
            <Grid
              container
              spacing={0}
              sx={{ width: 'calc(100% - 8px)', pl: 10 }}
            >
              {/* SideBar */}
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1">Modalidad</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modalidadOptions.modalidad_presencial}
                          onChange={modalidadHandleCheckboxChange}
                          name="modalidad_presencial"
                        />
                      }
                      label="Presencial"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modalidadOptions.modalidad_online}
                          onChange={modalidadHandleCheckboxChange}
                          name="modalidad_online"
                        />
                      }
                      label="Online"
                    />{' '}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modalidadOptions.modalidad_hibrida}
                          onChange={modalidadHandleCheckboxChange}
                          name="modalidad_hibrida"
                        />
                      }
                      label="Hibrida"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modalidadOptions.modalidad_otra}
                          onChange={modalidadHandleCheckboxChange}
                          name="modalidad_otra"
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
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              esES.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
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
                  // Marcar el selector de fecha como tocado
                  setTouchedDatePicker(true);
                  // Validar que la nueva fecha no sea menor que la Fecha de Inicio
                  if (
                    newValue.isAfter(duracionFechaInicio) ||
                    newValue.isSame(duracionFechaInicio)
                  ) {
                    setduracionFechaTermino(newValue);
                    setErrorMensaje(''); // Limpiar el mensaje de error si la fecha es válida
                  } else {
                    // Configurar el mensaje de error
                    setErrorMensaje(
                      'La fecha de finalización no puede ser menor que la fecha de inicio.'
                    );
                  }
                }}
              />

              {touchedDatePicker && errorMensaje && (
                <div
                  style={{ color: 'red', fontSize: 'small', marginTop: '4px' }}
                >
                  {errorMensaje}
                </div>
              )}
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
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              esES.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
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
                sx={{ width: 'calc(100% - 8px)', mr: 2 }}
                label="Fecha de Finalización"
                value={convocatoriaFTermino}
                onChange={(newValue) => {
                  // Marcar el selector de fecha como tocado
                  setTouchedDatePicker(true);
                  // Validar que la nueva fecha no sea menor que la Fecha de Inicio
                  if (
                    newValue.isAfter(convocatoriaFechaInicio) ||
                    newValue.isSame(convocatoriaFechaInicio)
                  ) {
                    setconvocatoriaFTermino(newValue);
                    setErrorMensaje(''); // Limpiar el mensaje de error si la fecha es válida
                  } else {
                    // Configurar el mensaje de error
                    setErrorMensaje(
                      'La fecha de finalización no puede ser menor que la fecha de inicio.'
                    );
                  }
                }}
              />

              {touchedDatePicker && errorMensaje && (
                <div
                  style={{ color: 'red', fontSize: 'small', marginTop: '4px' }}
                >
                  {errorMensaje}
                </div>
              )}
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
    </>
  );
};

export default RegistroCurricularForm;

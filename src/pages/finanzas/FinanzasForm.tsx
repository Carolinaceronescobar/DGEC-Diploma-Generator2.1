import React, { useState,useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControl,
  MenuItem,
  FormControlLabel,
  Button,
  Box,
  Grid,
  InputLabel,
  Select,
  Paper,
} from '@mui/material';
import UsoInternoFinanzas from '../usointfinanzas/UsoInternoFinanzasForm';
import { save_form,get_object_localstore } from '../../utils/formulario';
// Definir un tipo para las claves posibles en fin_valordescprog
type ValordescprogKey =
  | 'fin_valordescprog_asd'
  | 'fin_valordescprog_2'
  | 'fin_valordescprog_3'
  | 'fin_valordescprog_4'
  | 'fin_valordescprog_5'
  | 'fin_valordescprog_6';

// Definir un tipo para fin_valordescprog
type FinValordescprog = {
  [K in ValordescprogKey]: { checked: boolean; porcentaje: number };
};

// Definición del componente principal FinanzasForm
const FinanzasForm: React.FC = () => {
  // Estado para controlar si el formulario principal está completo
  const [formularioPrincipalCompleto, setFormularioPrincipalCompleto] =
    useState<boolean>(false);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    // Utilizar el tipo definido para fin_valordescprog
    fin_valordescprog: {
      fin_valordescprog_asd: { checked: false, porcentaje: 0 },
      fin_valordescprog_2: { checked: false, porcentaje: 0 },
      fin_valordescprog_3: { checked: false, porcentaje: 0 },
      fin_valordescprog_4: { checked: false, porcentaje: 0 },
      fin_valordescprog_5: { checked: false, porcentaje: 0 },
      fin_valordescprog_6: { checked: false, porcentaje: 0 },
    } as FinValordescprog,
    fin_valordescprog_otro: '', // Campo para descuentos "Otro"
    fin_modpagoprog: '', // Modalidad de Pago del programa
    fin_modpagocuotas: '', // Cuotas de pago
    fin_modpagootros: '', // Otros detalles de la modalidad de pago
    fin_modpagomedios: [] as string[], // Medios de pago seleccionados

    // Campos adicionales para descuentos específicos
    exAlumnosUSM: false,
    exAlumnosUSMText: '',
    mujeres: false,
    mujeresText: '',
    funcionariosUSM: false,
    funcionariosUSMText: '',
    funcionariosServiciosPublicos: false,
    funcionariosServiciosPublicosText: '',
    matriculaAnticipada: false,
    matriculaAnticipadaText: '',
    otros: false,
    otrosText: '',
    otrosDesc: '',
  });

  // Manejador para cambios en los campos de entrada
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Funciones para guardar y enviar datos
  const handleGuardarFinanzas = (): void => {
    // Implementa la lógica para guardar los datos
    console.log('Guardar datos:', formData);
  };

  const handleEnviarFinanzas = (): void => {
    // Implementa la lógica para enviar los datos al servidor
    console.log('Enviar datos:', formData);
  };

  // Manejador para cambios en checkboxes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // Actualiza el estado formData con el nuevo valor del checkbox
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    // Actualiza el estado formData con el nuevo valor del checkbox
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: event.target.value,
    }));
  };

  // Manejador para cambios en porcentaje
  const handlePorcentajeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    // Asegúrate de que name sea una de las claves válidas de fin_valordescprog
    if (!(name in formData.fin_valordescprog)) {
      console.error(`Clave no válida en fin_valordescprog: ${name}`);
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Manejador para cambios en checkboxes de medios de pago
  const handleCheckboxMediosChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    // Actualiza el estado formData con los nuevos medios de pago seleccionados
    setFormData((prevFormData) => ({
      ...prevFormData,
      fin_modpagomedios: checked
        ? [...prevFormData.fin_modpagomedios, name]
        : prevFormData.fin_modpagomedios.filter((medio) => medio !== name),
    }));
  };

  // Manejador para enviar el formulario
  const handleSubmit = async () => {
    try {
      // Muestra los datos a enviar en la consola
      console.log('Datos a enviar:', formData);
      // Agrega aquí cualquier lógica adicional para enviar la información al servidor
    } catch (error: any) {
      // Maneja errores si hay algún problema al enviar el formulario
      console.error('Error al enviar el formulario:', error.message || error);
    }
  };

  // Maneja el clic en el botón "Guardar sin enviar".
  const handleGuardarClick = async () => {
    try {
      let formularioObjeto = {
        arancel: arancel,
        modalidad_pago: modalidadPago,
        ...formData,
      };
      save_form(formularioObjeto);
      // Realiza una solicitud POST a un endpoint de tu servidor con los datos del formulario.

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
  const opciones_pago_obj = [
    { id: 1, name: 'Tarjeta de Crédito' },
    { id: 2, name: 'Tarjeta de Débito' },
    { id: 3, name: 'Transferencia' },
  ];
  const opciones_pago = [
    'Tarjeta de Crédito',
    'Tarjeta de Débito',
    'Transferencia',
  ];
  const [modalidadPago, setModalidadPago] = useState([]);

  const selectModalidadPagohandleChange = (event) => {
    setModalidadPago(event.target.value);
  };
  const [arancel, setHandleArancelChange] = useState(''); // Estado local para el nombre del programa
  const handlestaffArancelChange = (event) => {
    setHandleArancelChange(event.target.value); // Actualizar el estado con el valor del nombre del programa
  };

  const requisitosPostulanteHandleCheckboxChange = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  const requisitosPostulanteHandleCheckboxChangeText = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSetOtros = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      otros: value,
    }));
  };

  const requisitosPostulanteHandleCheckboxOnChange = (documentoForm:any) => {
    console.log(documentoForm?.mujeres)
    console.log('documentoForm?.mujeres')

    handleSetOtros(true);

    // requisitosPostulanteHandleCheckboxChange({
    //   target: {
    //     name: "mujeres",
    //     checked: documentoForm?.mujeres ?? false,
    //   },
    // });
    requisitosPostulanteHandleCheckboxChangeText({
      target: {
        name: "mujeresText",
        checked: documentoForm?.mujeresText ?? 0,
      },
    });
    requisitosPostulanteHandleCheckboxChange({
      target: {
        name: "funcionariosUSM",
        checked: documentoForm?.funcionariosUSM ?? false,
      },
    });
    requisitosPostulanteHandleCheckboxChange({
      target: {
        name: "funcionariosUSMText",
        checked: documentoForm?.funcionariosUSMText ?? 0,
      },
    });
    
  };





  useEffect(() => {
  
    const cargarProgramas = async () => {
      //Leo la "variable local" formulario (se modifica al momento de dar "Guardar sin enviar") -> 3ra Linea hacia abajo
      //ASigno el valor de la "variable local" a documentoForm-> 4ra linea hacia abajo
      //Leo documentoForm y asigno valor a la variable "programa_value"-> 4 linea hacia abajo
      const objetoDesdeSesion = get_object_localstore();
      if (objetoDesdeSesion && objetoDesdeSesion?.id !== null) {
        let documentoForm = objetoDesdeSesion;
        if (documentoForm ){
          console.log(documentoForm)
          setHandleArancelChange(documentoForm?.arancel??"");
          requisitosPostulanteHandleCheckboxOnChange(documentoForm)
        }
      }
    };
    cargarProgramas();
  }, []);

  // Renderizado del componente
  return (
    <Container>
      <Typography
        variant="h5"
        className="display-4 text-center mt-4 mb-5"
        sx={{ marginTop: 5, marginBottom: 2, fontWeight: 'bold' }}
      >
        Información relevante para Finanzas
      </Typography>

      <Box>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          {' '}
          Valorización
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id="regcur_durprog"
            label="Valor de Arancel del programa *"
            variant="outlined"
            value={arancel}
            onChange={handlestaffArancelChange}
          />
        </Grid>
        <Grid item xs={5}>
          <FormControl>
            <InputLabel id="modalidad-pago-label">Modalidad de Pago</InputLabel>
            <Select
              labelId="modalidad-pago-label"
              id="regcur_sedeprog"
              label="Modalidad de Pago"
              sx={{ width: 300 }}
              multiple
              value={modalidadPago}
              onChange={selectModalidadPagohandleChange}
            >
              {/* Opciones de modalidad de pago */}
              {opciones_pago.map((opcion) => (
                <MenuItem key={opcion} value={opcion}>
                  {opcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Nuevo bloque de campos */}
      <div
        className="form-group  col-md-6"
        style={{ margin: '25px 0', fontWeight: 'bold' }}
      >
        <label htmlFor="fin_valordescprog" className="form-label">
          Descuentos que ofrece el programa (tipo y porcentaje asociado)
        </label>

        <div className="form-row"></div>
        {/* Checkbox y campo de texto para Ex alumnos USM */}
        <Grid container spacing={2}>
          {/* primera row */}
          <Grid item md={6} style={{ marginTop: '10px' }}>
            <div className="form-check col-md-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.exAlumnosUSM}
                    onChange={handleCheckboxChange}
                    name="exAlumnosUSM"
                  />
                }
                label="Ex alumnos USM"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.exAlumnosUSM ? (
              <TextField
                type="number"
                className="form-control"
                name="exAlumnosUSMText"
                id="exAlumnosUSM"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.exAlumnosUSMText  }
                onChange={handleFormChange}
              />
            ) : (
              <>&nbsp;</>
            )}
          </Grid>
          {/* sgundo row */}
          <Grid item md={6} style={{ paddingTop: '10px' }}>
            {/* Checkbox y campo de texto para Mujeres */}
            <div className="form-check col-md-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.mujeres}
                    onChange={handleCheckboxChange}
                    name="mujeres"
                  />
                }
                label="Mujeres"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.mujeres ? (
              <TextField
                type="number"
                className="form-control"
                name="mujeresText"
                id="mujeres"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.mujeresText  }
                onChange={handleFormChange}
              />
            ) : (
              <>&nbsp;</>
            )}
          </Grid>

          {/* Tercer row */}
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {/* Checkbox y campo de texto para Funcionarios USM */}
            <div className="form-check col-md-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.funcionariosUSM}
                    onChange={handleCheckboxChange}
                    name="funcionariosUSM"
                  />
                }
                label="Funcionarios USM"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.funcionariosUSM ? (
              <TextField
                type="number"
                className="form-control"
                name="funcionariosUSMText"
                id="funcionariosUSM"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.funcionariosUSMText  }
                onChange={handleFormChange}
              />
            ) : (
              <>&nbsp;</>
            )}
          </Grid>

          {/* cuarto row */}

          <Grid item md={6} style={{ marginTop: '10px' }}>
            {/* Checkbox y campo de texto para Funcionarios de servicios públicos */}
            <div className="form-check col-md-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.funcionariosServiciosPublicos}
                    onChange={handleCheckboxChange}
                    name="funcionariosServiciosPublicos"
                  />
                }
                label="Funcionarios Servicios Publicos"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.funcionariosServiciosPublicos ? (
              <TextField
                type="number"
                className="form-control"
                name="funcionariosServiciosPublicosText"
                id="funcionariosServiciosPublicos"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.funcionariosServiciosPublicosText  }
                onChange={handleFormChange}
              />
            ) : (
              <>&nbsp;</>
            )}
          </Grid>

          {/* quinto row */}

          <Grid item md={6} style={{ marginTop: '10px' }}>
            {/* Checkbox y campo de texto para Matrícula anticipada */}
            <div className="form-check col-md-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.matriculaAnticipada}
                    onChange={handleCheckboxChange}
                    name="matriculaAnticipada"
                  />
                }
                label="Matricula anticipada"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px', maxHeight: '5px' }}>
            {formData.matriculaAnticipada ? (
              <TextField
                style={{ maxHeight: '5px' }}
                type="number"
                className="form-control"
                name="matriculaAnticipadaText"
                id="matriculaAnticipada"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.matriculaAnticipadaText  }
                onChange={handleFormChange}
              />
            ) : (
              <>&nbsp;</>
            )}
          </Grid>

          {/* Sexto row */}
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {/* Checkbox y campo de texto para Otro */}
            <div className="form-check col-md-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.otros}
                    onChange={handleCheckboxChange}
                    name="otros"
                  />
                }
                label="Otro"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.otros && (
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    type="text"
                    className="form-control"
                    name="otrosDesc"
                    id="otrosText"
                    label="Otro descuento"
                    value={formData.otrosDesc  }
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    type="number"
                    className="form-control"
                    name="otrosText"
                    id="otrosPorcentaje"
                    label="Porcentaje"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={formData.otrosText  }
                    onChange={handleFormChange}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid item md={6} style={{ marginTop: '2vh' }}></Grid>
          <Grid item md={6} style={{ marginTop: '2vh' }}></Grid>
        </Grid>
      </div>

      {/* Botón para guardar sin enviar */}
      {/* <div className="row mb-10">
        <div className="col-12">
          <Button
            variant="outlined"
            color="secondary"
            className="float-left"
            onClick={handleSubmit}
          >
            Guardar sin enviar
          </Button>
        </div>
      </div> */}
      {/* Campos adicionales fuera del bloque anterior */}

      {/* Uso interno Finanzas */}
      {/* <Typography variant="h4" align="center" mt={4} mb={5}  >
        Uso Interno Finanzas
      </Typography> */}
      {/* <UsoInternoFinanzas
        campos={formData}
        setCampos={setFormData}
        readOnly={!formularioPrincipalCompleto}
        onGuardar={handleGuardarFinanzas}
        onEnviar={handleEnviarFinanzas}
      /> */}

      {/* Resumen de Respuestas */}
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h6" gutterBottom>
          Resumen de Respuestas
        </Typography>

        {/* Aquí puedes agregar más elementos Typography o cualquier otro componente
        para mostrar un resumen de las respuestas dadas en el formulario */}
        <Typography>
          Ex alumnos USM: {formData.exAlumnosUSM ? 'Sí' : 'No'}
          {formData.exAlumnosUSM &&
            `, Porcentaje: ${formData.exAlumnosUSMText}%`}
        </Typography>

        {/* Repite el patrón para otros campos del formulario */}
        {/* ... */}
      </Paper>

      {/* Botón adicional para guardar sin enviar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          className="float-left"
          onClick={handleGuardarClick}
        >
          Guardar sin enviar
        </Button>
      </Box>
    </Container>
  );
};

export default FinanzasForm;

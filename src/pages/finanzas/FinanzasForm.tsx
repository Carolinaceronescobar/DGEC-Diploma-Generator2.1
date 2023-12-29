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
    dcto_exAlumnosUSM: false,
    dcto_exAlumnosUSMText: '',
    dcto_mujeres: false,
    dcto_mujeresText: '',
    dcto_funcionariosUSM: false,
    dcto_funcionariosUSMText: '',
    dcto_funcionariosServiciosPublicos: false,
    dcto_funcionariosServiciosPublicosText: '',
    dcto_matriculaAnticipada: false,
    dcto_matriculaAnticipadaText: '',
    dcto_otros: false,
    dcto_otrosText: '',
    dcto_otrosDesc: '',
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
        modalidad_pago: modalidadPago.join(","),
        ...formData,
      };
      console.log('formulario')
      save_form(formularioObjeto);
      // Realiza una solicitud POST a un endpoint de tu servidor con los datos del formulario.

      // Verifica si la solicitud fue exitosa y muestra mensajes en la consola.
      // if (response.ok) {
      //   console.log('Formulario guardado exitosamente');
      // } else {
      //   console.error('Error al guardar el formulario');
      // }
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

  const selectModalidadPagohandleChange = (event:any) => {
    console.log('modalidad_pao')
    setModalidadPago(event.target.value);
  };
  const [arancel, setHandleArancelChange] = useState(''); // Estado local para el nombre del programa
  const handlestaffArancelChange = (event:any) => {
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

  const handleSetOtros = (value:any) => {
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
        console.log('documentoForm')
        console.log(documentoForm)
        if (documentoForm ){
          setHandleArancelChange(documentoForm?.arancel??"");
          requisitosPostulanteHandleCheckboxOnChange(documentoForm)
          let modalidad = documentoForm?.modalidad_pago.split(',');
          setModalidadPago(modalidad);
          formData.dcto_exAlumnosUSM= documentoForm?.dcto_exAlumnosUSM
          formData.dcto_exAlumnosUSMText  = documentoForm?.dcto_exAlumnosUSMText  
          formData.dcto_mujeres= documentoForm?.dcto_mujeres
          formData.dcto_mujeresText  = documentoForm?.dcto_mujeresText  
          formData.dcto_funcionariosUSM= documentoForm?.dcto_funcionariosUSM
          formData.dcto_funcionariosUSMText  = documentoForm?.dcto_funcionariosUSMText  
          formData.dcto_funcionariosServiciosPublicos= documentoForm?.dcto_funcionariosServiciosPublicos
          formData.dcto_funcionariosServiciosPublicosText  = documentoForm?.dcto_funcionariosServiciosPublicosText  
          formData.dcto_matriculaAnticipada= documentoForm?.dcto_matriculaAnticipada
          formData.dcto_matriculaAnticipadaText  = documentoForm?.dcto_matriculaAnticipadaText  
          formData.dcto_otros= documentoForm?.dcto_otros
          formData.dcto_otrosDesc = documentoForm?.dcto_otrosDesc 
          formData.dcto_otrosText  = documentoForm?.dcto_otrosText 


          
          // let formularioObjeto = {
          //   arancel: arancel,
          //   modalidad_pago: modalidadPago.join(","),
          //   ...formData,
          // };
          // console.log('formulario')
          // save_form(formularioObjeto);


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
                    checked={formData.dcto_exAlumnosUSM}
                    onChange={handleCheckboxChange}
                    name="dcto_exAlumnosUSM"
                  />
                }
                label="Ex alumnos USM"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.dcto_exAlumnosUSM ? (
              <TextField
                type="number"
                className="form-control"
                name="dcto_exAlumnosUSMText"
                id="exAlumnosUSM"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.dcto_exAlumnosUSMText  }
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
                    checked={formData.dcto_mujeres}
                    onChange={handleCheckboxChange}
                    name="dcto_mujeres"
                  />
                }
                label="Mujeres"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.dcto_mujeres ? (
              <TextField
                type="number"
                className="form-control"
                name="dcto_mujeresText"
                id="mujeres"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.dcto_mujeresText  }
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
                    checked={formData.dcto_funcionariosUSM}
                    onChange={handleCheckboxChange}
                    name="dcto_funcionariosUSM"
                  />
                }
                label="Funcionarios USM"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.dcto_funcionariosUSM ? (
              <TextField
                type="number"
                className="form-control"
                name="dcto_funcionariosUSMText"
                id="funcionariosUSM"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.dcto_funcionariosUSMText  }
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
                    checked={formData.dcto_funcionariosServiciosPublicos}
                    onChange={handleCheckboxChange}
                    name="dcto_funcionariosServiciosPublicos"
                  />
                }
                label="Funcionarios Servicios Publicos"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.dcto_funcionariosServiciosPublicos ? (
              <TextField
                type="number"
                className="form-control"
                name="dcto_funcionariosServiciosPublicosText"
                id="funcionariosServiciosPublicos"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.dcto_funcionariosServiciosPublicosText  }
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
                    checked={formData.dcto_matriculaAnticipada}
                    onChange={handleCheckboxChange}
                    name="dcto_matriculaAnticipada"
                  />
                }
                label="Matricula anticipada"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px', maxHeight: '5px' }}>
            {formData.dcto_matriculaAnticipada ? (
              <TextField
                style={{ maxHeight: '5px' }}
                type="number"
                className="form-control"
                name="dcto_matriculaAnticipadaText"
                id="matriculaAnticipada"
                label="Porcentaje"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                value={formData.dcto_matriculaAnticipadaText  }
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
                    checked={formData.dcto_otros}
                    onChange={handleCheckboxChange}
                    name="dcto_otros"
                  />
                }
                label="Otro"
              />
            </div>
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            {formData.dcto_otros && (
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    type="text"
                    className="form-control"
                    name="dcto_otrosDesc"
                    id="otrosText"
                    label="Otro descuento"
                    value={formData.dcto_otrosDesc  }
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    type="number"
                    className="form-control"
                    name="dcto_otrosText"
                    id="otrosPorcentaje"
                    label="Porcentaje"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={formData.dcto_otrosText  }
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

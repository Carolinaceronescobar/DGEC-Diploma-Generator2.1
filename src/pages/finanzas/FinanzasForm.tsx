import React, { useState } from 'react';
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
} from '@mui/material';
import UsoInternoFinanzas from '../usointfinanzas/UsointernoFinanzasForm';

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
  const [formularioPrincipalCompleto, setFormularioPrincipalCompleto] = useState<boolean>(false);

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
  funcionariosUSM: false,
  funcionariosServiciosPublicos: false,
  matriculaAnticipada: false,
  otros: false,
  otrosText: '',
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

  // Manejador para cambios en porcentaje
  const handlePorcentajeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleCheckboxMediosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      // Realiza una solicitud POST a un endpoint de tu servidor con los datos del formulario.
      const response = await fetch('/api/guardarFormulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          handleCheckboxChange,
          handleEnviarFinanzas,
          handleGuardarClick,
          handlePorcentajeChange,
          handleSubmit,
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
  
  // Renderizado del componente
  return (
    <Container>
      <Typography variant="h4" className="display-4 text-center mt-4 mb-5" sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}>
        Información relevante para Finanzas
      </Typography>

      <Box>
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}> Valorización</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id="regcur_durprog"
            label="Valor de Arancel del programa *"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={5}>
          <FormControl variant="outlined" fullWidth sx={{ mt: 0 }}>
            <InputLabel id="modalidad-pago-label">Modalidad de Pago</InputLabel>
            <Select
              labelId="modalidad-pago-label"
              id="regcur_sedeprog"
              label="Modalidad de Pago"
            >
              {/* Opciones de modalidad de pago */}
              <MenuItem value="Pago 1">Tarjeta de Débito</MenuItem>
              <MenuItem value="Pago 2">Tarjeta de Crédito</MenuItem>
              <MenuItem value="Pago 3">Transferencia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
        {/* Nuevo bloque de campos */}
        <div className="form-group  col-md-6"  >
          <label htmlFor="fin_valordescprog" className="form-label"  >
            Descuentos que ofrece el programa (tipo y porcentaje asociado)
          </label>
          <div className="form-row">
        </div>
          {/* Checkbox y campo de texto para Ex alumnos USM */}
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
    {formData.otros && (
      <div className="form-row">
        <div className="form-group col-md-6">
          <TextField
            type="text"
            className="form-control"
            name="otrosText"
            id="otrosText"
            label="Otro descuento"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <TextField
            type="number"
            className="form-control"
            name="otrosPorcentaje"
            id="otrosPorcentaje"
            label="Porcentaje"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            onChange={handlePorcentajeChange}
          />
        </div>
      </div>
    )}
    </div>
  </div>
    
      {/* Botón para guardar sin enviar */}
      <div className="row mb-10">
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
      </div>
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

      {/* Botón adicional para guardar sin enviar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" color="secondary" className="float-left">
          Guardar sin enviar
        </Button>
      </Box>
    </Container>
  );
};

export default FinanzasForm;

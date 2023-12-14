import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import FormularioDGEC from '../pages/dgec/DGECForm.tsx';
import RegistroCurricularForm from '../pages/registrocurricular/RegistroCurricularForm.tsx';
import AdmisionForm from '../pages/admision/AdmisionForm.tsx';
import FinanzasForm from '../pages/finanzas/FinanzasForm.tsx';
//import Solicitudes from './Dashboard.tsx';
import { useNavigate } from 'react-router-dom';

const HorizontalLinearStepper: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const navigate = useNavigate(); //para navegar al dashboard

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isStepOptional = (step: number) => {
    return step === 1; // O cualquier otra lógica que necesites
  };
  // Define el tipo de formData
  type FormData = {
    dgecData: any;
    registroCurricularData: any;
    admisionData: any;
    finanzasData: any;
  };

  //añade la deifnicion de formData
  const [formData, setFormData] = React.useState<{
    /* Aquí debes tener tus formularios */
    //Inicializa con la estructura de datos que espero almacenar
    dgecData: any;
    registroCurricularData: any;
    admisionData: any;
    finanzasData: any;
  }>({
    dgecData: {},
    registroCurricularData: {},
    admisionData: {},
    finanzasData: {},
  });

  const [forms, setForms] = React.useState<React.ReactElement[]>([
    /* Aquí debes tener tus formularios */
    // Inicializa con la estructura de datos que espero almacenar
    <FormularioDGEC />,
    <RegistroCurricularForm />,
    <AdmisionForm />,
    <FinanzasForm />,
  ]);

  const save_form = () => {
    console.log('¡Hola desde la función en el componente padre!');
  };

  //Funcion para manejar el cambio de datos en el formulario
  const handleFormChange = (data: any) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  //Funcion para guardar en la base de datos
  const saveToDatabase = () => {
    //Falta un codigo -logica para guardar formData en la base de datos
    //Puede ser una función async y enviar la informacion al servidor
    console.log('Guardando en la base de datos', formData);
    //Ejemplo de llamada a una API (ajustada segun el backend)
    //await api.post('./guardarDatos', formData);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setSkipped((prevSkipped: Set<number>) => {
      const newSkipped = new Set<number>(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });

    // Guardar en la base de datos cuando estés en el último paso
    if (activeStep === steps.length - 1) {
      saveToDatabase();
    }
  };

  const handleFinish = () => {
    saveToDatabase();
    navigate('/');
  };

  const steps: string[] = [
    'Autorizacion',
    'Registro Curricular',
    'Informacion del Programa',
    'Finanzas',
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                sx={{
                  color: activeStep === index ? '#004B85' : 'inherit',
                  fontFamily: 'Roboto Condensed, sans-serif',
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {React.cloneElement(forms[activeStep], {
        onDataChange: handleFormChange,
      })}

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1, color: '#004B85' }}
        >
          Atrás
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />

        {isStepOptional(activeStep) && (
          <Button
            color="inherit"
            onClick={handleSkip}
            sx={{ mr: 1, color: '#004B85' }}
          >
            Skip
          </Button>
        )}

        {activeStep === steps.length - 1 ? (
          <Button onClick={handleFinish} sx={{ color: '#004B85' }}>
            Finalizar
          </Button>
        ) : (
          <Button onClick={handleNext} sx={{ color: '#004B85' }}>
            Siguiente
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default HorizontalLinearStepper;

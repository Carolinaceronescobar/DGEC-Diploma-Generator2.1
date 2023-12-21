import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { UsoInternoDGECData } from './makeData';
import ModalComponent from '../../components/ModalComponent';
import { save_form } from '../../utils/formulario';
import { HeaderApp } from '../../components/HeaderApp';
import Sidebar from '../../components/SideBar';
import Footer from '../../components/Footer';

interface UsointernoDGECProps {
  campos: UsoInternoDGECData['campo1'];
  setCampos: React.Dispatch<React.SetStateAction<UsoInternoDGECData['campo1']>>;
  departamento: UsoInternoDGECData['departamento'];
  setDepartamento: React.Dispatch<
    React.SetStateAction<UsoInternoDGECData['departamento']>
  >;
  readOnly: UsoInternoDGECData['readOnly'];
  onGuardar: () => void;
  onEnviar: () => void;
}

const UsoInternoDGEC: React.FC<UsointernoDGECProps> = () => {
  const [tableData, setTableData] = useState<{ codedgec: string }[]>([]);
  const [optionsCodedgec, setOptionsCodedgec] = useState([
    'Codigo Int DGEC1',
    'Codigo Int DGEC2',
    'Codigo Int DGEC3',
  ]);

  const [inputCodedgecValue, setInputCodedgecValue] = useState(
    optionsCodedgec[0] || ''
  );
  const [open, setOpen] = useState(false);

  const [inputAutocomplete, setInputAutocomplete] = useState('');

  const handleAdd = () => {
    setTableData((prevTableData) => [
      ...prevTableData,
      { codedgec: inputCodedgecValue },
    ]);
  };

  const handleInputCodedgecChange = (
    event: React.ChangeEvent<{}>,
    newInputModuleValue: string
  ) => {
    setInputCodedgecValue(newInputModuleValue);
  };

  const handleInputAutoCompleteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputAutocomplete(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      inputCodedgecValue.trim() !== '' &&
      !optionsCodedgec.includes(inputCodedgecValue)
    ) {
      agregarNuevoValor(inputCodedgecValue);
    }
  };

  const agregarNuevoValor = (valor: string) => {
    if (!optionsCodedgec.includes(valor)) {
      setOptionsCodedgec([...optionsCodedgec, valor]);
    }
    setInputCodedgecValue(valor);
  };

  const handleGuardarClick = async () => {
    let formularioObjeto = {
      handleInputCodedgecChange: inputCodedgecValue,
    };
    save_form(formularioObjeto);
  };

  // const usuario = 'nombreDeUsuario'; // Asegúrate de declarar y asignar un valor a la variable usuario.

  // const respuesta = mainListItemsFx().filter(
  //   (x) => x.user == undefined || x.user?.includes(usuario)
  // );

  // console.log(mainListItemsFx); //

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  return (
    <>
      <HeaderApp toggleDrawer={toggleDrawer} />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Sidebar
          toggleDrawer={toggleDrawer}
          secondaryListItems={[]}
          open={false}
        />
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              padding: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: 'bold' }}
            >
              Codigo Interno DGEC
            </Typography>
            <hr />
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid>
                <Autocomplete
                  value={inputCodedgecValue}
                  options={optionsCodedgec}
                  onChange={(event, newValue) =>
                    handleInputAutoCompleteChange(newValue)
                  }
                  onKeyDown={handleKeyPress}
                  renderInput={(params) => (
                    <TextField {...params} label="Código Interno DGEC" />
                  )}
                />
              </Grid>
              <Typography sx={{ mt: 2 }}>
                Al ingresar nuevo codigo, aprete "enter" para guardar
              </Typography>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className="float-left"
                  onClick={handleAdd}
                  sx={{ mt: 2, width: '100%' }}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
            <br />
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {tableData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.codedgec}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                marginTop: 2,
                width: '100%',
                maxWidth: 'lg',
                textAlign: 'center',
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleGuardarClick}
              >
                Guardar sin enviar
              </Button>
            </Box>
          </Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default UsoInternoDGEC;

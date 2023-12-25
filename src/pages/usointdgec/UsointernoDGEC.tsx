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
  const [tableData, setTableData] = useState([]);
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
    console.log('aca2');
    let val = inputAutocomplete;
    let tabla_temporal = [... tableData, inputAutocomplete]
    setTableData(tabla_temporal);
  };

  const handleInputCodedgecChange = (
    event: React.ChangeEvent<{}>,
    newInputModuleValue: string
  ) => {
    setInputCodedgecValue(newInputModuleValue);
  };

  const handleInputAutoCompleteChange = (event: any, value_input:any ) => {
    const newValue = event.target.value;
    console.log()
    setInputAutocomplete(value_input);
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

  const handleDelete = (index:any) => {
    // tableData[index].module);
    tableData.splice(index, 1);
    setTableData([...tableData]);
    // Aquí puedes implementar la lógica para editar la fila seleccionada
  };

  const handleEdit = (index:any) => {
    setInputCodedgecValue(tableData[index].codedgec);
    handleDelete(index);
    // Aquí puedes implementar la lógica para editar la fila seleccionada
  };

  return (
    <Box>
      <div>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
        >
          {' '}
          Codigo Interno DGEC
        </Typography>
        <hr />
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                value={inputAutocomplete}
                options={optionsCodedgec}
                onChange={handleInputAutoCompleteChange}
                onKeyDown={handleKeyPress}
                renderInput={(params) => (
                  <TextField
                    onChange={handleInputAutoCompleteChange}
                    {...params}
                    label="Codigo DGEC"
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="outlined"
                color="secondary"
                className="float-left"
                onClick={handleAdd}
                sx={{ marginTop: 2 }}
              >
                Agregar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {' '}
                Al ingresar nuevo módulo, aprete "enter" y continúe completando
                con horas del módulo{' '}
              </Typography>
            </Grid>
          </Grid>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Módulo</TableCell>
                  <TableCell>Editar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data}</TableCell>
                    <TableCell>
                      <button onClick={() => handleEdit(index)}>Editar</button>
                      <button onClick={() => handleDelete(index)}>
                        Eliminar
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleGuardarClick} // Call handleGuardarClick when "Guardar" button is clicked
            sx={{ marginTop: 2 }}
          >
            Guardar
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default UsoInternoDGEC;

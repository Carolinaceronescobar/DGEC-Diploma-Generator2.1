//DGEC-DIPLOMA-GENERATOR2/ui/components/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import SolicitudesTabla from '../pages/resumen/SolicitudesTabla';
import { Solicitud } from '../pages/resumen/SolicitudesTabla.tsx';

import {delete_object_localstore} from '../utils/formulario.ts';


// TODO remove, this demo shouldn't need to reset the theme.
import { get_form } from '../utils/formulario.ts';

const Dashboard: React.FC = () => {
  // TODO: Solicitar los datos parece que dentro del useEffect()
  // Datos de ejemplo para SolicitudesTabla
  // const programs = get_form();

  const [solicitudesData, setSolicitudesData] = React.useState<Solicitud[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        delete_object_localstore();
        const data = await get_form();
        setSolicitudesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSolicitudesData([]); // Puedes manejar el error de la manera que prefieras
      }
    };

    fetchData();
  }, []);

  // TODO: Parece que permite listar los programas dependiendo del permiso del usuario.
  // Esto es mejor gestionarlo desde el App, por lo que es probable que pueda eliminarse

  // const mainListItemsFx = () => {
  //   try {
  //     let usuario = JSON.parse(localStorage.getItem('user'))?.profile.type;
  //     // setAnchorEl(null); .filter(x=> x.user.) mainListItems.filter((x) => x.user.includes(usuario.profile.type));
  //     const respuesta = mainListItems.filter(
  //       (x) => x.user == undefined || x.user?.includes(usuario)
  //     );
  //     console.log('sale mainListItem');
  //     return respuesta;
  //   } catch (ex) {
  //     console.log(`error -> ${ex}`);
  //     return mainListItems;
  //   }
  // };

  return (
    <>
      {/* Section para los CTAs */}
      <Box
        component="section"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <Box>{/* contenido opcional */}</Box>
        <Box>
          <Link
            to="/formulario"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: '#004B85' }}
            >
              Nuevo formulario
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Section para el listado de programas */}
      <Box
        component="section"
        sx={{
          padding: '20px',
        }}
      >
        {/* Integra SolicitudesTabla con los datos */}
        <SolicitudesTabla solicitudes={solicitudesData} />
      </Box>
    </>
  );
};

export default Dashboard;

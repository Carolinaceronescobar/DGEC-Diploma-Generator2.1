// import { useNavigate } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from 'react';
import { Box, Typography, Grid, Stack, Button, Divider } from '@mui/material';
import Logo from '../../assets/Recurso 1.svg';
import Background from '../../assets/MicrosoftTeams-image.png';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [authConfig, setAuthConfig] = useState(null);
  const UserContext = createContext({ usuario: '', profile: '' });

  useEffect(() => {
    axios
      .get('http://localhost:8000/auth/config')
      .then((response) => setAuthConfig(response.data))
      .catch((error) => console.error('Error fetching auth config', error));
  }, []);

  const handleLogin = () => {
    // if (authConfig) {
    //   const { tenant_id, client_id, redirect_uri, scope } = authConfig;
    //   const loginUrl = `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(
    //     redirect_uri
    //   )}&scope=${encodeURIComponent(scope)}&response_mode=query`;
    //   window.location.href = loginUrl;
    // }
    /*
    //CARO
    Type: usr_dir es director
          usr_fin
          usr_dires
          usr_dgec
          otro



    */
    let usuario = {
      name: 'John Doe',
      profile: {
        id: '1',
        name: 'director',
        type: 'otro',
      },
    };
    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.setItem('token', 'aabbb_ddd');
  };

  return (
    <Box component="main">
      <Grid
        item
        className="form-container"
        xs={12}
        sm={12}
        md={7}
        lg={8}
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box
          component="header"
          sx={{
            left: 0,
            p: 3,
            position: 'fixed',
            top: 0,
          }}
        ></Box>
        <>
          <Box
            sx={{
              backgroundImage: `url(${Background})`,
              flex: '1 1 auto',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '100vh',
              backgroundSize: 'cover',
            }}
          >
            <Box
              display={'grid'}
              height={'100%'}
              sx={{
                maxWidth: 550,
                px: 3,
                width: '100%',
                placeItems: 'center',
              }}
            >
              <Box
                className="login-form-container"
                display={'block'}
                bgcolor={'whitesmoke'}
                width={{ xxl: 400, sm: 400, xs: 300, xxs: 300 }}
                borderRadius={2}
              >
                <Grid
                  item
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  height={'100%'}
                  position={'relative'}
                  sx={{ pb: 3, pl: 3, pr: 3 }}
                >
                  <Grid>
                    <Grid
                      display={'flex'}
                      justifyContent={'center'}
                      sx={{ p: 2, mt: 2 }}
                    >
                      <Box
                        component={'img'}
                        src={Logo}
                        className="micrologo"
                        sx={{ height: 90 }}
                      />
                    </Grid>
                    <Divider
                      variant="middle"
                      sx={{ width: '100%', my: 0, mx: 'auto', borderWidth: 1 }}
                    />
                    <Stack sx={{ mt: 3 }}>
                      <Typography
                        variant="h4"
                        fontSize={20}
                        textAlign={'center'}
                        mb={1}
                      >
                        Direccion General de Estudios Continuos - DGEC -
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color={'neutral.600'}
                        textAlign={'center'}
                        mb={3}
                      ></Typography>
                    </Stack>
                  </Grid>

                  <Link to="/index" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      startIcon={<MicrosoftIcon />}
                      //onClick={handleLogin}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center content horizontally
                        alignItems: 'center', // Center content vertically
                        width: 'fit-content',
                        borderRadius: 1,
                        bgcolor: '#00a2ed', // Background color
                        color: 'white', // Text color
                        '& svg': {
                          m: 1,
                          color: 'white', // Icon color
                        },
                        '& hr': {
                          mx: 0.5, // Adjust margin for the divider
                          alignSelf: 'stretch', // Make the divider stretch to fill the button height
                          borderColor: 'white', // Divider color
                        },
                      }}
                      onClick={handleLogin}
                    >
                      <Divider orientation="vertical" flexItem />
                      <Typography>Iniciar Sesión</Typography>
                    </Button>
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      </Grid>
    </Box>
  );
};

export default LoginScreen;

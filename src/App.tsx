import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, Drawer, Grid, Switch } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
// import Dashboard from './components/Dashboard.tsx';

import Footer from "./components/Footer.tsx";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SchoolIcon from "@mui/icons-material/School";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import React from "react";
import { ProgramRequestForm } from "./components/ProgramRequestForm.tsx";
import UsoInternoDGEC from "./pages/usointdgec/UsoInternoDGEC.tsx";

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          sx={{
            maxHeight: "70px",
            backgroundColor: "#004B85",
            color: "white",
            padding: "1rem",
            textAlign: "center",
            fontSize: "0.8rem",
            ml: "24px",
          }}
        ></Box>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              backgroundColor: "#004B85",
              color: "white",
              padding: "1rem",
              textAlign: "center",
              fontSize: "0.8rem",
            }}
          ></Toolbar>
          <Divider />
          <nav>
            <List>
              <ListItemButton component={NavLink} to="/index">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
              <ListItemButton component={NavLink} to="/formulario">
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Formulario" />
              </ListItemButton>

              <ListItemButton component={NavLink} to="/finanzas">
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Finanzas" />
              </ListItemButton>

              <ListItemButton component={NavLink} to="/direst">
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Dirección Estudios" />
              </ListItemButton>

              <ListItemButton component={NavLink} to="/dgec">
                <ListItemIcon>
                  <HistoryEduIcon />
                </ListItemIcon>
                <ListItemText primary="DGEC" />
              </ListItemButton>
            </List>
          </nav>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml:10 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Routes>
                <Route path="/index" element={<UsoInternoDGEC />} />
                  <Route path="/formulario" element={<ProgramRequestForm />} />
                </Routes>
              </Grid>
              {/* Recent Deposits */}

              {/* Recent Orders */}
            </Grid>
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

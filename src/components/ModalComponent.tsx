import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProgramItem } from './ProgramItem';

interface Respuesta {
  id: number;
  pregunta: string;
  respuesta: string;
}

const ParentComponent: React.FC = () => {
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/respuestas'); // Reemplaza con la URL correcta de tu API
      if (!response.ok) {
        throw new Error('Error al obtener respuestas');
      }
      const data = await response.json();
      console.log('Datos de respuestas:', data);
      setRespuestas(data);
    } catch (error) {
      console.error('Error al obtener respuestas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ ml: 10 }}>
      <Typography
        variant="h6"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        Respuestas del Formulario
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <ProgramItem onVerRespuestaClick={handleModalOpen} />

      <Button variant="contained" color="primary" onClick={handleModalOpen}>
        Ver Respuestas
      </Button>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Respuestas del Formulario
          </Typography>

          {isLoading ? (
            <Typography>Cargando respuestas...</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Pregunta</TableCell>
                    <TableCell>Respuesta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {respuestas.map((respuesta) => (
                    <TableRow key={respuesta.id}>
                      <TableCell>{respuesta.id}</TableCell>
                      <TableCell>{respuesta.pregunta}</TableCell>
                      <TableCell>{respuesta.respuesta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ParentComponent;

// api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

export const login = async (
  username: string,
  password: string
): Promise<{ token: string }> => {
  // FIXME Ojo me parece que estás mezclando 'fetch' (nativo de javascript) con 'axios'
  // Debería ser await axios.post<CreateUserResponse>
  // Ejemplo: https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-post-requests-with-axios-in-typescript
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};
//Establece la URL base de la API
// const baseURL = 'http://localhost:5000/api'; // se ajusta URL según la configuración del servidor
const baseURL = 'http://127.0.0.1:8000/api/formulario/';
//se crea una instancia de axios con la URL base
const api = axios.create({
  baseURL,
});

//Se exporta la instacia de axios para su uso en otros lugares de la aplicación
export default api;

//Función para realizar una solicitud POST al endpint de guardarFormulario
export const guardarFormulario = async (FormData: any) => {
  try {
    //Realiza una solicitud POST a la nueva ruta del formulario
    const response = await api.post('/formulario/guardarFormulario', FormData);

    //Retorna la respuesta del servidor
    return response.data;
  } catch (error) {
    console.error('Error al enviar el formulario', error);
    throw error;
  }
};

// Función simulada para obtener programas desde la base de datos
export const obtenerProgramasDesdeBD = async (): Promise<string[]> => {
  // Simulación de una llamada a la base de datos
  return new Promise((resolve) => {
    setTimeout(() => {
      // Datos ficticios de programas
      const programas = [
        'Diploma de Ciberseguridad',
        'Curso de Gestión de Activos',
        'Curso Prueba 3',
      ];
      resolve(programas);
    }, 1000); // Simular un tiempo de espera de 1 segundo
  });
};

interface ProgramType {
  id: string;
  nombre: string;
  descripcion: string;
}

//obtener programa por id o nombre
export const obtenerdetalleProgramasporID = async (
  id: string
): Promise<ProgramType> => {
  // Simulación de una llamada a la base de datos
  return new Promise((resolve) => {
    setTimeout(() => {
      // Datos ficticios de programas
      const programa = {
        id: '1',
        nombre: 'Diploma de Ciberseguridad',
        descripcion: 'lorem itldmg  j h j kjh jkhjhbjhjbjh jh j jh j j jh ',
      };
      resolve(programa);
    }, 1000); // Simular un tiempo de espera de 1 segundo
  });
};
// Función para obtener información del usuario desde la base de datos
export const obtenerInformacionUsuario = async (
  userName: string
): Promise<any> => {
  try {
    // Aquí deberías realizar una llamada a tu base de datos para obtener la información del usuario
    // Puedes usar una biblioteca como axios para hacer solicitudes HTTP

    // Por ahora, simulamos la obtención de datos
    const response = await fetch(`/api/usuarios/${userName}`);

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    throw error;
  }
};

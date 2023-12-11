import React from 'react';
import TopBar from './TopBar';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import Footer from './Footer'; // Importa el componente Footer
//import { PrivateRoute } from './pages/login/PrivateRoute';
import { BrowserRouter as Router } from 'react-router-dom';
//import { AuthProvider } from '../pages/login/AuthContext';
import SolicitudesTabla from '../pages/resumen/SolicitudesTabla';

// En el archivo que contiene SolicitudesTabla
interface Solicitud {
  id: number;
  fecha: string;
  programa: string;
  departamento: string;
  campus: string;
  estado: string;
  revisionDGEC: boolean;
  revisionDIREST: boolean;
  revisionFINANZAS: boolean;
}

// TODO Eliminar ya que no se utilza
// interface SolicitudesTablaProps {
//   solicitudes: Solicitud[];
//   datos: any[];
// }

function obtenerSolicitudes(): Solicitud[] {
  return [
    {
      id: 1,
      fecha: '2023-01-01',
      programa: 'Programa 1',
      departamento: 'Departamento 1',
      campus: 'Campus 1',
      estado: 'Pendiente',
      revisionDGEC: false,
      revisionDIREST: false,
      revisionFINANZAS: false,
    },
  ];
}

// FIXME Cambiar nombre de este archivo y de todas importaciones
// FIXME Cambiar a un nombre más apropiado en inglés. Sugerido: RequestProgramForm
const SolicitudForm: React.FC = () => {
  const solicitudesData = obtenerSolicitudes(); // Por ejemplo, una función para obtener las solicitudes

  return (
    <Router>
      <div>
        <TopBar />
        <div className="container">
          <h1>Solicitud Creación de Programa</h1>
          <HorizontalLinearStepper />
          <SolicitudesTabla solicitudes={solicitudesData} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

// TODO Evitar exportar por defecto.
// Es mejor utilizar exportación por funciones ya que eslint pilla mejor los errores
// export { RequestProgramForm }
export default SolicitudForm;

// TODO Eliminar código comentado
// const App = () => {
//     const FormularioCompleto = () => {
//     };

//     // return (
//     //         <PrivateRoute path="/formulario-creacion-programa" roles={['usuarioDirector']}>
//     //             <div>
//     //               <TopBar />
//     //               <div className="container">
//     //                 <h1>Solicitud Creación de Programa</h1>
//     //                 <HorizontalLinearStepper />
//     //               </div>
//     //               <Footer />
//     //             </div>
//     //           </PrivateRoute>

//     //   );

//     return (
//         <Router>
//           <AuthProvider>
//             <Routes>
//             <PrivateRoute path="/formulario-creacion-programa" roles={['usuarioDirector']}>
//                 <div>
//                   <TopBar />
//                   <div className="container">
//                     <h1>Solicitud Creación de Programa</h1>
//                     <HorizontalLinearStepper />
//                   </div>
//                   <Footer />
//                 </div>
//               </PrivateRoute>
//               {/* Otras rutas */}
//             </Routes>
//           </AuthProvider>
//         </Router>
//       );
//  }
// export default App;

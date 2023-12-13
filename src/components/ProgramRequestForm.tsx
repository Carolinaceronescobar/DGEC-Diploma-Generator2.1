import React from 'react';
import TopBar from './TopBar';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import Footer from './Footer'; // Importa el componente Footer
//import { PrivateRoute } from './pages/login/PrivateRoute';
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
const ProgramRequestForm: React.FC = () => {
  return (
    <div>
      <TopBar />
      <div className="container">
        <h1>Solicitud Creación de Programa</h1>
        <HorizontalLinearStepper />
      </div>
      <Footer />
    </div>
  );
};

export { ProgramRequestForm };
// export default SolicitudForm;

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

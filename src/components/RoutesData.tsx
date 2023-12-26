// src/components/RoutesData.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdmisionForm from '../pages/admision/AdmisionForm';
import FormularioDGEC from '../pages/dgec/DGECForm';
import FinanzasForm from '../pages/finanzas/FinanzasForm';
import RegistroCurricular from '../pages/registrocurricular/RegistroCurricularForm';
import UsoInternoDGEC from '../pages/usointdgec/UsointernoDGEC';
import UsointernoDireccionEstudios from '../pages/usointdireccionestudios/UsointernoDireccionEstudios';
import UsoInternoFinanzas from '../pages/usointfinanzas/UsoInternoFinanzasForm';
import Dashboard from './Dashboard';

const Content: React.FC = () => {
  return (
    <Routes>
      <Route path="/admision" element={<AdmisionForm />} />
      <Route path="/finanzas" element={<FinanzasForm />} />
      <Route path="/formulariodgec" element={<FormularioDGEC />} />
      <Route path="/registrocurricular" element={<RegistroCurricular />} />
      <Route path="/finanzas" element={<UsoInternoFinanzas />} />
      <Route path="/dgec" element={<UsoInternoDGEC />} />
      <Route
        path="/direccionestudios"
        element={<UsointernoDireccionEstudios />}
      />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
export default Content;

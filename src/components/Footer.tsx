// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      backgroundColor: '#004B85',
      color: 'white', 
      padding: '1rem', 
      textAlign: 'center',
      fontSize: '0.8rem', }}>
      {/* Contenido del pie de página */}
      © 2023 Universidad Técnica Federico Santa María. Todos los derechos reservados.
    </footer>
  );
};

export default Footer;


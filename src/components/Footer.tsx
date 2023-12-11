// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#004B85',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        fontSize: '0.8rem',
      }}
    >
      {/* Contenido del pie de página */}© 2023 Universidad Técnica Federico
      Santa María. Todos los derechos reservados.
    </footer>
  );
};

// TODO Evitar exportar por defecto.
// Es mejor utilizar exportación por funciones ya que eslint pilla mejor los errores
// export { Footer }
export default Footer;

// listItems.ts
export const mainListItems = [
  { id: 1, text: 'Inicio', icon: 'home', route: '/' },
  { id: 2, text: 'Formulario', icon: 'person', route: '/formulario' },
  //{ id: 3, text: 'Finanzas', icon: 'person', route: '/finanzas' },
  {
    id: 4,
    text: 'Direccion Estudios',
    icon: 'person',
    route: '/direccionestudios',
  },
  { id: 5, text: 'DGEC', icon: 'person', route: '/dgec' },
  // Agrega más elementos según sea necesario
] as const;

export const secondaryListItems = [
  // { id: 3, text: 'Opción 1', route: '/opcion1' },
  { id: 4, text: 'Cerrar Sesión', route: '/' },
  // Agrega más elementos según sea necesario
] as const;

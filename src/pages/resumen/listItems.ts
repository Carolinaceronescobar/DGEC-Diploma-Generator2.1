export const mainListItems = [
  { id: 1, text: 'Inicio', icon: 'home', route: '/' },
  {
    id: 2,
    text: 'Formulario',
    icon: 'person',
    route: '/formulario',
    //user: ['usr_dir', 'otro'],
  },
  {
    id: 3,
    text: 'Finanzas',
    icon: 'person',
    route: '/finanzas',
    //user: ['usr_fin', 'otro'],
  },
  {
    id: 4,
    text: 'Direccion Estudios',
    icon: 'person',
    route: '/direccionestudios',
    // user: ['usr_dires', 'otro'],
  },
  {
    id: 5,
    text: 'DGEC',
    icon: 'person',
    route: '/dgec',
    // user: ['usr_dgec', 'otro'],
  },
  // Agrega más elementos según sea necesario
] as const;

export const secondaryListItems = [
  // { id: 3, text: 'Opción 1', route: '/opcion1' },
  { id: 4, text: 'Cerrar Sesión', route: '/login' },
  // Agrega más elementos según sea necesario
] as const;

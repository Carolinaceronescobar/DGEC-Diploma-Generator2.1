// makeData.ts

export interface UsoInternoDGECData {
  campo1: string;
  campo2: string;
  departamento: string;
  readOnly: boolean;
}

export const makeUsoInternoDGECData = (): UsoInternoDGECData => {
  // Puedes ajustar estos valores según tus necesidades
  return {
    campo1: 'ValorCampo1',
    campo2: 'ValorCampo2',
    departamento: 'DepartamentoEjemplo',
    readOnly: false,
  };
};
